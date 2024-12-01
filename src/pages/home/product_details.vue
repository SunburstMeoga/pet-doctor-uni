<route lang="json5">
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
            <div class="w-686rpx flex justify-start items-center mb-24rpx" v-if="productDetailsInfo.tags.length !== 0">
                <div v-for="(item, index) in productDetailsInfo.tags"
                    :class="`text-24rpx rounded-4rpx px-8rpx ${index !== 0 ? 'ml-8rpx' : ''} ${item.tagStyle}`"
                    :key="index">
                    {{ item.title }}
                </div>
            </div>
            <div class="w-686rpx text-zinc-4 text-28rpx mb-24rpx">
                {{ productDetailsInfo.intro }}
            </div>
            <div class="w-686rpx flex flex-wrap min-h-10000rpx pb-600rpx">
                <img class="w-full block h-auto" v-for="(item, index) in productDetailsInfo.detail_pictures"
                    :key="index" :src="item">
            </div>
        </div>
        <div class="fixed bottom-0 left-0 w-full flex flex-col items-center justify-start pb-92rpx z-2 bg-white">
            <div class="w-686rpx pt-28rpx">
                <div class="text-slate-9 text-28rpx font-medium mb-16rpx">规格</div>
            </div>
            <div class="w-full flex justify-start items-center">
                <div class="flex justify-center items-center w-92rpx h-58rpx rounded-16rpx ml-32rpx text-24rpx font-medium flex-wrap mb-28rpx"
                    @click="handleSKUItem(item)" v-for="(item, index) in productDetailsInfo.items" :key="index"
                    :class="selectSKU === item.id ? 'bg-yellow-3 text-slate-9' : 'bg-zinc-2 text-slate-6'">
                    {{ item.sku_title }}
                </div>
            </div>
            <div class="w-full flex justify-center items-center bg-orange-3 text-red-5 text-24rpx h-57rpx"
                v-if="productDetailsInfo.group_end_at && productDetailsInfo.is_group">
                <div class="w-686rpx ">
                    截至 {{ formatTimestamp(productDetailsInfo.group_end_at) }}
                </div>
            </div>
            <div class="w-full flex justify-center items-center h-96rpx">
                <div class="w-686rpx flex justify-between items-center">
                    <div class="text-48rpx text-slate-9 font-bold">￥{{ productDetailsInfo.price * 0.01 * productQuantity
                        }}</div>
                    <div>
                        <wd-input-number v-model="productQuantity" @change="handleChange" :min="1"
                            :max="productDetailsInfo.stock" />
                    </div>
                </div>

            </div>
            <div class="w-full flex justify-center items-center pt-20rpx " style="border-top:1px solid #f3f4f6;">
                <div class="w-686rpx flex justify-between items-center">
                    <div class=" bg-black text-yellow operating-button" @click="handleAddCart">加入购物车</div>
                    <div class=" bg-orange-4 text-white operating-button" @click="handleBuyNow">立即购买</div>

                </div>

            </div>
        </div>
        <CheckoutCounter :showCheckoutCounter="showCheckoutCounter" :productQuantity="productQuantity"
            :productInfo="productDetailsInfo" :pickUpSite="pickUpSite" :addressInfo="addressInfo"
            @handleClose="handleClose" @selectAddress="handleSelectAddress" @confirmOrder="handleConfirmOrder" />
    </div>
</template>

