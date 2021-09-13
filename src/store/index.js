import { createStore } from 'vuex'
import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';

const state = {
	user:{
			isLogin:window.localStorage.getItem('token')? true : false,
			cartCount:0
	}
}

export default createStore({
  state,
  mutations,
  actions,
  getters
})
