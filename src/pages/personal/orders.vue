<route lang="json5">
    {
      style: {
        navigationBarTitleText: '全部订单',
      },
    }
    </route>
<template>
	<view class="container">
		<div class="w-686rpx mx-auto flex justify-between items-center h-116rpx static top-0"
			style="background-color: rgb(245, 245, 245);">
			<div class="rounded-8rpx px-16rpx py-8rpx text-28rpx" @click="handleType(item)"
				:class="selectType === item.status ? 'bg-slate9 text-amber font-medium' : 'bg-zinc2 text-zinc4'"
				v-for="(item, index) in orderTypes" :key="index">
				{{ item.title }}
			</div>
		</div>
		<view class="content flex justify-start items-center" v-if="ordersLis.length !== 0">
			<view class="content-item" v-for="(item, index) in ordersLis" :key="index" @click="toDetails(item)">
				<order-card :orderNumber="item.order_sn" :price="item.amount * 0.01"
					:product_picture="item.items[0].product_picture" :status="getOrderStatus(item.status)"
					:count="item.items[0].quantity" :pickUpMethod="getPickUpMethod(item.dispatch_mode)" />
			</view>
		</view>
		<view class="empty flex justify-center items-center" v-if="ordersLis.length === 0">
			暂无内容
		</view>
	</view>
</template>

<script setup>
import OrderCard from '../../components/orderCard.vue'
import { orders } from '@/service/index'
let ordersLis = ref([])
let selectType = ref('')
// 0=待付款
// 1=已付款待发货
// 2=已发货带收货
// 3=已收货完成订单
// 4=已取消
const toDetails = (item) => {
	console.log(item, `${item.id}`)
	uni.navigateTo({
		url: `/pages/home/order_details?orderSN=${item.order_sn}`
	});
}
const getPickUpMethod = (deliveryMethod) => {
	let description;

	switch (deliveryMethod) {
		case 0:
			description = '自提';
			break;
		case 1:
			description = '物流';
			break;
		case 2:
			description = '线下活动';
			break;
		default:
			description = '未知配送方式';
			break;
	}

	// 返回配送方式描述
	return description;
}
const getOrderStatus = (orderStatus) => {
	let description;

	switch (orderStatus) {
		case 0:
			description = '待付款';
			break;
		case 1:
			description = '已付款待发货';
			break;
		case 2:
			description = '已发货待收货';
			break;
		case 3:
			description = '已收货完成订单';
			break;
		case 4:
			description = '已取消';
			break;
		default:
			description = '未知状态';
			break;
	}

	// 这里可以返回描述，或者根据需求执行其他操作
	return description;
}
let orderTypes = ref([
	{ title: '全部', status: '' },
	{ title: '待付款', status: 0 },
	{ title: '已取消', status: 4 },
	{ title: '待收货', status: 2 },
	{ title: '已完成', status: 3 },

])
const handleType = async (item) => {
	selectType.value = item.status
	console.log(selectType.value)
	getOrders(selectType.value)
}
let getOrders = async (orderStatus) => { //订单列表
	try {
		uni.showLoading()
		console.log('查询的订单状态', orderStatus)
		let res = await orders({ status: orderStatus })
		console.log('订单列表', res)
		ordersLis.value = res.data
		uni.hideLoading()
	} catch (err) {
		console.log(err)
		uni.hideLoading()
	}
}
onMounted(() => {
	getOrders(selectType.value)
})
onLoad((options) => {
	if (options.status) {
		// orderStatus.value = options.status
	}
})
</script>

<style lang="scss">
.empty {
	width: 100%;
	height: 100vh;
	color: #222;
	font-size: 32rpx;
}

.container {
	width: 100%;
	min-height: 100vh;
	background-color: rgb(245, 245, 245);

	.content {
		width: 100%;
		flex-direction: column;
		overflow-y: scroll;
		padding-bottom: 60rpx;

		.content-item {
			width: 686rpx;
			margin-bottom: 28rpx;
			border-radius: 24rpx;
			overflow: hidden;
		}
	}
}
</style>