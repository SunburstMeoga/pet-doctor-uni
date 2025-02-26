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
				:class="selectType === item.status ? 'bg-#222222 text-#FCE068 font-medium' : 'bg-#EDEDED text-#000000A6'"
				v-for="(item, index) in orderTypes" :key="index">
				{{ item.title }}
			</div>
		</div>
		<view class="content flex justify-start items-center" v-if="ordersList.length !== 0">
			<view class="content-item" v-for="(item, index) in ordersList" :key="index" @click="toDetails(item)">
				<order-card :created_at="item.order_time" :orderNumber="item.order_id"
					:price="item.order_payment_amount" :product_picture="item.items[0].order_item_image"
					:status="getOrderStatus(item.order_state_id)" :count="item.items[0].order_item_quantity"
					:pickUpMethod="getPickUpMethod(0)" />
			</view>
		</view>
		<view class="empty flex justify-center items-center" v-if="ordersList.length === 0">
			暂无内容
		</view>
	</view>
</template>

<script setup>
import OrderCard from '../../components/orderCard.vue'
import { orders } from '@/service/index'
let ordersList = ref([])
let selectType = ref(0)
// 0=待付款
// 1=已付款待发货
// 2=已发货带收货
// 3=已收货完成订单
// 4=已取消
const toDetails = (item) => {
	console.log(item, `${item.id}`)
	uni.navigateTo({
		url: `/pages/home/order_details?orderSN=${item.order_id}`
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
		case 2010:
			description = '待付款';
			break;
		case 2040:
			description = '已付款待发货';
			break;
		case 2040:
			description = '已发货待收货';
			break;
		case 2060:
			description = '已收货完成订单';
			break;
		case 2050:
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
	{ title: '全部', status: 0 },
	{ title: '待付款', status: 2010 },
	{ title: '已取消', status: 2050 },
	{ title: '待收货', status: 2040 },
	{ title: '已完成', status: 2060 },
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
		let res = await orders({ order_state_id: orderStatus })
		console.log('订单列表', res)
		ordersList.value = res.data.items
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
	font-size: 32rpx;
	color: #222;
}

.container {
	width: 100%;
	min-height: 100vh;
	background-color: rgb(245, 245, 245);

	.content {
		flex-direction: column;
		width: 100%;
		padding-bottom: 60rpx;
		overflow-y: scroll;

		.content-item {
			width: 686rpx;
			margin-bottom: 28rpx;
			overflow: hidden;
			border-radius: 24rpx;
		}
	}
}
</style>