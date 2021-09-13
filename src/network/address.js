import {request} from "./request.js"

//全国地址数据
// export function addRess(params) {
// 	return request({
// 		url:'/api/city',
// 	})
// }
//添加地址
export function getAddress(params) {
	return request({
		url:'/api/address',
		method:'post',
		params
	})
}

//修改编辑地址
export function editAddress(id, params) {
	return request({
		url:`/api/address/${id}`,
		method:'put',
		params
	})
}

//删除地址
export function deleteAddress(id) {
	return request({
		url:'/api/address/'+id,
		method:'delete'
	})
}

//地址列表
export function addressList() {
	return request({
		url:'/api/address',
	})
}

//地址详情
export function addressDetail(id) {
	return request({
		url:'/api/address/'+ id
	})
}