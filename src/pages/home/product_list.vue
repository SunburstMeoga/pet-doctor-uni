<route lang="json5" type="home">
    {
      style: {
        navigationBarTitleText: '商品'
      },
    }
    </route>
<template>
    <div>
        <view class="wraper">
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
import { onMounted, ref } from 'vue'
import { getRect, isArray } from 'wot-design-uni/components/common/util'
import { ProductItem } from '../../components/productItem.vue'
import { allProduct, productGroup } from '@/service/index'

const subCategories = new Array(24).fill({ title: '标题文字', label: '这是描述这是描述' }, 0, 24)
const active = ref(1)
const scrollTop = ref(0)
const itemScrollTop = ref([])
const productItems = ref([])
const categories = ref([])
//商品组
const getProductGroup = async () => {
    try {
        uni.showLoading({
            title: '加载中'
        });
        let result = await productGroup()
        console.log('商品组', result)
        result.data.map(async (item) => {
            let obj = {}
            obj.label = item.name
            obj.title = item.name
            obj.id = item.id
            let products = await allProduct({ group_id: item.id })
            let productItems = products.data
            obj.items = productItems
            categories.value.push(obj)
            console.log(categories.value)
        })
        // let res = await allProduct({ group_id: groupID })
        //     {
        //     label: '分类一',
        //     title: '标题一',
        //     items: subCategories
        // }
        console.log(categories.value)
        uni.hideLoading();
    } catch (err) {
        console.log(err)
        uni.hideLoading();
    }
}
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
onMounted(() => {
    getRect('.category', true).then((rects) => {
        if (isArray(rects)) {
            itemScrollTop.value = rects.map((item) => item.top || 0)
            scrollTop.value = rects[active.value].top || 0
        }
    })
    getProductGroup()

})

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