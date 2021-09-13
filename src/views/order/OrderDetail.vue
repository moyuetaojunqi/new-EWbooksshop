<template>
	<div class="order-detail-box">
		<nav-bar>
			<template v-slot:default>订单详情</template>
		</nav-bar>
		
		<div class="order-status">
			<div class="order-item">
				<label>订单状态:</label>
				<span>{{statusString}}</span>
			</div>
			<div class="order-item">
				<label>订单编号:</label>
				<span>{{detail.order_no}}</span>
			</div>
			<div class="order-item">
				<label>下单时间:</label>
				<span>{{detail.created_at}}</span>
			</div>
			<van-button v-if="detail.status == 1" @click="showPayFn" color="#1baeae" block>去支付</van-button>
			<van-button v-if="detail.status == 2"  @click="confirmOrder" block>确认订单</van-button>
		</div>
		
		<div class="order-price">
			<div class="price-item">
				<label>商品金额:</label>
				<span>￥{{total +'.00'}}</span>
			</div>
			<div class="price-item">
				<label>配送方式:</label>
				<span>中国邮政</span>
			</div>
		</div>
		
		<van-card
		v-for="item in detail.orderDetails.data" :key="item.id"
		  :num="item.num"
		  :price="item.price+'.00'"
		  desc="全场包邮"
		  :title="item.goods.title"
		  :thumb="item.goods.cover_url"
		/>
		
		<van-popup
		  v-model:show="showPay"
		  position="bottom"
		  :style="{ height: '40%' }"
		> 
		    <div :style="{width:'90%',margin:'0 auto',padding:'50px 0'}">
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
		    </div>
		</van-popup>
	</div>
</template>

<script>
	import NavBar from 'components/nav-bar/NavBar.vue';
	import { Toast } from 'vant';
	import {reactive, toRefs, onMounted, computed} from 'vue';
	import {useRouter, useRoute} from 'vue-router';
	import {getOrderList, orderDetail, orderStatus, payOrder, confirmOrder} from 'network/order.js'
	
	export default {
		name:'OrderDetail',
		components:{
			NavBar
		},
		setup() {
			const router = useRouter()
			const route = useRoute()
			const state = reactive({
				orderNo:'' ,//订单id
				detail:{
					orderDetails:{
						data:[]
					},
					status:'0'
				},
				showPay:false,
				aliyun:'',
				wechat:'',
			})
			
			const init = () =>{
				const {id} = route.query
				state.orderNo = id
				
				orderDetail(id).then(res =>{
					state.detail = res
				})
			}
			
			const statusString = computed(() =>{
				let status = ['','已下单','已支付','等待发货','确认收货','已过期',]
				return status[state.detail.status]
			})
			
			const showPayFn = () =>{
				state.showPay = true
				
				payOrder(state.orderNo, {type:'aliyun'}).then(res =>{
				console.log(res)
					var start_url = 'https://api.shop.eduwork.cn'
					var end_url = res.qr_code_url
					state.aliyun = start_url + end_url
				})
				
				//轮循 及扫完二维码后跳转回
				const timer = setInterval(() =>{
					orderStatus(state.orderNo).then(res =>{
						if(res == 2){
							state.showPay = false
							clearInterval(timer);
							router.push({path:'/orderdetail', query:{id:state.orderNo}})
						}
					})
				},2000)	
			}
			
			const confirmOrder = () =>{
				Dialog.confirm({
				  title: '是否确认订单',
				}).then(() =>{
					confirmOrder(state.orderNo).then(res =>{
							Toast('确认成功')
							init()
					})
				}).catch(() =>{
					
				})
			}
			
			const total = computed(() =>{
				let sum = 0
				state.detail.orderDetails.data.forEach(item =>{
					sum += item.num * item.price
				})
				return sum
			})
			
			onMounted(() =>{
				Toast.loading({message:'加载中...',forbidClick: true,})
				init()
				Toast.clear()
			})
			
			return {
				...toRefs(state),
				statusString,
				total,
				showPayFn,
				confirmOrder
			}
		}
	}
</script>

<style scoped lang="scss">
	.order-detail-box{
		text-align: left;
		background: #f7f7f7;
		.order-status{
			margin-top: 45px;
			padding: 20px;
			.order-item{
				padding-bottom: 10px;
				font-size: 16px;
				label {
					color:#888888
				}
				span {
					padding-left: 1em;
				}
			}
			.van-button{
				margin-bottom: 15px;
			}
		}
		.order-price{
			background: #FFFFFF;
			padding: 20px;
			.price-item{
				padding-bottom: 10px ;
				label {
					color:#888888
				}
				span {
					padding-left: 1em;
				}
			}
		}
		::v-deep .van-card{
			.van-multi-ellipsis--l2{
				font-size: 16px;
			}
			.van-ellipsis {
				color: red;
			}
		}
	}
</style>
