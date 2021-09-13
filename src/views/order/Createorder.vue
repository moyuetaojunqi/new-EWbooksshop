<template>
	<div class="create-order">
		<nav-bar>
			<template v-slot:default>订单预览</template>
		</nav-bar>
		
		<div class="address-wrap">
			<div class="name" @click="goTo">
				<span>{{address.name}}</span>
				<span>{{address.phone}}</span>
			</div>
			<div class="address">
				{{address.province}} {{address.city}} {{address.county}} {{address.address}}
			</div>
			<van-icon name="arrow"/>
		</div>
		
		<div class="good">
			<div class="good-item" v-for="(item, index) in cartList" :key="index">
				<div class="good-img">
					<img v-lazy="item.goods.cover_url" >
				</div>
				<div class="good-desc">
					<div class="good-title">
						<span>{{item.goods.title}}</span>
						<span>x{{item.num}}</span>
					</div>
					<div class="good-btn">
						<div class="price">￥{{item.goods.price}}</div>
					</div>
				</div>
			</div>
		</div>
		
		<van-submit-bar
		    class="submit-all"
		    :price="total * 100" 
		    button-text="生成订单" 
		    @submit="handleCreateOrder" 
		>
		   商品金额
		</van-submit-bar>  
		
		<van-popup
		  closeable
		  v-model:show="showPay"
		  :close-on-click-overlay="false"
		  position="bottom"
		  :style="{ height: '40%' }"
		  @close="close"
		>
		   <van-grid :border="false" :column-num="2">
		     <van-grid-item>
				 支付宝二维码<br>
		       <van-image :src="aliyun" width="150" height="150"/>
		     </van-grid-item>
		     <van-grid-item>
				 微信二维码<br>
		       <van-image :src="aliyun" width="150" height="150"/>
		     </van-grid-item>
		   </van-grid>
		</van-popup>
	</div>
</template>

<script>
	import NavBar from 'components/nav-bar/NavBar.vue';
	import { Toast } from 'vant';
	import {reactive, toRefs, onMounted, computed} from 'vue';
	import {useRouter, useRoute} from 'vue-router';
	import {creatOrder, getOrderPreview, payOrder, orderStatus} from 'network/order.js'
	import {useStore} from 'vuex'
	
	
	export default {
		name:'Createorder',
		components:{
			NavBar
		},
		setup() {
			const router = useRouter()
			const store = useStore()
			const route = useRoute()
			const state = reactive({
				cartList:[],
				address:{},
				showPay:false,
				orderNo:'',
				aliyun:'',
				wechat:'',
			})
			
			const init = () =>{
				Toast.loading({message: '加载中...',forbidClick: true,})
				
				getOrderPreview().then(res =>{
					let address = res.address.filter(n =>n.is_default == 1)
					
					if(address.length == 0){
						state.address = {
							address:'还没有设置默认地址，请先填写地址信息'
						}
					}else{
						state.address = address[0]
					}
					state.cartList = res.carts
					
					Toast.clear()
				})
			}
			onMounted(() => {
				init();
			})
			
			const goTo = () =>{
				router.push({path:'/address'})
			}
			
			const close = () =>{
				router.push({path:'/orderdetail', query:{id:state.orderNo}})
			}
			
			const handleCreateOrder = () =>{
				const params = {
					address_id: state.address.id
				}
				creatOrder(params).then(res =>{
					Toast('创建订单成功')
					store.dispatch('updataCart')
					state.showPay = true
					// //订单ID
					state.orderNo = res.id
					
					payOrder(state.orderNo, {type:'aliyun'}).then(res =>{
						var start_url = 'https://api.shop.eduwork.cn'
						var end_url = res.qr_code_url
						state.aliyun = start_url + end_url
					})
					//轮循 及扫完二维码后跳转回
					const timer = setInterval(() =>{
						orderStatus(state.orderNo).then(res =>{
							if(res == 2){
								clearInterval(timer);
								router.push({path:'/orderdetail', query:{id:state.orderNo}})
							}
						})
					},2000)						
				})
			}
			
			//商品价格计算
			const total = computed(() =>{
				let sum = 0
				state.cartList.forEach(item =>{
					sum += parseInt(item.num) * parseFloat(item.goods.price)
				})
				return sum
			})
			
			return {
				...toRefs(state),
				goTo,
				close,
				total,
				handleCreateOrder,
			}
		}
	}
	
	// <div :style="{width:'90%', margin:'0 auto', padding:'50px 0'}">
	// 	<van-button :style="{marginBottom:'10px'}" color="#1989fa" block>
	// 		支付宝支付
	// 	</van-button>
	// 	<van-button color="#4fc08d" block>
	// 		微信支付
	// 	</van-button>
	// </div>
</script>

<style scoped lang="scss">
	.create-order {
		background: #f9f9f9;
		.address-wrap {
			text-align: left;
			margin-bottom: 20px;
			background: #fff;
			position: relative;
			margin-top: 45px;
			padding: 15px;
			font-size: 14px;
			color:#222333;
			.name {
				margin: 20px 0
			}
			.address {
				margin: 20px 0
			}
			.van-icon {
				position: absolute;
				top: 50%;
				right: 10px;
				transform: translateY(-50%);
				font-size: 20px;
			}
			&::before{
				position: absolute;
				right: 0;
				bottom: 0;
				left: 0;
				height: 2px;
				background: -webkit-repeating-linear-gradient(134deg, #ff6c6c 0, #ff6c6c 20%, transparent 25%);
				background-size: 120px;
				content: '';
			}
		}
		.good{
			margin-bottom: 120px;
			.good-item{
				padding: 10px;
				background: #fff;
				display: flex;
				
				.good-img{
					img {
						width: 100px;
						height: auto;
					}
				}
				.good-desc{
					display: flex;
					flex-direction: column;
					flex:1;
					justify-content: space-between;
					padding: 20px;
					.good-title{
						display: flex;
						justify-content: space-between;			
					}
					.good-btn{
						display: flex;
						justify-content: space-between;
						.price{
							color: red;
							font-size: 16px;
							font-weight: bold ;
						}
					}
				}
			}
		}
		.submit-all{
			margin-bottom: 60px;
			z-index:9 !important
		}
	}
</style>
