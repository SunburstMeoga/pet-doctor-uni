<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view class="flex justify-center items-center w-full h-screen flex-col">
    <wd-button :loading="loading" @click="toLogin()" custom-class="login flex justify-center items-center btn mb-30rpx"
      style="margin-bottom: 20rpx">
      手机号快捷登录
    </wd-button>
    <wd-button @click="notLogin()" custom-class="login flex justify-center items-center btn"
      style="margin-bottom: 20rpx">
      暂不登录
    </wd-button>
    <wd-popup v-model="show" position="bottom" custom-class="rounded-t-xl!" :close-on-click-modal="false">
      <view class="px8 pt10 pb20 grid gap12">
        <view class="grid gap5">
          <wd-text text="用户隐私保护提示" class="font500" size="18px" color="black" />
          <view class="leading-relaxed">
            <wd-text text="在你使用喵博士 X 汪博士服务之前，请仔细阅读" />
            <wd-text text="《喵博士 X 汪博士小程序隐私保护指引》" type="primary" @click="openPrivacyContract" />
            <wd-text text="如你同意该指引，请点击“同意”开始使用本小程序。" />
          </view>
        </view>
        <view class="flex justify-center">
          <view class="flex items-center gap6">
            <wd-button type="info" size="large" :disabled="loading" :round="false" @click="show = false">
              拒绝
            </wd-button>
            <wd-button type="success" size="large" :round="false" :loading="loading" custom-class="bg-green-5!"
              open-type="getPhoneNumber|agreePrivacyAuthorization"
              @agreeprivacyauthorization="handleAgreePrivacyAuthorization" @getphonenumber="onGetPhoneNumber"
              @click="loading = true">
              同意
            </wd-button>
          </view>
        </view>
      </view>
    </wd-popup>
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
let show = ref(false)
const loading = ref(false)
const encryptedData = ref('')
const getPhone = ref(false)
const loginCode = ref('')

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
function openPrivacyContract() {
  uni.openPrivacyContract()
}
function handleAgreePrivacyAuthorization(e) {
  console.log(e)
}
const notLogin = () => {
  uni.switchTab({
    url: '/pages/home/index',
  })
}

const onGetPhoneNumber = async (e) => {
  console.log(e)
  if (e.code) {
    // try {
    //   const response = await loginApi(loginCode.value, iv.value, encryptedData.value, e.code)
    //   setToken(response.data.token)
    //   setUserInfo(response.data.userInfo)
    //   toast.show({ msg: `登录成功，${userInfo.value.nickname} 👏🏻欢迎回来`, duration: 4000 })
    //   setTimeout(() => {
    //     const redirectUri = currRoute().query.redirect
    //     if (redirectUri) {
    //       isTabbarPage(redirectUri)
    //         ? uni.switchTab({ url: redirectUri })
    //         : uni.redirectTo({ url: redirectUri })
    //     } else {
    //       uni.switchTab({ url: '/pages/index/index' })
    //     }
    //   }, 2000)
    // } catch (error) {}
    try {
      // console.log(encryptedData, iv, code)
      const result = await login({
        code: loginCode.value,
        iv: iv.value,
        encrypted_data: encryptedData.value,
      })
      console.log(result)
      if (result.code !== 0) {
        uni.showToast({
          title: result.message,
          icon: 'none'
        })
      } else {
        uni.setStorageSync('token', `Bearer ${result.data.api_token}`)
        uni.setStorageSync('hasPhone', result.data.has_phone)

        console.log('用户token', uni.getStorageSync('token'))
        console.log('是否有手机号', uni.getStorageSync('hasPhone'))

        // getPhone.value = true
        uni.hideLoading()
        uni.switchTab({
          url: '/pages/home/index',
        })
      }

    } catch (err) {
      console.log(err)
      uni.hideLoading()
    }
  }
  loading.value = false
}
const toLogin = async () => {
  loading.value = true
  const infoRes = await wx.getUserProfile({ desc: '用于个人主页信息展示' })
  const loginRes = await wx.login()
  loginCode.value = loginRes.code
  iv.value = infoRes.iv
  encryptedData.value = infoRes.encryptedData
  show.value = true
  loading.value = false
  // uni.showLoading({
  //   title: '正在登录...',
  //   mask: true, // 是否显示透明蒙层，防止触摸穿透
  // })

  // 仅在用户点击按钮或其他交互操作时调用此方法
  // uni.getUserProfile({
  //   desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中
  //   success: (res) => {
  //     console.log(res)
  //     if (res.platform === 'devtools') {
  //       uni.setEnableDebug({
  //         enableDebug: true,
  //       })
  //     }
  //     encryptedData.value = res.encryptedData
  //     iv.value = res.iv
  //     console.log(encryptedData, iv)
  //     show.value = true
  //     loading.value = false
  //     // uni.login({
  //     //   provider: 'weixin',
  //     //   success: async (loginRes) => {
  //     //     console.log('登录成功', loginRes)
  //     //     testCode.value = loginRes.code
  //     //     console.log(loginRes.code)
  //     //     code = loginRes.code
  //     //     // try {
  //     //     //   console.log(encryptedData, iv, code)
  //     //     //   const result = await login({
  //     //     //     code,
  //     //     //     iv,
  //     //     //     encrypted_data: encryptedData,
  //     //     //   })
  //     //     //   console.log(result)
  //     //     //   uni.setStorageSync('token', `Bearer ${result.data.api_token}`)
  //     //     //   uni.setStorageSync('hasPhone', result.data.has_phone)

  //     //     //   console.log('用户token', uni.getStorageSync('token'))
  //     //     //   console.log('是否有手机号', uni.getStorageSync('hasPhone'))

  //     //     //   // getPhone.value = true
  //     //     //   uni.hideLoading()
  //     //     //   uni.switchTab({
  //     //     //     url: '/pages/home/index',
  //     //     //   })
  //     //     // } catch (err) {
  //     //     //   console.log(err)
  //     //     //   uni.hideLoading()
  //     //     // }
  //     //   },
  //     //   fail: (error) => {
  //     //     console.error('登录失败', error)
  //     //     uni.hideLoading()
  //     //   },
  //     // })
  //   },
  //   fail: (err) => {
  //     console.error('获取用户信息失败', err)
  //     uni.hideLoading()
  //   },
  // })
  // async function onGetPhoneNumber(e) {

  // }
}
onMounted(() => {
  // console.log(uni.getStorageSync('token'))
  // if (uni.getStorageSync('token')) {
  //   uni.switchTab({
  //     url: '/pages/home/index',
  //   })
  // }
})
</script>

<style lang="scss">
.btn {
  position: relative !important;
  z-index: 10 !important;
}

.login-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

.login {
  width: 486rpx !important;
  height: 92rpx !important;
  color: #222 !important;
  background-color: #fce068;
  border-radius: 24rpx !important;
}
</style>
