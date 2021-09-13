<template>
	<div class="navbar">
		<div class="left" v-on:click="goback">
			<slot name="left">
				<img src="~assets/image/jiantou.png" >
			</slot>
		</div>
		<div class="center">
			<slot>EWshop</slot>
		</div>
		<div class="right">
			<slot name="right"></slot>
		</div>
	</div>	
</template>

<script>
	import {useRouter} from 'vue-router';
	export default {
		name:'NavBar',
		setup() {
			const router = useRouter ();
			const goback = () => {
				router.go(-1)
			}
			
			return {
				goback
			}
		}
	}
</script>

<style>
	.navbar{
		position:fixed;
		display: flex;
		background-color: var(--color-tint);
		color:#FFFFFF;
		left:0;
		right:0;
		top:0;
		z-index: 9;	
		height: 45px;
		line-height: 45px;
		box-shadow: 0 2px 0 rgba(100,100,100,0.1);
	}
	.left, .right {
		width: 60px;
	}
	
	.left img {
		width: 45px;
		padding: 12px;
	}
	
	.center {
		flex:1;
	}
</style>
