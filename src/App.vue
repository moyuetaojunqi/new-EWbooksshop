<template>
 <!-- <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view> -->
  <router-view/>
  <div id="nav">
    <router-link class="tab-bar-item" to="/home">
		<div class="icon">
			<i class="iconfont icon-biaoqiankuozhan_shouye-311"></i>
		</div>
		<div>首页</div>
	</router-link> 
    <router-link class="tab-bar-item" to="/cartgory">
		<div class="icon">
			<i class="iconfont icon-ziyuan"></i>
		</div>
		<div>分类</div>
	</router-link> 
	<router-link class="tab-bar-item" to="/cartshop">
		<div class="icon">
			<van-badge :content="$store.state.user.cartCount" max="99">
			  <i class="iconfont icon-gouwuchekong"></i>
			</van-badge>
		</div>
		<div>购物车</div>
	</router-link> 
	<router-link class="tab-bar-item" to="/profile">
		<div class="icon">
			<i class="iconfont icon-wode"></i>
		</div>
		<div>我的</div>
	</router-link> 
	
  </div>
</template>	

<script type="text/javascript">
	import {useStore} from 'vuex'
	import {onMounted} from 'vue'
	
	export default {
	  name: 'App',
	 
	  setup(){
		  const store = useStore()		
		  onMounted(() => {
			  store.dispatch('updataCart')
		  })
	  }
	//   created () {
	//     //在页面加载时读取sessionStorage里的状态信息
	//     if (sessionStorage.getItem("store") ) {
	//         this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
	//     } 
	
	//     //在页面刷新时将vuex里的信息保存到sessionStorage里
	//     window.addEventListener("beforeunload",()=>{
	//         sessionStorage.setItem("store",JSON.stringify(this.$store.state))
	//     })
	//   }
	}
</script>

<style lang="scss">
	@import "assets/css/base.css";
	@import "assets/css/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: pink;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0,-3px 1px rgba(100,100,100,0.2);

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  
  .tab-bar-item {
	  flex:1;
	  height: 50px;
	  font-size: var(--font-size);
  }
  
  .tab-bar-item .icon {
	  width: 24px;
	  height: 24px;
	  margin-top: 5px;
	  display: inline-block;
	  vertical-align: middle;
  }
}
</style>
