<route lang="json5">
    {
      style: {
        navigationBarTitleText: '商品详情',
        navigationStyle:'custom',
        enableShareAppMessage: true,
   		 enableShareTimeline: true
      },
    }
    </route>
<template>
    <div class="flex flex-col justify-start items-center">
        <div>
            <CustomHeader :showButton="true" color="#fff"></CustomHeader>
        </div>
        <div class="w-full h-417rpx relative">
            <div class="w-full h-full relative z-1 flex justify-between items-end">
                <div class="w-686rpx flex justify-between items-center mb-88rpx mx-auto">
                    <div class="w-230rpx">
                        <image :src="productDetailsInfo.product_recommend_tag.product_recommend_tag_image"
                            mode="widthFix" />
                    </div>
                    <div class="w-392rpx overflow-x-scroll flex items-center relative">
                        <!-- 左侧内阴影 -->
                        <div
                            class="absolute left-0 top-0 h-full w-20rpx pointer-events-none bg-gradient-to-r from-[rgba(0,0,0,0.1)] to-transparent z-1">
                        </div>

                        <!-- 图片循环 -->
                        <div v-for="(item, index) in productDetailsInfo.recommend_products" :key="index"
                            @click="toRecommendProduct(item)"
                            :class="[index !== productDetailsInfo.recommend_products.length - 1 ? 'mr-16rpx' : '']"
                            class="rounded-14rpx overflow-hidden w-120rpx h-120rpx flex-shrink-0">
                            <image :src="item.product_image" mode="widthFix" />
                        </div>
                    </div>

                </div>
            </div>
            <div class="w-full h-417rpx absolute inset-0">
                <img src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250216/XOVNAdbasMWkDtVDpHMwoA9YubP94EMIUB9kPVaa.png"
                    alt="">
            </div>
        </div>
        <div class="w-full flex flex-col items-center -mt-60rpx relative z-1 h-auto">
            <div class="w-686rpx  h-686rpx rounded-24rpx overflow-hidden bg-white mb-28rpx">
                <swiper class="w-686rpx  h-686rpx" :indicator-dots="true" indicator-color="rgba(255, 255, 255, 0.5)"
                    indicator-active-color="#ffffff">
                    <swiper-item v-for="(item, index) in productImages" :key="index"
                        class="flex justify-center items-center">
                        <view class="w-686rpx  h-686rpx" :class="'swiper-item' + index">
                            <image :src="item" mode="aspectFill" class="w-full h-full" />
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
            <div class="w-686rpx text-#595959 text-28rpx mb-24rpx">
                {{ productDetailsInfo.intro }}
            </div>
            <div class="w-686rpx">
                <div class="w-686rpx pt-28rpx">
                    <div class="text-slate-9 text-28rpx font-medium mb-16rpx">规格</div>
                </div>
                <div class="w-full flex justify-start items-center">
                    <div class="flex justify-center items-center min-w-92rpx min-h-58rpx px-10rpx rounded-16rpx text-24rpx font-medium flex-wrap mb-28rpx"
                        @click="handleSKUItem(item)" v-for="(item, index) in productDetailsInfo.items" :key="index"
                        :class="[selectSKU == item.id ? 'bg-#FCE16A text-#222' : 'bg-#F7F7F7 text-#595959',
            { 'ml-24rpx': index !== 0 }]">
                        {{ item.name }}
                    </div>
                </div>
            </div>
            <!-- <view class="w-full pb-300rpx">
                <view class="w-full" v-for="(item, index) in productDetailsInfo.detail_pictures" :key="index">
                    <image :src="item" mode="widthFix" class="w-full" />
                </view>
            </view> -->
            <div class="w-full pb-300rpx" v-html="productDetailsInfo.product_detail" />
        </div>
        <div @click="handleCart"
            class="fixed z-100 bottom-516rpx right-0 flex justify-center items-center rounded-l-full w-112rpx h-64rpx bg-#F159121A transition-transform duration-300"
            :style="{
                border: '1px solid #F15912',
                borderRight: 'none',
                transform: isCollapsed ? 'translateX(100%)' : 'translateX(0)',
            }">
            <wd-icon name="cart" size="22px" color="#F15912"></wd-icon>
        </div>
        <div class="fixed bottom-0 left-0 w-full flex flex-col items-center justify-start pb-92rpx z-2 bg-white">
            <div class="w-full flex justify-center items-center bg-gradient-to-r to-#FEE8C3  from-#FED9C3 text-#F54940 text-24rpx h-57rpx"
                v-if="productDetailsInfo.group_end_at && productDetailsInfo.is_group">
                <div class="w-686rpx ">
                    截至 {{ formatTimestamp(productDetailsInfo.group_end_at) }}
                </div>
            </div>
            <div class="w-full flex justify-center items-center h-96rpx">
                <div class="w-686rpx flex justify-between items-center">
                    <div class="text-48rpx text-slate-9 font-bold">￥{{ productDetailsInfo.product_unit_price_min }}
                    </div>
                    <div>
                        <wd-input-number v-model="productQuantity" @change="handleChange" :min="1"
                            :max="productDetailsInfo.stock" />
                    </div>
                </div>

            </div>
            <div class="w-full flex justify-center items-center pt-20rpx " style="border-top:1px solid #f3f4f6;">
                <div class="w-686rpx flex justify-between items-center">
                    <div class=" w-full bg-#222 text-#FCE068 operating-button" @click="handleAddCart">加入购物车</div>
                    <!-- <div class=" bg-#FD7420 text-white operating-button" @click="handleBuyNow">
                        立即购买</div> -->

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
import CustomHeader from '@/components/customHeader'
import { ref, onMounted, onUnmounted } from 'vue';
let productId = ref(0)
let productDetailsInfo = ref({})
let selectSKU = ref() //选择的sku
let productQuantity = ref(1) //要购买的商品数量
let pollingTimer = null; //订单轮询定时器
let showCheckoutCounter = ref(false) //显示隐藏收银台
let selectPickMethod = ref(0)
let pickUpSite = ref('')
let addressItems = ref([])
let addressInfo = ref({})
let productImages = ref({}) //轮播图照片
// 控制元素是否收起
const isCollapsed = ref(false);

