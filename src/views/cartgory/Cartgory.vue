<template>
	<div class="">
		<nav-bar>
			<template v-slot:default>分类页面</template>
		</nav-bar>
		
		<div id="mainbox">
			<div class="ordertab">
				<div class="white">
				</div>
				<tab-control v-on:tabclick ="Tabclick" class="clicktable"  :titles="['销量排序','价格排序','评论排序']"></tab-control>
			</div>
			
			<div class="goodlist">
				<div class="leftmenu">
					<van-collapse v-model="activeName" accordion>
					  <van-collapse-item v-for="item in categorys" :key="item.id" :title="item.name">
						  <van-sidebar v-model="activeKey">
						    <van-sidebar-item style="font-size: 12px;" v-for="sub in item.children" :key=sub.id :title="sub.name" v-on:click="getGoods(sub.id)"/>
						  </van-sidebar>
					  </van-collapse-item>
					</van-collapse>
					
				</div>
				<div class="rightmenu">
					<div class="content" >
						<van-card
						v-for="item in showGoods" :key="item.id"
						v-on:click="ClickDetail(item.id)"
						  :num="item.comments_count"
						  :tag="item.comments_count > 0? '流行' :'标签'"
						  :price="item.price"
						  :desc="item.updated_at"
						  :title="item.title"
						  :thumb="item.cover_url"
						  :lazy-load="true"
						/>
					</div>
				</div>
			</div>
			
		</div>
		<back-top v-on:click.native ="backtop" v-show = "isShowBackTop"></back-top>
	</div>
</template>

<script>
	import BackTop from 'components/BackTop.vue';
	import BScroll from 'better-scroll';
	import TabControl from 'components/TabControl.vue';
	import {ref, reactive, onMounted, computed, watchEffect, nextTick} from 'vue';
	import {useRouter} from 'vue-router';
	import NavBar from 'components/nav-bar/NavBar.vue';
	import {getCartAllDate, getCartGoodsDate} from 'network/cartgory.js';
	export default {
		name:'Cartgory',
		components:{
			NavBar,
			TabControl,
			BackTop
		},
		setup() {
			let activeKey = ref(0)
			let activeName = ref(1)
			let categorys = ref([])
			let currentOrder = ref ('sales')
			let currentCid = ref(0)
			let bscroll = reactive({})
			let isShowBackTop = ref(false)
			const router = useRouter()
			
			// 商品列表数据模型
			const goods = reactive ({
				sales:{page:1,list:[]},
				price:{page:1,list:[]},
				comments_count:{page:1,list:[]},
			})
			
			const init = () => {
				getCartGoodsDate('sales').then(res => {
					goods.sales.list=res.goods.data
				})
				
				getCartGoodsDate('price').then(res => {
					goods.price.list=res.goods.data
				})
				
				getCartGoodsDate('comments_count').then(res => {
					goods.comments_count.list=res.goods.data
				})
			}
			
			onMounted(() => {
				getCartAllDate().then(res => {
					categorys.value = res.categories 
				})
				
				bscroll =  new  BScroll ( document.querySelector('.rightmenu') ,{
					click:true,
					probeType:1 ,
					pullUpLoad:true
				})
				
				//触发滚动scroll事件
				bscroll.on('scroll',(position) => {
					isShowBackTop.value = (-position.y) > 300
				})
				
				
				
				//上拉加载数据 触发pillingup
				bscroll.on('pullingUp',() => {
					
					const page = goods[currentOrder.value].page + 1;
					getCartGoodsDate(currentOrder.value, page).then(res => {
					    goods[currentOrder.value].list.push(...res.goods.data);
					    goods[currentOrder.value].page += 1	
					})
					
					//完成上拉 等数据请求完成 要将新数据展示出来
					bscroll.finishPullUp();
					
					bscroll.refresh(); //上拉加载数据 重新计算高度	
				}) 	
				
				init();
			})
			
			const backtop = () => {
				bscroll.scrollTo(0,0)
			}
			
			//监听 任何一个变量有变化
			watchEffect(() => {
				nextTick(() => {
					//重新计算高度
					bscroll && bscroll.refresh()
				})
			})
			
			const showGoods = computed (() => {
				return goods[currentOrder.value].list
			})
			
			const Tabclick = (index) => {
				let orders = ['sales','price','comments_count']
				currentOrder.value = orders[index]
				getCartGoodsDate('currentOrder.value', currentCid.value).then(res => {
					goods.[currentOrder.value].list=res.goods.data
				})
				// nextTick(() => {
				// 	重新计算高度
				// 	bscroll && bscroll.refresh()
				// })
			}
			
			const getGoods = (id) => {
				currentCid.value = id
				init();
			}
			
			return {
				Tabclick,
				activeKey,
				categorys,
				activeName,
				currentOrder,
				getGoods,
				currentCid,
				goods,
				showGoods,
				isShowBackTop,
				backtop,
				ClickDetail:(id)=>{
					router.push({path:'/detail',query:{id}})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	#mainbox {
		margin-top: 45px;
		.ordertab {
			display: flex;
			width: 100%;
			height: 40px;
			.white {
				width:30% ;
			}
			.clicktable {
				width: 70%;
			}
		}
		.goodlist{
			display: flex;
			.leftmenu {
				width:30% ;
				height: 230px;
			}
			.rightmenu {
				width: 70%;
				height: 100vh;
				text-align: left;
				.content {
					background-color: lightgreen;
				}
			}
		}	
	}
	.van-image {
		width: 28px !important;
	}
</style>
