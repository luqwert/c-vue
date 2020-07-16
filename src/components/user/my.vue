<template>
    <el-container class="my-container">
        <el-header class="block avatar"><el-avatar :size="80" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar></el-header>
        <el-main>
            <div class="user-info" v-if="login_data.u_name">
                <p class="nickname">{{login_data.nick_name}}</p>
                <p>用户名：{{login_data.u_name}}</p>
                <P>注册时间：{{login_data.u_rtime}}</P>
            </div>
            <div class="no-login" v-if="!login_data.u_name">
                <p> 用户没有登录</p>
            </div>
            <div class="tools">
                <div class="mymessage tools-item">
                    <span><i class="el-icon-message"></i> 我的消息</span>
                </div>
                <div class="mypublish tools-item">
                    <span><i class="el-icon-document-add"></i> 我的发布</span>
                </div>
                <div class="settings tools-item">
                    <span><i class="el-icon-setting"></i> 设置</span>
                </div>
                <div class="logout" v-if="login_data.u_name">
                    <el-button type="danger"  size="medium" @click="logout">退出登录</el-button>
                </div>
                <div class="logout" v-if="!login_data.u_name">
                    <el-button type="primary" size="medium" @click="login">登录</el-button>
                </div>
            </div>


        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "my",
        data(){
            return{
                name:'我的',
                login_data:{},
            }
        },
        mounted() {
            this.$emit('pagename', this.name)
            this.login_data = this.$store.state.login_data
            console.log(this.login_data)
        },
        methods:{
            logout(){
                this.login_data = {}
                this.$store.commit('save_login_data',this.login_data)
            },
            login(){
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>
    .my-container{
        min-height: 15.44rem;
        overflow-x: hidden;
        padding-top: 1rem;
        padding-bottom: 1.3rem;
    }
    .avatar {
        padding-top: 0.5rem;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
    }
    .user-info {
        padding: 1rem 1rem 0;
        text-align: center;
    }
    .user-info p {
        font-size: 0.3rem;
    }
    .tools {
        margin-top: 1rem;
    }
    .tools-item {
        font-size: 0.32rem;
        margin-top: 0.2rem;
        color: rgba(0,0,0,0.7);
    }
    .tools-item:hover {
        color: #0099ff;
    }
    i{
        color: #dd524d;
    }
    .el-button {
        margin-top: 1rem;
        width: 100%;
    }
    .user-info p:first-child {
        color: #000000;
        font-weight: 500;
        font-size: 0.4rem;
    }
    .no-login {
        font-size: 0.3rem;
        text-align: center;
        padding: 1rem 1rem 0;
    }
</style>
