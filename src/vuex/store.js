import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'

Vue.use(Vuex);

//state用于存储数据
var state = {
    count:1,
    newslist:[],
    imagelist:[],
    login_data:{},
};

//mutations 定义方法
var mutations = {
    incCount(){
        ++state.count;
    },
    savenews(state,list){
        state.newslist = list
    },
    saveimages(state,images){
        state.imagelist = images
    },
    save_login_data(state,login_data){
        state.login_data = login_data
    }
};

//实例化Vuex.store
const store = new Vuex.Store({
    state,
    mutations: mutations,
    plugins: [createVuexAlong({
      name: "vuex-along", // 设置保存的集合名字，避免同站点下的多项目数据冲突
      local: {
        list: ["newslist","imagelist","login_data"],
        isFilter: false // 过滤模块 ma 数据， 将其他的存入 localStorage
      },
      session: {
        list: ["newslist","imagelist","login_data"] // 保存 count 和模块 ma 中的 a1 到 sessionStorage
      }
    }
    )]
});

//暴露
export default store;
