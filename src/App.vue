<template>
  <div id="app">
    <header class="mui-bar mui-bar-nav">
        <a v-if="name != '华锟金属'" @click="back" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">{{name}}</h1>
    </header>
    <router-view v-on:pagename="listenToMyBoy"/>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import '../static/mui/css/mui.min.css'
import FooterBar from './components/comment/footer-mint'
export default {
  name: 'App',
  components:{
    'footer-bar': FooterBar,
  },
  data(){
    return{
      name:''
    }
  },
  methods:{
    listenToMyBoy(pagename) {
        this.name = pagename
      },
    back(){
      this.$router.back()
    }

  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: white;
}
.mint-tabbar {
  position: fixed;
}
    .mui-bar-nav {
        height: 0.88rem;
        line-height: 0.88rem;
    }
    .mui-bar-nav a {
        line-height: 0.48rem;
        font-size: 0.34rem;
    }
    .mui-title {
        line-height: 0.88rem;
        font-size: 0.34rem;
    }
</style>
