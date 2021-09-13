<template>
	<div class="">
		<nav-bar>
			<template v-slot:default>购物车</template>
		</nav-bar>

		<div class="cart-box">
			<div class="cart-body">
				<van-checkbox-group  ref="checkboxGroup" @change="groupChange" v-model="result">
					<van-swipe-cell v-for="(item,index) in list" :key="index">
						<div class="goods-item">
							<van-checkbox :name="item.id"/>
							<div class="good-img">
								<img :src="item.goods.cover_url">
							</div>
							<div class="good-desc">
								<div class="title">
									<span>{{item.goods.title}}</span>
									<span>×{{item.goods.stock}}</span>
								</div>
								<div class="good-btn">
									<div class="price"><small>￥</small>{{item.goods.price +'.00'}}</div>
									<van-stepper model-value="item.num" integer  :min="1" :max="item.goods.stock" :name="item.id"
									async-change @change="onChange"/>
								</div>
							</div>
						</div>
						<template #right>
							<van-button 
							square @click="deleteGood(item.id)"
							type="danger" 
							class="delete-button" text="删除" />
						</template>
					</van-swipe-cell>
				</van-checkbox-group>
			</div>
			
			<van-submit-bar :price="total* 100" class="sub-all" @submit="onSubmit" button-text="提交订单" >
				<van-checkbox @click="allCheck" v-model:checked="checkAll">全选</van-checkbox>
			</van-submit-bar>
			
			<div class="empty" v-if="!list.length">
				<img src="~assets/image/cart.jpg" class="empty-cart" alt="空购物车">
				<div class="titles">购物车空空如也</div>
				<van-button round color="#1baeae" type="primary" block @click="goTo">前往选购</van-button>
			</div>
		</div>
	</div>
</template>

<script>
	import NavBar from 'components/nav-bar/NavBar.vue';
	import {getCart, deleteCart, modyCart, checkedCart} from 'network/cart.js';
	import {ref, reactive, toRefs, onMounted, computed} from 'vue';
	import {useRouter} from 'vue-router';
	import {useStore} from 'vuex';
	import {Toast} from 'vant';
	
	 
	
	export default {
		name: 'Cartshop',
		components: {
			NavBar
		},
		setup() {
			const router = useRouter()
			const store = useStore()
			
			//数据模型 购物车列表
			const state = reactive({
				list:[],
				result:[],
				checkAll:true
			})
			//初始化购物车数据
			const init = () => {
				Toast.loading({message: '加载中...',forbidClick: true,})
				
				getCart('include=goods').then(res => {
					// console.log(res);
					state.list = res.data
					state.result = res.data.filter(n => n.is_checked == 1).map(item => item.id)
					Toast.clear();
				})
			}
			
			//复选框改变处理
			const groupChange = (result) => {
				if(result.length == state.list.length){
					state.checkAll=true
				}else{
					state.checkAll=false
				}
				
				// console.log(result)
				// state.result = result
				//改变数据表中的选中状态
				checkedCart({cart_ids:result})
			}
			
			onMounted(() => {
				init()
			})
			
			//异步g改变购物车数量
			const onChange = (value, detail) => {
				Toast.loading({message: '修改中...',forbidClick: true,})
				
				modyCart(detail.name, {num:value}).then(res => {
					//	在onMounted中的list中的num也要改变
					state.list.forEach(item => {
						if(item.id==detail.name){
							item.num = value
						}
					})
					Toast.clear();
				})
			}
			
			const allCheck = () => {
				if(!state.checkAll){
					state.checkAll = true
					state.result = state.list.map(item => item.id)
				}else{
					state.result = []
					state.checkAll = false
				}
			}
			
			//前往购物
			const goTo = () => {
				router.push({path:'/home'})
			}
			
			//删除商品
			const deleteGood = (id) => {
				deleteCart(id).then(res => {
					init() //重新初始化
					store.dispatch('updataCart') //改变vuex中状态数量
				})
			}
			
			//计算总价
			const total = computed(() => {
				let sum = 0
				
				state.list.filter(item => state.result.includes(item.id))
				.forEach(item => {
					sum += parseInt(item.num) * parseFloat(item.goods.price)
				})
				
				return sum
			})
			
			//生成订单
			const onSubmit = () => {
				if(state.result.length == 0){
					Toast.fail('请选择商品进行结算')
					return
				}else{
					router.push({path:'/createorder'})
				}
			}
			
			return {
				...toRefs(state),
				goTo,
				onChange,
				groupChange,
				allCheck,
				deleteGood,
				total,
				onSubmit
			}
		}
	}
</script>

<style scoped lang="scss">
	.cart-box{
		.cart-body{
			margin: 60px 0 100px 0;
			padding-left: 10px;
			.goods-item{
				display: flex;
				.good-img {
					padding-left: 20px;
					img {
						width: 100px;
						height: auto;
					}
				}
				.good-desc{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex:1;
					padding: 20px;
					.title{
						display: flex;
						justify-content:space-between;
					}
					.good-btn{
						display: flex;
						justify-content:space-between;
						.price{
							font-size: 16px;
							color: red;
							line-height: 28px;
						}
					}
				}
			}
			.delete-button{
				width: 50px;
				height: 100%;
			}
		}
		.empty {
			text-align: center;
			width: 50%;
			margin: 0 auto;
			margin-top: 200px;
			.empty-cart{
				width: 150px;
				margin-bottom: 20px;
			}
			.titles{
				font-size: 16px;
				margin-bottom: 20px;
			}
		}	
	}
	.sub-all {
		margin-bottom: 60px;
	}
</style>
