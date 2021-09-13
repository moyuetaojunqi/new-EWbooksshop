import {request} from "./request.js"

export function getCartAllDate(paramas) {
	return request({
		url:'/api/goods',
	})
}

export function getCartGoodsDate(order='sales', id=0, page=1) {
	return request({
		url:'/api/goods?category_id='+id+'&page='+page+'&'+order+'=1',
	})	
}