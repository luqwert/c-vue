<template>
    <el-container class="discuss-container">
        <el-header class="newsub-container" v-if="subject">
            <el-card class="box-card" :body-style="{ padding: '10px' }" >
                <div style="text-align: right;" @click="edit_new_sub"><el-button type="primary" ><i class="el-icon-edit el-icon--left"></i>创建新留言</el-button></div>
            </el-card>
        </el-header>
        <el-header class="nosub-container" v-if="!subject">
            <el-card class="box-card" :body-style="{ padding: '10px' }">
                <div class="text item">
                    暂时没有留言信息，请创建第一个留言吧
                </div>
                <div style="text-align: right" @click="centerDialogVisible = true"><el-button type="primary" ><i class="el-icon-edit el-icon--left"></i>创建留言</el-button></div>
            </el-card>
        </el-header>
        <el-main class="sub-container" v-if="subject">
            <div v-for="(sub,index) in subject" :key="sub.id">
                <el-card class="box-card"  :body-style="{ padding: '10px' }" shadow="hover" style="margin-bottom: 10px">
                    <el-container class="text item">
                        <el-aside width="50px"><el-avatar icon="el-icon-user-solid"></el-avatar></el-aside>
                        <el-main >
                            <p>{{sub.话题人昵称 }}</p>
                            <p>{{sub.发表时间}}</p>
                        </el-main>
                    </el-container>

                    <div class="text item liuyan_content">
                        <h4>{{sub.话题名称}}</h4>
                        <p>{{sub.话题内容}}</p>
                    </div>
                    <div class="text item liuyan_footer">
                         <i @click="like(sub.id, index)" class="el-icon-thumb"></i> {{sub.点赞数}}人赞 &nbsp&nbsp <span @click="reply(index)"><i class="el-icon-chat-round"></i> 回复</span> &nbsp&nbsp <span v-if="sub.回复.length"><span v-if="sub.comment_display" @click="open_hide_comment(index)">展开评论</span><span v-if="!sub.comment_display" @click="open_hide_comment(index)">收起评论</span></span>
                    </div>
                    <el-collapse-transition>
                        <el-card v-if="sub.text_area_display || sub.回复.length" class="box-card" :body-style="{ paddingLeft: '5px', paddingRight: '5px', paddingTop: '5px', paddingBottom: '5px' }" >
                            <el-collapse-transition>
                                <div v-if="sub.text_area_display" class="new_subject">
                                    <p><i class="el-icon-edit"></i> 发布评论</p>
                                    <el-input
                                      type="textarea"
                                      placeholder="请输入内容"
                                      v-model="comment_content"
                                      maxlength="240"
                                      show-word-limit
                                    >
                                    </el-input>
                                    <div class="submit_button" @click="send_comment(sub.id)">
                                        <el-button type="primary">提交<i class="el-icon-check el-icon--right"></i></el-button>
                                    </div>
                                </div>
                            </el-collapse-transition>
                            <el-collapse-transition>
                                <div v-if="!sub.comment_display">
                                    <div v-for="reply in sub.回复" :key="reply.id" class="comment_area">
                                        <div>
                                            {{reply.回复人昵称}}： {{reply.回复内容}}
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-transition>
                            <el-collapse-transition>
                                <div class="comment_count" v-if="sub.comment_display"><p>有{{sub.回复.length}}条评论</p></div>
                            </el-collapse-transition>
                        </el-card>
                    </el-collapse-transition>
                </el-card>

            </div>
        </el-main>
        <el-dialog
            title="创建新留言"
            :visible.sync="centerDialogVisible"
            width="90%"
            destroy-on-close:true
            center>
            <el-input
                      type="text"
                      placeholder="请输入标题"
                      v-model="sub_title"
                      maxlength="20"
                      show-word-limit
                    >
            </el-input>
            <el-input
                      type="textarea"
                      placeholder="请输入内容"
                      v-model="sub_content"
                      maxlength="240"
                      show-word-limit
                    >
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="send_subject">提 交</el-button>
            </span>
        </el-dialog>

    </el-container>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "discuss",
        data() {
            return {
                name: '留言讨论',
                subject:[],
                sub_title: '',
                sub_content: '',
                comment_content:'',
                input_dispaly:true,
                newsub_input:false,
                centerDialogVisible: false,
                dolikeed:[],
            }
        },
        mounted() {
            this.$emit('pagename', this.name)
            this.get_subject()
            // console.log(this.$store.state.login_data)
        },
        destroyed () {

        },
        methods:{
            like(id,index){
                if(this.dolikeed[index]){
                    return Toast('已经点赞过了，不能重复点赞！')
                }else {
                    this.axios({
                        method: "post",
                        url: "/api/likesubject",
                        data: {
                            s_id: id,
                        },
                        transformRequest: [function (data) {
                            let ret = ''
                            for (let it in data) {
                              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                          }]
                    }).then((res) => {
                        console.log(res);
                        if(res.data.success){
                            this.dolikeed[index]=true;
                            this.subject[index].点赞数 = this.subject[index].点赞数 + 1
                        }else {
                            Toast('点赞失败，请返回重试')
                        }
                    })
                }
            },
            reply(index){
                this.subject[index].text_area_display = !this.subject[index].text_area_display
            },
            first_liuyan(){
                this.input_dispaly = !this.input_dispaly
            },
            get_subject(){
                this.axios.get('/api/getsubject').then(res =>{
                    console.log(res.data)
                    this.subject = res.data
                })
            },
            send_subject(){
                if(!this.sub_title || !this.sub_content){
                    return this.$message({
                          message: '标题和内容不能为空',
                          type: 'warning'
                        })
                }
                this.axios({
                    method: "post",
                    url: "/api/sendsubject",
                    data: {
                        u_name: this.$store.state.login_data.u_name,
                        nick_name: this.$store.state.login_data.nick_name,
                        u_face: this.$store.state.login_data.u_face,
                        sub_title: this.sub_title,
                        sub_content: this.sub_content,
                    },
                    transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                      }]
                }).then((res) => {
                    console.log(res);
                    if(res.data.success){
                        this.get_subject();
                        this.sub_title = '';
                        this.sub_content = '';
                        this.centerDialogVisible = false;
                    }else {
                        Toast('留言提交失败，请返回重试')
                    }
                })
            },
            open_hide_comment(index){
                this.subject[index].comment_display = !this.subject[index].comment_display
            },
            send_comment(s_id){
                if(!this.comment_content){
                    return Toast('评论内容不能为空')
                }
                if(this.$store.state.login_data.u_name){
                    this.axios({
                        method: "post",
                        url: "/api/sendcomment",
                        data: {
                            u_name: this.$store.state.login_data.u_name,
                            nick_name: this.$store.state.login_data.nick_name,
                            u_face: this.$store.state.login_data.u_face,
                            sub_id: s_id,
                            comment_content: this.comment_content,
                        },
                        transformRequest: [function (data) {
                            let ret = ''
                            for (let it in data) {
                              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                          }]
                    }).then((res) => {
                        console.log(res);
                        if(res.data.success){
                            this.get_subject();
                            this.comment_content = '';
                            this.text_area_display = false;
                        }else {
                            Toast('回复提交失败，请返回重试')
                        }
                    })
                }else {
                    this.axios({
                        method: "post",
                        url: "/api/sendcomment",
                        data: {
                            u_name: 'visitor',
                            nick_name: '访客',
                            u_face: '',
                            sub_id: s_id,
                            comment_content: this.comment_content,
                        },
                        transformRequest: [function (data) {
                            let ret = ''
                            for (let it in data) {
                              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                          }]
                    }).then((res) => {
                        console.log(res);
                        if(res.data.success){
                            this.get_subject();
                            this.comment_content = '';
                            this.text_area_display = false;
                        }else {
                            Toast('回复提交失败，请返回重试')
                        }
                    })
                }

            },
            edit_new_sub(){
                if(this.$store.state.login_data.u_name){
                    this.centerDialogVisible = true
                }else {
                    Toast('未登录不能创建新留言，请登录后重试')
                }
            },
        }
    }
