// 从@/utils/http导入http模块
import { http } from '@/utils/http'

// 问卷列表
export const assessmentDetails = (id) => {
  return http.get('/report/assessment/' + id)
}

// 登录
export const login = (params) => {
  return http.post('/front/account/login/mp', params)
}

// 宠物身份证列表
export const petCards = () => {
  return http.get('/pet/cards')
}

// 添加宠物身份证
export const storePetCard = (data) => {
  return http.post('/pet/card', data)
}

// 获取宠物品种
export const petBreeds = (typeId) => {
  return http.get('/pet/breeds/' + typeId)
}

// 完成问题并创建报告
export const createReport = (data) => {
  return http.post('/report', data)
}

// 获取报告详情
export const reportDetails = (id) => {
  return http.get('/report/' + id)
}

// 获取商品列表
export const allProduct = (data) => {
  return http.get('/front/pt/product/list', data)
}

// 创建订单
export const createOrder = (data) => {
  return http.post('/order', data)
}

// 支付
export const pay = (data) => {
  return http.post('/pay', data)
}

// 订单列表（注意：通常GET请求不使用data参数，而是使用查询参数，这里假设http.get能处理这种情况或已作适配）
export const orders = (params) => {
  // 如果http.get不支持直接传递params作为查询参数，你可能需要手动构建查询字符串
  // 例如：return http.get('/orders?' + new URLSearchParams(params).toString());
  return http.get('/front/trade/order/list', params) // 假设http.get的第二个参数可以接收一个包含params的对象
}

// 报告列表（同上）
export const reports = (params) => {
  // 如果http.get不支持直接传递params作为查询参数，你可能需要手动构建查询字符串
  // 例如：return http.get('/reports?' + new URLSearchParams(params).toString());
  return http.get('/reports', params) // 假设http.get的第二个参数可以接收一个包含params的对象
}

// 获取用户手机号（假设这是你的原意，因为原文件中没有这个函数，但你的示例中提到了）
export const userPhone = (data) => {
  return http.post('/user/phone', data)
}

// 删除宠物身份证
export const deletePet = (cardId) => {
  return http.delete('/pet/card/' + cardId) // 假设http模块有delete方法
}

// 获取个人信息
export const userInfo = () => {
  return http.get('/front/account/user/info')
}

// 查看宠物信息
export const petInfo = (petId) => {
  return http.get('/pet/card/' + petId)
}

//商品详情
export const productDetails = (data) => {
  return http.get('/front/pt/product/detail', data)
}

//购物车列表
export const cart = (data) => {
  return http.get('/front/trade/cart/list', data)
}

//添加购物车
export const addCard = (data) => {
  return http.post('/front/trade/cart/add', data)
}

//收银台
export const checkoutOrder = (data) => {
  return http.post('/checkout', data)
}

//订单详情
export const orderDetails = (orderSN) => {
  return http.get('/order/' + orderSN)
}

//订单状态
export const orderStatus = (data) => {
  return http.get('/order/status', data)
}

//地址列表
export const addresses = () => {
  return http.get('/addresses')
}

//新增收货地址
export const storeAddress = (data) => {
  return http.post('/address', data)
}

//删除地址信息
export const deleteAddress = (addressId) => {
  return http.delete('/address/' + addressId)
}

//设置默认地址
export const setDefaultAddress = (addressId) => {
  return http.post(`/address/${addressId}/default`)
}

//获取后台系统设置
export const systemConfig = (key) => {
  return http.get('/system-config/' + key)
}

//取消订单
export const cancelOrder = (orderSN) => {
  return http.post(`/order/${orderSN}/cancel`)
}

//删除购物车
export const deleteCart = (data) => {
  return http.delete('/front/trade/cart/remove', data)
}

//删除宠物报告
export const deleteReport = (id) => {
  return http.delete('report/' + id)
}

//商品组
export const productGroup = () => {
  return http.get('/front/pt/product/listCategory')
}

//以下为分销系统功能api

//绑定关系
export const bindUser = (data) => {
  return http.post('/promotion/user/bind', data)
}
