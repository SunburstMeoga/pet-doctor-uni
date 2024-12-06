<template>
    <div class="flex justify-between items-center w-533rpx">
        <div class="flex w-220rpx h-220rpx justify-center items-center rounded-16rpx overflow-hidden">
            <img :src="img" alt="" mode="aspectFit">
        </div>
        <div class="flex flex-col w-289rpx h-220rpx items-start justify-start ml-24rpx relative">
            <div class="text-zinc-7 text-32rpx w-full font-bold">
                {{ title }}
            </div>
            <div class="text-zinc-5 w-full text-24rpx">
                {{ details }}
            </div>
            <div class="flex justify-start  items-center w-full" v-if="tags.length !== 0">
                <div class="" v-for="(item, index) in tags" :key="index">
                    {{ item }}
                </div>
            </div>
            <div class="absolute bottom-0 right-0 flex justify-between items-center w-full">
                <div class="text-slate-9 font-bold text-32rpx">
                    {{ price }}
                </div>
                <div
                    class="bg-gradient-to-r to-#FCE16A  from-#F15912 rounded-16rpx text-white font-medium text-24rpx w-137rpx h-57rpx flex justify-center items-center">
                    选规格</div>
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