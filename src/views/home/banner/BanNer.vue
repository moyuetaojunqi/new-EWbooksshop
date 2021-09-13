<template>
	<div class="banner">
		<van-swipe :autoplay="3000">
		  <van-swipe-item v-for="(item, index) in banners" :key="index">
		    <img :src="item.img_url" >
		  </van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
	export default {
		name:'BanNer',
		props:{
			banners:Array,
			default() {
				return []
			}
		}
	}
</script>

<style scoped>
	img {
		width:100% ;
		height: 200px ;
	}
</style>
