<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { bindUser } from '@/service/index'

onLaunch(async (options) => {
  console.log('App Launch')
  console.log('小程序加载')
  console.log(options)
  console.log("wx.canIUse('getUpdateManager')", wx.canIUse('getUpdateManager'))
  console.log("wx.getUpdateManager()", wx.getUpdateManager())
  if (wx.canIUse('getUpdateManager')) {
    const updateManager = wx.getUpdateManager()
    console.log(updateManager)
    // 监听新版本下载完成
    updateManager.onUpdateReady(() => {
      console.log('下载')
      uni.showModal({
        title: '更新提示',
        content: '有新版本，请重启小程序',
        confirmText: '立即重启',
        success: (res) => {
          if (res.confirm) {
            // 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    // 监听更新下载失败
    updateManager.onUpdateFailed(() => {
      uni.showToast({
        title: '更新失败，请检查网络',
        icon: 'none'
      })
    })
  }
  //   扫码进来判断有没有参数，然后判断有没有登录，如果有登陆，直接用promotionid请求绑定接口，结束
  // 如果没登录，则保存promotionid，然后请求登录接口，如果存在promotionid 就请求bind，bind成功之后删掉promotionid
  if (options && (options.scene === 1047 || options.scene === 1048)) {
    console.log('options', options)
    const decoded = decodeURIComponent(options.query.scene);
    const [key, value] = decoded.split("=");
    console.log(decoded, key, value)
    const promotionId = value;
    if (uni.getStorageSync('token')) {
      //绑定

      let result = await bindUser({ promotion_id: promotionId })
      console.log('绑定', result)
    } else {
      uni.setStorageSync('promotion_id', promotionId)
    }
  }
})
onShow((options) => {
  console.log(uni.getStorageSync('token'))
  console.log('options', options)

})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
/* stylelint-disable selector-type-no-unknown */
button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;

}

image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

// 单行省略，优先使用 unocss: text-ellipsis
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 两行省略
.ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 三行省略
.ellipsis-3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
