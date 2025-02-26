<template>
	<view class="content flex justify-center items-center">
		<view class="content-info ">
			<view class="info-title flex justify-between items-center">
				<view class="title-left flex justify-start items-center">
					<view class="order-word">订单编号</view>
					<view class="order-content">{{ orderNumber }}</view>
				</view>
				<view class="title-right">{{ status }}</view>
			</view>
			<view class="info-details flex justify-between items-center">
				<view class="details-left">
					<image :src="product_picture" mode="aspectFit"></image>
				</view>
				<view class="details-right flex justify-between items-end">
					<view class="right-price">￥{{ price }}</view>
					<view class="right-count">共 {{ count }} 件</view>
				</view>
			</view>
			<view class="info-type flex justify-between items-center text-24rpx">
				<div>{{ pickUpMethod }}</div>
				<div>下单时间:{{ created_at }}</div>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
	orderNumber: {
		type: String,
		default: ''
	},
	price: {
		type: Number,
		default: 0
	},
	count: {
		type: Number,
		default: 0
	},
	status: {
		type: String,
		default: ''
	},
	product_picture: {
		type: String,
		default: ''
	},
	pickUpMethod: {
		type: String,
		default: ''
	},
	created_at: {
		type: Number,
		default: 0
	}
})
const formatTimestamp = (timestamp) => { //格式化时间内
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
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	padding: 28rpx 0;
	background-color: #fff;

	.content-info {
		width: 630rpx;

		.info-title {
			width: 100%;
			font-size: 28rpx;

			.title-left {
				.order-word {
					color: #595959;
				}

				.order-content {
					margin-left: 10rpx;
					color: #8c8c8c;
				}
			}

			.title-right {
				color: #595959;
			}
		}

		.info-details {
			width: 100%;
			margin: 24rpx 0;

			.details-left {
				width: 100rpx;
				height: 100rpx;
				overflow: hidden;
				// border: 1px solid red;
				border-radius: 10rpx;
			}

			.details-right {
				flex-direction: column;
				height: 100rpx;

				.right-price {
					font-size: 32rpx;
					color: #222;
				}

				.right-count {
					font-size: 24rpx;
					color: #595959;
				}
			}
		}

		.info-type {
			color: #595959;
		}
	}
}
</style>