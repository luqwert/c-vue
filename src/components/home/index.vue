<template>
  <div class="index-container">
    <transition >
      <div>
        <swipe class="my-swipe" :speed="800">
        <swipe-item class="slide1"></swipe-item>
        <swipe-item class="slide2"></swipe-item>
        <swipe-item class="slide3"></swipe-item>
      </swipe>
      <div class="jiugpongge">
        <div class="uni-row1">
			<div class="flex-item" @click="introduction">
				<p class="iconfont mui-icon mui-icon el-icon-bank-card"></p>
				<p class="icon-text">公司简介</p>
			</div>
			<div class="flex-item" @click="market_report">
				<p class="iconfont mui-icon el-icon-data-analysis"></p>
				<p class="icon-text">市场周报</p>
			</div>
			<div class="flex-item">
				<p class="iconfont mui-icon el-icon-s-data" @click="b_data"></p>
				<p class="icon-text">业务数据</p>
			</div>
		</div>
		<div class="uni-row2">
			<div class="flex-item">
				<p class="iconfont mui-icon el-icon-document-copy"></p>
				<p class="icon-text">公司资料</p>
			</div>
			<div class="flex-item" @click="address_book">
				<p class="iconfont mui-icon mui-icon-contact "></p>
				<p class="icon-text">通讯录</p>
			</div>
			<div class="flex-item">
				<p class="iconfont mui-icon el-icon-bell"></p>
				<p class="icon-text">活动通知</p>
			</div>
		</div>
      </div>
        <div class="products">
          <ul>
            <ol class="ptitle">主要产品</ol>
            <li class="product-item">
              <img src="http://img61.ddimg.cn/upload_img/00791/xmj/750x310_dl_0626-1561722481.jpg" alt="">
              <p>dasdada</p>
            </li>
            <li class="product-item">
              <img src="http://img61.ddimg.cn/upload_img/00791/xmj/750x310_dl_0626-1561722481.jpg" alt="">
              <p>dasdada</p>
            </li>
            <li class="customer-item">
              <img src="http://img61.ddimg.cn/upload_img/00791/xmj/750x310_dl_0626-1561722481.jpg" alt="">
              <p>dasdada</p>
            </li>
            <li class="customer-item">
              <img src="http://img61.ddimg.cn/upload_img/00791/xmj/750x310_dl_0626-1561722481.jpg" alt="">
              <p>dasdada</p>
            </li>
            <li class="customer-item">
              <img src="http://img61.ddimg.cn/upload_img/00791/xmj/750x310_dl_0626-1561722481.jpg" alt="">
              <p>dasdada</p>
            </li>
            <li class="customer-item">
              <img src="http://img61.ddimg.cn/upload_img/00791/xmj/750x310_dl_0626-1561722481.jpg" alt="">
              <p>dasdada</p>
            </li>
          </ul>
        </div>
        <div class="customer">
          <ul>
            <ol class="ptitle">主要客户</ol>
            <li class="customer-item">
              <img src="http://img61.ddimg.cn/upload_img/00791/xmj/750x310_dl_0626-1561722481.jpg" alt="">
              <p>dasdada</p>
            </li>
            <li class="customer-item">
              <img src="http://img61.ddimg.cn/upload_img/00791/xmj/750x310_dl_0626-1561722481.jpg" alt="">
              <p>dasdada</p>
            </li>
            <li class="customer-item">
              <img src="http://img61.ddimg.cn/upload_img/00791/xmj/750x310_dl_0626-1561722481.jpg" alt="">
              <p>dasdada</p>
            </li>
            <li class="customer-item">
              <img src="http://img61.ddimg.cn/upload_img/00791/xmj/750x310_dl_0626-1561722481.jpg" alt="">
              <p>dasdada</p>
            </li>
          </ul>
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
import commenheader from '../comment/header'
require('vue-swipe/dist/vue-swipe.css');
import '../../../static/mui/css/mui.min.css'
import { Swipe, SwipeItem } from 'vue-swipe';
export default {
    name: "index",
    components: {
      commenheader,
      'swipe': Swipe,
      'swipe-item': SwipeItem
    },
    data(){
      return {
        name: '华锟金属'
      }
    },
    mounted() {
      this.$emit('pagename', this.name)
    },
    methods:{
        address_book(){
            this.$router.push('/address_book')
        },
        introduction(){
            this.$router.push('/introduction')
        },
        b_data(){
            this.$router.push('/b_data')
        },
        market_report(){
            this.$router.push('/market_report')
        },
    }
}
</script>

<style scoped>
.index-container {
    overflow-x: hidden;
    padding-bottom: 1.2rem;
  }
  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s;
  }
  .my-swipe {
    height: 3rem;
    color: #fff;
    font-size: 0.6rem;
    text-align: center;
    margin-top: 1rem;
  }

  .slide1 {
    background-image: url(/static/img/banner0.jpeg);
    color: #fff;
    background-size:100% 100%;
  }

  .slide3 {
    background-image: url(/static/img/banner2.jpeg);
    color: #fff;
    background-size:100% 100%;
  }
    .slide2 {
    background-image: url(/static/img/banner3.jpeg);
    color: #fff;
    background-size:100% 100%;
  }
  	.iconfont {
	  font-size: 1rem;
	  color: #EE7621;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	.uni-row1 {
		margin-top:  0.1rem;
		display: flex;
	}
    .uni-row2{
        margin-top: 0.2rem;
		display: flex;
	}
	.flex-item {
		flex-grow: 1;
		text-align: center;
        color: #EE7621;
	}
	.icon-text {
		font-size: 0.2rem;
        line-height: 0.3rem;
        color: #EE7621;
	}
  .iconfont {
    font-size: 1rem;
    font-weight: 400;
  }
  li {
    display: block;
    float: left;
    overflow: hidden;
    width: 50%;
    padding: 0 1%;
  }
  img {
    width: 100%;
    height: 2.5rem;
  }
  li p {
    text-align: center;
    font-size: 0.35rem;
  }
  .ptitle {
    margin-left: 1%;
    margin-right: 1%;
    display: block;
    float: left;
    width: 98%;
    margin-top: 0.2rem;
    text-align: left;
    font-weight: 500;
    font-size: 0.3rem;
    color: 	#AAAAAA;
    background-image: linear-gradient(-180deg, #FFFEFF 0%, #D7FFFE 100%);
  }
</style>
