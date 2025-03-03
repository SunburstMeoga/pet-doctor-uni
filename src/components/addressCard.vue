<template>
    <div class="w-630rpx">
        <div class="text-slate9 font-medium text-32rpx flex justify-start items-center mb-15rpx">
            <div class="">{{ addressInfo.ud_name }} {{ addressInfo.phone }}</div>
            <div v-show="addressInfo.ud_is_default" class="rounded-4rpx text-24rpx px-2rpx text-sky-4 ml-16rpx"
                style="border: 1px solid #38bdf8;"> 默认 </div>
        </div>
        <div class="text-28rpx text-zinc-5 mb-15rpx">{{ addressInfo.ud_address }}</div>
        <div class="flex justify-between items-center">
            <div class="flex justify-start items-center" @tap.stop="handleSetDefault">
                <!-- <div class="w-28rpx h-28rpx rounded-4rpx flex justify-center items-center "
                    style="border: 1px solid #000;" :class="`${addressInfo.ud_is_default ? 'bg-slate9' : ''}`">
                    <div class="icon iconfont icon-right text-24rpx text-white"></div>
                </div> -->
                <div class="text-zinc4 text-28rpx">常用地址</div>
            </div>
            <div class="flex justify-end items-center">
                <div class="bg-zinc2 text-zinc rounded-6rpx text-24rpx px-6rpx" @tap.stop="handleDelete">删除</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits()
const props = defineProps({
    isDefaultAddress: {
        type: Boolean,
        default: true
    },
    addressInfo: {
        type: Object,
        default: () => { }
    }
})
const handleSetDefault = () => {
    emit('setDefault')
}
const handleDelete = () => {
    emit('delete')
}
</script>

<style lang="scss" scoped></style>