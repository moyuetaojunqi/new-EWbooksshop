<template>
	<div class="">
		<nav-bar>
			<template v-slot:default>新用户注册</template>
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
		
		<van-form @submit="onSubmit">
		  <van-field
		    v-model="name"
		    name="name"
		    label="用户名"
		    placeholder="用户名"
		    :rules="[{ required: true, message: '请填写用户名' }]"
		  />
		  <van-field
		    v-model="email"
		    name="电子邮箱"
		    label="电子邮箱"
		    placeholder="电子邮箱"
		    :rules="[{ required: true, message: '请输入正确电子邮箱格式' }]"
		  />
		  <van-field
		    v-model="password"
		    type="password"
		    name="密码"
		    label="密码"
		    placeholder="密码"
		    :rules="[{ required: true, message: '请填写密码' }]"
		  />
		  <van-field
		    v-model="password_confirmation"
		    type="password"
		    name="确认密码"
		    label="确认密码"
		    placeholder="确认密码"
		    :rules="[{ required: true, message: '请填写一致密码' }]"
		  />
		  <div class="link-login" @click="$router.push({path:'/login'})">
		  	已有账号，立即登录
		  </div>
		  
		  <div style="margin: 16px;">
		    <van-button round block type="info" color="#44b883" native-type="submit">提交</van-button>
		  </div>
		</van-form>
	</div>
</template>

<script>
	import { Notify, Toast} from 'vant';
	import {register} from 'network/user.js';
	import NavBar from 'components/nav-bar/NavBar.vue';
	import {ref, reactive, toRefs} from 'vue';
	import {useRouter} from 'vue-router';
	export default {
		name:'Register',
		components:{
			NavBar
		},
		setup() {
			const router = useRouter();
			const userinfo = reactive({
				name:'',
				password:'',
				password_confirmation:'',
				email:''
			})
			
			const onSubmit = () => {
				//先验证·
				if(userinfo.password != userinfo.password_confirmation){
					Notify('密码输入不一致')
				//提交给服务器	
				}else{
					register(userinfo).then(res => {
						console.log(res)
						if(res.status = '201'){
							Toast.success('提交成功');
							router.push({path:'/login'})
						}
						userinfo.password = '';
						userinfo.password_confirmation = '';
					})
				}
			}
			
			return {
				...toRefs(userinfo),
				router,
				onSubmit
			}
		}
	}
</script>

<style scoped lang="scss">
	.link-login {
		font-size: 12px;
		float: left;	
		padding: 20px;
		color: #42B983
	}
</style>
