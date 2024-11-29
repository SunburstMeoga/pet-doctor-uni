<route lang="json5" type="home">
    {
      style: {
        navigationBarTitleText: '收货地址',
      },
    }
    </route>
<template>
    <div class="w-full flex justify-start items-center flex-col h-screen bg-zinc-1 pb-300rpx pt-40rpx">
        <div class="flex w-686rpx justify-center items-center rounded-24rpx bg-white overflow-hidden py-32rpx mb-32rpx"
            v-for="(item, index) in 5" :key="index">
            <AddressCard />
        </div>
    </div>
</template>

<script setup>
import AddressCard from '@/components/addressCard'

</script>

<style lang="scss" scoped></style>