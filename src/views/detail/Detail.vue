<template>
	<div class="">
		<nav-bar>
			<template v-slot:default>商品详情{{id}}</template>
		</nav-bar>
		
		<div class="">
			<van-image style="margin-top: 50px;"
			  width="100%"
			  lazy-load
			  :src="detail.cover_url"
			/>
			
			<van-card style="text-align: left;"
			  :num="detail.stock"
			  :price="detail.price+'.00'"
			  :desc="detail.description"
			  :title="detail.title"
			 
			>
			  <template #tags>
			    <van-tag plain type="danger">新书</van-tag>
			    <van-tag plain type="danger">{{detail.is_recommend = 1? '推荐' : '不推荐'}}</van-tag>
			  </template>
			  <template #footer>
			    <van-button type="warning" @click="AddCart">加入购物车</van-button>
			    <van-button type="danger" @click="goToCart">立即购买</van-button>
			  </template>
			</van-card>
			
			<van-tabs v-model="activeName">
			  <van-tab title="概述" name="a">
				  <div class="content" v-html="detail.details">
				  	
				  </div>
			  </van-tab>
			  <van-tab title="热评" name="b">
				  <div v-for="item in detail.comments">
				  	 {{item}}
				  </div>
			  </van-tab>
			  <van-tab title="相关图书" name="c">
				  <good-list :goods='like'></good-list>
			  </van-tab>
			</van-tabs>
			
		</div>
	</div>
</template>

<script>
	import GoodList from 'components/goods/GoodList.vue';
	import NavBar from 'components/nav-bar/NavBar.vue';
	import {useRoute, useRouter} from 'vue-router';
	import {ref, reactive, onMounted, toRefs} from 'vue';
	import {getDetailData} from 'network/detail.js';
	import {addCart} from 'network/cart.js';
	import {Toast} from 'vant';
	import {useStore} from 'vuex'
	
	export default {
		name:'Detail',
		components:{
			NavBar,
			GoodList
		},
		setup() {
			const route = useRoute();
			const router = useRouter();
			const store = useStore();
			let id = ref(0);
			let book = reactive({
				detail:{},
				like:[],
			});
			let activeName = ref('a')
			
			onMounted(()=>{
				id.value = route.query.id
				getDetailData(id.value).then(res=>{
					book.detail = res.goods
					book.like = res.like_goods
				})
			})
			//添加购物车
			const AddCart = () => {
				addCart({goods_id:book.detail.id, num:1}).then(res => {
					if(res.status == '201' || res.status == '204'){
						Toast.success('添加成功')
						//设置store 中cartCount
						store.dispatch('updataCart')
					}
				})
			}
			//立即购买
			const goToCart = () => {
				addCart({goods_id:book.detail.id, num:1}).then(res => {
					if(res.status == '201' || res.status == '204'){
						Toast.success('添加成功')
						store.dispatch('updataCart')
						router.push({path:'/cartshop'})
					}
				})
			}
			
			return {
				id,
				...toRefs(book),
				activeName,
				AddCart,
				goToCart
			}
		}
	}
</script>

<style scoped lang="scss">
	 ::v-deep .content {
		padding: 10px;
		img {
			max-width: 100%;
			height: auto;
		}
	}
</style>
