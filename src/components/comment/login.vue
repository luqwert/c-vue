<template>
    <div class="mui-content">
        <form id='login-form' class="mui-input-group">
            <div class="mui-input-row">
                <label>账号</label>
                <input id='account' type="text" class="mui-input-clear mui-input" v-model="username" placeholder="请输入账号">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input id='password' type="password" class="mui-input-clear mui-input" v-model="password" placeholder="请输入密码">
            </div>
        </form>
        <div class="mui-content-padded">
            <button id='login' type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="login">登录</button>
            <div class="link-area"><a id='reg' @click="regist">注册账号</a> <span class="spliter">|</span> <a id='forgetPassword' @click="forget">忘记密码</a>
            </div>
        </div>

    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "login",
        data(){
            return{
                name:'登录',
                username:'',
                password:'',
                login_data:{},
            }
        },
        mounted() {
            this.$emit('pagename', this.name)
        },
        methods:{
            login(){
                let _this=this
                if(this.username.length <5) {
                    return Toast('账号最短为5个字符');
                }
                if(this.password.length <8) {
                    return Toast('密码最短为8个字符');
                }
                this.axios({
				method: "post",
				url: "/api/userlogin",
				data: {
					username: this.username,
					password: this.password,
				},
				transformRequest: [function (data) {
					let ret = ''
					for (let it in data) {
					  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				  }]
			}).then(res => {
			        console.log(res);
                    if (res.data.u_name) {
                       this.login_data = {
                            'u_email': res.data.u_email,
                            'u_face': res.data.u_face,
                           'u_name': res.data.u_name,
                           'nick_name': res.data.nick_name,
                            'u_phone': res.data.u_phone,
                            'u_rtime':res.data.u_rtime
                        };
                        // console.log(this.login_data);
                        this.save_login_data();
                        Toast('登录成功');
                        setTimeout(function (){_this.$router.replace('/index')},1000);
                    }else {
                        Toast(res.data.error)
                    }

                })


            },
            regist(){
                this.$router.push('/regist')
            },
            forget(){
                this.$router.push('/forgetpw')
            },
            save_login_data(){
                this.$store.commit('save_login_data',this.login_data)
                console.log('仓库数据', this.$store.state.login_data)
		    },
        }

    }

</script>

<style scoped>
    .area {
        margin: 20px auto 0px auto;
    }

    .mui-input-group {
        margin-top: 10px;
    }

    .mui-input-group:first-child {
        margin-top: 20px;
    }

    .mui-input-group label {
        width: 22%;
    }

    .mui-input-row label~input,
    .mui-input-row label~select,
    .mui-input-row label~textarea {
        width: 78%;
    }

    .mui-checkbox input[type=checkbox],
    .mui-radio input[type=radio] {
        top: 6px;
    }

    .mui-content-padded {
        margin-top: 25px;
    }

    .mui-btn {
        padding: 10px;
    }

    .link-area {
        display: block;
        margin-top: 25px;
        text-align: center;
    }

    .spliter {
        color: #bbb;
        padding: 0px 8px;
    }

    .oauth-area {
        position: absolute;
        bottom: 20px;
        left: 0px;
        text-align: center;
        width: 100%;
        padding: 0px;
        margin: 0px;
    }

    .oauth-area .oauth-btn {
        display: inline-block;
        width: 50px;
        height: 50px;
        background-size: 30px 30px;
        background-position: center center;
        background-repeat: no-repeat;
        margin: 0px 20px;
        /*-webkit-filter: grayscale(100%); */
        border: solid 1px #ddd;
        border-radius: 25px;
    }

    .oauth-area .oauth-btn:active {
        border: solid 1px #aaa;
    }

    .oauth-area .oauth-btn.disabled {
        background-color: #ddd;
    }
</style>
