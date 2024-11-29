<template>
    <div class="w-640rpx h-220rpx flex justify-start items-center pr-10rpx">
        <div class="w-40rpx h-40rpx rounded-full flex justify-center items-center" @click="handleSelect"
            :class="isSelect ? 'bg-yellow' : 'bg-zinc-3'">
            <div class="icon iconfont icon-right text-30rpx"
                :class="isSelect ? 'text-slate-9 font-bold' : 'text-zinc-5'"></div>
        </div>
        <div class="ml-10rpx w-240rpx h-240rpx ">
            <img class="rounded-16rpx overflow-hidden"
                :src="`http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/${picture}`" alt="">
        </div>
        <div class="flex justify-between items-start flex-col w-322rpx ml-24rpx h-220rpx">
            <div class="text-28rpx">{{ title }}</div>
            <div
                class="bg-zinc-1 text-zinc-4 w-full rounded-16rpx  flex justify-between items-center text-24rpx h-57rpx">
                <div class="ml-24rpx">{{ skuItems }}</div>
                <div class="icon iconfont icon-down text-16rpx mr-24rpx"></div>
            </div>
            <div class="w-full flex justify-between items-center">
                <div class="text-32rpx font-bold">￥{{ price * 0.01 }}</div>
                <div>
                    <wd-input-number :modelValue="productQuantity" :min="1" :max="1000" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['handleSelect'])
const props = defineProps({
    isSelect: {
        type: Boolean,
        default: false
    },
    productQuantity: {
        type: Number,
        default: 1
    },
    title: {
        type: String,
        default: ''
    },
    items: {
        type: Array,
        default: () => []
    },
    picture: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    }
})
const handleSelect = () => {
    emit('handleSelect')
}
const skuItems = computed(() => {
    return props.items.map(item => item.sku_title).join(';');
})

</script>

<style lang="scss" scoped></style>