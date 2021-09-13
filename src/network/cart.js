import {request} from "./request.js"

//添加购物车
export function addCart(data) {
	return request({
		url:'/api/carts',
		method:'post',
		data
	})
}

//修改购物车 data = {num:1}
export function modyCart(id, data) {
	return request({
		url:`/api/carts/${id}`,
		method:'put',
		data
	})
}

//选择商品的状态checked
export function checkedCart(data) {
	return request({
		url:'/api/carts/checked',
		method:'patch',
		data
	})
}

//获取购物车列表
export function getCart(data='') {
	return request({
		// url:'/api/carts?include=goods',
		url:'/api/carts?'+data,
		method:'get',
	})
}

//删除购物车
export function deleteCart(id) {
	return request({
		url:'/api/carts/'+id,
		method:'delete',
	})
}