<template>
	<div class="order-box">
		<nav-bar>
			<template v-slot:default>订单列表</template>
		</nav-bar>
		
		<van-tabs ref="tabs" @click="onChangeTab" class="order-tab" >
			  <van-tab title="全部"></van-tab>
			  <van-tab title="待付款"></van-tab>
			  <van-tab title="已支付"></van-tab>
			  <van-tab title="发货"></van-tab>
			  <van-tab title="已签收"></van-tab>
			  <van-tab title="过期"></van-tab>
		</van-tabs>
		
		<div class="content" >
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="min-height: 200px;" >
			    <van-list
			      v-model="loading"
				  :immediate-check="false"
			      :finished="finished"
			      finished-text="没有更多了"
			      @load="onLoad"
				  @offset= "70"
			    >
			        <div class="order-item-box" v-for="(item, index) in list" :key="index" @click="goToDetail(item.id)">
			      	    <div class="order-item-header">
			      		    <p>订单编号:  {{item.order_no}}</p>
						    <p>下单时间:  {{item.created_at}}</p>
			      	    </div>
					
					    <van-card
						    v-for="sub in item.orderDetails.data" :key="sub.id"
					        :num="sub.num"
					        :price="sub.goods.price"
					        desc="包邮"
					        :title="sub.goods.title"
					        :thumb="sub.goods.cover_url"
					    />
			        </div>
			    </van-list>
			</van-pull-refresh>
		</div>
	</div>
</template>

<script>
	import NavBar from 'components/nav-bar/NavBar.vue';
	import { Toast } from 'vant';
	import {ref, reactive, toRefs, onMounted, computed} from 'vue';
	import {useRouter, useRoute} from 'vue-router';
	import {getOrderList} from 'network/order.js'
	
	export default {
		name:'Order',
		components:{
			NavBar
		},
		setup() {
			
			let tabs = ref()
			const router = useRouter()
			const route = useRoute()
			const state = reactive({
				 list: [],
				 loading: false,
				 finished: false,
				 refreshing: false,
				 status:0,
				 page:1,
				 totalPage:0,
			})
			
			onMounted(() =>{
				 onRefresh() //初始化
			})
			
			const loadData = () => {
			      
			    getOrderList({page: state.page, status: state.status, include: "orderDetails.goods"}).then(res => {
					console.log(res)
			        // 重新加载订单列表
			        state.list = state.list.concat(res.data);
			        state.loading = false;
					
					console.log(state.page+"#######")
			        // 接口中的页数传递给变量总页数
			        state.totalPage = res.meta.pagination.total_pages;
			        // 如果总页数等于当前页
			        if (state.page >= state.totalPage) {
			            state.finished = true;
			        }else{
						state.finished = false;
					}
			    })
			}
			    
			const onLoad = () => {
			    // 如果当前页小于总页数的时候
			    if (!state.refreshing && state.page < state.totalPage) {
			        state.page = state.page + 1;
			    }
				
			    if (state.refreshing) {
			        state.list = [];
			        state.refreshing = false;
			    }
			
			    loadData()
			}
				
			const onRefresh = () =>{
				//是否处于下拉刷新加载状态 ，不触发load事件
				state.refreshing = true 
				// 清空列表数据
				state.finished = true
				//设置加载状态
				state.loading = true
				
				state.page = 1
				
				onLoad()
			}
			
			// tab切换
			const onChangeTab = (name) =>{
				state.status = name
				onRefresh()
			}
			
			const goToDetail = (id) =>{
				router.push({path:'/orderDetail',query:{id}})
			}
			
			return {
				...toRefs(state),
				onRefresh,
				onLoad,
				onChangeTab,
				goToDetail,
				tabs
			}
		}
	}
</script>

<style scoped>
	.order-box{
		text-align: left;
		height: 100vh;
		position: relative;
	}
	
	.order-tab{
		height: 45px;
		position: fixed;
		top: 44px;
		bottom: 0px;
		left: 0;
		right: 0;
		z-index: 100;
		border-bottom: 1px solid #42b983;
		font-size: 16px;
	}	
		
	.content{
		position: absolute;
		top: 90px;
		bottom: 50px;
		left: 0;
		right: 0;
		overflow: hidden;
		overflow-y: scroll;
	}
	
	.content .order-item-box{
		border-bottom: 6px solid #42b983;
	}		
	
	.content .order-item-header{
		display: flex;
		flex-direction:column;
		justify-content: space-between;
		text-align: left;
		background: #f7f7f7;
	}				
	
	p {
		padding: 10px 0 0 10px;
	}				
			
</style>
