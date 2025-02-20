<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { bindUser } from '@/service/index'

onLaunch((options) => {
  console.log('App Launch')
  console.log('小程序加载')
  console.log(options)
  //   扫码进来判断有没有参数，然后判断有没有登录，如果有登陆，直接用promotionid请求绑定接口，结束
  // 如果没登录，则保存promotionid，然后请求登录接口，如果存在promotionid 就请求bind，bind成功之后删掉promotionid
  if (options && (options.scene === 1047 || options.scene === 1048)) {

    if (uni.getStorageSync('token')) {

    }
  }
})
onShow((options) => {
  console.log(uni.getStorageSync('token'))

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