let tags = ref([
    { title: '上新', tagStyle: 'bg-orange-5 text-white' },
    { title: '猫猫', tagStyle: 'bg-amber-1 text-amber-4' },
    { title: '毛绒', tagStyle: 'bg-sky-1 text-sky-4' }
])
//跳转推荐商品
const toRecommendProduct = (item) => {
    uni.redirectTo({ url: `/pages/home/product_details?productId=${item.item_id}` })
}
// 防抖函数
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
//点击购物车
const handleCart = () => {
    uni.navigateTo({
        url: '/pages/cart/index'
    })
}
// 处理滚动事件
const handleScroll = debounce(() => {
    console.log(isCollapsed.value)
    isCollapsed.value = true; // 滑动时收起
    setTimeout(() => {
        isCollapsed.value = false; // 停止滑动后展开
    }, 1000); // 200ms 后展开
}, 10); // 防抖时间 100ms
const handleSelectAddress = (selectPickMethodChild) => { //点击收银台的选择地址
    selectPickMethod.value = selectPickMethodChild
    console.log('取货方式', selectPickMethod.value)
    if (selectPickMethod.value === 0) return
    uni.navigateTo({
        url: `/pages/home/${addressItems.value.length !== 0 ? 'address_list' : 'store_address'}?operating=select`
    })
}
const onShareAppMessage = () => {
    return {
        title: "喵博士 X 汪博士",
        query: '/pages/home/product_details?productId=' + productId.value,
        summary: `${productDetailsInfo.value.title}`,
        imageUrl: `${productDetailsInfo.value.pictures[0]}`,
        // imageUrl: '/static/share_image.png' // 分享图片的路径（注意：某些平台可能不支持）
    };
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

const handleConfirmOrder = async (selectPickMethodChild) => { //点击收银台确认订单按钮
    console.log(selectPickMethodChild)
    selectPickMethod.value = selectPickMethodChild
    if (selectPickMethod.value === 1 && !addressInfo.value) {
        showToast({
            title: '请选择地址',
            icon: 'none'
        })
    }
    try {
        handleClose()
        uni.showLoading({
            title: '加载中'
        })
        let result = await checkoutOrder({ item_id: selectSKU.value, quantity: productQuantity.value })
        let params = {}
        if (selectPickMethod.value === 0) {
            params = {
                item_id: selectSKU.value,
                quantity: productQuantity.value,
                dispatch_mode: productDetailsInfo.value.is_activity ? 2 : selectPickMethod.value
            }
        } else {
            params = {
                item_id: selectSKU.value,
                quantity: productQuantity.value,
                dispatch_mode: productDetailsInfo.value.is_activity ? 2 : selectPickMethod.value,
                contact_name: addressInfo.value.name || null,
                contact_phone: addressInfo.value.phone || null,
                address_id: addressInfo.value.id || null
            }
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
                    title: '创建订单...'
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
                }, 7000);
            }
        } catch (err) {
            console.log(err)
            uni.hideLoading()
        }
    } catch (err) {
        uni.hideLoading()
        uni.showToast({
            title: '请求超时，请重试',
            icon: 'none'
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
        let params = { item_id: productId.value, cart_quantity: productQuantity.value }
        console.log(params)
        let result = await addCard(params)
        console.log('添加购物车', result)
        uni.hideLoading();
        if (result.code !== 200) {
            uni.showToast({
                title: '添加购物车失败，请重试',
                icon: 'none'
            })
        } else {
            uni.showToast({
                title: '已加入购物车~',
                icon: 'none'
            });
        }
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
    productDetailsInfo.value['product_unit_price_min'] = item.price
    selectSKU.value = item.id
}
const getProductDetails = async () => { //商品详情
    try {
        uni.showLoading({
            title: '加载中'
        });
        let result = await productDetails({ item_id: productId.value })

        console.log('商品详情', result)
        productDetailsInfo.value = result.data
        //处理商品轮播图数组
        const sanitizedString = result.data.product_spec
            .replace(/^"(.*)"$/, '$1')  // 移除首尾双引号
            .replace(/\\"/g, '"');      // 处理转义双引号（如果有）

        // 2️⃣ 解析为数组
        try {
            const specArray = JSON.parse(sanitizedString);

            // ✅ 验证结果
            console.log(Array.isArray(specArray)); // true
            console.log(specArray[0].item);
            productDetailsInfo.value.items = specArray[0].item
            console.log(productDetailsInfo.value.items)
            selectSKU.value = specArray[0].item[0].id
        } catch (e) {
            console.error("解析失败:", e);
        }
        const imageArray = result.data.image.item_image_other
            ? result.data.image.item_image_other
                .split(',')                // 按逗号分割
                .map(url => url.trim())     // 去除每个元素两端的空格
                .filter(url => url !== '') // 过滤空字符串
            : [];                          // 空值保护
        productImages.value = imageArray
        console.log(productImages.value)
        uni.hideLoading();
    } catch (err) {
        console.log(err)
        uni.hideLoading();
    }
}
onLoad((options) => {
    productId.value = options.productId || 8
    console.log(productId.value)
})
onShow(() => {
    getProductDetails()
    // getSystemConfig()
    // getAddressItems()
})
onPageScroll(() => {
    handleScroll()
})
</script>

<style lang="scss" scoped>
.operating-button {
    @apply h-88rpx text-28rpx font-medium rounded-16rpx flex justify-center items-center;
}
</style>
<style>
/* 覆盖默认指示点样式 */
.wx-swiper-dot {
    width: 10rpx;
    height: 10rpx;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
}

.wx-swiper-dot-active {
    width: 20rpx;
    height: 10rpx;
    background-color: #ffffff;
    border-radius: 5rpx;
}

img {
    max-width: 100% !important;
    object-fit: contain !important;
    border: 1px solid red;
}
</style>