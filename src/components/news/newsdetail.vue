<template>
    <div class="newsdetail-container" v-loading="loading">
        <div class="title">
            {{newstitle}}
        </div>
        <div class="detail" v-html="newsdetail">
        </div>
    </div>
</template>

<script>
    export default {
        name: "newsdetail",
        data(){
            return {
                name: '行业新闻',
                newstitle: '',
                newsdetail: '',
                newspdate: '',
                newssource: '',
                loading:true
            }
        },
        mounted() {
            this.$emit('pagename', this.name)
            let id = this.$route.params.id;
            console.log(id)
            let newslist = this.$store.state.newslist;
            // console.log(newslist)
            for (let i in newslist) {
                // console.log(newslist[i])
                if (newslist[i].id == id) {
                    this.newstitle = newslist[i].title;
                    this.newsdetail = newslist[i].html;
                    this.newspdate = newslist[i].pubDate;
                    this.newssource = newslist[i].source
                }
            }
            this.loading = false
        }
    }
</script>

<style scoped>
.newsdetail-container {
    padding-top: 1rem;
    padding-bottom: 1.3rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    min-height: 13.44rem;
}
.title {
    text-align: center;
    font-size: 0.35rem;
    line-height: 0.5rem;
    font-weight: bold;
    margin: 0.2rem 0;
}
.detail {
    text-align: left;
}

</style>
