import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/home/index'
import news from '@/components/news/news'
import newsdetail from '@/components/news/newsdetail'
import photodir from '@/components/photo/photodir'
import photolist from '@/components/photo/photolist'
import photodetail from '@/components/photo/photodetail'
import login from '@/components/comment/login'
import regist from '@/components/comment/regist'
import forgetpw from '@/components/comment/forgetpw'
import discuss from '@/components/discuss/discuss'
import my from '@/components/user/my'
import address_book from '@/components/address_book/address_book'
import introduction from '@/components/introduction/introduction'
import b_data from '@/components/business_data/business_data'
import market_report from '@/components/market_report/market_report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: index,
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },{
      path: '/news',
      name: 'news',
      component: news,
    },{
      path: '/newsdetail/:id',
      name:'newsdetail',
      component:newsdetail
    },{
      path: '/photodir',
      name:'photodir',
      component:photodir
    },{
      path: '/photolist',
      name:'photolist',
      component:photolist
    },{
      path: '/photodetail:index',
      name:'photodetail',
      component:photodetail
    },{
      path: '/login',
      name:'login',
      component:login
    },{
      path: '/regist',
      name:'regist',
      component:regist
    },{
      path: '/forgetpw',
      name:'forgetpw',
      component:forgetpw
    },{
      path: '/discuss',
      name: 'discuss',
      component:discuss
    },{
      path: '/my',
      name: 'my',
      component:my
    },{
      path: '/address_book',
      name: 'address_book',
      component:address_book
    },{
      path: '/introduction',
      name: 'introduction',
      component:introduction
    }, {
      path: '/b_data',
      name: 'b_data',
      component: b_data,
    }, {
      path: '/market_report',
      name: 'market_report',
      component: market_report,
    },
  ]
})
