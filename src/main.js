// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import vuex from 'vuex'
import Apple from './components/apple'
import Banana from './components/banana'
Vue.use(VueRouter)
Vue.use(vuex)

Vue.config.productionTip = false
let router = new VueRouter({
		routes:[
			{
				path:'/',
				redirect:'/apple'
			},
			{
				path:'./components/apple',
				component:Apple
//				children:[
//					{
//							path:'./components/REdapple',
//							component:REdapple
//					}
//				]
			},
			{
				path:'./components/banana',
				component:Banana
			}
		]
	})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  components: { App },
  template: '<App/>',
})
