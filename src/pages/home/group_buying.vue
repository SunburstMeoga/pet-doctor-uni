<template>
	<view class="container">
		<view class="content flex justify-start  items-center">
			<view class="content-tab flex jus items-center">
				<view class="tab-item" v-for="(item, index) in activityItems" :key="index">
					{{ item.title }}
				</view>
			</view>
			<view class="content-list flex justify-start items-center">
				<view class="list-item" v-for="(item, index) in productList" :key="index">
					<group-buy-card @handleBuyNow="buyNow(item)" :time="formatTimestamp(item.group_end_at)"
						:detail_pictures="item.pictures[0]" :title="item.title" :intro="item.intro"
						:tagsItems="item.tags" :price="item.price * 0.01"></group-buy-card>
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { allProduct, createOrder, pay } from '@/service/index'
import GroupBuyCard from '../../components/GroupBuyCard.vue';
let activityItems = ref([{ id: 1, title: '团购活动' },])
let productList = ref([])
let buyNow = async (item) => {
	if (!uni.getStorageSync('hasPhone')) {
		uni.showModal({
			content: '绑定手机号才可开启团购哦',
			showCancel: false,
			confirmText: '前往绑定',
			success: (e) => {
				console.log(e)
				if (e.confirm) {
					uni.navigateTo({
						url: '/pages/login/bind'
					})
				}
			},

		})
		return
	}
	console.log("点解购买按钮", item)
	// uni.showLoading({
	// 	title: "创建订单..."
	// })
	// let res = await createOrder({ item_id: item.items[0].id, quantity: 1 })
	// let payResult = await pay({ order_sn: res.data.order_sn })
	// uni.requestPayment({
	// 	"timeStamp": payResult.data.timeStamp,
	// 	"nonceStr": payResult.data.nonceStr,
	// 	"package": payResult.data.package,
	// 	"signType": payResult.data.signType,
	// 	"paySign": payResult.data.paySign,
	// 	"success": function (res) {
	// 		console.log('success', res);
	// 		uni.hideLoading()
	// 	},
	// 	"fail": function (res) {
	// 		console.log('fail', res);
	// 		uni.hideLoading()
	// 	},
	// 	"complete": function (res) {
	// 		console.log('complete', res);
	// 		uni.hideLoading()
	// 	}
	// });
	console.log(item, `${item.id}`)
	uni.navigateTo({
		url: `/pages/home/product_details?productId=${item.id}`
	});

	// console.log(payRes, '支付')
	// console.log('创建订单', res)
}
const formatTimestamp = (timestamp) => {
	const date = new Date(timestamp * 1000);
	// 获取月份，日期，小时，分钟和秒
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');
	// 拼接格式为 MM-DD HH:mm:ss
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
let getProductList = async () => {
	let result = await allProduct()
	productList.value = result.data
	console.log('商品列表接口', result)
	console.log('商品列表', productList.value)
}
onMounted(() => {
	getProductList()
})
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	min-height: 100vh;
	background-color: rgb(245, 245, 245);

	.content {
		width: 100%;
		flex-direction: column;

		&-tab {
			height: 100rpx;
			width: 686rpx;

			.tab-item {
				width: 160px;
				height: 56rpx;
				font-size: 36rpx;
				font-weight: 900;
			}
		}

		.content-list {
			flex-direction: column;
			width: 100%;

			.list-item {
				width: 686rpx;
				border-radius: 24rpx;
				margin-bottom: 28rpx;
				overflow: hidden;
			}
		}
	}
}
</style>