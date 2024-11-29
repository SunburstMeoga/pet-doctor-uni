<template>
    <div class="w-630rpx">
        <div class="text-slate9 font-medium text-32rpx flex justify-start items-center mb-15rpx">
            <div class="">泡泡龙 1599982059</div>
            <div v-show="isDefaultAddress" class="rounded-4rpx text-24rpx px-2rpx py-1prx text-sky-4 ml-16rpx"
                style="border: 1px solid #38bdf8;"> 默认 </div>
        </div>
        <div class="text-28rpx text-zinc-5 mb-15rpx">广东省深圳市南山区西丽镇</div>
        <div class="flex justify-between items-center">
            <div class="flex justify-start items-center">
                <div class="w-28rpx h-28rpx rounded-4rpx flex justify-center items-center "
                    :class="`${isDefaultAddress ? 'bg-slate9' : ''}`">
                    <div class="icon iconfont icon-right text-30rpx text-white"></div>
                </div>
                <div class="text-zinc4 text-28rpx ml-16rpx">设为默认</div>
            </div>
            <div class="flex justify-end items-center">
                <div class="bg-zinc2 text-zinc rounded-4rpx text-24rpx px-4rpx">删除</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isDefaultAddress: {
        type: Boolean,
        default: true
    }
})
</script>

<style lang="scss" scoped></style>