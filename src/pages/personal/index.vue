<route lang="json5">
	{
	  style: {
		navigationStyle: 'custom',
		navigationBarTitleText: '',
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
		<view class="infor flex justify-center items-center"
			style="background-image: url('http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241024/TomWHO3jqHYSMV4f0KosXrrxe1tKiVEIy7ODUQ8B.png');">
			<view class="infor-details flex justify-between items-center">
				<view class="infor-details-left flex justify-start items-start">
					<view class="infor-details-left-avator">
						<image :src="userInfoObj.user_avatar" mode="aspectFit"></image>
					</view>
					<view class="infor-details-left-base flex justify-center items-start">
						<view class="infor-details-left-base-name">{{ userInfoObj.user_nickname }}</view>
						<view class="infor-details-left-base-intro">喵博士 X 汪博士</view>
					</view>
				</view>
				<view class="infor-details-right flex justify-end items-center">
					<!-- <view class="infor-details-right-items flex justify-start items-center" style="margin-right: 32rpx;">
						<view class="infor-details-right-items-icon icon iconfont icon-dizhiguanli"></view>
						<view class="infor-details-right-items-word">收货地址</view>
					</view>
					<view class="infor-details-right-items flex justify-start items-center">
						<view class="infor-details-right-items-icon icon iconfont icon-icon-test"></view>
						<view class="infor-details-right-items-word">个人资料</view>
					</view> -->
					<button v-if="!isLogged" class="login flex justify-center items-center" @click="toLogin()">
						登录账号
					</button>
				</view>
			</view>
		</view>
		<view class="vip">
			<view class="vip-content image-bg flex justify-center items-end  bg-cover bg-center"
				style="background-image: url('http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241024/vwD88eHIzONfShetrgShdgPfJahajNFmSbg1FHL0.png');">
				<view class="vip-content-operating flex justify-between items-center">
					<view class="vip-content-operating-items flex justify-center items-center"
						@click="handleOrder('0')">
						<view class="vip-content-operating-items-icon icon iconfont icon-daifukuan"></view>
						<view class="vip-content-operating-items-word">待付款</view>
					</view>
					<view class="vip-content-operating-items flex justify-center items-center"
						@click="handleOrder('1')">
						<view class="vip-content-operating-items-icon icon iconfont icon-daifahuo"></view>
						<view class="vip-content-operating-items-word">待发货</view>
					</view>
					<view class="vip-content-operating-items flex justify-center items-center"
						@click="handleOrder('2')">
						<view class="vip-content-operating-items-icon icon iconfont icon-daishouhuo"></view>
						<view class="vip-content-operating-items-word">待收货</view>
					</view>
					<view class="vip-content-operating-items flex justify-center items-center" style="width: 172rpx;"
						@click="handleOrder(null)">
						<view class="vip-content-operating-items-icon icon iconfont icon-shouye"></view>
						<view class="vip-content-operating-items-word">全部</view>
					</view>
				</view>

			</view>
		</view>

		<button open-type='contact' session-from=''
			class="w-full flex justify-center items-center h-96rpx  block mt-32rpx">
			<div class="w-686rpx h-96rpx  mx-auto">
				<img src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241024/OjTrhJAdrMLyrYxEvW60FiQBXIvzkWZ1g6qKb4Vj.png"
					alt="">
			</div>

		</button>

		<!-- <view class="service image-bg bg-cover bg-center" @click="addCustom"
			style="background-image: url('http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241024/OjTrhJAdrMLyrYxEvW60FiQBXIvzkWZ1g6qKb4Vj.png');">

		</view> -->
		<view class="other-info flex items-center">
			<view class="other-info-items" style="border-bottom: 1rpx solid #E6E6E6" @click="toPetList">爱宠身份证</view>
			<view @click="toPolicy()" class="other-info-items">喵汪博士隐私申明</view>
		</view>
	</view>
</template>

<script setup>
import {
	login, userInfo, bindUser
} from '@/service/index'
onShow(() => {
	console.log('token', uni.getStorageSync('token'))
	getUserInfo()
	if (uni.getStorageSync('token')) {
		isLogged.value = true
		console.log(isLogged.value)
	} else {
		isLogged.value = false
	}
})
let isLogged = ref(false)
let userInfoObj = ref({})
let imageList = ref(['http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241025/rsXfy7Sd1VSRaURGGtHlFuxsZAuYIl8Ju465ejuS.png'])

let toPolicy = () => {
	uni.navigateTo({
		url: '/pages/home/privacy_policy'
	})
}
const addCustom = () => { //添加专属客服
	uni.previewImage({
		current: 'http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241025/rsXfy7Sd1VSRaURGGtHlFuxsZAuYIl8Ju465ejuS.pngr', // 当前显示图片的http链接
		urls: imageList.value // 需要预览的图片http链接列表
	});
}
let getUserInfo = async () => {
	let res = await userInfo()
	let { user_avatar, user_nickname } = res.data
	userInfoObj.value = { user_avatar, user_nickname }
	console.log('个人资料', res)
}
let handleOrder = (status) => {
	if (!uni.getStorageSync('token')) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		})
		return
	}
	uni.navigateTo({
		url: `/pages/personal/orders?status=${status}`
	})
}
let toPetList = () => {
	uni.navigateTo({
		url: '/pages/personal/petIDCardList'
	})
}
let toLogin = async () => {
	uni.navigateTo({
		url: '/pages/login/index',
	})
	// uni.showLoading({
	// 	title: '正在登录...',
	// 	mask: true // 是否显示透明蒙层，防止触摸穿透  
	// });
	// let code, encryptedData, iv
	// // 仅在用户点击按钮或其他交互操作时调用此方法  
	// uni.getUserProfile({
	// 	desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中  
	// 	success: (res) => {
	// 		console.log(res)
	// 		if (res.platform === 'devtools') {
	// 			uni.setEnableDebug({
	// 				enableDebug: true
	// 			});
	// 		}
	// 		encryptedData = res.encryptedData
	// 		iv = res.iv
	// 		console.log(encryptedData, iv)
	// 		uni.login({
	// 			provider: 'weixin',
	// 			success: async (loginRes) => {
	// 				console.log('登录成功', loginRes);
	// 				console.log(loginRes.code)
	// 				code = loginRes.code
	// 				try {
	// 					console.log(encryptedData, iv, code)
	// 					const result = await login({
	// 						code: code,
	// 						iv: iv,
	// 						encrypted_data: encryptedData
	// 					})
	// 					console.log(result)
	// 					uni.setStorageSync('token',
	// 						`Bearer ${result.data.api_token}`)
	// 					console.log(result.data.api_token)
	// 					console.log(uni.getStorageSync('token'))
	// 					if (uni.getStorageSync('promotion_id')) {
	// 						let result = await bindUser({ promotion_id: uni.getStorageSync('promotion_id') })
	// 						console.log('绑定', result)
	// 						uni.removeStorageSync('promotion_id')
	// 					}
	// 					isLogged.value = true
	// 					uni.hideLoading()
	// 				} catch (err) {
	// 					console.log(err)
	// 					uni.hideLoading();
	// 				}
	// 			},
	// 			fail: (error) => {
	// 				console.error('登录失败', error);
	// 				uni.hideLoading();
	// 			}
	// 		});
	// 	},
	// 	fail: (err) => {
	// 		console.error('获取用户信息失败', err);
	// 		uni.hideLoading();
	// 	}
	// });
}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	// border:1px solid red;
	background-color: #F7F7F7;

	.login {
		width: 200rpx;
		height: 56rpx;
		font-size: 28rpx;
		color: #222;
		background-color: #FCE16A;
		border-radius: 12rpx;
		// display: block;
	}

	.logo {
		position: absolute;
		top: 112rpx;
		left: 32rpx;
		z-index: 9999;
		width: 296rpx;
		height: 44rpx;
	}

	.infor {
		width: 100%;
		height: 408rpx;

		&-details {
			width: 686rpx;
			margin-top: 216rpx;

			&-left {

				&-avator {
					width: 128rpx;
					height: 128rpx;
					overflow: hidden;
					border: 1rpx solid #FCE16A;
					border-radius: 50%;
				}

				&-base {
					flex-direction: column;
					height: 128rpx;
					margin-left: 16rpx;
					color: #222;

					&-name {
						height: 50rpx;
						margin-bottom: 10rpx;
						font-size: 36rpx;
						font-weight: medium;
					}

					&-intro {
						font-size: 24rpx;
					}
				}
			}

			&-right {
				&-items {
					flex-direction: column;
					color: #595959;

					&-icon {
						margin-bottom: 10rpx;
						font-size: 48rpx;
					}

					&-word {
						font-size: 24rpx;
					}
				}
			}
		}
	}

	.vip {
		width: 100%;
		margin-top: 24rpx;

		&-content {
			width: 686rpx;
			height: 330rpx;
			margin: 0 auto;
			overflow: hidden;
			border-radius: 24rpx;

			&-operating {
				width: 686rpx;
				height: 168rpx;
				background-color: #fff;

				&-items {
					flex-direction: column;
					width: 171rpx;
					color: #222;

					&-icon {
						font-size: 56rpx;
						color: #222;
					}

					&-word {
						font-size: 28rpx;
					}
				}
			}
		}
	}

	.service {
		width: 686rpx;
		height: 96rpx;
		margin: 0 auto;
		margin-top: 32rpx;
	}

	.other-info {
		flex-direction: column;
		width: 686rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		overflow: hidden;
		background-color: #fff;
		border-radius: 24rpx;

		&-items {
			width: 622rpx;
			height: 96rpx;
			font-size: 28rpx;
			line-height: 96rpx;
			color: #474747;

		}
	}
}
</style>