</script>

<style scoped>
    .discuss-container{
        min-height: 15.44rem;
        overflow-x: hidden;
        padding-top: 1rem;
        padding-bottom:1.3rem;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        flex-direction:column
    }
    .new_subject{
        text-align: left;
    }
    .submit_button {
        margin-top: 0.1rem;
        text-align:right
    }
    .el-avatar--icon {
        width: 50px;
        height: 50px;
        font-size: 0.6rem;
    }
    .el-main {
        padding: 0;
        height: 50px;
        margin-left: 0.2rem;
    }
    h4 {
        font-weight: 400;
        font-size: 0.32rem;
    }
    .liuyan_content {
        margin-top: 0.1rem;
    }
    .liuyan_content p {
        background-color: rgba(188,242,226,0.44);
    }
    .liuyan_footer {
        margin-top: 0.2rem;
        font-size: 0.3rem;
    }
    .liuyan_content p {
        margin-top: 0.2rem;
    }
    .newsub-container {
        padding: 0;
    }
    .sub-container {
        margin: 0;
    }
    .comment_area {
        border-left: 2px solid #AAAAAA;
        padding-left: 0.1rem;
        font-size: 0.25rem;
        line-height: 0.35rem;
    }
    .comment_count {
        font-size: 0.25rem;
        line-height: 0.35rem;
    }
    .sub-container data-v-4abfc651 {
        margin-bottom: 10px;
    }

</style>
