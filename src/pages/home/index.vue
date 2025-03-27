<route lang="json5" type="home">
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
			<div class="w-full relative h-752rpx">
				<div class=" w-full absolute inset-0 z-10">
					<swiper class="w-full  h-752rpx" :indicator-dots="false" circular @change="onSwiperChange">
						<swiper-item v-for="(item, index) in swiperItems" :key="index"
							class="flex justify-center items-center relative">
							<div class="w-full h-752rpx absolute z-1 bg-#4A260C99">
								<image :src="item.coverText" mode="aspectFill" class="w-full h-full" />
							</div>

						</swiper-item>
					</swiper>
				</div>
				<!-- <div class=" w-full absolute inset-0">
					<swiper class="w-full  h-752rpx" :indicator-dots="false" circular>
						<swiper-item v-for="(item, index) in swiperItems" :key="index"
							class="flex justify-center items-center relative">
							<view class="w-full  h-752rpx relative" :class="'swiper-item' + index">
								<image :animation="index==activeIndex?showpic:hidepic" :lazy-load="true" :src="item.swiperImg" mode="aspectFill" class="w-full h-full" />
							</view>
						</swiper-item>
					</swiper>
				</div> -->
				<view class="banner1 w-full absolute inset-0  h-752rpx " @touchstart="touchstart" @touchend="touchend">
					<!-- 使用uniapp动画 -->
					<image class="pic w-full h-752rpx" v-for="(item, index) in swiperItems" :key="index"
						:animation="index == activeIndex ? showpic : hidepic" :lazy-load="true" :src="item.swiperImg"
						mode="aspectFill">
					</image>

					<!-- 使用css动画 -->
					<!-- <image class="pic" v-for="(item,index) in swiperArray" :key="index"
						 :src="uploadImgUrl + item.fileAddress" mode="aspectFill" :class="index == num ? 'show_img':'hidden_img' "></image> -->
				</view>
			</div>
			<div class="w-full flex flex-col justify-center items-center -mt-70rpx relative z-12">
				<div class="bg-white/50 backdrop-blur-md rounded-24rpx p-40rpx w-606rpx">
					<div class="w-full flex justify-center items-center">
						<div class="w-218rpx h-212rpx mr-24rpx" @click="toAI">
							<img src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250216/NM9SxrzwarrHuXrwe4Bk68x9wcN8h0q0KZZJBcJ2.png"
								alt="">
						</div>
						<div class="flex flex-col justify-between items-center h-212rpx">
							<div class="home-button" @click="toAssessment('2')">
								<div class="home-button-icon w-364rpx h-94rpx">
									<image class="w-364rpx h-94rpx" src="/static/images/home/组合 8 (4).png"
										mode="widthFix" />
								</div>
								<!-- <div class="home-button-icon"
									style="width:100%;height: 100%; background-image: url('../../static/images/home/组合\ 8\ \(4\).png'); background-repeat: no-repeat; background-size: cover;">
								</div> -->
							</div>
							<div class="home-button" @click="toAssessment('1')">
								<div class="home-button-icon w-364rpx h-94rpx">
									<image class="w-364rpx h-94rpx" src="/static/images/home/组合 8 (5).png"
										mode="widthFix" />
								</div>
								<!-- <div class="home-button-icon"
									style="width:100%;height: 100%; background-image: url('../../static/images/home/组合\ 8\ \(5\).png'); background-repeat: no-repeat; background-size: cover;">
								</div> -->
							</div>
						</div>
					</div>
					<!-- <button open-type='contact' class="custom-btn" @click="toAssessment('3')"> -->
					<button open-type='contact' class="custom-btn">
						<image mode="widthFix" class="btn-image"
							src="http://pet-mp-dev.oss-cn-shenzhen.aliyuncs.com/lumenshop/811f5a14-ef1c-40da-9f6c-11adad2fd754.png"
							alt="" />
					</button>
				</div>
			</div>
		</div>
		<div class="w-686rpx flex mx-auto items-center justify-between mt-32rpx">
			<div class="w-238rpx h-232rpx" @click="handleShop">
				<image mode="aspectFill"
					src="http://pet-mp-dev.oss-cn-shenzhen.aliyuncs.com/lumenshop/77b9929e-bf40-42d4-91e5-bd752aeb682c.png"
					alt="" />
			</div>
			<div class="w-422rpx h-232rpx" @click="handleHotActive">
				<image mode="aspectFill"
					src="http://pet-mp-dev.oss-cn-shenzhen.aliyuncs.com/lumenshop/bcfc8f7b-51ac-49c6-a69e-d8757b1e765a.png"
					alt="" />
			</div>
		</div>
		<!-- <button open-type='contact' session-from=''
			class="fixed w-80rpx h-80rpx rounded-full  bottom-320rpx right-0rpx">
			<div class="fixed bottom-340rpx right-0rpx w-80rpx h-80rpx rounded-full overflow-hidden block">
				<img src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241201/LAAxcoG2lhnjNiRaaTfXdWEGwGs5bAY0qB5wQJmU.png"
					alt="">
			</div>

		</button> -->
	</div>
