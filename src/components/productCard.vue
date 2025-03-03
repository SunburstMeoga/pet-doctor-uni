<template>
	<view class="content">
		<view class="content-img">
			<image :src="pictures" mode="aspectFit"></image>
		</view>
		<view class="content-info">
			<view class="info-title">{{ title }}</view>
			<view class="info-type">{{ intro }}</view>
			<view class="info-price flex justify-start items-start">
				<view class="price-top">￥</view>
				<view class="price-num">{{ price }}</view>
			</view>
		</view>
		<view class="buy-button" @click="buyNow()">立即购买</view>
	</view>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const emit = defineEmits(['handleBuyNow']);
let buyNow = () => {
	emit('handleBuyNow')
}
const props = defineProps({
	pictures: {
		type: String,
		default: ''

	},
	title: {
		type: String,
		default: ''
	},
	intro: {
		type: String,
		default: ''
	},
	price: {
		type: String,
		default: ''
	}
})
</script>

<style lang="scss" scoped>
.buy-button {
	width: 150rpx;
	height: 57rpx;
	margin: 0 auto;
	margin-bottom: 20rpx;
	font-size: 24rpx;
	line-height: 57rpx;
	color: #fff;
	text-align: center;
	background-color: #F7A040;
	border-radius: 8rpx;
}

.content {
	width: 100%;

	&-img {
		width: 303rpx;
		height: 220rpx;
		overflow: hidden;
		border-radius: 24rpx;
	}

	&-info {
		padding: 24rpx;

		.info-title {
			margin-bottom: 4rpx;
			font-size: 28rpx;
			color: #222;
		}

		.info-type {
			margin-bottom: 12rpx;
			font-size: 20rpx;
			color: #3B8AFA;
		}

		.info-price {
			height: 38rpx;
			color: #222;
		}
	}
}
</style>