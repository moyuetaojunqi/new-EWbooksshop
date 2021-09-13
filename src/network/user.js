import {request} from "./request.js"

export function register(data) {
	return request({
		url:'/api/auth/register/',
		method:'post',
		data
	})
}

export function Login(data) {
	return request({
		url:'/api/auth/login',
		method:'post',
		data
	})
}

export function Logout(data) {
	return request({
		url:'/api/auth/logout',
		method:'post',
	})
}

export function getUser(data) {
	return request({
		url:'/api/user',
	})
}


