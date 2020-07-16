<template>
    <el-container class="b_data_container" direction="vertical" >
           <el-header class="b_data_header">
                    <el-card class="box-card data_class_container" :body-style="{ padding: '0px' }">
                        <div class="data_class" :class="caigou_dispaly == true ? 'active':''" @click="change_active_caigou">
                            <span><i class="el-icon-s-data"></i> 采购</span>
                        </div>
                        <div class="data_class" :class="caigou_dispaly == false ? 'active':''" @click="change_active_xiaoshou">
                            <span><i class="el-icon-s-data"></i> 销售</span>
                        </div>
                    </el-card>
           </el-header>
            <el-container class="b_data_dody" v-loading="loading" >
                <div class="caigou_dispaly" v-show="caigou_dispaly" >
                    <div class="tubiao" id="echarts_buy_quantity" style="width: 100%;height:4.5rem;"></div>
                    <div class="tubiao" id="echarts_buy_amout" style="width: 100%;height:4.5rem;"></div>
                    <div class="tubiao" id="echarts_buy_price" style="width: 100%;height:4.5rem;"></div>
                </div>
                <div class="xiaoshou_dispaly" v-show="!caigou_dispaly" >
                    <div class="tubiao" id="echarts_sell_quantity" style="width: 100%;height:4.5rem;"></div>
                    <div class="tubiao" id="echarts_sell_amout" style="width: 100%;height:4.5rem;"></div>
                    <div class="tubiao" id="echarts_sell_price" style="width: 100%;height:4.5rem;"></div>
                </div>
            </el-container>
    </el-container>
</template>

