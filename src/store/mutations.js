const mutations = {
	setIsLogin(state, payload) {
		state.user.isLogin = payload
	},
	
	addCart(state, payload){
		state.user.cartCount = payload.count
	}
}

export default mutations