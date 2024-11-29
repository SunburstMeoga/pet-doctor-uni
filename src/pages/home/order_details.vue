<route lang="json5">
    {
      style: {
        navigationBarTitleText: '订单详情',
      },
    }
    </route>
<template>
    <div class="w-full h-screen flex flex-col justify-start items-center bg-gray-1 pt-32rpx pb-500rpx">
        <div class="w-686rpx">
            <div
                class="w-full h-152rpx relative mb-28rpx rounded-24rpx overflow-hidden bg-white flex justify-center items-center">
                <div class="w-60rpx h-64rpx absolute right-56rpx top-50rpx z-1">
                    <img src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241129/AMUCE8QvrDnu1hGzAkfZFcqn8TjxTaZdJyViYWtB.png"
                        alt="">
                </div>
                <div class="w-full h-152rpx absolute inset-0 z-0">
                    <img src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241129/RDlydh6CSGVJPtfqFCblF77rDudtZnk26XbCdtVF.png"
                        alt="">
                </div>
                <div class="w-630rpx h-152rpx flex flex-col items-start justify-center">
                    <div class="text-zinc4 text-28rpx mb-10rpx ">
                        自提地址：
                    </div>
                    <div class="text-slate-9 text-32rpx font-medium">
                        深圳市会展中心2楼103展区
                    </div>
                </div>
            </div>
        </div>

        <div class="w-686rpx bg-white rounded-24rpx overflow-hidden flex flex-col justify-start items-center mb-28rpx">
            <div class="w-630rpx" v-for="(item, index) in 5" :key="index">
                <OrderDetailsCard />
            </div>
            <div class="flex justify-center items-center text-zinc4 mb-24rpx">
                <div class="text-24rpx">展开全部(20)</div>
                <div class="icon iconfont icon-down text-16rpx ml-10rpx"></div>
            </div>
        </div>

        <div class="w-686rpx py-28rpx rounded-24rpx overflow-hidden flex flex-col justify-start items-center bg-white">
            <div class="flex justify-between items-center w-630rpx text-28rpx mb-16rpx">
                <div class="text-zinc">下单时间</div>
                <div class="text-slate9">2024/09/21 09:23</div>
            </div>
            <div class="flex justify-between items-center w-630rpx text-28rpx">
                <div class="text-zinc">订单编号</div>
                <div class="text-slate9">787870079768689008</div>
            </div>
        </div>

        <div class="fixed bottom-0 left-0 w-full flex flex-col items-center justify-start pb-92rpx z-2 bg-white">

            <div class="w-full flex justify-center items-center pt-20rpx " style="border-top:1px solid #f3f4f6;">
                <div class="w-686rpx flex justify-between items-center">
                    <div class="flex justify-start items-center text-orange4">
                        <div class="text-28rpx font-medium">待支付:</div>
                        <div class="text-40rpx font-bold">¥4567</div>

                    </div>
                    <div class="flex justify-end items-center">
                        <div class="operating-button text-gray5 " style="border: 1px solid #e5e7eb;">取消订单</div>
                        <div class="operating-button bg-orange5 ml-20rpx text-white">立即支付</div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import OrderDetailsCard from '@/components/orderDetailsCard.vue';
onLoad((options) => {

})

</script>

<style lang="scss" scoped>
.operating-button {
    @apply flex justify-center items-center text-28rpx font-medium rounded-18rpx w-198rpx h-86rpx;
}
</style>