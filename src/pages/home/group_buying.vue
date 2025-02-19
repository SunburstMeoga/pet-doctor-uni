<route lang="json5">
    {
      style: {
        navigationBarTitleText: '',
        navigationStyle:'custom'
      },
    }
    </route>
<template>
	<view class="container">
		<div>
			<CustomHeader :showButton="true">
				<template #left>
					<view class="text-32rpx font-medium pl-28rpx w-102rpx text-right">
						活动
					</view>
				</template>

			</CustomHeader>
		</div>
		<view class="flex-col flex justify-start  items-center pt-170rpx">
			<view class="flex h-116rpx justify-start items-center w-686rpx mx-auto">
				<view class="flex justify-start items-center" :class="{ 'ml-40rpx': item.id === 2 }"
					v-for="(item, index) in activityItems" :key="index" @click="handleActivityItem(item)">
					<div class="w-56rpx h-56rpx">
						<img class="w-full h-full"
							:src="item.id === currentActivityType ? `${item.active}` : `${item.icon}`" alt="">
					</div>
					<div class="ml-12rpx ml-12rpx" :class="{
				'text-36rpx text-#222 font-medium': item.id === currentActivityType,
				'text-28rpx text-#595959': item.id !== currentActivityType,

			}">
						{{ item.title }}</div>
				</view>
			</view>
			<view class=" flex flex-col justify-start items-center w-full">
				<view class="w-686rpx h-341rpx  rounded-24rpx overflow-hidden mb-28rpx"
					v-for="(item, index) in productList" :key="index" @click="buyNow(item)">
					<group-buy-card :time="formatTimestamp(item.group_end_at)" :detail_pictures="item.pictures[0]"
						:title="item.title" :intro="item.intro" :tagsItems="item.tags"
						:price="item.price * 0.01"></group-buy-card>
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { allProduct, createOrder, pay } from '@/service/index'
import GroupBuyCard from '../../components/GroupBuyCard.vue';
import CustomHeader from '@/components/customHeader'

let activityItems = ref([ //活动类型
	{ id: 1, title: '团购活动', icon: 'http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250217/eV06eKAnpu9kshHMw5rZ0yCBCB1bhztBj3j1rcAP.png', active: 'http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250217/KEst0R9EjXfgt7Xfu0aTFPedngaV7fnY9m6idECl.png' },
	{ id: 2, title: '线下活动', icon: 'http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250217/XbL5cFVoZ5sOjt478swt19KzF6cBdPrU4e6UMEY5.png', active: 'http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250217/y42AhT4FBIWCY9vZQXfV1vZrn37H5uWwCkzwuhi4.png' }])
let productList = ref([])
let currentActivityType = ref(1)
const handleActivityItem = (item) => {
	currentActivityType.value = item.id
}
let buyNow = async (item) => { //点击立即购买按钮
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