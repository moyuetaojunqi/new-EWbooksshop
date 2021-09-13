<template>
	<div class="goods">
		<Good-List-Item v-for="item in goods" :product='item' :key='item'></Good-List-Item>
	</div>
</template>

<script>
	import GoodListItem from './GoodListItem.vue'
	export default {
		name:'GoodList',
		props:{
			goods:{
				type:Array,
				default() {
					return []
				}
			}
		},
		components:{
			GoodListItem
		}
	}
</script>

<style scoped>
	.goods {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 10px;
	}
</style>