<script>
    import echarts from "echarts";
    export default {
        name: "business_data",
        data(){
            return{
                name:'业务数据',
                activeName: 'second',
                caigou_dispaly:true,
                caigou_data:[],
                xiaoshou_data:[],
                loading: true,
            }
        },
        mounted() {
            this.$emit('pagename', this.name)
            this.buy_graph()
            this.sell_graph()

        },
        methods:{
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            buy_graph() {
                // console.log(this.caigou_dispaly)
                this.axios.get('/api/getpurchasedata',).then(res => {
                    console.log(res.data.data)
                    this.caigou_data = res.data.data
                    let myChart_buy_quantity1 = document.getElementById("echarts_buy_quantity");
                    let myChart_buy_amout1 = document.getElementById("echarts_buy_amout");
                    let myChart_buy_price1 = document.getElementById("echarts_buy_price");
                    myChart_buy_quantity1.style.width=window.innerWidth+'px';
                    myChart_buy_amout1.style.width=window.innerWidth+'px';
                    myChart_buy_price1.style.width=window.innerWidth+'px';
                    let myChart_buy_quantity = echarts.init(myChart_buy_quantity1);
                    let myChart_buy_amout = echarts.init(myChart_buy_amout1);
                    let myChart_buy_price = echarts.init(myChart_buy_price1);
                    let option_buy_quantity = {
                        legend: {orient:'horizontal',top:'12%'},
                        tooltip: {},
                        title:{show:true,text:'近一年各月采购数量', x:'center', y: 'top',},
                        dataset: {
                            source: this.caigou_data.slice(0, 4)
                        },
                        xAxis: [
                            {type: 'category', gridIndex: 0},
                        ],
                        yAxis: [
                            {gridIndex: 0,name:'数量：吨', position: 'left', nameLocation: 'middle', nameGap: 45, nameRotate: 90},
                        ],
                        grid: [
                            {top: '25%', bottom: '10%', left: '18%', right: '10%'},
                        ],
                        series: [
                            // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
                            {type: 'bar', stack: "采购量", seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0},
                            {type: 'bar', stack: "采购量", seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0},
                            {type: 'bar', stack: "采购量", seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0},
                        ],
                    };
                    let option_buy_amout = {
                        legend: {orient:'horizontal',top:'12%'},
                        tooltip: {},
                        title:{show:true,text:'近一年各月采购金额', x:'center', y: 'top',},
                        dataset: {
                            source: this.caigou_data.slice(0,1).concat(this.caigou_data.slice(4,7))
                        },
                        xAxis: [
                            {type: 'category', gridIndex: 0},
                        ],
                        yAxis: [
                            {gridIndex: 0,name:'金额：万元', position: 'left', nameLocation: 'middle', nameGap: 45, nameRotate: 90},
                        ],
                        grid: [
                            {top: '25%', bottom: '10%', left: '18%', right: '10%'},
                        ],
                        series: [
                            // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
                            {type: 'bar', stack: "采购金额", seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0,color:'#9AC0CD'},
                            {type: 'bar', stack: "采购金额", seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0,color:'#9F79EE'},
                            {type: 'bar', stack: "采购金额", seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0},
                        ],
                    };
                    let option_buy_price = {
                        legend: {orient:'horizontal',top:'12%'},
                        tooltip: {},
                        title:{show:true,text:'近一年各月采购单价', x:'center', y: 'top',},
                        dataset: {
                            source: this.caigou_data.slice(0,1).concat(this.caigou_data.slice(-3))
                        },
                        xAxis: [
                            {type: 'category', gridIndex: 0},
                        ],
                        yAxis: [
                            {gridIndex: 0,name:'单价：元', position: 'left', nameLocation: 'middle', nameGap: 45, nameRotate: 90},
                        ],
                        grid: [
                            {top: '25%', bottom: '10%', left: '18%', right: '10%'},
                        ],
                        series: [
                            // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
                            {type: 'line', seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0,color:'#99ccff',label:{
                                normal:{
                                    show:true,
                                    formatter:function(params) {
                                    if (params.value > 0) {
                                    return params.value;
                                    } else {
                                    return '';
                                    }
                                    },
                                }
                                }},
                            {type: 'line', seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0,color:'#cc6699',label:{
                                normal:{
                                    show:true,
                                    formatter:function(params) {
                                    if (params.value > 0) {
                                    return params.value;
                                    } else {
                                    return '';
                                    }
                                    },}
                                }},
                            {type: 'line', seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0,color:'#33ff99',label:{
                                normal:{
                                    show:true,
                                    formatter:function(params) {
                                    if (params.value > 0) {
                                    return params.value;
                                    } else {
                                    return '';
                                    }
                                    },}
                                }},
                        ]
                    };
                    myChart_buy_quantity.setOption(option_buy_quantity);
                    myChart_buy_amout.setOption(option_buy_amout);
                    myChart_buy_price.setOption(option_buy_price);

                })
                console.log(this.caigou_data)

            },

            sell_graph(){
                console.log(this.caigou_dispaly)
                this.axios.get('/api/getselldata',).then(res => {
                    // console.log(res.data.data)
                    this.xiaoshou_data = res.data.data
                    let myChart_sell_quantity1 = document.getElementById("echarts_sell_quantity");
                    let myChart_sell_amout1 = document.getElementById("echarts_sell_amout");
                    let myChart_sell_price1 = document.getElementById("echarts_sell_price");
                    myChart_sell_quantity1.style.width=window.innerWidth+'px';
                    myChart_sell_amout1.style.width=window.innerWidth+'px';
                    myChart_sell_price1.style.width=window.innerWidth+'px';
                    let myChart_sell_quantity = echarts.init(myChart_sell_quantity1);
                    let myChart_sell_amout = echarts.init(myChart_sell_amout1);
                    let myChart_sell_price = echarts.init(myChart_sell_price1);

                    let option_sell_quantity = {
                        legend: {orient:'horizontal',top:'12%'},
                        tooltip: {},
                        title:{show:true,text:'近一年各月销售数量', x:'center', y: 'top',},
                        dataset: {
                            source: this.xiaoshou_data.slice(0, 4)
                        },
                        xAxis: [
                            {type: 'category', gridIndex: 0},
                        ],
                        yAxis: [
                            {gridIndex: 0,name:'数量：吨', position: 'left', nameLocation: 'middle', nameGap: 45, nameRotate: 90},
                        ],
                        grid: [
                            {top: '25%', bottom: '10%', left: '18%', right: '10%'},
                        ],
                        series: [
                            // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
                            {type: 'bar', stack: "销售量", seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0},
                            {type: 'bar', stack: "销售量", seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0},
                            {type: 'bar', stack: "销售量", seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0},
                        ],
                    };
                    let option_sell_amout = {
                        legend: {orient:'horizontal',top:'12%'},
                        tooltip: {},
                        title:{show:true,text:'近一年各月销售金额', x:'center', y: 'top',},
                        dataset: {
                            source: this.xiaoshou_data.slice(0,1).concat(this.xiaoshou_data.slice(4,7))
                        },
                        xAxis: [
                            {type: 'category', gridIndex: 0},
                        ],
                        yAxis: [
                            {gridIndex: 0,name:'金额：万元', position: 'left', nameLocation: 'middle', nameGap: 45, nameRotate: 90},
                        ],
                        grid: [
                            {top: '25%', bottom: '10%', left: '18%', right: '10%'},
                        ],
                        series: [
                            // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
                            {type: 'bar', stack: "销售金额", seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0,color:'#9AC0CD'},
                            {type: 'bar', stack: "销售金额", seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0,color:'#9F79EE'},
                            {type: 'bar', stack: "销售金额", seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0},
                        ],
                    };
                    let option_sell_price = {
                        legend: {orient:'horizontal',top:'12%'},
                        tooltip: {},
                        title:{show:true,text:'近一年各月销售单价', x:'center', y: 'top',},
                        dataset: {
                            source: this.xiaoshou_data.slice(0,1).concat(this.xiaoshou_data.slice(-3))
                        },
                        xAxis: [
                            {type: 'category', gridIndex: 0},
                        ],
                        yAxis: [
                            {gridIndex: 0,name:'单价：元', position: 'left', nameLocation: 'middle', nameGap: 45, nameRotate: 90},
                        ],
                        grid: [
                            {top: '25%', bottom: '10%', left: '18%', right: '10%'},
                        ],
                        series: [
                            // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
                            {type: 'line', seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0,color:'#99ccff'},
                            {type: 'line', seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0,color:'#cc6699'},
                            {type: 'line', seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0,color:'#33ff99'},
                        ]
                    };
                    myChart_sell_quantity.setOption(option_sell_quantity);
                    myChart_sell_amout.setOption(option_sell_amout);
                    myChart_sell_price.setOption(option_sell_price);
                    this.loading = false
                })
                console.log(this.xiaoshou_data)

            },
            change_active_xiaoshou(){
                this.caigou_dispaly = false
            },
            change_active_caigou(){
                this.caigou_dispaly = true
            }

        }
    }
</script>

<style scoped>
    .b_data_container {
        padding-top: 0.88rem;
        padding-bottom: 1.3rem;
        min-height: 13.44rem;
        overflow: hidden;
    }
    .el-container {
        display: block;
    }

    .b_data_dody {
        padding: 0;
    }
    .tubiao {
        margin-top: 0.5rem;
        width: 100%;
        overflow: hidden;
    }
    .data_class {
        width: 2.93rem;
        float: left;
        display: block;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.4rem;
        text-align: left;
        margin-left: 0.25rem;
        margin-right: 0.25rem;
    }
    .active {
        border-bottom: 0.06rem solid #0099ff;
        color: #0099ff;
    }
    .xiaoshou_dispaly, .caigou_dispaly {
        margin-top: 1rem;
        width: 100%;
    }
   .b_data_header {
       position: fixed;
        width: 100%;
       padding: 0;
        height: 0.8rem !important;
       background-color: #f7f7f7;
       z-index: 1000;
    }
    .el-card {
        background-color: #f7f7f7;
    }
    .b_data_container >>> .el-loading-mask {
        height: 10.36rem;
    }
</style>
