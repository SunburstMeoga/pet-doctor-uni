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
    <wd-button :loading="loading" @click="toLogin()" custom-style="border:none;"
      custom-class="flex relative z-10 !items-center !border-none !justify-center !bg-gradient-to-r !to-#F9EB7D !from-#FDDC60 !mb-40rpx  !from-#222 !text-#222 !w-360rpx !h-94rpx !rounded-24rpx">
      手机号快捷登录
    </wd-button>
    <wd-button @click="notLogin()"
      custom-class="flex  relative z-10 !items-center  !justify-center !w-360rpx !h-94rpx !rounded-24rpx !text-#222 !bg-transparent"
      custom-style="border: 1px solid #000;">
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
import { login, petCards, userPhone, bindUser } from '@/service/index'
const testCode = ref('')
let show = ref(false)
const loading = ref(false)
const encryptedData = ref('')
const getPhone = ref(false)
const loginCode = ref('')

const iv = ref('')
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
    try {
      // console.log(encryptedData, iv, code)
      const result = await login({
        code: loginCode.value,
        iv: iv.value,
        encrypted_data: encryptedData.value,
        phone_code: e.code
      })
      console.log('登录信息 ', result)
      if (result.status === 250) {
        uni.showToast(res.msg)
        show.value = false
        return
      }
      if (result.code !== 200) {
        uni.showToast({
          title: result.msg,
          icon: 'none'
        })
      } else {
        uni.setStorageSync('token', `Bearer ${result.data.token}`)
        uni.setStorageSync('hasPhone', result.data.has_phone)
        if (uni.getStorageSync('promotion_id')) {
          let result = await bindUser({ promotion_id: uni.getStorageSync('promotion_id') })
          console.log('绑定', result)
          uni.removeStorageSync('promotion_id')
        }
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
}
onMounted(() => { })
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
