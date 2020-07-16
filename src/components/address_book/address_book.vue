<template>
    <el-main class="address_book_container">
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item  v-for='item in addressbook' :key="item.departmentname" :title="item.departmentname" :name="item.departmentname">
            <el-collapse v-model="activeNames2" accordion>
              <el-collapse-item  class="person" v-for='(item2,index) in item.data' :key="item2[0]" :title="item2[1]" :name="item2[0]">
                  <el-form label-position="left" class="demo-table-expand person-items">
                      <el-form-item label="职位" class="person-item">
                        <span>{{ item2[8] }}</span>
                      </el-form-item>
                      <el-form-item label="性别">
                        <span v-if="item2[7]">男</span><span v-if="!item2[7]">女</span>
                      </el-form-item>
                      <el-form-item label="手机">
                        <span>{{ item2[4] }}</span>
                      </el-form-item>
                      <el-form-item label="分机号">
                        <span>{{ item2[3] }}</span>
                      </el-form-item>
                      <el-form-item label="直线电话">
                        <span v-if="item2[5]">{{ item2[5] }}</span><span v-if="!item2[5]">无</span>
                      </el-form-item>
                      <el-form-item label="生日">
                        <span>{{ item2[6] }}</span>
                      </el-form-item>
                  </el-form>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>
        </el-collapse>
    </el-main>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "address_book",
        data(){
            return{
                name:'通讯录',
                activeNames: [],
                activeNames2:[],
                addressbook:{}
            }
        },
        mounted() {
            this.$emit('pagename', this.name)
            this.axios.get('/api/getaddressbook').then(res =>{
                if(res.data.success){
                    console.log(res.data)
                    this.addressbook = res.data.data
                }else {
                    Toast('获取通讯录失败，请返回重试')
                }

            })
        },
    }
</script>

<style scoped>
    .address_book_container {
        padding-top: 1rem;
        padding-bottom: 1.3rem;
        overflow: hidden;
        min-height: 15.44rem;
    }
    .person{
        padding-bottom: 0;
        padding-left: 10px;
    }
    .el-collapse-item >>> .el-collapse-item__content {
        padding: 5px;
    }
    .el-form-item--small {
        margin: 0;
    }
    .person div div {
        padding: 0;
    }
    .person-items{
        margin-left: 10px;
        background-color: 	#EEE5DE;
    }
    .person-items >>> .el-form-item__label {
        width: 80px;
    }
    .el-form-item:nth-child(2n) {
        background-color: #D2E5FF;
    }
    .el-collapse {
        border-bottom: 0;
    }
    .person >>> .el-collapse-item__wrap {
        border-bottom: 0;
    }
    .person >>> .el-collapse-item__header {
        border-bottom: 0;
    }
    .person:nth-child(odd) >>> .el-collapse-item__header {
        background-color:  #EDEDED;
    }
    .person:nth-child(even) >>> .el-collapse-item__header {
        background-color: #E5E5E5;
    }
    .el-collapse >>> .el-collapse-item__header {
        font-size: 16px;
    }
</style>
