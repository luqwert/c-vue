<template>
    <div class="photodir-container">
        <div v-for="item in this.dirlist" class="photodir" :key="item.name" @click="gotophotolist(item.name)">
            <img v-if="!item.coverphoto" src="../../../static/img/filedir.jpg" alt="" class="dir-cover">
            <img v-if="item.coverphoto" :src='item.coverphoto'  alt="" class="dir-cover">
            <p>{{item.name}}</p>
        </div>

    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "photodir",
        data(){
            return {
                name: '公司相册',
                dirlist:[],
            }
        },
        mounted() {
            this.$emit('pagename', this.name)
            this.axios.get('/api/getphotolist').then(res =>{
                console.log(res.data)
                this.dirlist = res.data
            })
        },
        methods:{
            gotophotolist(dirname){
                if (!this.$store.state.login_data.u_name) {
                    return Toast('未登录用户不能查看照片，请登录后重试')
                }
                this.$router.push({
                    path: '/photolist',
                    query: {
                        dirname: dirname
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .photodir-container {
        padding-top: 1rem;
        padding-bottom: 1.3rem;
        overflow: hidden;
        min-height: 15.44rem;
    }
    .photodir {
        width: 48%;
        display: block;
        float: left;
        text-align: center;
        margin: 1% 1% 1% 1%;


    }
    .dir-cover {
        width: 100%;
        margin-right: 4%;
        margin-bottom: 4%;
        height: 3rem;
        overflow: hidden;
        box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.5),
        0 4px 4px rgba(0,0,0,0.3),
        0 0 8px 2px rgba(0,0,0,0.2);
        }
</style>
