<template>
	<div class="address-box">
		<nav-bar>
			<template v-slot:default>{{title}}</template>
		</nav-bar>

		<van-address-edit
		    class="edit"
		    :area-list="areaList"
			:address-info="addressInfo"
			:show-delete="type == 'edit'"
		    show-set-default
		    show-search-result
		    :search-result="searchResult"
		    :area-columns-placeholder="['请选择', '请选择', '请选择']"
		    @save="onSave"
		    @delete="onDelete"
		     />
	</div>
</template>

<script>
	import NavBar from 'components/nav-bar/NavBar.vue';
	import { areaList } from '@vant/area-data';
	import { Toast } from 'vant';
	import {reactive, toRefs, onMounted, computed} from 'vue';
	import {useRouter, useRoute} from 'vue-router';
	import {addRess, getAddress, editAddress, deleteAddress, addressDetail} from 'network/address.js'
	
	export default {
		name:'Addresslist',
		components:{
			NavBar
		},
		setup() {
			const router = useRouter()
			const route = useRoute()
			const state = reactive({
				areaList:{
					province_list:{},
					city_list:{},
					county_list:{}
				},
				searchResult:[],
				addressInfo:{},
				type:'add',
				addressId:'',
				title:'',
			})
		
			
			onMounted(() => {
				//构造省市区的列表
				console.log(areaList)
				state.areaList.province_list = areaList.province_list
				state.areaList.city_list = areaList.city_list
				state.areaList.county_list = areaList.county_list
				//接收参数
				const {type, addressId} = route.query
				state.type = type
				state.addressId = addressId
				
				if(type == 'edit') {
					addressDetail(addressId).then(res => {
						const addressDetail = res
						let _areaCode = ''
						Object.entries(areaList.county_list).forEach((item) => {
						    if (addressDetail.county == item[1]) {
						        _areaCode = item[0];
						    }
						});
						state.addressInfo = {
							name:addressDetail.name,
							tel:addressDetail.phone,
							province:addressDetail.province,
							city:addressDetail.city,
							county:addressDetail.county,
							areaCode:_areaCode,
							addressDetail:addressDetail.address,
							isDefault: !!addressDetail.is_default
						}
					})
				}
			})
			
			const title = computed(() => {
				return state.type == 'add' ? '新增地址' : '编辑地址'
			})
			
			const onSave = (content) => {
				const params = {
					name:content.name,
					phone:content.tel,
					address:content.addressDetail,
					province:content.province,
					city:content.city,
					county:content.county,
					is_default:content.isDefault ? 1 : 0
				}
				
				if(state.type == 'edit'){
					//调用接口修改编辑地址数据
					editAddress(state.addressId, params)
				}else if(state.type == 'add'){
					//调用接口添加地址数据
				    getAddress(params)
				}
				
				
				Toast('保存成功')
				setTimeout(() => {
					router.go(-1);
				},1000)
			}
			
			const onDelete = () => {
				deleteAddress(state.addressId).then(res => {
					Toast('删除成功')
					setTimeout(() => {
						router.go(-1);
					},1000)
				})
			}
			
			return {
				...toRefs(state),
				onSave,
				onDelete,
				title,
			}
		}
	}
</script>

<style lang="scss">
	.address-box{
		margin-top: 60px;
		.van-cell {
			height: 60px;
			.van-field__label{
				line-height: 60px;
			}
			.van-field__value{
				line-height: 60px;
			}
			font-size: 16px;
		}
	
		.van-switch--on{
			background: var(--color-tint);
		}	
		
		.van-address-edit__buttons {
			.van-button--danger{
				background: var(--color-tint);
				border-color: var(--color-tint);
			}
		}
	}
	
</style>
