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
            v-for="(item, index) in addressItems" :key="index" @click="handleAddress(item)">
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
let operating = ref('') //点击当前地址项时要进行的操作，操作类型从上一页面传递过来，可能为null，null则点击地址项时不进行任何操作
const handleStoreAddress = async () => {
    uni.navigateTo({
        url: '/pages/home/store_address'
    });
}
const handleAddress = (item) => {
    if (operating.value === 'select') {
        // console.log('点击地址项目', id)
        uni.setStorageSync('createOrderAddress', item)
        uni.navigateBack({
            delta: 1
        });

    } else {
        console.log('我操作')
    }

}
const handleDelete = async ({ ud_id }) => { //点击删除地址
    try {
        uni.showLoading({
            title: '加载中'
        })
        let res = await deleteAddress({ ud_id: ud_id })
        if (res.code !== 0) {
            uni.showToast({
                title: res.message,
                icon: 'none'
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

    // try {
    //     uni.showLoading({
    //         title: '加载中'
    //     })
    //     let res = await setDefaultAddress(id)
    //     if (res.code !== 0) {
    //         uni.showToast({
    //             title: res.message,
    //             icon: 'none'
    //         });
    //         return
    //     }
    //     getAddressItems()
    // } catch (err) {
    //     console.log(err)
    //     uni.hideLoading()
    // }
}
const getAddressItems = async () => { //获取地址列表
    try {
        uni.showLoading({
            title: '加载中'
        });
        let result = await addresses()
        addressItems.value = result.data.items
        console.log(result)
        uni.hideLoading()
    } catch (err) {
        console.log(err)
        uni.hideLoading();

    }
}
onLoad((options) => {
    if (options && options.operating) {
        operating.value = options.operating
    }
})
onShow(() => {
    getAddressItems()
})
</script>

<style lang="scss" scoped></style>