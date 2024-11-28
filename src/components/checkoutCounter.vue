<template>
    <div>
        <wd-popup :modelValue="showCheckoutCounter" position="bottom" :safe-area-inset-bottom="true" lock-scroll
            custom-style="height: 1200rpx; background: #f4f4f5;" closable>
            <div class="w-full flex flex-col justify-start items-center">
                <div class="text-slate-9 font-medium text-32rpx mb-48rpx pt-40rpx">确认订单</div>
                <div class="w-686rpx flex justify-between items-center mb-28rpx">
                    <div @click="handleMethodItem" class="operating-button" v-for="(item, index) in pickMethodItems"
                        :key="index" :class="selectPickMethod === item.id ? 'bg-yellow-4' : 'bg-white'">
                        {{ item.title }}
                    </div>
                </div>
                <div class="w-686rpx flex justify-between items-center py-14rpx rounded-16rpx mb-48rpx text-gray-600"
                    style="border: 1px solid #e4e4e7;">
                    <div class="ml-20rpx">
                        <div class="flex justify-start items-center">
                            <div class="icon iconfont icon-Personal text-32rpx"></div>
                            <div class="flex justify-start items-center ml-4rpx">喵喵 134 3421 2345</div>
                        </div>
                    </div>
                    <div class="mr-20rpx">
                        <div class="icon iconfont icon-right_9  text-20rpx"></div>
                    </div>
                </div>
                <div class="w-686rpx flex justify-between items-start">
                    <div class="w-240rpx h-240rpx rounded-24rpx">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq62tK2kf5W7d7sKBKt4DeAwcD2Xn9IJRH4g&s"
                            alt="">
                    </div>
                    <div class="ml-28rpx">
                        <div class="text-slate-9 font-medium text-32rpx mb-12rpx">猫猫喜欢的玩具的标题溢出溢 出溢出</div>
                        <div class="text-zinc-6 text-28rpx ">这里商品的详情，这里商品的详情这里商品的详情</div>
                    </div>
                </div>
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
                <div class="w-full flex flex-col items-center justify-start">
                    <div class="w-full flex justify-center items-center">
                        <div class="w-686rpx flex justify-between items-center">
                            <div class="text-48rpx text-slate-9 font-bold">￥2323</div>
                            <div>
                                <wd-input-number v-model="productQuantity" @change="handleChange" :min="1" :max="10" />
                            </div>
                        </div>

                    </div>
                    <div class="w-full flex justify-center items-center pt-20rpx "
                        style="border-top:1px solid #f3f4f6;">
                        <div class="w-686rpx flex justify-between items-center">
                            <div
                                class=" bg-orange-4 text-white flex justify-center items-center rounded-16rpx w-full h-88rpx">
                                确认订单</div>
                        </div>
                    </div>
                </div>
            </div>
        </wd-popup>
    </div>
</template>

<script setup>
const emit = defineEmits(['handleConfirmOrder'])
const props = defineProps({
    showCheckoutCounter: {
        type: Boolean,
        default: false
    }
})
let selectSKU = ref(1) //选择的sku
let productQuantity = ref(1) //要购买的商品数量

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
    { title: '自提', id: 1 },
    { title: '快递', id: 2 }
])
let selectPickMethod = ref(1)
const handleMethodItem = (item) => {
    selectPickMethod.value = item.id
}
const handleConfirmOrder = () => { //点击确认订单
    emit('handleConfirmOrder')
}

</script>

<style lang="scss" scoped>
.operating-button {
    @apply w-329rpx h-93rpx flex justify-center items-center text-32rpx font-medium rounded-16rpx;
}
</style>