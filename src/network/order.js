import {request} from "./request.js"

//创建订单
export function creatOrder(params) {
	return request({
		url:'/api/orders',
		method:'post',
		params
	})
}

//订单预览
export function getOrderPreview() {
	return request({
		url:'/api/orders/preview',
	})
}

//订单支付,获取二维码
export function payOrder(order, params) {
	return request({
		url:`/api/orders/${order}/pay`,
		params
	})
}

//订单支付状态
export function orderStatus(order) {
	return request({
		url:`/api/orders/${order}/status`,
	})
}

//获取订单列表  {page:1, status:2, include:'goods,user'}
export function getOrderList(params) {
	return request({
		url:'/api/orders',
		params
	})
}

//订单详情
export function orderDetail(order) {
	return request({
		url:`/api/orders/${order}`,
		params:{
			include:'orderDetails.goods,address,user'
		}
	})
}

//确认收货
export function confirmOrder(order) {
	return request({
		url:`/api/orders/${order}/confirm`,
		method:'patch',
	})
}

//获取物流信息
export function orderExpress(order) {
	return request({
		url:`/api/orders/${order}/express`,
	})
}

