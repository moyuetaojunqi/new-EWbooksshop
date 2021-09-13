<template>
	<div class="goods-item">
		<img v-lazy="product.cover_url" v-on:click="itemClick">
		<div class="gooos-info">
			<p>{{product.title}}</p>
			<span class="price">￥{{product.price}}</span>
			<span class="collcet">{{product.collects_count}}</span>
		</div>
	</div>
</template>

<script>
	import {useRouter} from 'vue-router';
	export default {
		name:'GoodListItem',
		props:{
			product:Object,
			default () {
				return {}
			}
		},
		setup(props) {
			const router = useRouter()
			return {
				itemClick:()=>{
					router.push({path:'/detail',query:{id:props.product.id}})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.goods-item {
		width: 40%;
		padding-bottom: 40px;
		position: relative;
		img {
			width: 80%;
			height: 140px;
			border-radius: 5px;
		}
		.gooos-info {
			font-size: 12px;
			position: absolute;
			overflow: hidden;
			left: 0;
			right: 0;
			bottom: 5px;
			text-align: center;
			p {
				overflow: hidden;//超出文本隐藏
				text-overflow: ellipsis;//文本缩放
				white-space: nowrap;
				margin-bottom: 3px;
			}
			.price {
				color:red;
				margin-right: 20px;
			}
			.collcet {
				position: relative;
			}
			.collcet::before {
				content: '';
				position: absolute;
				left: -15px;
				width: 14px;
				height: 14px;
				top: -1px;
				background: url('~assets/image/collect.png') 0 0/14px 14px;
			}
		}
	}
</style>
