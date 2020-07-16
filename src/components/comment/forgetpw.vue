<template>
    <div class="mui-content">
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>账号</label>
                <input id='account' type="text" class="mui-input-clear mui-input" v-model="username" placeholder="请输入用户名">
            </div>
            <div class="mui-input-row">
                <label>邮箱</label>
                <input id='email' type="email" class="mui-input-clear mui-input" v-model="email" placeholder="请输入注册邮箱">
            </div>
            <div class="mui-input-row" v-if="password">
                <label>密码</label>
                <label>{{password}}</label>
            </div>
        </form>
        <div class="mui-content-padded">
            <button id='sendMail' class="mui-btn mui-btn-block mui-btn-primary" @click="forgetpw">提交</button>
            <div class="link-area"><a @click="login">登录账号</a> <span class="spliter">|</span> <a  @click="index">返回首页</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "forgetpw",
        data(){
            return{
                name:'找回密码',
                email:'',
                username:'',
                password: '',
            }
        },
        mounted() {
            this.$emit('pagename', this.name)
        },
        methods:{
            forgetpw(){
                let _this=this
                let re = /^[0-9a-zA-Z]{5,12}$/g;
                if (!re.test(this.username)){return Toast('用户名格式不正确，只能包含字母和数字，且长度为5-12个字符')}
                if (this.email.search("@") == -1){return Toast('邮箱格式不正确，请检查后重试')}
                this.axios({
				method: "post",
				url: "/api/forgetpw",
				data: {
					username: this.username,
                    email:this.email,
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
                        Toast('密码已找回,请保管好密码')
                        this.password = res.data.u_password
                    }else {
                        Toast(res.data.error)
                    }

                })
            },
            login(){this.$router.push('/login')},
            index(){this.$router.replace('/index')},
        }

    }
</script>

<style scoped>
    .area {
        margin: 20px auto 0px auto;
    }
    .mui-input-group:first-child {
        margin-top: 20px;
    }
    .mui-input-group label {
        width: 22%;
    }

    .mui-input-row label~label,
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
    .mui-input-row label~input, .mui-input-row label~select, .mui-input-row label~textarea{
        margin-top: 1px;
    }
    .link-area {
        display: block;
        margin-top: 25px;
        text-align: center;
    }
</style>
