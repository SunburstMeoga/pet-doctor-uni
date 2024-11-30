<template>
    <div class="w-full h-176rpx flex justify-between items-center">
        <div class="flex justify-start items-center">
            <div class="flex justify-center items-center w-120rpx h-120rpx rounded-14rpx overflow-hidden">
                <img :src="productInfo.product_picture" alt="">
            </div>
            <div class="ml-24rpx w-340rpx h-120rpx flex flex-col justify-between items-start">
                <div class="text-slate-8 text-28rpx">
                    {{ productInfo.product_title }}
                </div>
                <div class="text-zinc4 text-24rpx">{{ productInfo.sku_name }}</div>
            </div>
        </div>
        <div class="h-120rpx flex flex-col justify-between items-end">
            <div class="text-slate-8 text-32rpx font-bold">
                ￥{{ productInfo.price * 0.01 }}
            </div>
            <div class="text-zinc4 text-24rpx">X{{ productInfo.quantity }}</div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    productInfo: {
        type: Object,
        default: () => { }
    }
})
</script>

<style lang="scss" scoped></style>