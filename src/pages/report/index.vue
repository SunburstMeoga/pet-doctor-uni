<route lang="json5">
	{
	  style: {
		navigationStyle: 'custom',
		navigationBarTitleText: '报告',
	  },
	}
	</route>
<template>
	<view class="container">
		<view class="logo">
			<image mode="aspectFit"
				src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241127/tacl0itkBbPXmlK9T2aMSjFqC7ZTORzQWF0FptIo.png"
				alt="" />
		</view>
		<view class="content flex justify-start items-center image-bg"
			style="background-image: url('http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241024/TomWHO3jqHYSMV4f0KosXrrxe1tKiVEIy7ODUQ8B.png');">
			<view class="add-service flex justify-between items-center" @click="addCustom">
				<view class="add-service-hi">
					<image
						src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241024/76MPExVIGBYFHQe9Ecg1oEQi7wN1JgYziL0gjfCU.png"
						mode="aspectFill"></image>
				</view>
				<view class="add-service-title">添加专属客服，获取正确的医疗指导</view>
				<view class="add-service-right">
					<view class="iconfont icon icon-a-duobianxing1"></view>
				</view>
			</view>
			<view class="report" v-if="cardList.length !== 0">
				<swiper class="swiper-box" @change="swipeChange" :current="currentReport">
					<swiper-item class="flex justify-center items-center rounded-24rpx overflow-hidden"
						v-for="(item, index) in cardList" :key="index">
						<pet-card style="width: 622rpx;" class="overflow-hidden rounded-24rpx" :name="item.name"
							:id="item.id" :assessmentId="item.type.id" :toJump="true" :breed="item.breed.name"
							:sex="item.sex" :time="item.birth_at"></pet-card>
					</swiper-item>
				</swiper>

			</view>
		</view>

		<view class="report-list">
			<view @click="toAddCard()" class="empty flex justify-center items-center" v-if="cardList.length === 0">
				新增宠物身份证
			</view>
			<div v-for="(item, index) in  reportList " :key="index" class="mb-10rpx relative">
				<div class="absolute w-full h-full z-10" @click="toReportDetails(item)">
				</div>
				<wd-swipe-action class="flex justify-start items-center ">
					<div
						class="w-606rpx rounded-24rpx overflow-hidden px-32rpx py-28rpx bg-#F7F7F7 flex justify-between items-center">
						<div class="w-112rpx h-122rpx">
							<img src="../../static/images/report/mbti-title.png" alt="">
						</div>
						<div class="ml-36rpx pl-16rpx flex flex-col justify-between items-center w-440rpx"
							style="border-left: 1rpx solid rgba(0,0,0,.2);"
							:class="item.dimensions.length <= 4 ? 'h-full' : 'h-full'">
							<div class="w-full flex justify-between items-center text-#8C8C8C my-6rpx"
								v-for="(_item, _index) in  item.dimensions " :key="_index">
								<div class="text-24rpx" :class="item.dimensions.length <= 4 ? 'w-120rpx' : 'w-100rpx'">
									{{ _item.title }}</div>
								<div class="ml-24rpx flex-1 flex justify-between items-center ">
									<div class=" text-24rpx "
										:class="`${item.dimensions.length <= 4 ? 'w-18rpx text-right' : `${_item.score < 0 ? 'text-#8C8C8C' : 'text-#20CEB0'}`}  ${item.dimensions.length <= 4 ? `${_item.score < 0 ? `color-text-${_index}` : `color-gray`}` : 'text-#20CEB0'}`">
										{{ _item.value }}</div>
									<div class="mx-8rpx h-20rpx bg-#E5E5E5 rounded-4rpx flex-1  flex items-center"
										:class="`${_item.score < 0 ? 'justify-start' : 'justify-end'}`">
										<div class="h-full flex items-center"
											:class="`  ${item.dimensions.length <= 4 ? `color-${_index}` : `${_item.score < 0 ? 'bg-#F15912' : 'bg-#20CEB0'}`}`"
											:style="`width: ${Math.abs(_item.score) * 10}%;`">
										</div>
									</div>
									<div class="text-#8C8C8C text-24rpx"
										:class="` ${item.dimensions.length <= 4 ? 'w-18rpx text-right' : `${_item.score < 0 ? 'text-#F15912' : 'text-8C8C8C'}`}  ${item.dimensions.length <= 4 ? `${_item.score > 0 ? `color-text-${_index}` : `color-gray`}` : 'text-#20CEB0'}`">
										{{
				_item.reverse_value }}</div>
								</div>

							</div>
						</div>
					</div>
					<template #right>
						<div class="h-full">
							<div class="h-full bg-red-500 flex justify-center items-center px-18rpx rounded-16rpx text-white"
								@click="bindClick(item)">删除</div>
						</div>
					</template>
				</wd-swipe-action>
			</div>
		</view>
		<!-- <uni-preview-image :image-list="imageList" :show="showPreview"></uni-preview-image> -->
	</view>
