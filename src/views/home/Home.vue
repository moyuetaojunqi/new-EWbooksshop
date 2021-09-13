<template>
	<div class="home">
		<nav-bar>
			<template v-slot:default>图书世界</template>
		</nav-bar>
		
		<tab-control v-show = "isTabFixed" v-on:tabclick ="Tabclick" :titles="['畅销','新书','精选']"></tab-control>
		
		<div class="wrapper">
			<div class="content">			
				<div ref="banref">
				
					<ban-ner :banners="banners"></ban-ner>
					
					<recommend :recommends = 'recommends'></recommend>
				</div>
				
				<tab-control  v-on:tabclick ="Tabclick" :titles="['畅销','新书','精选']"></tab-control>
				
				<good-list :goods='showgoods'></good-list>
			</div>
		</div>
		<back-top v-on:click.native ="backtop" v-show = "isTabFixed"></back-top>
	</div>
</template>

<script> 
	import BanNer from './banner/BanNer.vue'
	import BackTop from 'components/BackTop.vue';
    import BScroll from 'better-scroll';
	import NavBar from 'components/nav-bar/NavBar.vue';
	import TabControl from 'components/TabControl.vue';
	import recommend from './recommend/recommend.vue';
	import {getHomeAllDate,getHomeGoodsDate} from 'network/home.js';
	import {onMounted, ref, reactive,computed, watchEffect, nextTick} from 'vue';
	import GoodList from 'components/goods/GoodList.vue'
	
	
	export default {
		name:'Home',
		setup() {
			const recommends = ref([])
			let isTabFixed = ref(false)
			let banref = ref()
			let banners = ref([])
			
			//商品列表数据模型
			const goods = reactive ({
				sales:{page:1,list:[]},
				new:{page:1,list:[]},
				recommend:{page:1,list:[]},
			})
		
		    let currentType = ref ('sales')
			
			const showgoods = computed (() => {
				return goods[currentType.value].list
			})
			
			 let bscroll = reactive({});
		
			onMounted (() => {
				getHomeAllDate().then(res => {
				
					recommends.value = res.goods.data
					banners.value = res.slides
				})
				
				getHomeGoodsDate('sales').then(res => {
					 goods.sales.list=res.goods.data
				})
				
				getHomeGoodsDate('recommend').then(res => {
				 	goods.recommend.list=res.goods.data
				 })
				
				 getHomeGoodsDate('new').then(res => {
					goods.new.list=res.goods.data
				})
				
				
				
				// 创建BetterScroll对象
				bscroll =  new  BScroll ( document.querySelector('.wrapper') ,{ 	
					click:true,
					probeType:3,
					pullUpLoad:true
				})
				
				//触发滚动scroll事件
				bscroll.on('scroll',(position) => {
					isTabFixed.value = (-position.y) > banref.value.offsetHeight 
				})
				
				
				//上拉加载数据 触发pillingup
				bscroll.on('pullingUp',() => {
					
					const page = goods[currentType.value].page + 1;
					getHomeGoodsDate(currentType.value, page).then(res => {
					    goods[currentType.value].list.push(...res.goods.data);
					    goods[currentType.value].page += 1	
					})
					
					//完成上拉 等数据请求完成 要将新数据展示出来
					bscroll.finishPullUp();
					
					bscroll.refresh(); //上拉加载数据 重新计算高度
					
				}) 	
			})
			
			const Tabclick = (index) => {
				let types = ['sales','new','recommend']
				currentType.value = types[index]
				nextTick(() => {
					//重新计算高度
					bscroll && bscroll.refresh()
				})
			}
			
			//监听 任何一个变量有变化
			watchEffect(() => {
				nextTick(() => {
					//重新计算高度
					bscroll && bscroll.refresh()
				})
			})
			const backtop = () => {
				bscroll.scrollTo(0,0)
			}
			
			return {
				recommends,
				Tabclick,
				goods,
				showgoods,
				isTabFixed,
				banref,
				backtop,
				banners
			}
		},
		components:{
			NavBar,
			recommend,
			TabControl,
			GoodList,
			BackTop,
			BanNer
		},
		
	}
</script>

<style scoped>
	.home {
		position: relative;
		height: 100vh;
	}
	.wrapper {
		position: fixed;
		top: 0px;
		bottom: 50px;
		left: 0;
		right: 0;
	}
	.content {
		padding-top: 45px;
	}
</style>
