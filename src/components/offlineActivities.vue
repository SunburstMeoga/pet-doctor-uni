<template>
    <view class="w-full h-full">
        <div class="w-full h-320rpx relative rounded-24rpx overflow-hidden">
            <div class="w-full h-full">
                <image :src="picture" mode="aspectFit" />
            </div>
            <div
                class="absolute flex pl-28rpx justify-start items-center w-full h-53rpx bottom-0 w-full bg-[linear-gradient(90deg,_rgba(254,217,195,1)_0%,_rgba(254,227,195,0.5704656862745099)_50%,_rgba(254,232,195,1)_100%)] h-53rpx text-#F54940  text-24rpx">
                报名截至 {{ endTime }}
            </div>
        </div>
        <div class="w-full py-28rpx pb flex justify-center items-center ">
            <div class="w-630rpx">
                <div class="text-32rpx mb-13rpx">
                    {{ title }}
                </div>
                <div class="flex justify-start items-center mb-13rpx">
                    <div class="w-32rpx h-32rpx">
                        <image
                            src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250219/AqJmD9RKVekSqlDxSc2cqRev0IocoT8oPVHly4cX.png"
                            mode="aspectFit" />
                    </div>
                    <div class="text-#8c8c8c text-24rpx ml-12rpx">{{ activeTime }}</div>
                </div>
                <div class="flex justify-start items-center mb-13rpx">
                    <div class="w-32rpx h-32rpx">
                        <image
                            src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250219/UQvZuxLI8WycvKWvxBXufG4BLbGSsBoXPKQHSspS.png"
                            mode="aspectFit" />
                    </div>
                    <div class="text-#8c8c8c text-24rpx ml-12rpx">{{ activeAddress }}</div>
                </div>
                <div class="flex justify-between items-center w-full h-57rpx">
                    <div class="h-37rpx flex justify-start items-start">
                        <div class="font-medium text-24rpx transform translate-y-2rpx">￥</div>
                        <div class="font-bold text-32rpx ml-4rpx">{{ price }}</div>
                    </div>
                    <div class="flex rounded-12rpx overflow-hidden">
                        <div
                            class="font-medium w-144rpx text-24rpx text-#fff  flex justify-center items-center bg-gradient-to-r to-#FCE16A  from-#F15912 h-57rpx">
                            立即报名</div>
                    </div>
                </div>
            </div>
        </div>

    </view>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    endTime: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: ''
    },
    activeTime: {
        type: String,
        default: ''
    },
    activeAddress: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    }
})
</script>

<style lang="scss" scoped>
//</style>
