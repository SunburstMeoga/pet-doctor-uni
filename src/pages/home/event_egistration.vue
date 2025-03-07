<route lang="json5">
	{
	  style: {
		navigationBarTitleText: '活动报名'
	  },
	}
	</route>
<template>
    <div class="w-full flex flex-col justify-start items-center bg-#F7F7F7 " style="min-height: 100vh;">
        <div class="w-686rpx bg-white mt-32rpx mb-28rpx rounded-24rpx overflow-hidden">
            <div class="w-full h-320rpx relative rounded-24rpx overflow-hidden">
                <div class="w-full h-full">
                    <image :src="productDetailsInfo.product_image" mode="aspectFit" />
                </div>
            </div>
            <div class="w-full py-28rpx pb flex justify-center items-center ">
                <div class="w-630rpx">
                    <div class="text-32rpx mb-13rpx">
                        {{ productDetailsInfo.product_name }}
                    </div>
                    <div class="flex justify-start items-center mb-13rpx">
                        <div class="w-32rpx h-32rpx">
                            <image
                                src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250219/AqJmD9RKVekSqlDxSc2cqRev0IocoT8oPVHly4cX.png"
                                mode="aspectFit" />
                        </div>
                        <div class="text-#8c8c8c text-24rpx ml-12rpx">
                            {{ formatTimestamp(productDetailsInfo.offline_time) }}</div>
                    </div>
                    <div class="flex justify-start items-center mb-13rpx">
                        <div class="w-32rpx h-32rpx">
                            <image
                                src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250219/UQvZuxLI8WycvKWvxBXufG4BLbGSsBoXPKQHSspS.png"
                                mode="aspectFit" />
                        </div>
                        <div class="text-#8c8c8c text-24rpx ml-12rpx">{{ productDetailsInfo.offline_address }}</div>
                    </div>
                    <!-- <div class="flex justify-start items-center">
                        <div class="text-#222 flex justify-start items-start">
                            <div class="font-medium text-24rpx translate-y-2rpx">￥</div>
                            <div class="ml-4rpx font-bold text-32rpx">45</div>
                        </div>
                        <div class="text-#00000073 text-24rpx ml-16rpx">X3</div>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="w-686rpx rounded-24rpx overflow-hidden flex flex-col justify-start items-center bg-white">
            <div class="w-630rpx text-#222 font-32rpx pt-28rpx">
                联系人信息
            </div>
            <div class="w-630rpx flex justify-between items-center h-96rpx"
                style="border-bottom: 0.5px solid #8c8c8c73;">
                <div class="text-#595959">姓名</div>
                <div class="flex-1">
                    <input v-model="offlineName" class="text-right" ype="text" placeholder="请输入姓名">
                </div>
            </div>
            <div class="w-630rpx flex justify-between items-center h-96rpx ">
                <div class="text-#595959">手机号</div>
                <div class="flex-1">
                    <input v-model="offlinePhone" class="text-right" type="text" placeholder="请输入手机号">
                </div>
            </div>
        </div>
        <div class="absolute bottom-0 w-full flex justify-center items-center bg-white"
            v-show="Date.now() < productDetailsInfo.offline_deadline"
            style="padding-top: 20rpx;padding-bottom: calc(20rpx + env(safe-area-inset-bottom)); ">
            <div class="w-686rpx flex justify-between items-center">
                <div class="text-#F15912 flex justify-start items-center">
                    <div class="text-28rpx font-medium">待支付:</div>
                    <div class="text-40rpx font-bold ml-8rpx">¥{{ productDetailsInfo.product_unit_price_max }}</div>
                </div>
                <div @click="handlePay"
                    class="w-198rpx h-88rpx text-28rpx font-medium rounded-16rpx flex justify-center items-center bg-gradient-to-tr text-white to-#FCE16AF2  from-#F15912">
                    支付
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref } from 'vue'
import { productDetails, createOrder, pay, checkoutOrder, } from '@/service/index'
let productDetailsInfo = ref({}) //商品详情
let productId = ref(0) //商品id
let offlineName = ref()//联系人姓名
let offlinePhone = ref()//联系人电话

const handlePay = async () => {
    if (!offlineName.value || !offlinePhone.value) { //联系人和手机号必填
        uni.showToast({
            title: '请填写联系人姓名和手机号',
            icon: 'none'
        })
        return
    }
    uni.showLoading({
        title: '加载中...',
        icon: 'none'
    })

    try {
        let orderRes = await createOrder({
            cart_id: `${productId.value}|${1}|${0}`,
            // dispatch_mode: selectPickMethod.value,
            chain_id: '',
            user_voucher_ids: '',
            payment_type_id: 1302,
            redemption_ids: '',
            order_message: '',
            virtual_service_date: '',
            virtual_service_time: '',
            salesperson_id: '',
            user_invoice_id: '',
            user_nickname: '',
            currency_id: '',
            offline_name: offlineName.value,
            offline_mobile: offlinePhone.value

        })
        console.log(orderRes, '创建订单闲情')
        if (orderRes.code === 200) {
            uni.removeStorageSync('cartList')
            setTimeout(async () => {
                try {
                    uni.showLoading({
                        title: '加载中'
                    })
                    let payResult = await pay({ order_id: orderRes.data.order_ids.join(',') })
                    console.log('支付结果', payResult)
                    uni.requestPayment({
                        "timeStamp": payResult.data.payResult.timeStamp,
                        "nonceStr": payResult.data.payResult.nonceStr,
                        "package": payResult.data.payResult.package,
                        "signType": payResult.data.payResult.signType,
                        "paySign": payResult.data.payResult.paySign,
                        "success": function (res) {
                            // showCheckoutCounter.value = false
                            uni.navigateTo({
                                url: `/pages/home/order_details?orderSN=${payResult.data.order_id}`
                            })

                            uni.hideLoading()
                        },
                        "fail": function (res) {
                            // showCheckoutCounter.value = false
                            uni.navigateTo({
                                url: `/pages/home/order_details?orderSN=${payResult.data.order_id}`
                            })

                            uni.hideLoading()
                        },
                        "complete": function (res) {
                            // showCheckoutCounter.value = false
                            uni.navigateTo({
                                url: `/pages/home/order_details?orderSN=${payResult.data.order_id}`
                            })

                            uni.hideLoading()
                        }
                    });
                    uni.hideLoading()
                } catch (error) {
                    console.log(error)
                    uni.hideLoading()
                }
            }, 3000);
        } else {
            showToast({
                title: orderRes.message,
                icon: 'none'
            })
        }
    } catch (err) {
        console.log(err)
    }
}

const getProductDetails = async () => { //获取商品详情
    uni.showLoading({
        title: '加载中...',
    })
    try {
        let result = await productDetails({ item_id: productId.value })
        productDetailsInfo.value = result.data
        console.log('商详', result)
        uni.hideLoading();
    } catch (error) {
        uni.hideLoading()
        uni.showToast({
            title: error,
            icon: 'none'
        })
    }
}
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
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
onMounted(() => {
    getProductDetails()
})
onLoad((options) => {
    productId.value = options.productId || 8
    console.log(productId.value)
})

</script>
<style scoped></style>