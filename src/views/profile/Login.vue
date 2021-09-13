<template>
	<div class="">
		<nav-bar>
			<template v-slot:default>用户登录</template>
		</nav-bar>
		
		<div style="margin-top: 50px;">
			<div style="text-align: center;padding-top: 40px;">
				<van-image
				  width="10rem"
				  height="10rem"
				  fit="contain"
				  src="https://img01.yzcdn.cn/vant/logo.png"
				/>
			</div>
		</div>
		
		<div >
			<van-form @submit="onSubmit"  >
			  <van-field
			    v-model="email"
			    name="用户名"
			    label="用户名"
			    placeholder="用户名"
			    :rules="[{ required: true, message: '请填写用户名' }]"
			  />
			  <van-field
			    v-model="password"
			    type="password"
			    name="密码"
			    label="密码"
			    placeholder="密码"
			    :rules="[{ required: true, message: '请填写密码' }]"
			  />
			  
			  <div class="link-register" @click="$router.push({path:'/register'})">
			  	如果没有账号，请先注册
			  </div>
			  
			  <div style="margin: 16px;">
			    <van-button round block type="info" color="#44b883" native-type="submit">登录</van-button>
			  </div>
			</van-form>
		</div>
	</div>
</template>

<script>
	import {Toast} from 'vant';
	import NavBar from 'components/nav-bar/NavBar.vue';
	import {useRouter} from 'vue-router';
	import {reactive, toRefs} from 'vue';
	import {Login} from 'network/user.js';
	import {useStore} from 'vuex';
	
	export default {
		name:'Login',
		components:{
			NavBar
		},
		setup(){
			const store = useStore();
			const router = useRouter();
			const userinfo = reactive({
				email:'',
				password:''
			})
			
			const onSubmit = () => {
				 Login(userinfo).then(res => {
					 console.log(res.access_token)
					 //将token保存在本地window.localStorage  setItem(key, value)  getItem(key)
					 window.localStorage.setItem('token', res.access_token);
					 //在vuex isLogin
					 store.commit('setIsLogin', true)
					 
					 Toast.success('登陆成功')
					 
					 userinfo.password = '';
					 userinfo.password_confirmation = '';
					 
					 router.push({path:'/home'})
					 
					 // setTimeout(() => {
						//  router.go(-1)
					 // },500)
				 })
			}
			return {
				onSubmit,
				...toRefs(userinfo),
				router
			}
		}
	}
</script>

<style scoped lang="scss">
	.link-register {
		font-size: 12px;
		float: left;	
		padding: 20px;
		color: #42B983
	}
</style>
