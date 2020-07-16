<template>
    <div class="footer">
        <mt-tabbar v-model="selected">
            <mt-tab-item id="index">
                <span class="mui-icon mui-icon-home"></span><br>
                <span class="mui-tab-label">首页</span>
            </mt-tab-item>
            <mt-tab-item id="news">
                <span class="mui-icon mui-icon-pengyouquan"></span><br>
                <span class="mui-tab-label">行业新闻</span>
            </mt-tab-item>
            <mt-tab-item id="photo">
                 <span class="mui-icon el-icon-picture-outline"></span><br>
                <span class="mui-tab-label">公司相册</span>
            </mt-tab-item>
            <mt-tab-item id="discuss">
                <span class="mui-icon mui-icon-chatboxes"></span><br>
                <span class="mui-tab-label">留言讨论</span>
            </mt-tab-item>
            <mt-tab-item id="my">
                <span class="mui-icon mui-icon-person"></span><br>
                <span class="mui-tab-label">我的</span>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
export default {
    name: 'footer-bar',
     props:{
        current: String,
     },
    data() {
        return {
            selected: this.current,
        }
    },
    watch: {
        selected: function (val, oldVal) {
            // 这里就可以通过 val 的值变更来确定去向
            switch(val){
                case 'index':
                    this.$router.replace('/index');
                break;
                case 'news':
                    this.$router.replace('/news');
                break;
                case 'photo':
                    this.$router.replace('/photodir');
                break;
                case 'discuss':
                    this.$router.replace('/discuss');
                break;
                case 'my':
                    this.$router.replace('/my');
                break;
            }
        }
    },

}
</script>

<style scoped>
    .footer {
        z-index: 5000;
    }
.mui-icon {
    font-size: 0.4rem;
    line-height: 0.6rem;
}
.mint-tab-item {
    color: #888888;
}
.is-selected {
    color: #007aff;
}
</style>
