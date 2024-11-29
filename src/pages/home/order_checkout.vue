<route lang="json5">
    {
      style: {
        navigationBarTitleText: '订单结算',
      },
    }
    </route>
<template>
    <div class="w-full h-screen flex flex-col justify-start items-center">
        <div class="w-686rpx">
            这里是订单结算页面
        </div>
    </div>
</template>

<script setup>
import { checkoutOrder } from '@/service/index'

let cartIds = ref([])

const cartCheckoutOrder = async (data) => {
    try {
        uni.showLoading({
            title: '加载中'
        });
        let result = await checkoutOrder(data)
        console.log('收银台', result)
    } catch (err) {
        console.log(err)
        uni.hideLoading();
    }
}

onLoad((options) => {
    const arrayString = decodeURIComponent(options.cartIds);
    cartIds.value = JSON.parse(arrayString)
    console.log(cartIds.value)
    cartCheckoutOrder({ cart_ids: cartIds.value })
})

</script>

<style lang="scss" scoped></style>