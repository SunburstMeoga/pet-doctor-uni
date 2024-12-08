<route lang="json5">
	{
	  style: {
		navigationBarTitleText: '测测爱宠的MBTI',
	  },
	}
	</route>
<template>
	<view class="container flex justify-start items-center">
		<!-- <view class="content"> -->
		<swiper :circular="false" :autoplay="false" class="swiper-box flex justify-start items-center" @change="change"
			:current="currentQuestion" duration="300" style="min-height: 100vh;">
			<swiper-item v-for="(item, index) in questionItems" :circular="false" :autoplay="false" :key="index"
				@touchmove.stop style="min-height: 100vh;">
				<view class="content">
					<view class="content-theme flex justify-start items-center">
						<view class="content-theme-number flex justify-center items-center">
							<view class="content-theme-number-current">{{ index + 1 }} </view>

							<view class="content-theme-number-total"> / {{ questionItems.length <= 9 ? '0' +
			questionItems.length : questionItems.length }}</view>
							</view>
							<!-- <view class="content-theme-type">【基本信息】</view> -->
						</view>
						<view class="content-question">
							<view class="content-question-title">{{ item.title }}</view>
							<view class="content-question-options">
								<view @click="handleOptions(_item, item, index)" class="content-question-options-item"
									:class="_item.id === item.selectid ? 'content-question-options-item-active' : 'content-question-options-item-unactive'"
									v-for="(_item, _index) in item.answers" :key="_index">
									<!-- <view class="content-question-options-item-title">{{item.title}}</view> -->
									<view class="content-question-options-item-content">{{ _item.text }}</view>
								</view>
							</view>
						</view>
					</view>
			</swiper-item>
		</swiper>
		<!-- </view> -->

		<view v-if="!selectedOption && currentQuestion === 0" class="go-back flex justify-center items-center">
			<view class="go-back-button">
				返回
			</view>
		</view>
		<view v-if="currentQuestion !== 0 && currentQuestion !== questionItems.length"
			class="go-back flex justify-center items-center">
			<view class="go-back-button" @click="toPreQuestion()">
				返回上一题
			</view>
		</view>
		<view v-if="isFinishAnswer" class="go-back last-question  flex justify-around items-center">
			<!-- <view class="go-back-check" @click="toPreQuestion()">上一题</view> -->
			<view class="go-back-result">
				查看结果
			</view>
		</view>
	</view>
</template>

<script setup>
import { assessmentDetails, createReport } from '@/service/index'
let optionsItems = ref([])
let questionItems = ref([])
let selectedOption = ref(null)
let currentQuestion = ref(0)
let answerids = ref([])
let cardId = ref('')
let assessmentId = ref('')
let filteredData = ref([])
let selectedIds = ref([])

let isFinishAnswer = ref(false)
// let swiperDotIndex = ref(0)

