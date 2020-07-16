<template>
    <el-container>
        <el-main>

                <div class="caigou_dispaly" v-show="caigou_dispaly">
                    <div class="tubiao" id="echarts_buy_quantity" style="width: 100%;height:4.5rem;"></div>
                    <div class="tubiao" id="echarts_buy_amout" style="width: 100%;height:4.5rem;"></div>
                    <div class="tubiao" id="echarts_buy_price" style="width: 100%;height:4.5rem;"></div>
                </div>
                <div class="xiaoshou_dispaly" v-show="!caigou_dispaly">
                    <div class="tubiao" id="echarts_sell_quantity" style="width: 100%;height:4.5rem;"></div>
                    <div class="tubiao" id="echarts_sell_amout" style="width: 100%;height:4.5rem;"></div>
                    <div class="tubiao" id="echarts_sell_price" style="width: 100%;height:4.5rem;"></div>
                </div>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "business_data_echarts",
        props:['caigou_data','xiaoshou_data'],
        data(){
            return{
            }
        },
        mounted() {
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>
