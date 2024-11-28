<route lang="json5" type="home">
    {
      style: {
        navigationBarTitleText: '购物车',
      },
    }
    </route>
<template>
    <div class="w-full h-screen bg-zinc-1 flex flex-col justify-start items-center">
        <div class="w-full pt-32rpx flex flex-col justify-start items-center">
            <div class="w-686rpx py-28rpx flex justify-center items-center bg-white rounded-24rpx overflow-hidden mb-28rpx"
                v-for="(item, index) in cartList" :key="index">
                <wd-swipe-action>
                    <!-- <wd-cell title="标题文字" value="内容"/> -->
                    <CartCard :title="item.product.title" :productQuantity="item.quantity" :items="item.product.items"
                        :picture="item.product.picture" :price="item.product.price * item.quantity || 0" />
                    <template #right>
                        <view class="h-full">
                            <view
                                class="h-full bg-red-500 flex justify-center items-center px-18rpx rounded-16rpx text-white"
                                @click="handleAction('操作3')">删除</view>
                        </view>
                    </template>

                </wd-swipe-action>
            </div>
        </div>
    </div>
</template>

<script setup>
import CartCard from '@/components/cartCard'
import { cart } from '@/service/index'
let cartList = ref([]) //购物车列表
const getCart = async () => { //获取购物车列表
    try {
        uni.showLoading({
            title: '加载中'
        });
        let result = await cart()
        console.log('购物车列表', result)
        let skuItems = []
        cartList.value = result.data

        uni.hideLoading()
    } catch (err) {
        console.log(err)
        uni.hideLoading()
    }
}
onLoad(() => {
    getCart()
})

</script>

<style lang="scss" scoped>
.action {
    height: 100%;
}

.button {}
</style>