</template>

<script setup>
import CustomHeader from '@/components/customHeader'

import {
	ref,
	onMounted
} from 'vue'
let title = ref('hello')
let setImgTime = ref('')
let startData = ref({})
let swiperItems = ref([ //顶部轮播图
	{ swiperImg: 'http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250219/0kv4dbEU9Cdkbi6eKgC6Dphx7tRA7jsy8o3uXeEc.png', coverText: 'http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250219/Jyn6g8dQtbPCW2auBAeX50r30q7cuN7zoVzoqLYL.png' },
	{ swiperImg: 'http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241025/3p0tc8uMtyDvb3atweqNdHxwaNtUdbWzUr7y6fMV.png', coverText: 'http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250219/5zOT1f6lodBUUKf0tfNRAHzu362UXpWNi4wkl0k6.png' }
])
let showpic = ref(null)
let hidepic = ref(null)

let activeIndex = ref(0) // 当前轮播图的索引
let animation = ref('')
// onShareAppMessage = () => {
// 	return {
// 		title: "喵博士 X 汪博士",
// 		query: '/pages/home/index',
// 		summary: "您的爱宠私人医生",
// 		imageUrl: "https://attachments.tower.im/tower/1f523d73daf38e36394e9c1dbf2310ab?version=auto"
// 	};
// }
onShareAppMessage(() => {
	return {
		title: "喵博士 X 汪博士",
		query: '/pages/home/index',
		summary: "您的爱宠私人医生",
		imageUrl: "../../static/images/home/52671742839472_.pic.jpg"
	};
})
const animationtest = () => { //页面加载后的自动轮播

	changePic(0);
}
const changePic = (num) => { //轮播主方法
	clearInterval(setImgTime.value); //先将已有的计时器清除
	var animation = uni.createAnimation({
		timingFunction: 'ease',
		delay: 0
	}) //创建一个动画实例
	animation.value = animation
	activeIndex.value = num++
	if (num >= swiperItems.value.length) {
		num = 0;
	}
	// 防止刚进入的时候滑动图片没有动画
	//淡入时间
	animation.opacity(1).step({
		duration: 2000
	})
	showpic.value = animation.export() //输出动画
	//淡出时间
	animation.opacity(0).step({
		duration: 2000
	})
	hidepic.value = animation.export()
	// setImgTime.value = setInterval(function () { //循环
	// 	activeIndex.value = num++
	// 	if (num > swiperItems.value.length - 1) {
	// 		num = 0;
	// 	}
	// 	//淡入
	// 	animation.opacity(1).step({
	// 		duration: 2000
	// 	})
	// 	showpic.value = animation.export() //输出动画
	// 	//淡出
	// 	animation.opacity(0).step({
	// 		duration: 2000
	// 	})
	// 	hidepic.value = animation.export()
	// 	// }, 5000)
	// }, 5000)
}
const touchstart = (e) => { //滑动开始的位置，记录位置的坐标。
	startData.value.clientX = e.changedTouches[0].clientX;
	startData.value.clientY = e.changedTouches[0].clientY;
}
const touchend = (e) => { //滑动结束的点，记录坐标，减去起点位置
	const subX = e.changedTouches[0].clientX - startData.value.clientX;
	const subY = e.changedTouches[0].clientY - startData.value.clientY;
	if (subY > 50 || subY < -50) { // console.log('上下滑')
	} else {
		if (subX > 50) { //右滑，显示前一张，当前的页面减一。如果当前页面是第一张，显示最后一张。
			if (activeIndex.value == 0) {
				activeIndex.value = swiperItems.value.length - 1;
			} else {
				--activeIndex.value
			}
			changePic(activeIndex.value);
		} else if (subX < -50) { //左滑，显示下一张，当前的页面加一。如果当前页面是最后一张，显示第一张。
			if (activeIndex.value == swiperItems.value.length - 1) {
				activeIndex.value = 0;
			} else {
				++activeIndex.value
			}
			changePic(activeIndex.value);
		}
	}
}
const toAI = () => {
	uni.navigateToMiniProgram({
		appId: 'wx75c75149744b7b84',
	})
}
const onSwiperChange = (event) => { //监听当前轮播图 索引
	activeIndex.value = event.detail.current;
	console.log(event)
	changePic(activeIndex.value);
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
	uni.switchTab({
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
	animationtest()
})
onShow(async (options) => {
	console.log('小程序加载')
	console.log(options)
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
	flex-direction: column;
	width: 308rpx;
}

.home-button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 364rpx;
	height: 94rpx;
	font-size: 32rpx;
	color: #222;
	border-radius: 24rpx;

	.home-button-icon {
		width: 364rpx;
		height: 94rpx;
	}
}
</style>
<style>
.transition-opacity {
	transition: opacity 0.5s ease;
}
</style>
<style scoped>
/* 关键样式 */
.custom-btn {
	position: relative;
	/* 定位基准 */
	width: 606rpx;
	height: 94rpx;
	padding: 0 !important;
	/* 清除默认内边距 */
	margin: 24rpx auto 0;
	/* 保持原有外边距 */
	line-height: 1;
	/* 避免幽灵节点影响 */
	background: none !important;
	/* 清除默认背景色 */
	border: none !important;
	/* 移除默认边框 */
}

/* 清除微信小程序按钮的默认::after样式 */
.custom-btn::after {
	display: none !important;
}

.btn-image {
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	/* 覆盖 flex 布局影响 */
	width: 100% !important;
	height: 100% !important;
}
</style>
<style>
/* 轮播图 */
.banner1 {
	position: relative;
	width: 100%;
	height: 882rpx;
}

.img_zs_sty {
	top: 732rpx;
}

.pic {
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	width: 100%;
	height: 752rpx;
}

.show_img {
	animation: showImg 2s 0s 1 forwards;
}

@keyframes showImg {
	from {
		opacity: 0
	}

	to {
		opacity: 1
	}
}

.hidden_img {
	animation: hiddenImg 2s 0s 1 forwards;
}

@keyframes hiddenImg {
	from {
		opacity: 1
	}

	to {
		opacity: 0
	}
}

/* 指示点 */
.dot {
	position: absolute;
	display: flex;
}

.Select {
	width: 60rpx !important;
	height: 6rpx;
	margin-left: 10rpx;
	background-color: #ccc;
	border-radius: 10rpx;
}

.Unchecked {
	width: 10rpx;
	height: 6rpx;
	margin-left: 10rpx;
	background-color: #ccc;
	border-radius: 10rpx;
}

.Select1 {
	width: 60rpx;
	height: 6rpx;
	margin-left: 10rpx;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 10rpx;
	animation: Select1 var(--img_time) ease 1 forwards;
}

.Unchecked1 {
	width: 10rpx;
	height: 6rpx;
	margin-left: 10rpx;
	background-color: rgba(255, 255, 255, 0) !important;
	border-radius: 10rpx;
}

@keyframes Select1 {
	from {
		width: 10rpx;
		height: 6rpx;
	}

	to {
		width: 60rpx;
		height: 6rpx;
	}
}
</style>