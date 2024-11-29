<route lang="json5">
    {
      style: {
        navigationBarTitleText: '购物车',
      },
    }
    </route>
<template>
	<div class="w-full h-screen bg-zinc-1 flex flex-col justify-start items-center">
		<div class="w-full pt-32rpx flex flex-col justify-start items-center">
			<div class="w-686rpx py-28rpx flex justify-center items-center bg-white rounded-24rpx overflow-hidden mb-28rpx"
				v-for="(item, index) in cartList" :key="index">
				<wd-swipe-action>
					<!-- <wd-cell title="标题文字" value="内容"/> -->
					<CartCard @handleSelect="handleSelect(item)" :isSelect="item.isSelect"
						:title="item && item.product && item.product.title" :productQuantity="item.quantity"
						:items="item.product.items" :picture="item.product.picture"
						:price="item.product.price * item.quantity || 0" />
					<template #right>
						<view class="h-full">
							<view
								class="h-full bg-red-500 flex justify-center items-center px-18rpx rounded-16rpx text-white"
								@click="handleAction('操作3')">删除</view>
						</view>
					</template>

				</wd-swipe-action>
			</div>
		</div>
		<div class="fixed bottom-0 left-0  w-full flex flex-col items-center justify-center bg-white h-128rpx"
			style="border-top:1px solid #f3f4f6;">
			<div class="w-686rpx flex justify-between items-center">
				<div class="flex justify-start items-center text-zinc">
					<div class="w-40rpx h-40rpx rounded-full flex justify-center items-center bg-yellow mr-10rpx"
						@click="handleSelect">
						<div class="icon iconfont icon-right text-20rpx text-slate-9"></div>
					</div> 已选 ({{ selectItems.length }})
				</div>
				<div class="flex justify-center items-center h-128rpx">
					<div class="flex justify-between items-center text-orange-6">
						<div class="ml-10rpx">总计</div>
						<div class="text-48rpx font-bold">￥{{ totalPrice }}</div>
					</div>
					<div class="flex justify-between items-center ml-16rpx">
						<div class=" bg-orange-4 text-white flex justify-center items-center rounded-16rpx w-200rpx h-88rpx"
							@click="handleCheckout">
							结算</div>
					</div>
				</div>
			</div>


		</div>
	</div>
</template>

<script setup>
import CartCard from '@/components/cartCard'
import { cart } from '@/service/index'
let cartList = ref([]) //购物车列表
let selectItems = ref([]) //选中的购物车项目
let cartIds = ref([]) // 选中的购物车项id
let totalPrice = ref(0) //总计
const handleSelect = (item) => { //点击选择项
	item.isSelect = !item.isSelect
	selectItems.value = cartList.value.filter(item => item.isSelect) //筛选选中项
	selectItems.value.map((item, index) => { //
		totalPrice.value = item.quantity * ((item.product.price || 0) * 0.01)
		cartIds.value[index] = item.id
	})
	console.log(selectItems.value)
	console.log(cartIds.value)

}
const handleCheckout = () => { //点击结算按钮
	if (cartIds.value.length === 0) {
		uni.showToast({
			title: '请先选择至少一个结算项',
			icon: 'none'
		})
		return
	}
	let arr = JSON.stringify(cartIds.value);
	uni.navigateTo({
		url: `/pages/home/order_checkout?cartIds=${encodeURIComponent(arr)}`
	})
}
const getCart = async () => { //获取购物车列表
	try {
		uni.showLoading({
			title: '加载中'
		});
		let result = await cart()
		console.log('购物车列表', result)
		cartList.value = result.data
		console.log(cartList.value)
		cartList.value.map(item => {
			item.isSelect = false
		})
		uni.hideLoading()
	} catch (err) {
		console.log(err)
		uni.hideLoading()
	}
}
onLoad(() => {
	getCart()
})

</script>

<style lang="scss" scoped>
.action {
	height: 100%;
}

.button {}
</style>