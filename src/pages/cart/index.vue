<route lang="json5">
    {
      style: {
        navigationBarTitleText: '购物车',
        navigationStyle:'custom'

      },
    }
    </route>
<template>
	<div class="w-full h-screen bg-zinc-1 flex flex-col justify-start items-center pb-200rpx">

		<div>
			<CustomHeader showButton>
				<template #left>
					<view class="custom-left w-120rpx h-44rpx">
						<image
							src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250225/TGEUIUUgpT7CLkSgm39RSkEr70PTpdrKPQsqcK3d.png"
							mode="aspectFit" />
					</view>
				</template>

			</CustomHeader>
		</div>
		<div class="w-full fixed  h-full">
			<img src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250214/lAn879X4T0boACUqQLeRaARui2ISUKOeaYEQLsRQ.png"
				alt="" mode="aspectFit">
		</div>
		<div class="w-full pt-200rpx flex flex-col justify-start items-center relative z-1">
			<div v-if="cartList.length === 0" class="flex justify-center items-center w-full h-600rpx  text-#222">
				暂无数据~
			</div>
			<div class="w-686rpx py-28rpx flex justify-center items-center bg-white rounded-24rpx overflow-hidden mb-28rpx"
				v-for="(item, index) in cartList" :key="index">
				<wd-swipe-action>
					<!-- <wd-cell title="标题文字" value="内容"/> -->
					<CartCard @handleSelect="handleSelect(item)" :isSelect="item.isSelect" :title="item.product_name"
						:productQuantity="item.cart_quantity" :items="item.item_name" :picture="item.product_image"
						:price="(item.item_market_price * item.cart_quantity).toFixed(2) || 0"
						@changeQuantity="(e) => changeQuantity(e, item)" />
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
		<div class="fixed bottom-0 left-0 z-2  w-full flex flex-col items-center justify-center bg-white h-128rpx pb-30rpx"
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
						<div class="text-48rpx font-bold">￥{{ totalPrice.toFixed(2) || '0.00' }}</div>
					</div>
					<div class="flex justify-between items-center ml-16rpx">
						<div class=" bg-gradient-to-tr to-#FCE16A  from-#F15912 text-white flex justify-center items-center rounded-16rpx w-200rpx h-88rpx"
							@click="handleCheckout">
							结算</div>
					</div>
				</div>
			</div>
		</div>
		<CheckoutCounter :showCheckoutCounter="showCheckoutCounter" :productQuantity="productQuantity"
			:productInfo="productDetailsInfo" pickUpSite="深圳市龙华区龙光玖钻4C1326" :addressInfo="addressInfo"
			@handleClose="handleClose" @selectAddress="handleSelectAddress" @confirmOrder="handleConfirmOrder" />
	</div>
</template>

<script setup>
import CartCard from '@/components/cartCard'
import CustomHeader from '@/components/customHeader'
import CheckoutCounter from '@/components/checkoutCounter'

