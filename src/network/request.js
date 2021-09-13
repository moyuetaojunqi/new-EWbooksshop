import axios from "axios";
import { Notify, Toast} from 'vant';
import router from "../router/index.js";

export function request(config) {
	const instance = axios.create({
		baseURL:'https://api.shop.eduwork.cn',
		timeout:5000
	})
	
	//请求拦截
	instance.interceptors.request.use(config =>{
		//如果有一个接口需要认证才可以访问，就在这统一设置
		const token = window.localStorage.getItem('token')
		if(token) {
			config.headers.Authorization = 'Bearer '+token
		}
		 return config  //放行
	},err=>{
		
	})
	
	//响应拦截
	instance.interceptors.response.use(res =>{
		return res.data ? res.data : res;
	},error =>{
		// 若果有需要授权才可以访问的接口，统一去login授权
		if(error.response.status == 401) {
			Toast.fail('请先登录')
			router.push({path:'/login'})
		}
		// 如果接口消息有错误，根据状态码在这里处理 显示错误信息	
		Notify(error.response.data.errors[Object.keys(err.response.data.errors)[0]][0])
	})
	
	return instance(config);
}