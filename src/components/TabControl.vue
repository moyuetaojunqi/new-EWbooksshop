<template>
	<div class="common">
		
		<div v-on:click="clickTab(index)" v-for="(item,index) in titles" 
		:key="index" class="common-item" :class="{active:index==currentIndex}">
			<span>{{item}}</span>
		</div>
		
	</div>
</template>

<script>
	import {ref} from 'vue';
	export default {
		name:'TabControl',
		
		props:{
			titles:{
				type:Array,
				default() {
					return []
				}
			}
		},
		
		setup(props,{emit}) {
			let currentIndex = ref(0)
			
			const clickTab = (index) => {
				currentIndex.value = index
				emit('tabclick',index)
			}
			
			return {
				clickTab,
				currentIndex
			}
		},
	}
</script>
    
<style scoped lang="scss">
	.common {
		height: 40px;
		line-height: 40px;
		display: flex;
		background-color: #FFFFFF;
		font-size: 14px;
		z-index: 10;
		position: sticky;
		
		.common-item {
			flex: 1;
			span {
				padding: 6px;
			}
		}
		.active{
			font-size: 15px;
			color: var(--color-tint);
			span{
				border-bottom: 3px solid var(--color-tint);
			}
		}
	}
</style>
