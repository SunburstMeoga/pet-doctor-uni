<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view class="flex justify-center items-center w-full h-screen flex-col">
    <button v-show="!getPhone" @click="toLogin()" class="login flex justify-center items-center btn"
      style="margin-bottom: 20rpx">
      登录
    </button>
    <button v-show="getPhone" open-type="getPhoneNumber" class="btn" @getphonenumber="onGetPhoneNumber">
      确认绑定
    </button>
    <view class="login-bg">
      <image
        src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20241025/E0ndrY3lWMhg08QjD0nEyc4qcCGubtgZdkIXrXGW.jpg"
        mode="aspectFit"></image>
    </view>
    <!-- <view style="width: 100%; height:900rpx;">code: {{testCode}}</view>
		
		<view style="width: 100%; height:900rpx;">iv: {{iv}}</view>
		<view style="width: 100%; height: 900rpx; word-wrap:break-word;
word-break:break-all;">encryptedData: {{encryptedData}}</view> -->
  </view>
</template>

<script setup>
import { login, petCards, userPhone } from '@/service/index'
const testCode = ref('')
const encryptedData = ref('')
const getPhone = ref(false)
const iv = ref('')
// onMounted(() => {
// 	if(uni.getStorageSync('token') && uni.getStorageSync('token') !== undefined && uni.getStorageSync('token') !== 'undefined') {
// 		console.log(uni.getStorageSync('token'))
// 		uni.switchTab({
// 			url: '/pages/home/index'
// 		})
// 	}
// 	console.log('登录页的token',uni.getStorageSync('token'));
// })
const getPetCards = async () => {
  const reuslt = await petCards()
  console.log()
}

const onGetPhoneNumber = async (e) => {
  uni.showLoading({
    title: '正在登录...',
    mask: true, // 是否显示透明蒙层，防止触摸穿透
  })
  if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
    // 用户决绝授权
    uni.hideLoading()
    // 拒绝授权后弹出一些提示
  } else {
    // 允许授权
    console.log(e)

    console.log(e.detail.encryptedData)
    const getNumber = await userPhone({ code: e.detail.code })
    console.log('手机号', getNumber)
    uni.hideLoading()
    uni.switchTab({
      url: '/pages/home/index',
    })
    // e.detail.encryptedData      //加密的用户信息
    // e.detail.iv     //加密算法的初始向量  时要用到
  }
}
const toLogin = async () => {
  uni.showLoading({
    title: '正在登录...',
    mask: true, // 是否显示透明蒙层，防止触摸穿透
  })
  let code, encryptedData, iv
  // 仅在用户点击按钮或其他交互操作时调用此方法
  uni.getUserProfile({
    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中
    success: (res) => {
      console.log(res)
      if (res.platform === 'devtools') {
        uni.setEnableDebug({
          enableDebug: true,
        })
      }
      encryptedData = res.encryptedData
      iv = res.iv
      console.log(encryptedData, iv)
      uni.login({
        provider: 'weixin',
        success: async (loginRes) => {
          console.log('登录成功', loginRes)
          testCode.value = loginRes.code
          console.log(loginRes.code)
          code = loginRes.code
          try {
            console.log(encryptedData, iv, code)
            const result = await login({
              code,
              iv,
              encrypted_data: encryptedData,
            })
            console.log(result)
            uni.setStorageSync('token', `Bearer ${result.data.api_token}`)
            uni.setStorageSync('hasPhone', result.data.has_phone)

            console.log('用户token', uni.getStorageSync('token'))
            console.log('是否有手机号', uni.getStorageSync('hasPhone'))

            // getPhone.value = true
            uni.hideLoading()
            uni.switchTab({
              url: '/pages/home/index',
            })
            // const petCardsList = await petCards()
            // console.log(petCardsList.data,petCardsList)
            // uni.hideLoading();
            // if(petCardsList.data.data.length !== 0) {
            // 	uni.navigateTo({
            // 		url: "/pages/personal/identityInfo"
            // 	})
            // } else {
            // 	uni.navigateTo({
            // 		url: '/pages/home/star_answer'
            // 	})
            // }
          } catch (err) {
            console.log(err)
            uni.hideLoading()
          }
        },
        fail: (error) => {
          console.error('登录失败', error)
          uni.hideLoading()
        },
      })
    },
    fail: (err) => {
      console.error('获取用户信息失败', err)
      uni.hideLoading()
    },
  })
}
onMounted(() => {
  console.log(uni.getStorageSync('token'))
  if (uni.getStorageSync('token')) {
    uni.switchTab({
      url: '/pages/home/index',
    })
  }
})
</script>

<style lang="scss">
.btn {
  position: relative;
  z-index: 999;
}

.login-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

.login {
  width: 486rpx;
  height: 92rpx;
  color: #222;
  background-color: #fce068;
  border-radius: 24rpx;
}
</style>
