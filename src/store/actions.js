import {getCart} from 'network/cart.js'
const actions = {
	updataCart({commit}) {
		getCart().then(res => {
			//console.log(res)
			commit('addCart',{count:res.data.length	|| 0})
		})
	}
} 
export default actions