import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    redirect:'/admin/home/',
    children:[
      {
        path: '/admin/home/',
        name: 'Homepage',
        component: () => import('../components/Homepage.vue'),
        meta:{
          data:['主页']
        }
      },
      { 
        path: '/admin/product/product_list', 
        name: 'Product_list', 
        component: () => import('../components/Product_list.vue'),
        meta:{
          data:['商品','商品管理']
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
