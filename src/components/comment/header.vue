<template>
  <div class="header2">
    <router-link to="/">
      <button class="home">首页</button>
    </router-link>
    <h2 class="title">{{pagename}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'header2',
    props:['pagename'],
  }
</script>

<style scoped>
.header2 {
  height: 1rem;
  background-color: dodgerblue;
  position: fixed;
  top: 0;
  width: 100%;
  line-height: 1rem;
  z-index: 1000;
}
  .home {
    color: #fff;
  }
  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
  }
</style>
