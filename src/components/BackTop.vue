<template>
	<div class="backtop">
		
	</div>
</template>

<script>
	export default {
		name:'BackTop'
	}
</script>

<style scoped>
	.backtop {
		position: fixed;
		bottom: 80px;
		right: 25px;
		width: 40px;
		height: 40px;
		z-index: 20;
		box-shadow: 5px 5px 5px #888;
		border-radius: 50%;
		background: #fff url('~assets/image/up.png') no-repeat center center;
	}
</style>
