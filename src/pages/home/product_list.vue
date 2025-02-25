<route lang="json5" type="home">
    {
      style: {
        navigationBarTitleText: '商品',
        navigationStyle:'custom'
      },
    }
    </route>
<template>
    <div>
        <div>
            <CustomHeader>
                <template #left>
                    <view class="custom-left w-80rpx h-44rpx">
                        <image
                            src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250214/hypWQMYydqmA0adUQvDsBfa8DGox5bHeZnpZibOC.png"
                            mode="aspectFit" />
                    </view>
                </template>

            </CustomHeader>
        </div>
        <div class="w-full fixed  h-full z-90">
            <img src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250214/lAn879X4T0boACUqQLeRaARui2ISUKOeaYEQLsRQ.png"
                alt="" mode="aspectFit">
        </div>
        <view class="wraper pt-206rpx relative z-100" v-if="categories.length !== 0">
            <div @click="handleCart"
                class="fixed z-100 bottom-516rpx right-0 flex justify-center items-center rounded-l-full w-112rpx h-64rpx bg-#F159121A transition-transform duration-300"
                :style="{
            border: '1px solid #F15912',
            borderRight: 'none'
        }">
                <wd-icon name="cart" size="22px" color="#F15912"></wd-icon>
            </div>
            <wd-sidebar v-model="active" @change="handleChange" style="width:  189rpx;">
                <wd-sidebar-item v-for="(item, index) in categories" :key="index" :value="index" :label="item.label" />
            </wd-sidebar>
            <scroll-view class="flex-1 bg-transparent!" scroll-y scroll-with-animation :scroll-top="scrollTop"
                :throttle="false" @scroll="onScroll">
                <view v-for="(item, index) in categories" :key="index" class="category"
                    style="background: transparent !important;background-color: transparent !important;">
                    <wd-cell-group :title="item.title">
                        <div class="w-500rpx h-230rpx mb-40rpx" v-for="(_item, _index) in item.items" :key="_index"
                            @click="toDetails(_item)">
                            <ProductItem :img="_item.product_image" :title="_item.product_name"
                                :price="_item.product_unit_price_min" :details="_item.product_tips"
                                :tags="_item.tags" />
                        </div>
                    </wd-cell-group>
                </view>
            </scroll-view>
        </view>
    </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { getRect, isArray } from 'wot-design-uni/components/common/util'
import { ProductItem } from '../../components/productItem.vue'
import { allProduct, productGroup } from '@/service/index'
import CustomHeader from '@/components/customHeader'
onMounted(async () => {
    await nextTick(); // 确保 DOM 渲染完成
    try {
        await getProductGroup();
        getRect('.category', true).then((rects) => {
            if (Array.isArray(rects)) {
                itemScrollTop.value = rects.map((item) => item.top || 0);
                scrollTop.value = rects[active.value]?.top - 100 || 0;
            } else {
                console.warn('未找到任何 .category 节点');
            }
        }).catch((err) => {
            console.error('getRect 出错', err);
        });
    } catch (err) {
        console.error('初始化失败:', err);
    }
})
const active = ref(0)
const scrollTop = ref()
const itemScrollTop = ref([])
const categories = ref([])
//点击购物车
const handleCart = () => {
    uni.navigateTo({
        url: '/pages/cart/index'
    })
}
//商品组
const getProductGroup = async () => {
    try {
        uni.showLoading({ title: '加载中' });
        const result = await productGroup();
        categories.value = result.data.items.map((item) => ({
            label: item.category_name,
            title: item.category_name,
            id: item.category_id,
            items: [],
        }));
        const promises = categories.value.map(async (category) => {
            const products = await allProduct({
                category_id: category.id,
                kind_id: 1201,
                size: 1000
            });
            category.items = Array.isArray(products.data.items) ? products.data.items : [];
        });
        await Promise.all(promises);
        console.log('分类数据加载完成:', categories.value);
    } catch (error) {
        console.error('获取商品组失败:', error);
        uni.showToast({ title: '加载失败', icon: 'none' });
    } finally {
        uni.hideLoading();
    }
};
//前往商品详情
const toDetails = (item) => {
    console.log(item, `${item.id}`)
    uni.navigateTo({
        url: `/pages/home/product_details?productId=${item.item_id}`
    });
}


function handleChange({ value }) {
    active.value = value
    scrollTop.value = itemScrollTop.value[value]
}
function onScroll(e) {
    const { scrollTop } = e.detail
    const threshold = 50 // 下一个标题与顶部的距离
    if (scrollTop < threshold) {
        active.value = 0
        return
    }
    const index = itemScrollTop.value.findIndex((top) => top > scrollTop && top - scrollTop <= threshold)
    if (index > -1) {
        active.value = index
        console.log(active.value)
    }
}
</script>

<style lang="scss" scoped>
.wraper {
    display: flex;
    height: calc(100vh - var(--window-top));
    height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
    height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
    background: transparent !important;
}
</style>
<style>
.wd-sidebar-item {
    font-size: 24rpx !important;
    color: #8c8c8c !important;
    background: transparent !important;
}

.wd-sidebar-item--active {
    font-size: 24rpx !important;
    font-weight: medium !important;
    color: #222 !important;
}

.wd-sidebar-item--active::before {
    background: #FCE16A !important;
}

.wd-sidebar__padding,
.wd-sidebar,
.wd-cell-group__body,
.wd-cell-group__title,
.category,
.wd-cell-group,
.wraper {
    background: transparent !important;
}

.wd-cell-group__left text {
    font-size: 24rpx !important;
}
</style>