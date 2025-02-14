<template>
    <div>
        <wd-popup :modelValue="showCheckoutCounter" position="bottom" :safe-area-inset-bottom="true"
            custom-style="max-height: 1000rpx; background: #f4f4f5; overflow: scroll; border-radius: 24rpx 24rpx 0 0;"
            closable @close="handleClose">
            <div class="w-full flex flex-col justify-start items-center">
                <div class="text-#222 font-medium text-32rpx mb-48rpx pt-26rpx">确认订单
                </div>
                <div class="w-686rpx flex justify-between items-center mb-28rpx">
                    <div @click="handleMethodItem(item)" class="operating-button"
                        v-for="(item, index) in pickMethodItems" :key="index"
                        :class="selectPickMethod === item.id ? 'bg-#FCE16A text-#222 font-medium' : 'bg-white text-#595959'">
                        {{ item.title }}
                    </div>
                </div>
                <div class="w-686rpx flex justify-between items-center py-14rpx rounded-16rpx mb-48rpx text-#222"
                    style="border: 1px solid #e4e4e7;" @click="handleSelectAddress">
                    <div class="ml-20rpx">
                        <div class="flex justify-start items-center" v-show="selectPickMethod === 0">
                            <div class="icon iconfont icon-addresss text-32rpx"></div>
                            <div class="flex justify-start items-center ml-4rpx">{{ pickUpSite }}</div>
                        </div>
                        <div class v-if="selectPickMethod === 1 && !addressInfo.name">
                            请添加收货地址
                        </div>
                        <div class="flex justify-start items-center"
                            v-show="selectPickMethod === 1 && addressInfo.name">
                            <div class="icon iconfont icon-Personal text-32rpx"></div>
                            <div class="flex justify-start items-center ml-4rpx">{{ addressInfo.name }}
                                {{ addressInfo.phone }}</div>
                        </div>
                        <div class="flex justify-start items-center"
                            v-show="selectPickMethod === 1 && addressInfo.name">
                            <div class="icon iconfont icon-addresss text-28rpx"></div>
                            <div class="flex justify-start items-center ml-4rpx">{{ addressInfo.detail }}</div>
                        </div>
                    </div>
                    <div class="mr-20rpx" v-show="selectPickMethod === 1">
                        <div class="icon iconfont icon-right_9  text-20rpx"></div>
                    </div>
                </div>
                <div class="w-686rpx flex justify-between items-start">
                    <div class="w-240rpx h-240rpx rounded-24rpx overflow-hidden">
                        <img :src="productInfo.pictures[0]" alt="">
                    </div>
                    <div class="ml-28rpx w-416rpx flex flex-col justify-between items-end h-240rpx">
                        <div>
                            <div class="text-#222 font-medium text-32rpx mb-12rpx">{{ productInfo.title }}</div>
                            <div class="text-#595959 text-28rpx ">{{ productInfo.intro }}</div>
                        </div>
                        <div class="flex text-#222 text-28rpx  ">X{{ productQuantity }}</div>
                    </div>
                </div>
                <div class="w-686rpx pt-28rpx">
                    <div class="text-#222 text-28rpx font-medium mb-16rpx">规格</div>
                </div>
                <div class="w-full flex justify-start items-center">
                    <div class="flex justify-center items-center min-w-92rpx min-h-58rpx px-10rpx rounded-16rpx ml-32rpx text-24rpx font-medium flex-wrap mb-28rpx"
                        @click="handleSKUItem(item)" v-for="(item, index) in productInfo.items" :key="index"
                        :class="selectSKU === item.id ? 'bg-#FCE16A text-#222' : 'bg-#F7F7F7 text-#595959'">
                        {{ item.sku_title }}
                    </div>
                </div>
                <div class="w-full flex flex-col items-center justify-start bg-white"
                    style="border-top:1px solid #f3f4f6;">
                    <div class="w-full flex justify-center items-center h-96rpx">
                        <div class="w-686rpx flex justify-between items-center">
                            <div class="text-48rpx text-#222 font-bold">￥{{ (productInfo.price * productQuantity *
            0.01).toFixed(2) }}</div>
                            <!-- <div>
                                <wd-input-number @change="updateProductQuantity" :modelValue="productQuantity" :min="1"
                                    :max="productInfo.stock" />
                            </div> -->
                        </div>

                    </div>
                    <div class="w-full flex justify-center items-center pt-20rpx "
                        style="border-top:1px solid #f3f4f6;">
                        <div class="w-686rpx flex justify-between items-center">
                            <div @click="confirmOrder"
                                class=" bg-gradient-to-r to-#FCE16A  from-#F15912 text-white flex justify-center items-center rounded-16rpx w-full h-88rpx">
                                确认订单</div>
                        </div>
                    </div>
                </div>
            </div>
        </wd-popup>
    </div>
</template>

<script setup>
const emit = defineEmits(['confirmOrder', 'handleClose', 'update:childInput', 'selectAddress'])
const props = defineProps({
    showCheckoutCounter: {
        type: Boolean,
        default: false
    },
    productInfo: {
        type: Object,
        default: () => { }
    },
    productQuantity: {
        type: Number,
        default: 1
    },
    pickUpSite: {
        type: String,
        default: ''
    },
    addressInfo: {
        type: String,
        default: ''
    }
})
let selectSKU = computed(() => {
    return props.productInfo.items[0].id
}) //选择的sku
// let productQuantity = ref(1) //要购买的商品数量
let selectPickMethod = ref(0)
const skuItems = ref([
    { title: 'XS', id: 1 },
    { title: 'S', id: 2 },
    { title: 'L', id: 3 },
    { title: 'XL', id: 4 },
    { title: 'XXL', id: 5 },
    { title: 'XXXL', id: 6 },
])
const handleSKUItem = (item) => {
    selectSKU.value = item.id
}
const pickMethodItems = ref([
    { title: '自提', id: 0 },
    { title: '快递', id: 1 }
])

const handleMethodItem = (item) => {
    console.log('子组件', item.id)
    selectPickMethod.value = item.id
}

const handleClose = () => { //关闭按钮
    emit('handleClose')
}
const updateProductQuantity = (e) => { //更新收银台的商品数量到商详
    emit('update:childInput', e);
}
const confirmOrder = () => { //点击确认订单
    console.log(selectPickMethod.value)
    emit('confirmOrder', selectPickMethod.value)
}
const handleSelectAddress = () => { //点击选择地址
    emit('selectAddress', selectPickMethod.value)
}

</script>

<style lang="scss" scoped>
.operating-button {
    @apply w-329rpx h-93rpx flex justify-center items-center text-32rpx font-medium rounded-16rpx;
}
</style>