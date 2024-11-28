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
            <div class="w-686rpx flex justify-start items-center mb-24rpx">
                <div v-for="(item, index) in tags"
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
                    @click="handleSKUItem(item)" v-for="(item, index) in skuItems" :key="index"
                    :class="selectSKU === item.id ? 'bg-yellow-3 text-slate-9' : 'bg-zinc-2 text-slate-6'">
                    {{ item.title }}
                </div>
            </div>
            <div class="w-full flex justify-center items-center mb-20rpx bg-orange-3 text-red-5 text-24rpx h-57rpx">
                <div class="w-686rpx ">
                    截至2023/08/22 23:22
                </div>
            </div>
            <div class="w-full flex justify-center items-center">
                <div class="w-686rpx flex justify-between items-center">
                    <div class="text-48rpx text-slate-9 font-bold">￥2323</div>
                    <div>
                        <wd-input-number v-model="productQuantity" @change="handleChange" :min="1" :max="10" />
                    </div>
                </div>

            </div>
            <div class="w-full flex justify-center items-center pt-20rpx " style="border-top:1px solid #f3f4f6;">
                <div class="w-686rpx flex justify-between items-center">
                    <div class=" bg-black text-yellow operating-button">加入购物车</div>
                    <div class=" bg-orange-4 text-white operating-button" @click="handleBuyNow">立即购买</div>

                </div>

            </div>
        </div>
        <CheckoutCounter :showCheckoutCounter="showCheckoutCounter" />
    </div>
</template>

<script setup>
import CheckoutCounter from '@/components/checkoutCounter'
import { productDetails } from '@/service/index'
let productId = ref(0)
let productDetailsInfo = ref({})
let selectSKU = ref(1) //选择的sku
let productQuantity = ref(1) //要购买的商品数量

let showCheckoutCounter = ref(false) //显示隐藏收银台
let tags = ref([
    { title: '上新', tagStyle: 'bg-orange-5 text-white' },
    { title: '猫猫', tagStyle: 'bg-amber-1 text-amber-4' },
    { title: '毛绒', tagStyle: 'bg-sky-1 text-sky-4' }
])
const skuItems = ref([
    { title: 'XS', id: 1 },
    { title: 'S', id: 2 },
    { title: 'L', id: 3 },
    { title: 'XL', id: 4 },
    { title: 'XXL', id: 5 },
    { title: 'XXXL', id: 6 },
])
const handleBuyNow = () => { //点击立即购买
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

.operating-button {
    @apply w-329rpx h-88rpx text-28rpx font-medium rounded-16rpx flex justify-center items-center;
}
</style>