let change = (e) => {
	currentQuestion.value = e.detail.current;
	console.log(currentQuestion.value)
}
let toPreQuestion = () => {
	currentQuestion.value = --currentQuestion.value
	console.log(currentQuestion.value)
}
let handleOptions = async (_item, item, index) => {
	questionItems.value[index].selectid = _item.id
	// let uniqueArr = [...new Set(filteredData.value)]
	updateSelectedIds()
	if (currentQuestion.value < questionItems.value.length - 1) {
		currentQuestion.value = ++currentQuestion.value
	}
	console.log(currentQuestion.value)
	if (selectedIds.value[selectedIds.value.length - 1] !== undefined) {
		console.log('答题完成，可以生成报告');
		uni.showLoading({
			title: '正在生成报告...'
		})
		console.log({ assessment_id: assessmentId.value, answer_ids: selectedIds.value.sort((a, b) => a - b), pet_card_id: cardId.value })
		let result = await createReport({ assessment_id: assessmentId.value, answer_ids: selectedIds.value.sort((a, b) => a - b), pet_card_id: cardId.value })
		console.log('报告结果', result)
		if (result.data.id) {
			uni.redirectTo({
				url: `/pages/report/report-result?reportId=${result.data.id}&cardId=${cardId.value}`
			})
		}

	}
}
let updateSelectedIds = () => {
	filteredData.value = questionItems.value.map(item => item.selectid);
	selectedIds.value = [...new Set(filteredData.value)]
	// console.log(selectedIds.value.length)
	console.log("新的数组：", selectedIds.value.sort((a, b) => a - b));
}
//获取问题列表
let getAssessmentDetails = async (assessmentType) => {
	try {
		const result = await assessmentDetails(assessmentType);
		questionItems.value = result.data.questions
		// questionItems.value.map(item => {
		// 	item.selectid = null
		// })
		console.log('wenti', result)
		console.log('问题列表', questionItems.value)
	} catch (err) {
		console.log(err)
	}
}
onMounted(() => {
	getAssessmentDetails(assessmentId.value)
})
onLoad((options) => {
	if (options.cardId || options.assessmentId) {
		cardId.value = options.cardId
		assessmentId.value = options.assessmentId
		console.log('assessmentId=======', assessmentId.value)
		if (assessmentId.value === '3' || assessmentId.value === 3) {
			uni.setNavigationBarTitle({
				title: '爱宠的健康测评'
			});
		} else {
			uni.setNavigationBarTitle({
				title: '测测爱宠的MBTI'
			});
		}

	}
})
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	color: #222;
	flex-direction: column;

	.swiper-box {
		width: 100%;
		height: 800rpx;
		flex-direction: column;
	}

	.content {
		padding-top: 200rpx;
		width: 622rpx;
		margin: 0 auto;

		&-theme {
			width: 100%;
			margin-bottom: 160rpx;

			&-number {
				border: 1rpx solid #222;
				border-radius: 49%;
				width: 268rpx;
				height: 106rpx;

				&-current {
					font-weight: bold;
					font-size: 72rpx;
				}

				&-total {
					font-size: 40rpx;
					color: #8c8c8c;
				}
			}

			&-type {
				margin-left: 8rpx;
				font-size: 40rpx;
			}
		}

		&-question {
			width: 622rpx;

			&-title {
				font-size: 48rpx;
				margin-bottom: 96rpx;
				width: 480rpx;
			}

			&-options {
				width: 622rpx;

				&-item {
					width: 100%;
					border-radius: 24rpx;

					text-align: center;
					padding: 24rpx 0;
					margin-bottom: 64rpx;

					&-title {
						font-size: 36rpx;
						margin-bottom: 8rpx;
						font-weight: medium;
					}

					&-content {
						font-size: 28rpx;
					}
				}
			}
		}
	}

	.go-back {
		position: fixed;
		left: 0;
		bottom: 88rpx;
		width: 100%;

		&-button {
			width: 486rpx;
			height: 92rpx;
			background-color: #222;
			color: #fce068;
			font-size: 32rpx;
			text-align: center;
			line-height: 92rpx;
			border-radius: 24rpx;
		}

		&-check {
			width: 200rpx;
			height: 92rpx;
			background-color: #f0f0f0;
			color: #222;
			font-size: 32rpx;
			text-align: center;
			line-height: 92rpx;
			border-radius: 24rpx;
		}

		&-result {
			width: 462rpx;
			height: 92rpx;
			background-color: #222;
			color: #fce068;
			font-size: 32rpx;
			text-align: center;
			line-height: 92rpx;
			border-radius: 24rpx;
		}
	}
}

.content-question-options-item-active {
	background-color: rgba(252, 224, 104, .1);
	border: 1rpx solid #FCE068;
	color: #222;
}

.content-question-options-item-unactive {
	background-color: #f5f5f5;
	border: 1rpx solid #f5f5f5;
	color: #8c8c8c;
}
</style>