<script setup>
import CheckoutCounter from '@/components/checkoutCounter'
import { checkoutOrder } from '@/service/index'
import { productDetails, addCard, createOrder, orderStatus, systemConfig, addresses, pay } from '@/service/index'
let productId = ref(0)
let productDetailsInfo = ref({})
let selectSKU = ref(1) //选择的sku
let productQuantity = ref(1) //要购买的商品数量
let pollingTimer = null; //订单轮询定时器
let showCheckoutCounter = ref(false) //显示隐藏收银台
let selectPickMethod = ref(0)
let pickUpSite = ref('')
let addressItems = ref([])
let addressInfo = ref({})
let tags = ref([
    { title: '上新', tagStyle: 'bg-orange-5 text-white' },
    { title: '猫猫', tagStyle: 'bg-amber-1 text-amber-4' },
    { title: '毛绒', tagStyle: 'bg-sky-1 text-sky-4' }
])
const handleSelectAddress = () => { //点击收银台的选择地址
    uni.navigateTo({
        url: `/pages/home/${addressItems.value.length !== 0 ? 'address_list' : 'store_address'}?operating=select`
    })
}
const getAddressItems = async () => { //获取地址列表
    try {
        uni.showLoading({
            title: '加载中'
        });
        let result = await addresses()
        addressItems.value = result.data
        console.log('地址列表', result)
        let arr = addressItems.value.filter(item => item.is_default)
        if (uni.getStorageSync('createOrderAddress')) {
            addressInfo.value = uni.getStorageSync('createOrderAddress')
        } else {
            addressInfo.value = arr[0] || addressItems.value[0]
        }

        console.log('默认地址', addressInfo.value)
        uni.hideLoading()
    } catch (err) {
        console.log(err)
        uni.hideLoading();

    }
}
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
const checkOrderStatus = async (orderSN) => { //检查订单状态
    try {
        uni.hideLoading({
            title: '加载中...'
        })
        let result = await orderStatus({ order_sn: orderSN })
    } catch (err) {
        console.log(err)
        uni.hideLoading()
    }
}
// const toCreateOrder = async (params) => { //创建订单
//     try {
//         uni.showLoading({
//             title: '加载中'
//         })
//         let orderRes = await createOrder(params)
//         console.log('创建订单结果', orderRes)

//         let orderSN = orderRes.data.order_sn
//         pollingTimer = setInterval(async () => { //轮询订单状态
//             try {
//                 const statusResponse = await checkOrderStatus(orderSN);
//                 console.log('订单状态', statusResponse)
//                 if (statusResponse.status === 0) {
//                     // 如果状态还是pending，继续轮询
//                 } else {
//                     // 如果状态变为success或fail，停止轮询并更新订单状态
//                     clearInterval(pollingTimer);
//                     pollingTimer = null;
//                     orderStatus.value = statusResponse.status;
//                 }
//             } catch (error) {
//                 console.error('查询订单状态时出错:', error);
//                 // 处理错误，可能需要重新尝试请求或停止轮询
//                 clearInterval(pollingTimer);
//                 pollingTimer = null;
//             }
//         }, 1000);
//     } catch (err) {
//         console.log(err)
//         uni.hideLoading()
//     }

