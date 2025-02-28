<route lang="json5">
	{
	  style: {
		navigationBarTitleText: '报告',
		enableShareAppMessage: true,
   		 enableShareTimeline: true
	  },
	}
	</route>
<template>
	<view class="container">
		<view class="content flex justify-start items-center">
			<view class="pet-info">
				<pet-card :name="petInfoObj.name" :breed="petInfoObj.breed.name" :sex="petInfoObj.sex"
					:time="petInfoObj.birth_at"></pet-card>
			</view>
			<view class="module report-result relative z-50">
				<image :src="mbtiImg" mode="aspectFit" style="border-radius: 24rpx;"></image>
			</view>
			<view class="eval-details module">
				<view class="details-title">测评详情</view>
				<view class="details-content"
					style="background-image: url('http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241128/0QXXYbviLRQs9QetXMmotyNjeCqmUGwPgQXfKor2.png');">
					<view class="content-mbti">{{ reportTitle }}</view>
					<view class="report-list-item-right flex justify-start items-start">
						<view class="report-list-item-right-property flex justify-start items-center"
							v-show="dimensionsItems.length <= 4" v-for="(item, index) in dimensionsItems" :key="index">
							<view class="report-list-item-right-property-title min-w-114rpx">{{ item.title }}</view>
							<view
								class="report-list-item-right-property-content flex justify-between items-center flex-1">
								<view class="report-list-item-right-property-content-left w-84rpx"
									:class="item.score < 0 ? `color-text-${index}` : `color-gray`">{{ item.reverse_value
									}}
								</view>
								<view class="report-list-item-right-property-content-middle flex items-center w-266rpx!"
									:class="item.score < 0 ? 'justify-start' : 'justify-end'">
									<view class="report-list-item-right-property-content-middle-step"
										:class="`color-${index}`"
										:style="`width: ${(Math.abs(item.score) * 10) / 2 * 0.7}%;`">
									</view>
								</view>

							</view>
							<view class="report-list-item-right-property-content-right w-84rpx"
								:class="item.score >= 0 ? `color-text-${index}` : `color-gray`">
								{{ item.value }}</view>
						</view>
						<view class="report-list-item-right-property flex justify-start items-center"
							v-show="dimensionsItems.length > 4" v-for="(item, index) in dimensionsItems" :key="index">
							<view class="report-list-item-right-property-title w-114rpx">{{ item.title }}</view>
							<view class="report-list-item-right-property-content flex justify-between items-center">
								<view class="report-list-item-right-property-content-left w-84rpx"
									:class="item.score >= 0 ? `text-#20CEB0` : `color-gray`">{{ item.value }}
								</view>
								<view class="report-list-item-right-property-content-middle flex items-center w-266rpx!"
									:class="item.score >= 0 ? 'justify-start' : 'justify-end'">
									<view class="report-list-item-right-property-content-middle-step"
										:class="`${item.score >= 0 ? 'bg-#20CEB0' : 'bg-#F15912'} bg-#20CEB0`"
										:style="`width: ${(Math.abs(item.score) * 10) / 2 * 0.7}%;`">
									</view>
								</view>
								<view class="report-list-item-right-property-content-right w-84rpx"
									:class="item.score < 0 ? `text-#F15912` : `color-gray`">
									{{ item.reverse_value }}</view>
							</view>
						</view>
					</view>
				</view>

			</view>
			<view class="result-item module" v-for="(item, index) in dimensionsItems" :key="index">
				<view class="item-title flex justify-start items-center">
					<view class="title-left">{{ item.title }}</view>
					<view class="title-right"
						:class="`${dimensionsItems.length > 4 ? `${item.score >= 0 ? `text-#20CEB0` : `text-#F15912`}` : ``}`">
						{{ item.score >= 0 ? item.value : item.reverse_value }}</view>
				</view>
				<view class="item-details">
					{{ item.text }}
				</view>
				<view class="item-sug" v-if="item.score <= 0 && item.suggest">建议</view>
				<view class="sug-content" v-if="item.score <= 0 && item.suggest">
					{{ item.suggest }}
				</view>
			</view>

			<view class="module program">
				<view class="program-bg flex justify-center items-center image-bg"
					style="background-image: url('http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241024/WK1GvrB7jcsnJf8NbCH7jAUhWREp4CmnXl5ARW7P.png');">
				</view>
				<view class="program-title">根据 <span style="font-weight: bold;">{{ petInfoObj.name }}</span>
					的测评结果推荐以下商品
				</view>
				<view class="program-list flex justify-between items-center">
					<view class="program-item" v-for="(item, index) in productList" :key="index">
						<product-card @handleBuyNow="buyNow(item)" :title="item.title" :intro="item.intro"
							:pictures="item.pictures[0]" :price="item.price * 0.01"></product-card>
					</view>
				</view>
			</view>
		</view>
		<view class="service-qrcode" @click="addCustom">
			<image
				src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241025/rsXfy7Sd1VSRaURGGtHlFuxsZAuYIl8Ju465ejuS.png"
				mode=""></image>
		</view>
		<view class="service-word">
			添加专属客服，获取正确的医疗指导
		</view>
		<!-- <view class="share flex justify-center items-center">
			<view class="share-button flex justify-center items-center" @click="handleShare()">
				转发到朋友圈
			</view>
		</view> -->

	</view>
