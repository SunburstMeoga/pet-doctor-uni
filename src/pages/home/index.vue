<route lang="json5">
	{
	  style: {
		navigationStyle: 'custom',
		navigationBarTitleText: '首页',
		enableShareAppMessage: true,
   		 enableShareTimeline: true
	  },
	}
	</route>
<template>
	<div class="bg-gradient-to-b to-#FEFCEF  from-#FFF5CD content">
		<CustomHeader>
			<template #left>
				<div class="w-295rpx h-44rpx">
					<image mode="aspectFit"
						src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250217/TMMYNzv72B3AnsQQkl6wtt3Ii8uEd58dgupYNFEj.png"
						alt="" />
				</div>
			</template>

		</CustomHeader>
		<div class="w-full">
			<!-- <div class="w-full relative">
				<swiper class="w-full h-752rpx" :indicator-dots="false" indicator-type="expand"
					indicator-color="rgba(255, 255, 255, 0.5)" indicator-active-color="#ffffff"
					@change="onSwiperChange">
					<swiper-item v-for="(item, index) in swiperItems" :key="index"
						class="flex justify-center items-center">
						<view class="w-full h-752rpx">
							<image :src="item.swiperImg" mode="aspectFill" class="w-full h-full" />
						</view>
					</swiper-item>
				</swiper>
				<div v-for="(item, index) in swiperItems" :key="index"
					class="absolute top-0 left-0 w-full h-752rpx flex justify-center items-center transition-opacity duration-500"
					:class="{ 'opacity-0': activeIndex !== index, 'opacity-100': activeIndex === index }">
					<image :src="item.coverText" mode="aspectFit" class="w-full h-full" />
				</div>
			</div> -->
			<div class=" w-full">
				<swiper class="w-full  h-752rpx" :indicator-dots="false" indicator-type="expand"
					indicator-color="rgba(255, 255, 255, 0.5)" indicator-active-color="#ffffff">
					<swiper-item v-for="(item, index) in swiperItems" :key="index"
						class="flex justify-center items-center relative">
						<div class="w-full h-752rpx absolute z-1 bg-#4A260C99">
							<image :src="item.coverText" mode="aspectFill" class="w-full h-full" />
						</div>
						<view class="w-full  h-752rpx relative" :class="'swiper-item' + index">
							<image :src="item.swiperImg" mode="aspectFill" class="w-full h-full" />
						</view>
					</swiper-item>
				</swiper>
			</div>
			<div class="w-full flex flex-col justify-center items-center -mt-70rpx">
				<div class="bg-white/50 backdrop-blur-md rounded-24rpx p-40rpx w-606rpx">
					<div class="w-full flex justify-center items-center">
						<div class="w-218rpx h-212rpx mr-24rpx" @click="toAI">
							<img src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250216/NM9SxrzwarrHuXrwe4Bk68x9wcN8h0q0KZZJBcJ2.png"
								alt="">
						</div>
						<div class="flex flex-col justify-between items-center h-212rpx">
							<div class="home-button" @click="toAssessment('2')">
								<div class="home-button-icon"
									style="width:100%;height: 100%; background-repeat: no-repeat; background-size: cover; background-image: url('https://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250217/Ho8B7yTLmCXwN1hd7HDwdyMvEwvOToQasLFnS3vt.png');">
								</div>
							</div>
							<div class="home-button" @click="toAssessment('1')">
								<div class="home-button-icon"
									style="width:100%;height: 100%; background-repeat: no-repeat; background-size: cover; background-image: url('http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250217/Ho8B7yTLmCXwN1hd7HDwdyMvEwvOToQasLFnS3vt.png');">
								</div>
							</div>
						</div>
					</div>
					<div class="w-606rpx flex justify-center items-center mt-24rpx h-94rpx" @click="toAssessment('3')">
						<img mode="aspectFill"
							src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250217/a7UwvqjDHAFa4o63PCauBYxhsxnO2Vc2um5yxdi8.png"
							alt="">
					</div>
				</div>
			</div>
		</div>
		<div class="w-686rpx flex mx-auto items-center justify-between mt-32rpx">
			<div class="w-238rpx h-232rpx" @click="handleShop">
				<image mode="aspectFill"
					:src="`http://47.238.229.145:8000/media/20241108/fqon6fCvn9uBCx7leDWaijzoe2j4llrscIrQ39FC.png`"
					alt="" />
			</div>
			<div class="w-422rpx h-232rpx" @click="handleHotActive">
				<image mode="aspectFill"
					src="http://47.238.229.145:8000/media/20241108/OfBk7SgW5XFvapDKxPv8Abp2HE7xMJxe8KtGokXu.png"
					alt="" />
			</div>
		</div>
	</div>
</template>

<script setup>
import CustomHeader from '@/components/customHeader'

import {
	ref,
	onMounted
} from 'vue'
let title = ref('hello')
let swiperItems = ref([ //顶部轮播图
	{ swiperImg: 'http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250219/0kv4dbEU9Cdkbi6eKgC6Dphx7tRA7jsy8o3uXeEc.png', coverText: 'http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250219/Jyn6g8dQtbPCW2auBAeX50r30q7cuN7zoVzoqLYL.png' },
	{ swiperImg: 'http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241025/3p0tc8uMtyDvb3atweqNdHxwaNtUdbWzUr7y6fMV.png', coverText: 'http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250219/5zOT1f6lodBUUKf0tfNRAHzu362UXpWNi4wkl0k6.png' }
])
let activeIndex = ref(0) // 当前轮播图的索引
const onShareAppMessage = () => {
	return {
		title: "喵博士 X 汪博士",
		query: '/pages/home/index',
		summary: "您的爱宠私人医生",
		imageUrl: "https://attachments.tower.im/tower/1f523d73daf38e36394e9c1dbf2310ab?version=auto",
		// imageUrl: '/static/share_image.png' // 分享图片的路径（注意：某些平台可能不支持）
	};
}
const toAI = () => {
	uni.navigateToMiniProgram({
		appId: 'wx75c75149744b7b84',
	})
}
const onSwiperChange = (event) => { //监听当前轮播图 索引
	activeIndex.value = event.detail.current;
}
let toAssessment = (assessmentId) => {
	if (!uni.getStorageSync('token')) {
		uni.showModal({
			content: '登录才可进行测评哦~',
			showCancel: true,
			confirmText: '前往登录',
			success: (e) => {
				console.log(e)
				if (e.confirm) {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}
			},

		})
		return
	}
	console.log(`${assessmentId}`)
	uni.navigateTo({
		url: `/pages/personal/petIDCardList?assessmentId=${assessmentId}`
	})
}
let handleShop = () => {
	uni.navigateTo({
		url: '/pages/home/product_list'
	})
}
let handleHotActive = () => {
	uni.navigateTo({
		url: '/pages/home/group_buying'
	})
}
onMounted(async () => {
	console.log(title.value)
})
</script>

<style lang="scss" scoped>
.content {
	height: calc(100vh - var(--window-top));
}

.home-operating {
	position: absolute;
	bottom: 50rpx;
	left: 0;
	width: 308rpx;
	flex-direction: column;
}

.home-button {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 364rpx;
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
</style>
<style>
.transition-opacity {
	transition: opacity 0.5s ease;
}
</style>