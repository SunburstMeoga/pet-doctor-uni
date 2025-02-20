<template>
    <div class="flex justify-between items-center w-533rpx">
        <div class="flex w-220rpx h-220rpx justify-center items-center rounded-16rpx overflow-hidden">
            <img :src="img" alt="" mode="aspectFit">
        </div>
        <div class="flex flex-col w-289rpx h-220rpx items-start justify-start ml-24rpx relative">
            <div class="text-#222 text-26rpx w-full line-clamp-2 overflow-hidden text-ellipsis break-words">
                {{ title }}
            </div>
            <div class="text-#595959 w-full text-24rpx line-clamp-1 overflow-hidden text-ellipsis break-words">
                {{ details }}
            </div>
            <div class="flex justify-start  items-center w-full" v-if="tags.length !== 0">
                <div class="" v-for="(item, index) in tags" :key="index">
                    {{ item }}
                </div>
            </div>
            <div class="absolute bottom-0 right-0 flex justify-between items-center w-full">
                <div class="h-37rpx flex justify-start items-start">
                    <div class="font-medium text-24rpx transform translate-y-2rpx">￥</div>
                    <div class="font-bold text-32rpx ml-4rpx">{{ Number(price).toFixed(2) }}</div>
                </div>
                <div class="bg-#F36D1F rounded-full w-64rpx h-42rpx flex justify-center items-center">
                    <wd-icon name="add" size="24rpx" color="#fff"></wd-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { stringify } from 'querystring';

const props = defineProps({
    img: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    details: {
        type: String,
        default: ''
    },
    tags: {
        type: Array,
        default: () => []
    },
    price: {
        type: Number,
        default: 0
    }
})

</script>

<style lang="scss" scoped></style>