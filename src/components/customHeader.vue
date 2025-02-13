<script setup lang="ts">
import { useStatusBarStore } from '@/store/statusBar.ts'
import { storeToRefs } from 'pinia'

defineProps<{
    title: string
    color?: string
}>()

const { menuButton, barHeight } = storeToRefs(useStatusBarStore())
const { windowWidth } = uni.getWindowInfo()

const canBack = computed(() => getCurrentPages().length > 1)

function back() {
    canBack.value ? uni.navigateBack() : uni.switchTab({ url: '/pages/home/index' })
}
</script>

<template>
    <view class="fixed top-0 left-0 w-full flex items-end z-100" :style="{ height: `${barHeight}px` }">
        <view class="relative w-full" :style="{
        height: `${menuButton?.height}px`,
        lineHeight: `${menuButton?.height}px`,
    }">
            <button class="absolute top-0 hfull text-base bg-transparent flex items-center gap1" :style="{
        left: `${windowWidth - menuButton?.right}px`,
        lineHeight: `${menuButton?.height}px`,
        color,
    }">
                <slot name="left">
                </slot>
            </button>
            <view class="wfull hfull text-center font800 text-xl"
                :style="{ lineHeight: `${menuButton?.height}px`, color }">
                <slot name="middle">
                </slot>
            </view>
        </view>
    </view>
</template>
