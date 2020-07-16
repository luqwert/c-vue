<template>
    <el-container class="report-container">
        <el-header class="report-title">
            <p>各产品市场周报</p>
            <p>作者：芦胜   发表日期：</p>
        </el-header>
        <el-main>
            <section class="chanpin">
                <header class="ptitle">
                    一、 普氏指数
                </header>
                <img src="../../../static/weekreport/普氏指数.jpeg" alt="普氏指数">
                <p >
                    {{  }}日普氏62指数为{{ date1_62 }}较{{ date2 }}日{{ updown_62 }}{{ diff_62 }}美元。58指数为{{ date1_58 }}，较{{ date2 }}日{{ updown_58 }}{{ diff_58 }}美元。
                </p>
            </section>
            <section>
                <header class="ptitle">
                    二、 港口铁矿石库存情况
                </header>
                <p>{{ kucun_text }}</p>
                <p>{{ kaigong_text }}</p>
            </section>
            <section>
                <header class="ptitle">
                    三、 铁矿本周行情判断
                </header>
                <p>{{ fenxi_text }}</p>
                <p>{{ haiyunfei_text }}</p>
            </section>
            <section>
                <header class="ptitle">
                    四、 废钢市场情况
                </header>
                <p class="tubiaobiaoti">表一：近一年来Mysteel废钢绝对价格指数走势图</p>
                <img src="../../../static/weekreport/废钢指数近一年变化.png" alt="废钢指数">
                <p class="yinyong">数据来源：mysteel</p>
                <p class="tubiaobiaoti">表二：一周主流城市废钢价格变化汇总</p>
                <img src="../../../static/weekreport/各地废钢市场价格.png" alt="废钢价格">
                <p>{{ feigang_text }}</p>
            </section>

            <section>
                <header class="ptitle">
                    五、 锰矿市场情况
                </header>
                <p>{{ mengkuang_text }}</p>
                <p class="biaogebiaoti">锰矿库存情况：</p>
                <p>全国港口锰矿总库存为{{ menggkuang_kucun }}吨，较上周{{ updown_mengkuang }}{{ diff_mengkuang }} 。</p>
                <table id="stock_table" cellpadding="0" cellspacing="0" >
                    {% for line in stock2 %}
                        <tr>
                            {% for li in line %}
                                <td>&nbsp{{ li }}&nbsp</td>
                            {% endfor %}
                        </tr>
                    {% endfor %}
                </table>
                <p class="biaogebiaoti">锰矿价格调整情况：</p>
                <table id="price_table" cellpadding="0" cellspacing="0" >
                    {% for line in mengkuang_price %}
                        <tr>
                            {% for li in line %}
                                <td>&nbsp{{ li }}&nbsp</td>
                            {% endfor %}
                        </tr>
                    {% endfor %}
                </table>
            </section>

            <section>
                <header class="ptitle">
                    六、 硅锰市场情况
                </header>
                <p>{{ guimeng_text }}</p>
                <p class="biaogebiaoti">行情回顾：</p>
                <table id="price_table2" cellpadding="0" cellspacing="0">
                    {% for line in guimeng_price %}
                        <tr>
                            {% for li in line %}
                                <td>&nbsp{{ li }}&nbsp</td>
                            {% endfor %}
                        </tr>
                    {% endfor %}
                </table>
            </section>

            <section>
                <header class="ptitle">
                    七、 金属锰市场情况
                </header>
                <img src="../../../static/weekreport/锰片价格变化.jpeg" alt="锰片价格">
                <p id="jinshumeng">{{ mengpian_text }}</p>

            </section>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "market_report",
        data(){
            return {
                name:'市场周报',
                report_data:[],
            }
        },
        mounted() {
            this.$emit('pagename', this.name)
            this.get_report_data()
        },
        methods:{
            get_report_data(){
                this.axios.get('/api/getreportdata',).then(res =>{
                    console.log(res.data.data)
                })
            }
        }
    }
</script>

<style scoped>
    .report-container {
        padding-top: 1rem;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        padding-bottom: 1.3rem;
        overflow: hidden;
        min-height: 15.54rem;
    }

</style>
