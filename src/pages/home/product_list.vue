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
                            src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250214/hypWQMYydqmA0adUQvDsBfa8DGox5bHeZnpZibOC.png" />
                    </view>
                </template>

            </CustomHeader>
        </div>
        <view class="wraper mt-206rpx" v-if="categories.length !== 0">
            <wd-sidebar v-model="active" @change="handleChange">
                <wd-sidebar-item v-for="(item, index) in categories" :key="index" :value="index" :label="item.label" />
            </wd-sidebar>
            <scroll-view class="content" scroll-y scroll-with-animation :scroll-top="scrollTop" :throttle="false"
                @scroll="onScroll">
                <view v-for="(item, index) in categories" :key="index" class="category">
                    <wd-cell-group :title="item.title">
                        <div class="w-500rpx h-230rpx mb-40rpx" v-for="(_item, _index) in item.items" :key="_index"
                            @click="toDetails(_item)">
                            <ProductItem :img="_item.pictures[0]" :title="_item.title" :price="_item.price * 0.01"
                                :details="_item.intro" :tags="_item.tags" />
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
                scrollTop.value = rects[active.value]?.top || 0;
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
const productItems = ref([])
const categories = ref([])
//商品组
const getProductGroup = async () => {
    try {
        uni.showLoading({ title: '加载中' });
        const result = await productGroup();

        categories.value = result.data.map((item) => ({
            label: item.name,
            title: item.name,
            id: item.id,
            items: [],
        }));

        const promises = categories.value.map(async (category) => {
            const products = await allProduct({ group_id: category.id });
            category.items = Array.isArray(products.data) ? products.data : [];
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
//商品列表
const getProductList = async (groupID) => {
    try {
        uni.showLoading({
            title: '加载中'
        });
        let result = await allProduct({ group_id: groupID })
        console.log('商品列表', result)
        productItems.value = result.data
        uni.hideLoading();

    } catch (err) {
        console.log(err)
        uni.hideLoading();
        uni.showToast({
            title: err,

            icon: 'none'
        });
    }
}
const toDetails = (item) => {
    console.log(item, `${item.id}`)
    uni.navigateTo({
        url: `/pages/home/product_details?productId=${item.id}`
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
}

.content {
    flex: 1;
    background: #fff;
}

.customClass {}
</style>
<style>
.wd-sidebar-item {
    color: #8c8c8c !important;
    font-size: 28px;
}

.wd-sidebar-item--active {
    color: #222 !important;
    font-weight: medium;
    font-size: 28px;

}

.wd-sidebar-item--active::before {
    background: #FCE16A !important;
}
</style>