<route lang="json5">
    {
      style: {
        navigationBarTitleText: '新增收货地址',
      },
    }
    </route>
<template>
    <div class="w-full h-screen flex flex-col justify-start items-center bg-gray-1 pt-32rpx pb-500rpx">
        <div class="w-686rpx">
            <div class="module">
                <div class="info-item text-zinc-4" style="border-bottom: 1px solid #f8fafc;">
                    <div class="w-140rpx ml-32rpx">收货人</div>
                    <div class="flex-1">
                        <input type="text" class="w-full h-40rpx text-slate9" v-model="name" placeholder="请填写收货人姓名">
                    </div>
                </div>
                <div class="info-item text-zinc-4">
                    <div class="w-140rpx ml-32rpx">手机号</div>
                    <div class="flex-1">
                        <input type="text" class="w-full h-40rpx text-slate9" v-model="phone" placeholder="请填写收货人手机号">
                    </div>
                </div>
            </div>
            <div class="module">
                <div class="info-item text-zinc-4" style="border-bottom: 1px solid #f8fafc;">
                    <div class="w-140rpx ml-32rpx">所在地区</div>
                    <wd-col-picker :use-default-slot="true" :modelValue="areaValue" :columns="area"
                        :column-change="columnChange" @confirm="handleConfirmArea">
                        <div class="flex-1">
                            <!-- <input type="text" class="w-full h-40rpx" disabled v-model="" placeholder="省、市、区"> -->
                            <div class="w-full h-40rpx flex justify-start items-center">
                                <div class="text-slate9" v-for="(item, index) in selectArea" :key="index">
                                    {{ item.label }}
                                </div>
                            </div>
                        </div>
                    </wd-col-picker>
                    <!-- <div class="flex-1">
                        <input type="text" class="w-full h-40rpx" disabled placeholder="省、市、区">
                    </div> -->
                </div>
                <div class="info-item text-zinc-4">
                    <div class="w-140rpx ml-32rpx">详细地址</div>
                    <div class="flex-1 mr-32rpx">
                        <input type="text" class="w-full h-40rpx text-slate9" v-model="detail" placeholder="请填写详细收货地址">
                    </div>
                </div>
            </div>
            <div class="module" @click="handleSetDefault">
                <div class="flex justify-between items-center w-full">
                    <div class="flex flex-col justify-center items-start h-138rpx ml-32rpx">
                        <div class="text-zinc5 text-28rpx mb-8rpx">设为默认地址</div>
                        <div class="text-zinc4 text-24rpx">下单时优先使用该地址</div>
                    </div>
                    <div class="mr-32rpx flex justify-center items-center rounded-full w-32rpx h-32rpx"
                        :class="`${isDefault ? 'bg-black' : 'bg-white'}`" style="border:1px solid #000;">
                        <div class="icon iconfont icon-right text-24rpx text-white"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full fixed bottom-0 flex justify-center items-start pb-112rpx bg-white pt-20rpx">
            <div @click="handleConfirm"
                class="w-486rpx h-92rpx rounded-24rpx bg-slate-9 text-amber-3 flex justify-center items-center text-32rpx font-medium">
                确认</div>
        </div>
    </div>
</template>

<script setup>
import { storeAddress } from '@/service/index'
import { useColPickerData } from '@/hooks/useColPickerData'
const { colPickerData, findChildrenByCode } = useColPickerData()
let isDefault = ref(false)
let name = ref('')
let phone = ref('')
let operating = ref('') //点击当前地址项时要进行的操作，操作类型从上一页面传递过来，可能为null，null则点击地址项时不进行任何操作

let selectArea = ref([{ label: '省、', value: '' }, { label: '市、', value: '' }, { label: '区', value: '' }])
let area = ref([
    colPickerData.map((item) => {
        return {
            value: item.value,
            label: item.text
        }
    })
])
let detail = ref('')
let areaValue = ref([
    colPickerData.map((item) => {
        return {
            value: item.value,
            label: item.text
        }
    })
])

const columnChange = ({ selectedItem, resolve, finish }) => {
    const areaData = findChildrenByCode(colPickerData, selectedItem.value)
    if (areaData && areaData.length) {
        resolve(
            areaData.map((item) => {
                return {
                    value: item.value,
                    label: item.text
                }
            })
        )
    } else {
        finish()
    }
}
const handleSetDefault = () => {
    isDefault.value = !isDefault.value
}
const handleConfirmArea = ({ selectedItems }) => {
    console.log('selectedItems', selectedItems)
    selectArea.value = selectedItems
}
const handleConfirm = async () => { //点击确认添加地址按钮
    let params = { name: name.value, phone: phone.value, area: selectArea.value, detail: detail.value, is_default: isDefault.value }
    console.log(params)
    // return
    try {
        uni.showLoading({
            title: '加载中'
        });
        let result = await storeAddress(params)
        console.log('新增地址', result)
        uni.hideLoading()
        uni.showToast({
            title: result.message,
            icon: 'none'
        });
        if (result.code !== 200) {
            return
        }
        if (operating.value === 'select') {
            uni.setStorageSync('createOrderAddress', result.data)
        }
        uni.navigateBack({
            delta: 1
        });
    } catch (err) {
        console.log(err)
        uni.hideLoading()
    }
}
onLoad((options) => {
    if (options && options.operating) {
        operating.value = options.operating
    }
})

</script>

<style lang="scss" scoped>
.operating-button {
    @apply flex justify-center items-center text-28rpx font-medium rounded-18rpx w-198rpx h-86rpx;
}

.module {
    @apply w-686rpx rounded-24rpx overflow-hidden flex flex-col justify-start items-center bg-white text-28rpx mb-28rpx;
}

.info-item {
    @apply flex items-center justify-start w-full h-96rpx;
}
</style>