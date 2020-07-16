<template>
    <div class="mui-content">
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>用户名</label>
                <input id='account' type="text" class="mui-input-clear mui-input" v-model="username" placeholder="请输入用户名">
            </div>
            <div class="mui-input-row">
                <label>昵称</label>
                <input id='nickname' type="text" class="mui-input-clear mui-input" v-model="nickname" placeholder="请输入昵称">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input id='password' type="password" class="mui-input-clear mui-input" v-model="password" placeholder="请输入密码">
            </div>
            <div class="mui-input-row">
                <label>确认密码</label>
                <input id='password_confirm' type="password" class="mui-input-clear mui-input" v-model="password2" placeholder="请确认密码">
            </div>
            <div class="mui-input-row">
                <label>手机号码</label>
                <input id='phone' type="email" class="mui-input-clear mui-input" v-model="phone" placeholder="请输入手机号码">
            </div>
            <div class="mui-input-row">
                <label>电子邮箱</label>
                <input id='email' type="email" class="mui-input-clear mui-input"v-model="email" placeholder="请输入邮箱">
            </div>
        </form>
        <div class="mui-content-padded">
            <button id='reg' class="mui-btn mui-btn-block mui-btn-primary" @click="regist">注册</button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "regist",
        data(){
            return{
                name:'用户注册',
                username:'',
                nickname:'',
                password:'',
                password2:'',
                email:'',
                phone:'',
            }
        },
        mounted() {
            this.$emit('pagename', this.name)
        },
        methods:{
            regist(){
                let _this=this
                if ((this.username =='')||(this.nickname =='')||(this.password =='')||(this.password2 =='')||(this.email =='')||(this.phone =='')){
                    return Toast('信息填写不完整，请填写完整')
                }
                let re = /^[0-9a-zA-Z]{5,12}$/g;
                let re4 = /^.{0,10}$/g;
                let re2 = /^[0-9a-zA-Z]{8,20}$/g;
                let re3 = /^[0-9]{11}$/g;
                if (!re.test(this.username)){return Toast('用户名格式不正确，只能包含字母和数字，且长度为5-12个字符')}
                if (!re4.test(this.nickname)){return Toast('昵称格式不正确，长度为2-10个字符')}
                if (!re2.test(this.password)){return Toast('用户名格式不正确，只能包含字母和数字，且长度为8-20个字符')}
                if (this.password != this.password2){return Toast('两次输入的密码不一致，请检查后重试')}
                if (!re3.test(this.phone)){return Toast('手机号码输入错误，请检查后重试')}
                if (this.email.search("@") == -1){return Toast('邮箱格式不正确，请检查后重试')}
                this.axios({
				method: "post",
				url: "/api/regist",
				data: {
					username: this.username,
					password: this.password,
                    nickname: this.nickname,
                    email:this.email,
                    phone:this.phone,
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
                        Toast('注册成功,请登录')
                        setTimeout(function (){_this.$router.replace('/login')},1000);//延迟一秒
                    }else {
                        Toast(res.data.error)
                    }

                })
            }
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
        width: 30%;
    }
    .mui-input-row label~input,
    .mui-input-row label~select,
    .mui-input-row label~textarea {
        width: 70%;
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
    label{
        text-align: center;
    }
</style>
