<route lang="json5">
	{
	  style: {
		navigationStyle: 'custom',
		navigationBarTitleText: '首页',
	  },
	}
	</route>
<template>
	<view class="content">
		<view class="logo">
			<image mode="aspectFit"
				src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241127/tacl0itkBbPXmlK9T2aMSjFqC7ZTORzQWF0FptIo.png"
				alt="" />
		</view>
		<view class="home-banner">
			<view class="home-video">
				<!-- <video style="height: 1120rpx; width: 100%;" :muted="true" :loop="true" :autoplay="true"
					:controls="false"
					src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241023/jIaGiG9MPZYKGZXsOI9pZe61y2IlXIFMHz5t7Q0g.mp4"></video> -->
				<image style="height: 1120rpx; width: 100%;" mode="aspectFill"
					src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241025/3p0tc8uMtyDvb3atweqNdHxwaNtUdbWzUr7y6fMV.png">
				</image>
			</view>
			<view class="home-operating flex justify-end items-center">
				<view class="home-button home-mbti" @click="toAssessment('2')">
					<!-- <view>喵喵MBTI测评</view> -->
					<view class="home-button-icon"
						style="width:100%;height: 100%; background-repeat: no-repeat; background-size: cover; background-image: url('http://47.238.229.145:8000/media/20241108/QMdEifybyGQ6K4T4rtw7VY56NpmL4XL80u9Ob85L.png');">
						<!-- <image src="/static/images/icon/right.png" mode="aspectFill"></image> -->
					</view>
				</view>
				<view class="home-button home-mbti" @click="toAssessment('1')">
					<!-- <view>汪汪MBTI测评</view> -->
					<view class="home-button-icon"
						style="width:100%;height: 100%; background-repeat: no-repeat; background-size: cover; background-image: url('http://47.238.229.145:8000/media/20241108/QMdEifybyGQ6K4T4rtw7VY56NpmL4XL80u9Ob85L.png');">
						<!-- <image src="/static/images/icon/right.png" mode="aspectFill"></image> -->
						<!-- {{getApp().go}} -->
					</view>
				</view>

				<view class="home-button home-eval" @click="toAssessment('3')">
					<!-- <view>定制健康测评</view> -->
					<view class="home-button-icon"
						style="width:100%;height: 100%; background-repeat: no-repeat; background-size: cover; background-image: url('http://47.238.229.145:8000/media/20241108/Sgk6WETT1GVMPbpBYoDz1eMtmrwOI08v1d2ApVBW.png');">
						<!-- <image src="/static/images/icon/right.png" mode="aspectFill"></image> -->
					</view>
				</view>
			</view>
		</view>
		<view class="acvive">
			<view class="one" @click="handleShop">
				<!-- <view class="word">
					商城
				</view> -->
				<image mode="aspectFill"
					:src="`http://47.238.229.145:8000/media/20241108/fqon6fCvn9uBCx7leDWaijzoe2j4llrscIrQ39FC.png`"
					alt="" />
			</view>
			<view class="two" @click="handleHotActive">
				<!-- <view class="word">
					热门活动
				</view> -->
				<image mode="aspectFill"
					src="http://47.238.229.145:8000/media/20241108/OfBk7SgW5XFvapDKxPv8Abp2HE7xMJxe8KtGokXu.png"
					alt="" />
			</view>
		</view>
	</view>
</template>

<script setup>
import {
	ref,
	getCurrentInstance,
	onMounted
} from 'vue'
// import MyTabbarVue from '../../components/my-tabbar.vue';
import {
	login,
	petCards
} from '@/service/index'
let title = ref('hello')
let cardsCount = ref(0)
let toAssessment = (assessmentId) => {
	if (cardsCount.value <= 0) {
		uni.navigateTo({
			url: `/pages/personal/identityInfo?assessmentId=${assessmentId}`
		})
	} else {
		uni.navigateTo({
			url: `/pages/home/star_answer?assessmentId=${assessmentId}`
		})
	}
}
let handleShop = () => {
	uni.showToast({
		title: '暂未开放',
		icon: 'none'
	})
}
let handleHotActive = () => {
	uni.navigateTo({
		url: '/pages/home/group_buying'
	})
}
onMounted(async () => {
	console.log(title.value)
	let petCardsList = await petCards()
	console.log(petCardsList.data.data.length, petCardsList)
	cardsCount.value = petCardsList.data.data.length
})
</script>

<style lang="scss" scoped>
.home-operating {
	position: absolute;
	bottom: 50rpx;
	left: 0;
	width: 100%;
	flex-direction: column;
}

.home-button {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 308rpx;
	height: 94rpx;
	color: #222;
	font-size: 32rpx;
	border-radius: 24rpx;

	&-title {}

	&-icon {
		// margin-left: 16rpx;
		width: 8rpx;
		height: 16rpx;
		// border: 1px solid red;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
}

.home-mbti {
	background-color: #fff;
	margin-bottom: 24rpx;
}

.home-eval {
	background-color: #fce068;
	// margin-top: 24rpx;
}

.content {
	position: relative;
	background-color: #FFFBF2;
	height: 100vh;
}

.logo {
	width: 296rpx;
	height: 44rpx;
	position: absolute;
	z-index: 9999;
	top: 112rpx;
	left: 32rpx;
}

.home-banner {
	// width: 100%;
	height: 1158rpx;
	/* background-image: url("../../static/images/home/home-banner.png"); */
	position: relative;
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
}

.home-video {
	width: 100%;
	height: 1120rpx;
	position: absolute;
	left: 0;
	top: 0;
}

.acvive {
	width: 100%;
	background-color: #FFFBF2;
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 302rpx;
}

.one {
	width: 238rpx;
	height: 232rpx;
	position: relative;

	.word {
		padding: 20rpx 0 0 20rpx;
		color: #65431D;
		font-size: 40rpx;
		position: absolute;
		left: 0;
		top: 0;
	}
}

.two {
	width: 420rpx;
	height: 232rpx;
	position: relative;

	.word {
		padding: 20rpx 0 0 20rpx;
		color: #65431D;
		font-size: 40rpx;
		position: absolute;
		left: 0;
		top: 0;
	}
}
</style>