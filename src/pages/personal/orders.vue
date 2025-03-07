<route lang="json5">
    {
      style: {
        navigationBarTitleText: '全部订单',
      },
    }
    </route>
<template>
	<view class="container">
		<div class="w-686rpx mx-auto flex justify-between items-center h-116rpx static top-0 overflow-x-scroll"
			style="background-color: rgb(245, 245, 245);">
			<div class="rounded-8rpx px-8rpx py-4rpx text-28rpx min-w-88rpx text-center " @click="handleType(item)"
				:class="selectType === item.status ? 'bg-#222222 text-#FCE068 font-medium' : 'bg-#EDEDED text-#000000A6'"
				v-for="(item, index) in orderTypes" :key="index">
				{{ item.title }}
			</div>
		</div>
		<view class="content flex justify-start items-center" v-if="ordersList.length !== 0">
			<view class="content-item" v-for="(item, index) in ordersList" :key="index" @click="toDetails(item)">
				<order-card :created_at="item.order_time" :orderNumber="item.order_id"
					:price="item.order_payment_amount" :product_picture="item.items"
					:status="getOrderStatus(item.order_state_id)" :count="calculateProductTotal(item.items)"
					:pickUpMethod="getPickUpMethod(item.delivery_type_id)" />
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
const calculateProductTotal = (items) => {
	const total = items.reduce((sum, item) => sum + item.order_item_quantity, 0);
	return total
}
const toDetails = (item) => {
	console.log(item, `${item.id}`)
	uni.navigateTo({
		url: `/pages/home/order_details?orderSN=${item.order_id}`
	});
}
const getPickUpMethod = (deliveryMethod) => {
	let description;

	switch (deliveryMethod) {
		case 5:
			description = '自提';
			break;
		case 10:
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
// 状态描述函数
const getOrderStatus = (orderStatus) => {
	switch (orderStatus) {
		case 2010: return '待付款';
		// case 2011: return '待订单审核';
		// case 2013: return '待财务审核';
		case 2020: return '待发货';
		case 2030: return '待发货';
		case 2040: return '已发货（待收货）';
		case 2060: return '已完成（已签收）';
		case 2070: return '已取消/作废';
		default: return '未知状态';
	}
};

let orderTypes = ref([
	{ title: '全部', status: 0 },
	// { title: '待审核', status: 2011 },     // 新增
	// { title: '待配货', status: 2020 },     // 新增
	{ title: '待发货', status: 2030 },     // 新增
	{ title: '待收货', status: 2040 },
	{ title: '已完成', status: 2060 },
	{ title: '已取消', status: 2070 }
]);
const handleType = async (item) => {
	selectType.value = item.status
	console.log(selectType.value)
	getOrders(selectType.value)
}
let getOrders = async (orderStatus) => { //订单列表
	try {
		uni.showLoading()
		console.log('查询的订单状态', orderStatus)
		let res = await orders({ order_state_id: orderStatus, size: 10000 })
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