</template>

<script setup>
import petCard from '../../components/petCard.vue';
import productCard from '../../components/productCard.vue';
import { allProduct, createOrder, pay, reportDetails, petInfo } from '@/service/index'
let reportId = ref('')
let dimensionsItems = ref([])
let reportTitle = ref('')
let cardId = ref('')
let mbtiImg = ref('')
let imageList = ref(['http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241025/rsXfy7Sd1VSRaURGGtHlFuxsZAuYIl8Ju465ejuS.png'])

let petInfoObj = ref({})
const onShareTimeline = () => {
	return {
		// href: "http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241024/7Tz2CqszkkrCwJVQzvWSRay4vaqRoIbMoJzyw1Aq.png",
		title: "快来给你的爱宠测一下MBTI吧",
		query: '/pages/home/index',
		summary: `${reportTitle.value}`,
		imageUrl: `${mbtiImg.value}`,
		// imageUrl: '/static/share_image.png' // 分享图片的路径（注意：某些平台可能不支持）
	};
}
const addCustom = () => { //添加专属客服
	uni.previewImage({
		current: 'http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241025/rsXfy7Sd1VSRaURGGtHlFuxsZAuYIl8Ju465ejuS.pngr', // 当前显示图片的http链接
		urls: imageList.value // 需要预览的图片http链接列表
	});
}
let getPetInfoDetails = async (petId) => {
	uni.showLoading({
		title: '正在加载...'
	})
	let res = await petInfo(petId)
	console.log('宠物信息', res)
	petInfoObj.value = res
	console.log('获取到的宠物信息', petInfoObj.value)
	uni.hideLoading()
}
let getReportDeatils = async (reportId) => {
	uni.showLoading({
		title: '正在加载...'
	})
	let result = await reportDetails(reportId)
	uni.hideLoading()
	console.log("报告详情", result)
	dimensionsItems.value = result.dimensions
	reportTitle.value = result.assessment.title
	mbtiImg.value = result.image
	productList.value = result.products
	console.log(productList.value[0].pictures[0])
}
let productList = ref([])
let buyNow = async (item) => {
	console.log(item, `${item.id}`)
	uni.navigateTo({
		url: `/pages/home/product_details?productId=${item.id}`
	});
	// console.log("点解购买按钮", item)
	// uni.showLoading({
	// 	title: "创建订单..."
	// })
	// let res = await createOrder({ item_id: item.id, quantity: 1 })
	// let payResult = await pay({ order_sn: res.order_sn })
	// uni.requestPayment({
	// 	"timeStamp": payresult.timeStamp,
	// 	"nonceStr": payresult.nonceStr,
	// 	"package": payresult.package,
	// 	"signType": payresult.signType,
	// 	"paySign": payresult.paySign,
	// 	"success": function (res) {
	// 		console.log('success', res);
	// 		uni.hideLoading()
	// 	},
	// 	"fail": function (res) {
	// 		console.log('fail', res);
	// 		uni.hideLoading()
	// 	},
	// 	"complete": function (res) {
	// 		console.log('complete', res);
	// 		uni.hideLoading()
	// 	}
	// });

	// console.log(payRes, '支付')
	// console.log('创建订单', res)
}
onMounted(() => {
	getReportDeatils(reportId.value)
	getPetInfoDetails(cardId.value)
})
onLoad((options) => {
	console.log(options); // { id: '123', name: '张三' }
	reportId.value = options.reportId || 2079
	cardId.value = options.cardId || 2139
	console.log('options.cardId', options.cardId)
})
</script>

