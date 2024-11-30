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
            v-for="(item, index) in addressItems" :key="index">
            <AddressCard :addressInfo="item" @setDefault="handleSetDefault(item)" @delete="handleDelete(item)" />
        </div>
        <div class="w-full fixed bottom-0 flex justify-center items-start pb-112rpx bg-white pt-20rpx">
            <div @click="handleStoreAddress"
                class="w-486rpx h-92rpx rounded-24rpx bg-slate-9 text-amber-3 flex justify-center items-center text-32rpx font-medium">
                新增收货地址</div>
        </div>
    </div>
</template>

<script setup>
import AddressCard from '@/components/addressCard'
import { addresses, deleteAddress, setDefaultAddress } from '@/service/index'
let addressItems = ref([])
const handleStoreAddress = async () => {
    uni.navigateTo({
        url: '/pages/home/store_address'
    });
}
const handleDelete = async ({ id }) => { //点击删除地址
    try {
        uni.showLoading({
            title: '加载中'
        })
        let res = await deleteAddress(id)
        if (res.code !== 0) {
            uni.showToast({
                title: res.message
            });
            return
        }
        getAddressItems()
    } catch (err) {
        console.log(err)
        uni.hideLoading()
    }
}
const handleSetDefault = async ({ id }) => { //点击设置默认
    try {
        uni.showLoading({
            title: '加载中'
        })
        let res = await setDefaultAddress(id)
        if (res.code !== 0) {
            uni.showToast({
                title: res.message
            });
            return
        }
        getAddressItems()
    } catch (err) {
        console.log(err)
        uni.hideLoading()
    }
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
onShow(() => {
    getAddressItems()
})
</script>

<style lang="scss" scoped></style>