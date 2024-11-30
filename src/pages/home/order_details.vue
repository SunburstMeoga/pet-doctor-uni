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
                <div class="w-630rpx h-152rpx flex flex-col items-start justify-center"
                    v-if="orderDetailsInfo.dispatch_mode === 0">
                    <div class="text-zinc4 text-28rpx mb-10rpx ">
                        自提地址：
                    </div>
                    <div class="text-slate-9 text-32rpx font-medium">
                        深圳市会展中心2楼103展区
                    </div>
                </div>
                <div class="w-630rpx h-152rpx flex flex-col items-start justify-center"
                    v-if="orderDetailsInfo.dispatch_mode === 1">
                    <div class="text-zinc4 text-28rpx mb-10rpx ">
                        收货地址：
                    </div>
                    <div class="flex justify-start items-center text-zinc5 text-26rpx">
                        <div class="icon iconfont icon-Personal "></div>
                        <div class="flex justify-start items-center ml-4rpx">
                            {{ orderDetailsInfo.name || '快递收货人姓名' }} {{ orderDetailsInfo.phone || '联系人电话' }}
                        </div>
                    </div>
                    <div class="flex justify-start items-center text-zinc5 text-26rpx">
                        <div class="icon iconfont icon-addresss "></div>
                        <div class="flex justify-start items-center ml-4rpx">{{ orderDetailsInfo.address || '联系人地址' }}
                        </div>
                    </div>
                    <!-- <div class="text-zinc4 text-28rpx mb-10rpx ">
                        {{ orderDetailsInfo.name || '快递收货人姓名'}} {{ orderDetailsInfo.phone || '联系人电话' }} 
                    </div>
                    <div class="text-slate-9 text-32rpx font-medium">
                        {{ orderDetailsInfo.address || '联系人地址' }}
                    </div> -->
                </div>
            </div>
        </div>

        <div class="w-686rpx bg-white rounded-24rpx overflow-hidden flex flex-col justify-start items-center mb-28rpx">
            <div class="w-630rpx" v-for="(item, index) in orderDetailsInfo.items" :key="index">
                <OrderDetailsCard :productInfo="item" />
            </div>
            <!-- <div class="flex justify-center items-center text-zinc4 mb-24rpx">
                <div class="text-24rpx">展开全部(20)</div>
                <div class="icon iconfont icon-down text-16rpx ml-10rpx"></div>
            </div> -->
        </div>

        <div class="w-686rpx py-28rpx rounded-24rpx overflow-hidden flex flex-col justify-start items-center bg-white">
            <div class="flex justify-between items-center w-630rpx text-28rpx mb-16rpx">
                <div class="text-zinc">下单时间</div>
                <div class="text-slate9">{{ formatTimestamp(orderDetailsInfo.created_at) }}</div>
            </div>
            <div class="flex justify-between items-center w-630rpx text-28rpx">
                <div class="text-zinc">订单编号</div>
                <div class="text-slate9">{{ orderSN }}</div>
            </div>
        </div>
        <div class="fixed bottom-0 left-0 w-full flex flex-col items-center justify-start pb-92rpx z-2 bg-white"
            v-if="orderDetails.status === 0">

            <div class="w-full flex justify-center items-center pt-20rpx " style="border-top:1px solid #f3f4f6;">
                <div class="w-686rpx flex justify-between items-center">
                    <div class="flex justify-start items-center text-orange4">
                        <div class="text-28rpx font-medium">待支付:</div>
                        <div class="text-40rpx font-bold">¥{{ orderDetailsInfo.amount * 0.01 }}</div>

                    </div>
                    <div class="flex justify-end items-center">
                        <div class="operating-button text-gray5 " style="border: 1px solid #e5e7eb;"
                            @click="handleCancelOrder">取消订单</div>
                        <div class="operating-button bg-orange5 ml-20rpx text-white" @click="handlePay">立即支付</div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import OrderDetailsCard from '@/components/orderDetailsCard.vue';
import { orderDetails, systemConfig, pay, cancelOrder } from '@/service/index'
let orderSN = ref('')
let pickUpSite = ref('')
let orderDetailsInfo = ref({})
// 0=待付款
// 1=已付款待发货
// 2=已发货带收货
// 3=已收货完成订单
// 4=已取消
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    // 获取月份，日期，小时，分钟和秒
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    // 拼接格式为 MM-DD HH:mm:ss
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
const handleCancelOrder = async () => { //点击取消订单
    try {
        uni.showLoading({

        })
        let result = await cancelOrder(orderSN.value)
        uni.hideLoading()
        uni.showToast({
            title: result.message,
        });
        if (result.code === 0) {
            getOrderDetails()
        }
    } catch (err) {
        console.log(err)
        uni.hideLoading()
    }
}
const handlePay = async () => { //点击立即支付
    try {
        uni.showLoading({
            title: '加载中'
        })
        let payResult = await pay({ order_sn: orderSN.value })
        console.log('支付结果', payResult)
        uni.requestPayment({
            "timeStamp": payResult.data.timeStamp,
            "nonceStr": payResult.data.nonceStr,
            "package": payResult.data.package,
            "signType": payResult.data.signType,
            "paySign": payResult.data.paySign,
            "success": function (res) {
                getOrderDetails()
            },
            "fail": function (res) {
                getOrderDetails()

            },
            "complete": function (res) {
                getOrderDetails()

            }
        });
        uni.hideLoading()
    } catch (error) {
        console.log(error)
        uni.hideLoading()
    }
}
const getOrderDetails = async () => { //获取订单详情
    try {
        uni.showLoading({
            title: '加载中'
        })
        // let result = await orderDetails("P202412011732995647")
        let result = await orderDetails(orderSN.value)
        console.log('订单详情', result)
        orderDetailsInfo.value = result.data
        uni.hideLoading()
    } catch (err) {
        uni.hideLoading();
        console.log(err)
    }
}
onLoad((options) => {
    orderSN.value = options.orderSN
    // orderSN.value = 'P202412011732997256'
    getOrderDetails()
    getSystemConfig()
})
const getSystemConfig = async () => { //获取后台系统配置 自提地点
    try {
        uni.showLoading({
            title: '加载中'
        })
        let res = await systemConfig('pick_up_site')
        pickUpSite.value = res.data
        console.log('自提地址', pickUpSite.value)
    } catch (err) {
        console.log(err)
        uni.hideLoading()
    }
}
onShow(() => {

})
</script>

<style lang="scss" scoped>
.operating-button {
    @apply flex justify-center items-center text-28rpx font-medium rounded-18rpx w-198rpx h-86rpx;
}
</style>