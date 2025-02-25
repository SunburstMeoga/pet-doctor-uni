<template>
    <div class="w-640rpx h-220rpx flex justify-start items-center pr-10rpx">
        <div class="w-40rpx h-40rpx rounded-full flex justify-center items-center" @click="handleSelect"
            :class="isSelect ? 'bg-#FCE16A' : 'bg-zinc-3'">
            <div class="icon iconfont icon-right text-30rpx"
                :class="isSelect ? 'text-#222222 font-bold' : 'text-zinc-5'"></div>
        </div>
        <div class="ml-10rpx w-240rpx h-240rpx rounded-16rpx overflow-hidden">
            <img class="" :src="`${picture}`" alt="">
        </div>
        <div
            class="flex justify-between text-#222 items-start flex-col w-322rpx ml-24rpx h-220rpx line-clamp-2 overflow-hidden text-ellipsis break-words">
            <div class="text-28rpx">{{ title }}</div>
            <div
                class="bg-#F7F7F7 text-#595959A6 w-full rounded-16rpx  flex justify-between items-center text-24rpx h-57rpx">
                <div class="ml-24rpx">{{ items }}</div>
                <!-- <div class="icon iconfont icon-down text-16rpx mr-24rpx"></div> -->
            </div>
            <div class="w-full flex justify-between items-center">
                <div class="h-37rpx flex justify-start items-start">
                    <div class="font-medium text-24rpx transform translate-y-2rpx">￥</div>
                    <div class="font-bold text-32rpx ml-4rpx">{{ price }}</div>
                </div>
                <div>
                    <!-- <wd-input-number :modelValue="productQuantity" :min="1" :max="1000" @change="changeQuantity" /> -->
                    X {{ productQuantity }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['handleSelect', 'changeQuantity'])
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
        type: String,
        default: ''
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
// const skuItems = computed(() => {
//     return props.items.map(item => item.sku_title).join(';');
// })
const changeQuantity = (e) => { //改变数量
    emit('changeQuantity', e)
}

</script>

<style lang="scss" scoped></style>