// }
const handleConfirmOrder = async (selectPickMethodChild) => { //点击收银台确认订单按钮
    console.log(selectPickMethodChild)
    selectPickMethod.value = selectPickMethodChild
    try {
        handleClose()
        uni.showLoading({
            title: '加载中'
        })
        let result = await checkoutOrder({ item_id: selectSKU.value, quantity: productQuantity.value })
        let params = {
            item_id: selectSKU.value,
            quantity: productQuantity.value,
            dispatch_mode: productDetailsInfo.value.is_activity ? 2 : selectPickMethod.value,
            contact_name: addressInfo.value.name,
            contact_phone: addressInfo.value.phone,
            address_id: addressInfo.value.id
        }
        try {
            uni.showLoading({
                title: '加载中'
            })
            let orderRes = await createOrder(params)
            console.log('创建订单结果', orderRes)
            console.log('创建订单结果', orderRes.code)

            if (orderRes.code === 0) {
                console.log('创建订单成功了。走支付流程')

                uni.removeStorageSync('createOrderAddress')
                console.log('创建订单成功了。走支付流程')
                uni.showLoading({
                    title: '加载中'
                })
                setTimeout(async () => {

                    try {
                        uni.showLoading({
                            title: '加载中'
                        })
                        let payResult = await pay({ order_sn: orderRes.data.order_sn })
                        console.log('支付结果', payResult)
                        uni.requestPayment({
                            "timeStamp": payResult.data.timeStamp,
                            "nonceStr": payResult.data.nonceStr,
                            "package": payResult.data.package,
                            "signType": payResult.data.signType,
                            "paySign": payResult.data.paySign,
                            "success": function (res) {
                                uni.navigateTo({
                                    url: `/pages/home/order_details?orderSN=${orderRes.data.order_sn}`
                                })
                                uni.hideLoading()
                            },
                            "fail": function (res) {
                                uni.navigateTo({
                                    url: `/pages/home/order_details?orderSN=${orderRes.data.order_sn}`
                                })
                                uni.hideLoading()
                            },
                            "complete": function (res) {
                                uni.navigateTo({
                                    url: `/pages/home/order_details?orderSN=${orderRes.data.order_sn}`
                                })
                                uni.hideLoading()
                            }
                        });
                        uni.hideLoading()
                    } catch (error) {
                        console.log(error)
                        uni.hideLoading()
                    }
                }, 5000);
            }
        } catch (err) {
            console.log(err)
            uni.hideLoading()
        }
        uni.hideLoading()
    } catch (err) {
        uni.hideLoading()
        uni.showToast({
            title: '请求超时，请重试'
        })
        console.log(err)

    }
}
const handleClose = () => { //关闭弹窗
    showCheckoutCounter.value = false
    console.log(showCheckoutCounter.value)
}
const formatTimestamp = (timestamp) => { //格式化时间内
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
const handleAddCart = async () => { //点击添加购物车
    if (!uni.getStorageSync('token')) {
        uni.showModal({
            content: '登录才可进行添加购物车哦~',
            showCancel: true,
            confirmText: '前往登录',
            success: (e) => {
                console.log(e)
                if (e.confirm) {
                    uni.navigateTo({
                        url: '/pages/login/index'
                    })
                }
            },

        })
        return
    }
    try {
        uni.showLoading({
            title: '加载中'
        });
        let params = { item_id: selectSKU.value, quantity: productQuantity.value }
        console.log(params)
        let result = await addCard(params)
        console.log('添加购物车', result)
        uni.hideLoading();
        uni.showToast({
            title: '已加入购物车~',
            duration: 2000,
            icon: 'none'
        });
    } catch (err) {
        console.log(err)
        uni.hideLoading();

    }

}
const handleBuyNow = () => { //点击立即购买
    if (!uni.getStorageSync('token')) {
        uni.showModal({
            content: '登录才可购买哦~',
            showCancel: true,
            confirmText: '前往登录',
            success: (e) => {
                console.log(e)
                if (e.confirm) {
                    uni.navigateTo({
                        url: '/pages/login/index'
                    })
                }
            },

        })
        return
    }
    showCheckoutCounter.value = true
}
const handleChange = ({ value }) => { //步进器
    console.log(value)
}
const handleSKUItem = (item) => {
    selectSKU.value = item.id
}
const getProductDetails = async () => { //商品详情
    try {
        uni.showLoading({
            title: '加载中'
        });
        let result = await productDetails(productId.value)
        console.log('商品详情', result)
        productDetailsInfo.value = result.data
        selectSKU.value = result.data.items[0].id
        uni.hideLoading();
    } catch (err) {
        console.log(err)
        uni.hideLoading();
    }
}
onLoad((options) => {
    productId.value = options.productId
    console.log(productId.value)
})
onShow(() => {
    getProductDetails()
    getSystemConfig()
    getAddressItems()
})
// 清理函数，组件卸载时停止轮询
onUnmounted(() => {
    if (pollingTimer) {
        clearTimeout(pollingTimer);
        pollingTimer = null;
    }
});
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

.operating-button {
    @apply w-329rpx h-88rpx text-28rpx font-medium rounded-16rpx flex justify-center items-center;
}
</style>