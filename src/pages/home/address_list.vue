<route lang="json5">
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
        <div class="w-full fixed bottom-0 flex justify-center items-start pb-112rpx bg-white pt-20rpx">
            <div @click="handleAddAddress"
                class="w-486rpx h-92rpx rounded-24rpx bg-slate-9 text-amber-3 flex justify-center items-center text-32rpx font-medium">
                新增收货地址</div>
        </div>
    </div>
</template>

<script setup>
import AddressCard from '@/components/addressCard'
import { addresses } from '@/service/index'
let addressItems = ref([])
const handleAddAddress = async () => {
    uni.navigateTo({
        url: '/pages/index/store_address'
    });
}
const getAddressItems = async () => { //获取地址列表
    try {
        uni.showLoading({
            title: '加载中'
        });
        let result = await addresses()
        addressItems.value = result.data
        console.log(result)
        uni.hideLoading()
    } catch (err) {
        console.log(err)
        uni.hideLoading();

    }
}
onLoad(() => {
    getAddressItems()
})
</script>

<style lang="scss" scoped></style>