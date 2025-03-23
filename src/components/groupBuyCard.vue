<template>
	<div class="w-full h-full relative">
		<div class="absolute w-full h-full inset-0">
			<image mode="aspectFit"
				src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250219/T7yJjfritIoZMqgqgVChr68P5ZbtH5YcuoXmpMWu.png" />
		</div>
		<div class="w-full h-full relative z-1">
			<div class="w-642rpx  mx-auto h-65rpx flex  justify-between items-center  ">
				<div class="text-24rpx  text-#F54940 font-medium">截至{{ time }}</div>
				<div class="flex justify-end items-center">
					<!-- {{ `${Math.round(productSaleNum / itemQuantity) * 100}%` }} -->
					<div class="text-24rpx text-#FF8703">
						已参与{{ productSaleNum }}
						<span class="text-#595959">/{{ itemQuantity }} </span>
					</div>
					<div class="ml-8rpx w-80rpx rounded-full h-16rpx bg-#FFBF79 flex justify-start items-center">
						<div class="h-16rpx bg-#FF8703 rounded-full"
							:class="productSaleNum === 0 ? 'w-0' : `${Math.round(productSaleNum / itemQuantity) * 100}%`">
						</div>
					</div>
				</div>
			</div>
			<div
				class="bg-gradient-to-b to-#FFFFFF  from-#FFF7EF h-278rpx w-686rpx rounded-24rpx flex justify-center items-center">
				<div class="w-642rpx h-228rpx flex justify-between items-center">
					<div class="w-385rpx h-228rpx rounded-12rpx overflow-hidden">
						<image :src="detail_pictures" mode="aspectFit"></image>
					</div>
					<div class="w-241rpx h-228rpx flex flex-col justify-between items-start">
						<div class="text-#222  text-32rpx line-clamp-2 overflow-hidden text-ellipsis break-words">
							{{ title }}</div>

						<div class="flex justify-start items-center">
							<div v-for="(item, index) in tagsItems" :key="index"
								class="text-20rpx w-56rpx h-28rpx flex justify-center items-center rounded-4rpx" :class="{
					'bg-#F15912 text-#FFFFFF': index === 0,
					'bg-#FAAD1426 text-#FAAD14': index === 1,
					'bg-#3B8AFA26 text-#3B8AFA': index === 2,
					'ml-8rpx': index !== 0,
				}">
								{{ item }}
							</div>
						</div>
						<div class="text-#595959 text-24rpx line-clamp-1 overflow-hidden text-ellipsis break-words">
							{{ intro }}</div>
						<div class="flex justify-between items-center w-full h-57rpx">
							<div class="h-37rpx flex justify-start items-start">
								<div class="font-medium text-24rpx transform translate-y-2rpx">￥</div>
								<div class="font-bold text-32rpx ml-4rpx">{{ price }}</div>
							</div>
							<div class="bg-#F36D1F rounded-full w-64rpx h-42rpx flex justify-center items-center">
								<wd-icon name="add" size="24rpx" color="#fff"></wd-icon>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

// let tagsItems = [{title: '上新'} , {title: '猫猫'}, {title: '毛绒'}]

const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	intro: {
		type: String,
		default: ''
	},
	tagsItems: {
		type: Array,
		default: () => []
	},
	price: {
		type: String,
		default: ''
	},
	detail_pictures: {
		type: String,
		default: ''
	},
	time: {
		type: String,
		default: ''
	},
	itemQuantity: {
		type: Number,
		default: 0
	},
	productSaleNum: {
		type: Number,
		default: 0
	}
})

const emit = defineEmits(['handleBuyNow']);
let buyNow = () => {
	emit('handleBuyNow')
}
</script>

<style lang="scss" scoped>
.content-one {
	background: linear-gradient(to bottom, #FFF7EF, #FFFFFF);
	/* 如果需要支持旧版浏览器，可以添加以下代码 */
	background: -webkit-linear-gradient(top, #FFF7EF, #FFFFFF);
	/* Safari 5.1-6, Chrome 10-25 */
	background: -moz-linear-gradient(top, #FFF7EF, #FFFFFF);
	/* Firefox 3.6-15 */
	background: -o-linear-gradient(top, #FFF7EF, #FFFFFF);
	/* Opera 11.1-12 */
	background: -ms-linear-gradient(top, #FFF7EF, #FFFFFF);
}

.content {
	width: 100%;
	background-color: #fff;

	.content-time {
		padding: 16rpx 24rpx;
		font-size: 24rpx;
		color: #F54940;
		background-color: rgb(254, 217, 195);
	}

	.content-info {
		width: 100%;
		padding: 28rpx 0;
		background-color: #fff;
		border-radius: 24rpx;

		.content-details {
			position: relative;
			width: 642rpx;
			height: 228rpx;
			background: linear-gradient(to bottom, #FFF7EF, #FFFFFF);
			/* 如果需要支持旧版浏览器，可以添加以下代码 */
			background: -webkit-linear-gradient(top, #FFF7EF, #FFFFFF);
			/* Safari 5.1-6, Chrome 10-25 */
			background: -moz-linear-gradient(top, #FFF7EF, #FFFFFF);
			/* Firefox 3.6-15 */
			background: -o-linear-gradient(top, #FFF7EF, #FFFFFF);
			/* Opera 11.1-12 */
			background: -ms-linear-gradient(top, #FFF7EF, #FFFFFF);
			border-radius: 24rpx;

			/* IE 10 */
			.details-left {
				width: 220rpx;
				height: 220rpx;
				// border: 1rpx solid red;
				overflow: hidden;
				border-radius: 24rpx;
			}

			.details-right {
				width: 398rpx;
				margin-left: 24rpx;

				// border: 1px solid red;
				.right-title {
					margin-bottom: 2rpx;
					font-size: 32rpx;
					color: #222;
				}

				.right-details {
					margin-bottom: 2rpx;
					font-size: 24rpx;
					color: #595959;
				}

				.right-tags {
					margin-bottom: 2rpx;

					.tags-item {
						padding: 0 8rpx;
						margin-right: 8rpx;
						font-size: 20rpx;
						color: #fff;
						background-color: #F54940;
						border-radius: 8rpx;
					}
				}

				.right-price {
					font-size: 32rpx;
					// border: 1px solid red;
					font-weight: 900;
					color: #222;
				}

				.buy {
					position: absolute;
					right: 0;
					bottom: 0;
					width: 398rpx;

					.buy-button {
						width: 150rpx;
						height: 57rpx;
						font-size: 24rpx;
						line-height: 57rpx;
						color: #fff;
						text-align: center;
						background-color: #F7A040;
						border-radius: 8rpx;
					}
				}
			}

		}
	}
}
</style>