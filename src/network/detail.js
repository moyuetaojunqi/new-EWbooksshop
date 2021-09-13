import {request} from "./request.js"

export function getDetailData(id) {
	return request({
		url:'/api/goods/'+id,
	})
}

