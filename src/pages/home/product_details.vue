<route lang="json5" type="home">
    {
      style: {
        navigationBarTitleText: '商品详情',
      },
    }
    </route>
<template>
    <div class="flex flex-col justify-start items-center">
        <div class="w-full h-417rpx relative ">
            <div class="w-full h-417rpx absolute inset-0">
                <img src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241128/LZIDSbbyqBlBleWhryCDuwt1KxgLp652wikP9F2Y.png"
                    alt="">
            </div>
        </div>
        <div class="w-full flex flex-col items-center -mt-60rpx relative z-1 h-auto">
            <div class="w-686rpx h-400rpx rounded-24rpx overflow-hidden bg-white mb-28rpx">
                <swiper class="swiper-box w-686rpx h-400rpx " @change="change" :current="swiperDotIndex">
                    <swiper-item v-for="(item, index) in productDetailsInfo.pictures" :key="index"
                        class="flex justify-center items-center">
                        <view class="swiper-item" :class="'swiper-item' + index">
                            <img :src="item" class="w-full h-full object-cover" alt="">
                        </view>
                    </swiper-item>
                </swiper>
            </div>
            <div class="w-686rpx text-36rpx font-medium  mb-28rpx">
                {{ productDetailsInfo.title }}
            </div>
            <div class="w-686rpx text-zinc-4 text-28rpx mb-24rpx">
                {{ productDetailsInfo.intro }}
            </div>
            <div class="w-686rpx flex flex-wrap min-h-10000rpx">
                <img class="w-full block h-auto" v-for="(item, index) in productDetailsInfo.detail_pictures"
                    :key="index" :src="item">
            </div>
        </div>

    </div>
</template>

<script setup>
import { productDetails } from '@/service/index'
let productId = ref(0)
let productDetailsInfo = ref({})
const getProductDetails = async () => { //商品详情
    try {
        uni.showLoading({
            title: '加载中'
        });
        let result = await productDetails(productId.value)
        console.log('商品详情', result)
        productDetailsInfo.value = result.data
        uni.hideLoading();
    } catch (err) {
        console.log(err)
        uni.hideLoading();
    }
}
onLoad((options) => {
    productId.value = options.productId
    console.log(productId.value)
    getProductDetails()
})
</script>

<style lang="scss" scoped>
.swiper-box {
    width: 686rpx;
    height: 400rpx;
}

.swiper-item {
    width: 686rpx;
    height: 400rpx;
}
</style>