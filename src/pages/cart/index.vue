<route lang="json5" type="home">
    {
      style: {
        navigationBarTitleText: '购物车',
      },
    }
    </route>
<template>
	<div class="w-full h-screen bg-zinc-1 flex flex-col justify-start items-center pb-200rpx">
		<div class="w-full pt-32rpx flex flex-col justify-start items-center">
			<div class="w-686rpx py-28rpx flex justify-center items-center bg-white rounded-24rpx overflow-hidden mb-28rpx"
				v-for="(item, index) in cartList" :key="index">
				<wd-swipe-action>
					<!-- <wd-cell title="标题文字" value="内容"/> -->
					<CartCard @handleSelect="handleSelect(item)" :isSelect="item.isSelect" :title="item.product_name"
						:productQuantity="item.cart_quantity" :items="item.item_name" :picture="item.product_image"
						:price="item.item_market_price * item.cart_quantity || 0"
						@changeQuantity="changeQuantity(item)" />
					<template #right>
						<view class="h-full">
							<view
								class="h-full bg-red-500 flex justify-center items-center px-18rpx rounded-16rpx text-white"
								@click="handleAction(item)">删除</view>
						</view>
					</template>

				</wd-swipe-action>
			</div>
		</div>
		<div class="fixed bottom-0 left-0  w-full flex flex-col items-center justify-center bg-white h-128rpx pb-30rpx"
			style="border-top:1px solid #f3f4f6;">
			<div class="w-686rpx flex justify-between items-center">
				<div class="flex justify-start items-center text-zinc">
					<div class="w-40rpx h-40rpx rounded-full flex justify-center items-center bg-yellow mr-10rpx"
						@click="handleSelect">
						<div class="icon iconfont icon-right text-20rpx text-slate-9"></div>
					</div> 已选 ({{ selectItems.length }})
				</div>
				<div class="flex justify-center items-center h-128rpx">
					<div class="flex justify-between items-center text-#F15912">
						<div class="ml-10rpx">总计</div>
						<div class="text-48rpx font-bold">￥{{ totalPrice || '0.00' }}</div>
					</div>
					<div class="flex justify-between items-center ml-16rpx">
						<div class=" bg-gradient-to-r to-#FCE16A  from-#F15912 text-white flex justify-center items-center rounded-16rpx w-200rpx h-88rpx"
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
import { cart, createOrder, pay, deleteCart, checkoutOrder } from '@/service/index'
let cartList = ref([]) //购物车列表
let selectItems = ref([]) //选中的购物车项目
let cartIds = ref([]) // 选中的购物车项id
// let totalPrice = ref(0.00) //总计
const handleSelect = async (item) => { //点击选择项
	item.isSelect = !item.isSelect
	selectItems.value = cartList.value.filter(item => item.isSelect) //筛选选中项
	selectItems.value.map(async (item, index) => { //
		console.log(item.cart_quantity, item.item_market_price)
		totalPrice.value = 0.00
		item.total = item.cart_quantity * item.item_market_price //计算单个商品总价
		totalPrice.value = (item.cart_quantity * item.item_market_price) //计算选中的项总价
		console.log('总价', totalPrice.value)
		if (cartIds.value.length === 0) {
			totalPrice.value = 0.00
		}
		// console.log('总价', totalPrice.value)
	})
	const cart_id = selectItems.value.map(item => `${item.item_id}|${item.cart_quantity}|${item.cart_id}`)
		.join(',');
	console.log(cart_id)
	try {
		uni.showLoading({
			title: '加载中'
		})
		let checkoutRes = await checkoutOrder({ cart_id: cart_id }) //收银台

		console.log('收银台', checkoutRes)
		if (checkoutRes.code === 200) {
			totalPrice.value = checkoutRes.data.order_money_amount
		} else {
			uni.showToast({
				title: checkoutRes.message,
				icon: 'none'
			})
		}
		uni.hideLoading()

	} catch (err) {
		uni.hideLoading()
		console.log(err)
	}
	console.log('选中的购物车items', selectItems.value)

}
const totalPrice = computed(() => {
	return selectItems.value.reduce((sum, item) => sum + item.total, 0);
});
const changeQuantity = (e, item) => {
	console.log('购物车卡片的数量发生变化', e, item)
}
const handleAction = async (item) => { //删除购物车
	try {
		uni.showLoading({
			title: '加载中'
		});
		let result = await deleteCart(item.cart_id)
		uni.hideLoading()
		uni.showToast({
			title: result.msg,
			icon: 'none'
		})
		if (result.code === 200) {
			getCart()
			totalPrice.value = 0.00
			selectItems.value = []
			cartIds.value = []
		}
	} catch (err) {
		console.log(err)
		uni.hideLoading()
	}

}
const handleCheckout = async () => { //点击结算按钮
	if (cartIds.value.length === 0) {
		uni.showToast({
			title: '请先选择至少一个结算项',
			icon: 'none'
		})
		return
	}
	try {
		uni.showLoading({
			title: '创建订单...'
		})

		let orderRes = await createOrder({ cart_ids: cartIds.value, dispatch_mode: 0 })
		console.log(orderRes, '创建订单闲情')
		if (orderRes.code === 0) {
			setTimeout(async () => {
				try {
					uni.showLoading({
						title: '加载中'
					})
					let payResult = await pay({ order_sn: orderRes.data.order_sn })
					console.log('支付结果', payResult)
					uni.requestPayment({
						"timeStamp": payResult.data.timeStamp,
						"nonceStr": payResult.data.nonceStr,
						"package": payResult.data.package,
						"signType": payResult.data.signType,
						"paySign": payResult.data.paySign,
						"success": function (res) {
							uni.navigateTo({
								url: `/pages/home/order_details?orderSN=${orderRes.data.order_sn}`
							})
							uni.hideLoading()
						},
						"fail": function (res) {
							uni.navigateTo({
								url: `/pages/home/order_details?orderSN=${orderRes.data.order_sn}`
							})
							uni.hideLoading()
						},
						"complete": function (res) {
							uni.navigateTo({
								url: `/pages/home/order_details?orderSN=${orderRes.data.order_sn}`
							})
							uni.hideLoading()
						}
					});
					uni.hideLoading()
				} catch (error) {
					console.log(error)
					uni.hideLoading()
				}
			}, 7000);
		} else {
			showToast({
				title: orderRes.message,
				icon: 'none'
			})
		}
	} catch (err) {
		console.log(err)
		uni.hideLoading()
	}
	// let arr = JSON.stringify(cartIds.value);

	// uni.navigateTo({
	// 	url: `/pages/home/order_checkout?cartIds=${encodeURIComponent(arr)}`
	// })
}
const getCart = async () => { //获取购物车列表
	try {
		uni.showLoading({
			title: '加载中'
		});
		let result = await cart()
		console.log('购物车列表', result.data.items[0].items)
		cartList.value = result.data.items[0].items
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
onShow(() => {
	console.log('购物车onshow开始')
	getCart()
	console.log('购物车onshow结束')

})
// onMounted(() => {
// 	getCart()
// })

</script>

<style lang="scss" scoped>
.action {
	height: 100%;
}

.button {}
</style>