</template>
<script setup>
import CartCard from '@/components/cartCard.vue';
import petCard from '../../components/petCard.vue';
import {
	// orders,
	petCards, reports, deleteReport
} from '@/service/index'
let currentReport = ref(0)
let imageList = ref(['http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241025/rsXfy7Sd1VSRaURGGtHlFuxsZAuYIl8Ju465ejuS.png'])
let showPreview = ref(false)
let cardList = ref([])
let options1 = ref([{
	text: '删除',
	style: {
		backgroundColor: '#F15912',
		color: '#fff',
		width: '62rpx',
		borderRadius: '16rpx',
		fontSize: '24rpx',
		writingMode: 'tb-rl',
		minHeight: '228rpx'
	}
}])
let currentCardId = ref(0)
let reportList = ref([])
let isLoading = ref(false)
let bindClick = async (item) => {

	try {
		uni.showLoading({
			title: '加载中'
		});
		let result = await deleteReport(item.id)
		uni.hideLoading()
		uni.showToast({
			title: result.message,
			icon: 'none'
		})
		if (result.code === 0) {
			getCart()
		}
	} catch (err) {
		console.log(err)
		uni.hideLoading()
	}


}
const toReportDetails = (item) => {
	console.log(item.id, currentCardId.value === 0 ? cardList.value[0].id : currentCardId.value)

	uni.navigateTo({
		url: `/pages/report/report-result?reportId=${item.id}&cardId=${currentCardId.value === 0 ? cardList.value[0].id : currentCardId.value}`
	})
}
const addCustom = () => { //添加专属客服
	uni.previewImage({
		current: 'http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241025/rsXfy7Sd1VSRaURGGtHlFuxsZAuYIl8Ju465ejuS.pngr', // 当前显示图片的http链接
		urls: imageList.value // 需要预览的图片http链接列表
	});
}
let swipeChange = async (e) => {
	console.log(e)
	if (isLoading.value) return
	currentCardId.value = cardList.value[e.detail.current].id
	console.log(currentCardId.value)
	try {
		isLoading.value = true
		uni.showLoading({
			title: "正在加载...",
		})

		let resReport = await reports({ pet_card_id: currentCardId.value === 0 ? cardList.value[0].id : currentCardId.value })
		reportList.value = resReport.data
		console.log('报告', resReport)
		uni.hideLoading()
		isLoading.value = false
		console.log(cardList.value)
	} catch (err) {
		console.log(err)
		isLoading.value = false
		uni.hideLoading()
	}
	// console.log('切换轮播图之后的宠物id', cardList.value[currentReport.value].id)
	// console.log('切换轮播图之后的报告', currentReport.value)
}
let toAddCard = () => {
	uni.navigateTo({
		url: '/pages/personal/identityInfo'
	})
}
onShow(async () => {
	reportList.value = []
	cardList.value = []
	currentCardId.value = 0
	try {
		uni.showLoading({
			title: "正在加载...",
		})
		let petCardsList = await petCards()
		console.log(petCardsList)
		if (petCardsList.data.length !== 0) {
			let resReport = await reports({ pet_card_id: petCardsList.data[0].id })
			reportList.value = resReport.data
			console.log('报告', resReport)
			uni.hideLoading()
		}
		cardList.value = petCardsList.data
		uni.hideLoading()
		console.log(cardList.value)
	} catch (err) {
		console.log(err)
	}
})
</script>

<style lang="scss" scoped>
.container {
	// border:1px solid red;
	min-height: 100vh;
}

