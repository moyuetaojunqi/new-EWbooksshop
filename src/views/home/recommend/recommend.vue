<template>
	<div class="recommend">
		<div class="recommend-item" v-for="item in recommends.slice(0,4)" :key='item.id'>
			<a href="" v-on:click.prevent ="godetail(item.id)">
				<img v-lazy="item.cover_url" >
				<div>{{item.title}}</div>
			</a>
		</div>
		
	</div>
</template>

<script>
	import {useRouter} from 'vue-router';
	
	export default {
		name:"recommend",
		props:{
			recommends:{
				type:Array,
				default() {
					return []
				}
			}
		},
		setup() {
			const router = useRouter();
			
			const godetail = (id) => {
				router.push({path:'/detail',query:{id}})
			}
			
			return {
				godetail
			}
		}
	}
</script>

<style scoped lang="scss">
	.recommend {
		display: flex;
		width: 100%;
		padding: 15px 0 30px;
		text-align: center;
		border-bottom: 8px solid #EEE;
		font-size: 12px;
	}
	.recommend-item {
		flex:1;
		img {
			width: 70px;
			height: 70px;
			margin-bottom: 10px;
		}
	}
	
</style>
