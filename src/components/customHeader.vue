<script setup lang="ts">
import { useStatusBarStore } from '@/store/statusBar.ts'
import { storeToRefs } from 'pinia'
withDefaults(defineProps<{
    title: string;
    color?: string;
    showButton?: boolean;
}>(), {
    showButton: false, // 默认不显示按钮
});
const { menuButton, barHeight } = storeToRefs(useStatusBarStore())
const { windowWidth } = uni.getWindowInfo()

const canBack = computed(() => getCurrentPages().length > 1)

function back() {
    console.log('点击了回退按钮')
    canBack.value ? uni.navigateBack() : uni.switchTab({ url: '/pages/home/index' })
}
</script>

<template>
    <view class="fixed top-0 left-0 w-full flex items-end z-90" :style="{ height: `${barHeight}px` }">
        <view class="relative w-full" :style="{

        height: `${menuButton?.height}px`,
        lineHeight: `${menuButton?.height}px`,
    }">
            <button class="absolute top-0 hfull text-base bg-transparent flex items-center justify-start gap1 z-90"
                v-if="showButton" :style="{
        left: `${windowWidth - menuButton?.right}px`,
        lineHeight: `${menuButton?.height}px`,
        color,
    }" @click="back">
                <wd-icon name="thin-arrow-left" size="16px" :style="{ color }"></wd-icon>
            </button>
            <view class="absolute top-0 h-full text-base bg-transparent flex items-center gap1" :style="{
        left: `${windowWidth - menuButton?.right + showButton ? 40 : 0}px`,
        lineHeight: `${menuButton?.height}px`,
        color,
    }">
                <slot name="left">
                </slot>
            </view>
            <view class="wfull hfull text-center font800 text-xl"
                :style="{ lineHeight: `${menuButton?.height}px`, color }">
                <slot name="middle">
                </slot>
            </view>
        </view>
    </view>
</template>
