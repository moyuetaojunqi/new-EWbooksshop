<template>
	<div id="box">
		<nav-bar>
			<template v-slot:default>个人中心</template>
		</nav-bar>
		<div class="user-box">
			<div class="user-info">
				<div class="info">
					<img src="https://img01.yzcdn.cn/vant/logo.png" >
					<div class="desc">
						<span>昵称: {{user.name}}</span>
						<span>登录名: {{user.email}}</span>
						<span>个性签名: 成就自己，相信未来</span>
					</div>
				</div>
			</div>
			<ul class="user-list">
				<li class="vant-hair" @click="goTo('/collect')">
					<span>我的收藏</span>
					<van-icon name="arrow" />
				</li>
				<li class="vant-hair" @click="goTo('/order')">
					<span>我的订单</span>
					<van-icon name="arrow" />
				</li>
				<li class="vant-hair" @click="goTo('/setting')">
					<span>账号管理</span>
					<van-icon name="arrow" />
				</li>
				<li class="vant-hair" @click="goTo('/address')">
					<span>地址管理</span>
					<van-icon name="arrow" />
				</li>
				<li class="vant-hair" @click="goTo('/about')">
					<span>关于我们</span>
					<van-icon name="arrow" />
				</li>
			</ul>
		</div>
		
		<div style="margin: 15px;margin-top:50px;">
			<van-button round block type="info" @click="tologout" color="#44BA80">退出登录</van-button>
		</div>
	</div>
</template>

<script>
	import {Toast} from 'vant';
	import {Logout, getUser} from 'network/user.js';
	import NavBar from 'components/nav-bar/NavBar.vue';
	import {useRouter} from 'vue-router';
	import {useStore} from 'vuex';
	import {ref, reactive, toRefs, onMounted} from 'vue';
	
	export default {
		name:'Profile',
		components:{
			NavBar
		},
		setup() {
			const store = useStore();
			const router = useRouter();
			const state = reactive({
				user:{}
			})
			
			const tologout = () => {
				Logout().then(res => {
					if(res.status == '204'){
						 Toast.success('退出成功')
						 //清除token
						 window.localStorage.setItem('token', '')
						 store.commit('setIsLogin', false)
						 
						 setTimeout(() => {
							 router.push({path:'/login'})
						 },500)
					}
				})
			}
			
			onMounted(() => {
				getUser().then(res => {
					state.user = res
				})
			})
			
			//跳转
			const goTo = (path, query) => {
				router.push({path, query:query || {}})
			}
			
			return {
				tologout,
				...toRefs(state),
				goTo
			}
		}
	}
</script>

<style scoped lang="scss">
	#box {
		background: #FCFCFC;
		// height: 100vh;
	}
	.user-box{
		margin-top: 65px;
		.user-info{
			width: 94%;
			height: 115px;
			margin: 10px;
			background:linear-gradient(90deg, #31c7A7, #A1c7c7);
			box-shadow: 0 2px 5px #269090;
			border-radius: 6px;
			
			.info{
				position: relative;
				display: flex;
				width: 100%;
				height: 100%;
				padding: 15px 20px;
				text-align: left;
				img{
					width: 70px;
					height: 70px;
				}
				.desc{
					display: flex;
					flex-direction:column ;
					margin-left: 10px;
					font-size: 16px;
					color: #FFFFFF;
					span {
						padding: 2px 0;
					}
				}
			}
		}
		.user-list{
			margin: 10px;
			margin-top: 40px;
			width: 94%;
			font-size: 16px;
			li {
				margin: 20px 0 !important ;
				display: flex;
				padding-left: 10px;		
				padding-right: 10px;
				height: 40px;
				line-height: 40px;
				font-size: 18px;
				background: #FFFFFF;
				justify-content: space-between;
				.van-icon-arrow {
					margin-top: 10px;
				}
			}
		}
	}
</style>
