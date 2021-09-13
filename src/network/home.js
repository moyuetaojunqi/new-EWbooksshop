import {request} from "./request.js"

export function getHomeAllDate(params) {
	return request({
		url:'/api/index',
	})
}

export function getHomeGoodsDate(type='sales',page=1) {
	return request({
		url:'/api/index?'+type+'=1&page='+page,
	})	
}
 