<route lang="json5" type="home">
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
						<pet-card style="width: 622rpx;" class="overflow-hidden rounded-24rpx" showResult
							:cover="item.cover" :name="item.name" v-bind:toJump="false" :id="item.id"
							:assessmentId="item.type.id" :toJump="false" :breed="item.breed.name" :sex="item.sex"
							:time="item.birth_at"></pet-card>
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
						<div class="w-112rpx h-122rpx" v-show="item.assessment.id === 3 && currentPetType === 1">
							<img src="../../static/images/report/狗-定制健康.png" alt="">
						</div>
						<div class="w-112rpx h-122rpx" v-show="item.assessment.id === 3 && currentPetType === 2">
							<img src="../../static/images/report/猫-定制健康.png" alt="">
						</div>
						<div class="w-112rpx h-122rpx" v-show="item.assessment.id === 2 && currentPetType === 2">
							<img src="../../static/images/report/猫-MBTI.png" alt="">
						</div>
						<div class="w-112rpx h-122rpx" v-show="item.assessment.id === 1 && currentPetType === 1">
							<img src="../../static/images/report/狗-MBTI.png" alt="">
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
										{{ item.dimensions.length <= 4 ? _item.reverse_value : _item.value }}</div>
											<div class="mx-8rpx h-20rpx bg-#E5E5E5 rounded-4rpx flex-1  flex items-center"
												:class="`${_item.score < 0 ? `${item.dimensions.length <= 4 ? 'justify-start' : `justify-end`}` : `${item.dimensions.length <= 4 ? 'justify-end' : `justify-start`}`}`">
												<div class="h-full flex items-center"
													:class="`  ${item.dimensions.length <= 4 ? `color-${_index}` : `${_item.score < 0 ? 'bg-#F15912' : 'bg-#20CEB0'}`}`"
													:style="`width: ${(Math.abs(_item.score) * 10) / 2 * 0.7}%;`">
												</div>
											</div>
											<div class="text-#8C8C8C text-24rpx"
												:class="` ${item.dimensions.length <= 4 ? 'w-18rpx text-right' : `${_item.score < 0 ? 'text-#F15912' : 'text-8C8C8C'}`}  ${item.dimensions.length <= 4 ? `${_item.score > 0 ? `color-text-${_index}` : `color-gray`}` : 'text-#20CEB0'}`">
												{{ item.dimensions.length <= 4 ? _item.value : _item.reverse_value
													}}</div>
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
let currentPetType = ref(0)
let reportList = ref([])
let isLoading = ref(false)
let recentReviews = ref({})
let bindClick = async (item) => {
	try {
		uni.showLoading({
			title: '加载中'
		});
		let result = await deleteReport(item.id)
		uni.hideLoading()
		uni.showToast({
			title: result.msg,
			icon: 'none'
		})
		if (result.code === 200) {
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
	currentPetType.value = cardList.value[e.detail.current].type.id
	console.log(currentCardId.value, '-----', cardList.value[e.detail.current].type.id, '-----', currentPetType.value)
	try {
		isLoading.value = true
		uni.showLoading({
			title: "正在加载...",
		})
		let resReport = await reports({ pet_card_id: currentCardId.value === 0 ? cardList.value[0].id : currentCardId.value })
		recentReviews.value = resReport.data[0]
		reportList.value = resReport.data.reverse();
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
		console.log('object', petCardsList)
		console.log(petCardsList)
		if (petCardsList.length !== 0) {
			let resReport = await reports({ pet_card_id: petCardsList[0].id })
			console.log('报告', resReport)
			if (resReport.length !== 0) {
				reportList.value = resReport.data.reverse();
			}
			uni.hideLoading()
		}
		cardList.value = petCardsList
		currentPetType.value = petCardsList[0].type.id
		uni.hideLoading()
		console.log('宠物卡片', cardList.value)
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
	width: 324rpx;
	height: 92rpx;
	margin: 0 auto;
	margin-top: 100rpx;
	font-size: 32rpx;
	color: #FCE068;
	background-color: #222;
	border-radius: 24rpx;
}

.content {
	position: relative;
	flex-direction: column;
	width: 100%;
	overflow: hidden;
	border-radius: 50% / 10%;
	border-top-left-radius: 0%;
	border-top-right-radius: 0%;

	.swiper-box {
		flex-direction: column;
		width: 750rpx;
		height: 220rpx;
		// border: 1px solid red;
	}

	.swiper-item {
		width: 622rpx;
		height: 220rpx;
		line-height: 220rpx;
		text-align: center;
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
		// border: 1px solid orchid;
		height: 18rpx;
		margin-bottom: 40rpx;
		font-size: 16rpx;
		font-weight: bolder;
		color: black;
	}

	&-property {
		height: 40rpx;
		margin-bottom: 26rpx;

		&-variety {
			margin: 0 12rpx;
			font-size: 28rpx;
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
	flex-direction: column;
	width: 670rpx;
	margin: 0 auto;
	margin-top: 34rpx;

	&-item {
		width: 670rpx;
		min-height: 172rpx;
		padding: 28rpx 0;
		background-color: #F7F7F7;
		border-radius: 16rpx;


		&-left {
			width: 100rpx;
			height: 78rpx;
			margin: 0 34rpx;
		}

		&-line {
			width: 1rpx;
			height: 172rpx;
			margin-right: 16rpx;
			background-color: #c8c8c8;
		}

		&-right {
			flex: 1;
			flex-direction: column;

			&-property {
				flex: 1;

				// border: 1px solid red;
				&-title {
					margin-right: 40rpx;
					font-size: 24rpx;
					color: #8c8c8c;
				}

				&-content {
					width: 340rpx;
					height: 20rpx;

					// border: 1px solid blue;
					&-left {
						font-size: 24rpx;
						color: #faad14;
					}

					&-middle {
						flex: 1;
						height: 20rpx;
						margin: 0 8rpx;
						background-color: #e5e5e5;
						border-radius: 4rpx;

						// border: 1px solid red;
						&-step {
							width: 200rpx;
							height: 20rpx;
							background-color: #faad14;
							border-radius: 4rpx;
						}
					}

					&-right {

						font-size: 24rpx;
						color: #8c8c8c;
					}
				}
			}
		}
	}
}

.logo {
	position: absolute;
	top: 112rpx;
	left: 32rpx;
	z-index: 9999;
	width: 296rpx;
	height: 22rpx;
}

.add-service {
	width: 686rpx;
	height: 88rpx;
	margin-top: 208rpx;
	margin-bottom: 32rpx;
	color: #222;
	background-color: #fff;
	border-radius: 24rpx;

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
		margin-right: 28rpx;
		font-size: 22rpx;
	}
}


.color-0 {
	color: #faad14;
	background-color: #faad14;
}

.color-1 {
	color: #3B8AFA;
	background-color: #3B8AFA;
}

.color-2 {
	color: #F15912;
	background-color: #F15912;
}

.color-3 {
	color: #AA60FA;
	background-color: #AA60FA;
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