import { cart, createOrder, pay, deleteCart, checkoutOrder, addresses } from '@/service/index'
let cartList = ref([]) //购物车列表
let selectItems = ref([]) //选中的购物车项目
let cartIds = ref([]) // 选中的购物车项id
let totalPrice = ref(0.00) //总计
let showCheckoutCounter = ref(false) //收银台弹窗
let selectPickMethod = ref(5) //配送方式
let addressItems = ref([]) //收货地址列表
let addressInfo = ref({})
const handleSelect = async (item) => { //点击选择项
	totalPrice.value = 0.00
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
		item.selectItems = false
		console.log(err)
	}
	console.log('选中的购物车items', selectItems.value)

}
const getAddressList = async () => { //获取地址信息
	try {
		uni.showLoading({
			title: '加载中'
		});
		let result = await addresses()
		addressItems.value = result.data.items
		console.log('地址列表', result)
		let arr = addressItems.value.filter(item => item.ud_is_default)
		if (uni.getStorageSync('createOrderAddress')) {
			addressInfo.value = uni.getStorageSync('createOrderAddress')
		} else {
			addressInfo.value = arr[0] || addressItems.value[0]
		}

		console.log('默认地址', addressInfo.value)
		uni.hideLoading()
	} catch (err) {
		console.log(err)
		uni.hideLoading();

	}
}
const changeQuantity = (e, item) => {
	console.log('购物车卡片的数量发生变化', e, item)
	item.cart_quantity = e.value
}
const handleAction = async (item) => { //删除购物车
	console.log('点击删除购物车')
	try {
		uni.showLoading({
			title: '加载中'
		});
		let result = await deleteCart({ cart_id: item.cart_id })
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
const handleConfirmOrder = async (selectPickMethodChild) => { //点击弹窗确认按钮
	selectPickMethod.value = selectPickMethodChild
	console.log('selectPickMethod.value', selectPickMethod.value, addressInfo.value == undefined)
	if (selectPickMethod.value === 10 && addressInfo.value == undefined) {
		console.log('无收货地址')
		uni.showToast({
			title: '请先选择收货地址',
			icon: 'none'
		})
		return
	}

	showCheckoutCounter.value = false
	try {
		uni.showLoading({
			title: '创建订单...'
		})
		// showCheckoutCounter.value = true
		const cart_id = selectItems.value.map(item => `${item.item_id}|${item.cart_quantity}|${item.cart_id}`)
			.join(',');
		console.log('addressInfo', addressInfo.value)
		let params = {}
		if (selectPickMethod.value === 10) {
			params = {
				cart_id: cart_id,
				dispatch_mode: selectPickMethod.value,
				chain_id: '',
				user_voucher_ids: '',
				payment_type_id: 1302,
				redemption_ids: '',
				order_message: '',
				virtual_service_date: '',
				virtual_service_time: '',
				salesperson_id: '',
				user_invoice_id: '',
				user_nickname: '',
				currency_id: '',
				delivery_type_id: selectPickMethod.value,
				ud_id: addressInfo.value.ud_id
			}
		} else {
			params = {
				cart_id: cart_id,
				dispatch_mode: selectPickMethod.value,
				chain_id: '',
				user_voucher_ids: '',
				payment_type_id: 1302,
				redemption_ids: '',
				order_message: '',
				virtual_service_date: '',
				virtual_service_time: '',
				salesperson_id: '',
				user_invoice_id: '',
				user_nickname: '',
				currency_id: '',
				delivery_type_id: selectPickMethod.value,
			}
		}
		let orderRes = await createOrder(params)
		console.log(orderRes, '创建订单闲情')
		if (orderRes.code === 200) {
			uni.removeStorageSync('cartList')
			setTimeout(async () => {
				try {
					uni.showLoading({
						title: '加载中'
					})
					let payResult = await pay({ order_id: orderRes.data.order_ids.join(',') })
					console.log('支付结果', payResult)
					uni.requestPayment({
						"timeStamp": payResult.data.payResult.timeStamp,
						"nonceStr": payResult.data.payResult.nonceStr,
						"package": payResult.data.payResult.package,
						"signType": payResult.data.payResult.signType,
						"paySign": payResult.data.payResult.paySign,
						"success": function (res) {
							showCheckoutCounter.value = false
							uni.navigateTo({
								url: `/pages/home/order_details?orderSN=${payResult.data.order_id}`
							})

							uni.hideLoading()
						},
						"fail": function (res) {
							showCheckoutCounter.value = false
							uni.navigateTo({
								url: `/pages/home/order_details?orderSN=${payResult.data.order_id}`
							})

							uni.hideLoading()
						},
						"complete": function (res) {
							showCheckoutCounter.value = false
							uni.navigateTo({
								url: `/pages/home/order_details?orderSN=${payResult.data.order_id}`
							})

							uni.hideLoading()
						}
					});
					uni.hideLoading()
				} catch (error) {
					console.log(error)
					uni.hideLoading()
				}
			}, 3000);
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

}
const handleSelectAddress = (selectPickMethodChild) => { //点击收银台的选择配送方式
	selectPickMethod.value = selectPickMethodChild
	console.log('取货方式', selectPickMethod.value)
	if (selectPickMethod.value === 5) return
	uni.navigateTo({
		url: `/pages/home/${addressItems.value.length !== 0 ? 'address_list' : 'store_address'}?operating=select`
	})
}
const handleClose = () => { //关闭弹窗
	showCheckoutCounter.value = false
	console.log(showCheckoutCounter.value)
}
const handleCheckout = async () => { //点击结算按钮
	console.log('点击了结算按钮')
	if (selectItems.value.length === 0) {
		uni.showToast({
			title: '请先选择至少一个结算项',
			icon: 'none'
		})
		return
	}
	// let addressList = await getAddressList()
	// addressItems.value = addressList.data.items
	// let arr = addressItems.value.filter(item => item.is_default)
	// if (uni.getStorageSync('createOrderAddress')) {
	// 	addressInfo.value = uni.getStorageSync('createOrderAddress')
	// } else {
	// 	addressInfo.value = arr[0] || addressItems.value[0]
	// }
	// console.log(addressList)
	showCheckoutCounter.value = true
}
const getCart = async () => { //获取购物车列表
	console.log('加载购物车', uni.getStorageSync('cartList'))
	console.log(uni.getStorageSync('cartList'))
	if (uni.getStorageSync('cartList') && uni.getStorageSync('cartList').length !== 0) {
		cartList.value = uni.getStorageSync('cartList')
		selectItems.value = cartList.value.filter(item => item.isSelect) //筛选选中项
		selectItems.value.map(async (item, index) => { //
			console.log(item.cart_quantity, item.item_market_price)
			totalPrice.value = 0.00
			item.total = item.cart_quantity * item.item_market_price //计算单个商品总价
			totalPrice.value = (item.cart_quantity * item.item_market_price) //计算选中的项总价

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
			item.selectItems = false
			console.log(err)
		}
		console.log('选中的购物车items', selectItems.value)
		return
	}
	try {
		console.log('加载购物车==-===-', uni.getStorageSync('cartList'))
		uni.showLoading({
			title: '加载中'
		});
		let result = await cart()
		console.log('接口 返回的购物车 列表', result)
		if (result.data.items.length !== 0) {
			console.log('购物车列表', result.data.items[0].items)
			cartList.value = result.data.items[0].items
			console.log(cartList.value)
			cartList.value.map(item => {
				item.isSelect = false
			})
		} else {
			cartList.value = []
		}
		uni.hideLoading()
	} catch (err) {
		console.log(err)
		uni.hideLoading()
	}
}
onShow(() => {
	// console.log('购物车onshow开始')
	getCart()
	getAddressList()
	// console.log('购物车onshow结束')
	// console.log('进入购物车页面时获取保存的购物车列表', uni.getStorageSync('cartList'))
})
// 购物车页面
onHide(() => {
	uni.setStorageSync('cartList', cartList.value);
	console.log('离开购物车页面时保存的购物车列表', uni.getStorageSync('cartList'))
})
// onMounted(() => {
// 	getCart()
// })

</script>

<style lang="scss" scoped>
.action {
	height: 100%;
}
</style>