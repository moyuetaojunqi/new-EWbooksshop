<template>
	<div id="address-box">
		<nav-bar>
			<template v-slot:default>地址管理</template>
		</nav-bar>
		
		<div v-show="list.length == 0" style="margin-top: 150px; color: #42B983; font-size: 18px;">
			还没有地址信息,去添加地址信息
		</div>
		
		<div class="address-item">
			<van-address-list
			  v-model="chosenAddressId"
			  :list="list"
			  default-tag-text="默认"
			  @add="onAdd"
			  @edit="onEdit"
			  @select="onSelect"
			/>
		</div>
	</div>
</template>

<script>
	import NavBar from 'components/nav-bar/NavBar.vue';
	import {reactive, toRefs, onMounted} from 'vue';
	import {useRouter, useRoute} from 'vue-router';
	import {addRess, getAddress, addressList} from 'network/address.js';
	
	export default {
		name:'Address',
		components:{
			NavBar
		},
		setup() {
			const router = useRouter()
			const route = useRoute()
			const state = reactive({
				chosenAddressId:'1',
				list:[]
			})
			
			onMounted(() => {
				addressList().then(res => {
					if(res.data.length == 0){
						state.list = []
						return
					}
					state.list = res.data.map(item => {
						return {
							id:item.id,
							name:item.name,
							tel:item.phone,
							address:`${item.province} ${item.city} ${item.county} ${item.address}`,
							isDefault:!!item.is_default //布尔型
						}
					})
				})
			})
			
			//t添加地址
			const onAdd = () =>{
				router.push({path:'/addresslist', query:{type:'add'}})
			}
			
			//修改地址
			const onEdit = (item) =>{
				router.push({path:'/addresslist', query:{type:'edit', addressId:item.id}})
			}
			
			const onSelect = (item) =>{
				router.push({path:'/createorder', query:{addressId:item.id}})
			}
			
			return {
				...toRefs(state),
				onAdd,
				onEdit,
				onSelect
			}
		}
	}
</script>

<style  lang="scss">
	#address-box{
		height: 300px;
		.van-radio__icon{
			display: none;
		}
		.address-item{
			margin-top: 45px;
			.van-button{
				background: var(--color-tint);
				border-color: var(--color-tint);
			}
		}
	}
	
	.van-address-list__bottom{
		bottom:100px;
	}
	
</style>