.empty {
	color: #FCE068;
	font-size: 32rpx;
	background-color: #222;
	width: 324rpx;
	height: 92rpx;
	border-radius: 24rpx;
	margin: 0 auto;
	margin-top: 100rpx;
}

.content {
	position: relative;
	width: 100%;
	flex-direction: column;
	border-radius: 50% / 10%;
	border-top-right-radius: 0%;
	border-top-left-radius: 0%;
	overflow: hidden;

	.swiper-box {
		width: 750rpx;
		height: 220rpx;
		flex-direction: column;
		// border: 1px solid red;
	}

	.swiper-item {
		width: 622rpx;
		height: 220rpx;
		text-align: center;
		line-height: 220rpx;
	}
}

.card-info {
	padding: 32rpx;
	// border: 1px solid blue;
	color: #222;

	.diamond {
		width: 20rpx;
		height: 20rpx;
		background-color: #de5516;
		transform: rotate(45deg);
	}

	&-name {
		color: black;
		margin-bottom: 40rpx;
		font-size: 16rpx;
		// border: 1px solid orchid;
		height: 18rpx;
		font-weight: bolder;
	}

	&-property {
		margin-bottom: 26rpx;
		height: 40rpx;

		&-variety {
			font-size: 28rpx;
			margin: 0 12rpx;
		}

		&-gender {
			font-size: 32rpx;
			color: #FF6D6D;
		}
	}

	&-date {
		height: 40rpx;

		&-number {
			margin-left: 12rpx;
		}
	}
}

.report-list {
	width: 670rpx;
	flex-direction: column;
	margin: 0 auto;
	margin-top: 34rpx;

	&-item {
		width: 670rpx;
		min-height: 172rpx;
		background-color: #F7F7F7;
		border-radius: 16rpx;
		padding: 28rpx 0;


		&-left {
			width: 100rpx;
			height: 78rpx;
			margin: 0 34rpx;
		}

		&-line {
			height: 172rpx;
			width: 1rpx;
			margin-right: 16rpx;
			background-color: #c8c8c8;
		}

		&-right {
			flex-direction: column;
			flex: 1;

			&-property {
				flex: 1;

				// border: 1px solid red;
				&-title {
					color: #8c8c8c;
					font-size: 24rpx;
					margin-right: 40rpx;
				}

				&-content {
					width: 340rpx;
					height: 20rpx;

					// border: 1px solid blue;
					&-left {
						color: #faad14;
						font-size: 24rpx;
					}

					&-middle {
						flex: 1;
						height: 20rpx;
						border-radius: 4rpx;
						background-color: #e5e5e5;
						margin: 0 8rpx;

						// border: 1px solid red;
						&-step {
							width: 200rpx;
							height: 20rpx;
							border-radius: 4rpx;
							background-color: #faad14;
						}
					}

					&-right {
						color: #8c8c8c;

						font-size: 24rpx;
					}
				}
			}
		}
	}
}

.logo {
	width: 296rpx;
	height: 22rpx;
	position: absolute;
	z-index: 9999;
	top: 112rpx;
	left: 32rpx;
}

.add-service {
	width: 686rpx;
	height: 88rpx;
	background-color: #fff;
	border-radius: 24rpx;
	color: #222;
	margin-top: 208rpx;
	margin-bottom: 32rpx;

	&-hi {
		width: 80rpx;
		height: 80rpx;
		margin-top: -40rpx;
		margin-left: 28rpx;
	}

	&-title {
		font-size: 28rpx;
	}

	&-right {
		font-size: 22rpx;
		margin-right: 28rpx;
	}
}


.color-0 {
	background-color: #faad14;
	color: #faad14;
}

.color-1 {
	background-color: #3B8AFA;
	color: #3B8AFA;
}

.color-2 {
	background-color: #F15912;
	color: #F15912;
}

.color-3 {
	background-color: #AA60FA;
	color: #AA60FA;
}

.color-text-0 {
	color: #faad14;
}

.color-text-1 {
	color: #3B8AFA;
}

.color-text-2 {
	color: #F15912;
}

.color-text-3 {
	color: #AA60FA;
}

.color-gray {
	color: #8c8c8c;
}
</style>