<style lang="scss" scoped>
.share {
	position: fixed;
	bottom: 60rpx;
	left: 0;
	width: 100%;
	height: 92rpx;

}

.share-button {
	width: 486rpx;
	height: 92rpx;
	color: #faad14;
	background-color: #222;
	border-radius: 24rpx;
}

.container {
	min-height: 100vh;
	padding-bottom: 140rpx;
	background-color: #F5F5F5;

	.content {
		flex-direction: column;
		width: 1005;
		min-height: 100vh;

		.module {
			width: 630rpx;
			padding: 28rpx;
			margin-bottom: 28rpx;
			overflow: hidden;
			background-color: #fff;
			border-radius: 24rpx;
		}

		.pet-info {
			width: 622rpx;
			height: 220prx;
			margin-top: 32rpx;
		}

		.report-result {
			width: 686rpx;
			height: 805rpx;
			padding: 0;
			margin-top: -20rpx;
			// border: 1px solid red;
			// background-color: #fff;
			margin-bottom: 52rpx;
			overflow: hidden;
			background-color: transparent !important;

		}

		.eval-details {

			// width: 686rpx;
			.details-title {
				margin-bottom: 20rpx;
				font-size: 36rpx;
				color: #222;

			}

			.details-content {
				width: 582rpx;
				padding: 24rpx;
				border-radius: 24rpx;

				.content-mbti {
					margin-bottom: 32rpx;
					font-size: 40rpx;
					color: #222;
				}
			}

			.report-list-item-right {
				flex-direction: column;
				width: 582rpx;

				&-property {
					width: 582rpx;
					margin-bottom: 28rpx;

					// border: 1px solid red;
					&-title {
						margin-right: 40rpx;
						// color: #8c8c8c;
						font-size: 24rpx;
					}

					.report-list-item-right-property-content {
						// flex: 1;
						height: 20rpx;

						// border: 1px solid blue;
						&-left {
							// color: #faad14;
							font-size: 24rpx;
						}

						&-middle {
							width: 420rpx;
							height: 20rpx;
							margin: 0 8rpx;
							background-color: #e5e5e5;
							border-radius: 4rpx;

							// border: 1px solid red;
							&-step {
								width: 200rpx;
								height: 20rpx;
								border-radius: 4rpx;

							}
						}

						&-right {
							// color: #8c8c8c;

							font-size: 24rpx;
						}
					}
				}
			}
		}

		.result-item {
			.item-title {
				margin-bottom: 24rpx;
				font-size: 36rpx;
				color: #222;

				.title-right {
					// color: #FAAD14;
				}
			}

			.item-details {
				margin-bottom: 40rpx;
				font-size: 32rpx;
				color: #595959;
			}

			.item-sug {
				margin-bottom: 24rpx;
				font-size: 36rpx;
				color: #222;
			}

			.sug-content {
				color: #595959;
			}
		}

		.program {

			// padding-top: 68rpx;
			// position: relative;
			.program-bg {
				z-index: 100;
				// position: absolute;
				// left:0;
				// margin-top: -100rpx;
				width: 200rpx;
				height: 76rpx;
			}

			.program-title {
				margin-bottom: 28rpx;
				font-size: 32rpx;
				color: #222;
			}

			.program-list {
				flex-wrap: wrap;
			}

			.program-item {
				width: 303rpx;
				margin-bottom: 24rpx;
				overflow: hidden;
				background-color: #F5F5F5;
				border-radius: 24rpx;
			}
		}
	}

	.service-qrcode {
		width: 210rpx;
		height: 210rpx;
		padding: 24rpx;
		margin: 0 auto;
		margin-top: 60rpx;
		background-color: #fff;
		border: 1rpx solid #222;
		border-radius: 24rpx;
	}

	.service-word {
		margin: 0 auto;
		margin-top: 34rpx;
		margin-bottom: 34rpx;
		color: #222;
		text-align: center;
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