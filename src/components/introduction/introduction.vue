<template>
    <el-main class="introduction-container">
        <el-tabs :tab-position="tabPosition" type="border-card">
            <el-tab-pane label="华锟金属">
                <img src="/static/img/resize_picture.png" alt="">
                <p style="text-indent: 2em">
                    <span>华锟金属材料（上海）有限公司成立于2009年12月28日，公司是整合上海卓代工贸有限公司和湖南惠天然冶金材料有限公司的部分业务基础上成立的中外合资企业，公司由上海卓代工贸有限公司控股。华锟金属主要经营范围是钢铁上下游的物料，目前主要经营品种是以锰系为主的铁合金、铁矿石、煤炭、钢材、钢铁原料、其他钢铁炉料。&nbsp;</span>
                </p>
                <p style="text-indent: 2em">
                    <span>公司成立以来，国际贸易和国内贸易并行发展，年营业额在10亿元左右。华锟金属秉承“为客户创造价值，为自己创造未来”的理念，通过深入的市场分析为客户提供采购建议，通过精细管理为客户提供优良的产品，通过贴心的服务为客户提供更多价值。&nbsp;</span>
                </p>
            </el-tab-pane>
            <el-tab-pane label="上海湘钢">
                <img src="/static/img/xg.png" alt="">
                <p style="text-indent: 2em">
                    <span>上海湘钢是贸易有限公司是由上海卓代工贸有限公司控股，与湖南华菱湘潭钢铁有限公司合资成立于2008年的钢铁贸易企业。公司专门销售华菱湘钢的中厚钢板。公司成立后，业务迅速扩展，年销售船板50-100万吨，销售收入20-50亿元。&nbsp;</span>
                </p>
            </el-tab-pane>
            <el-tab-pane label="湖南惠冶">
                <img src="/static/img/huiye.png" alt="">
                <p style="text-indent: 2em">
                    <span>湖南惠天然冶金材料有限公司成立于2010年，是华锟金属经营的锰系铁合金的生产基地，公司有两套1.5T中频炉生产线和一条全自动锰桃生产线。公司具备锰锭、低碳锰铁、铝锰铁等锰系合金生产能力1500吨/月，锰桃、锰枕生产能力5000吨/月。&nbsp;</span>
                </p>
            </el-tab-pane>
            <el-tab-pane label="公司荣誉">
                <img src="/static/img/rongyu.png" alt="">
                <img src="/static/img/rongyu2.png" alt="">
            </el-tab-pane>
        </el-tabs>
    </el-main>
</template>

<script>
    export default {
        name: "introduction",
        data(){
            return{
                name:'公司简介',
                tabPosition: 'left'
            }
        },
        mounted() {
            this.$emit('pagename', this.name)
        }

    }
</script>

<style scoped>
    .introduction-container {
        padding-top: 1rem;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        padding-bottom: 1.3rem;
        overflow: hidden;
        min-height: 14.54rem;
    }
    .introduction-container >>> .el-tabs__item {
        padding: 0 0.1rem 0 0;
    }
    .introduction-container >>> .el-tabs__nav-wrap.is-left.is-scrollable {
        padding: 0;
    }
    .introduction-container >>> .el-tabs--border-card > .el-tabs__content {
        min-height: 14.34rem;
        padding: 5px;
    }
</style>
