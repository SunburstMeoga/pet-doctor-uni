import { defineStore } from 'pinia'

export const useStatusBarStore = defineStore('statusBar', () => {
  const menuButton = ref<UniNamespace.GetMenuButtonBoundingClientRectRes>()
  const { statusBarHeight } = uni.getWindowInfo()
  const { system } = uni.getSystemInfoSync()

  const barHeight = computed(() => {
    if (menuButton.value) {
      return menuButton.value.top + menuButton.value.height
    }
    return statusBarHeight + (system.indexOf('iOS') > -1 ? 44 : 48)
  })

  onReady(() => {
    menuButton.value = uni.getMenuButtonBoundingClientRect()
  })

  return {
    menuButton,
    barHeight,
  }
})
