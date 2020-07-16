<template>
    <div class="photolist-container">
        <img-preview
                v-for="(item,index) in this.photolist"
                :key="index"
                mode="scaleToFill"
                 group="1"
                 class="aspect-img"
                 title=""
                 :src="item.path"
                 :thumb-src="item.path"
        >
        </img-preview>
    </div>
</template>

<script>
    import {ImgPreview} from 'vue-imgs'
    import '../../../static/mui/js/mui.min'
    export default {
        name: "photolist",
        data() {
            return {
                name:'公司相册',
                photolist:[],
            }
        },
        components: {
            ImgPreview
        },
        mounted() {
            let dirname = this.$route.query.dirname
            // console.log(dirname)
            this.$emit('pagename', this.name)
            this.axios.get('/api/getphotos?dirname='+ dirname).then(res =>{
                console.log(res.data)
                this.photolist = res.data

            })
        },
        methods:{
            bigpic(index) {
                console.log(index)
                this.$router.push('/photodetail' + index)
			    this.$store.commit('saveimages',this.photolist)
			    console.log('仓库数据', this.$store.state.imagelist)

            }
        }
    }
</script>

<style scoped>
    .photolist-container {
        min-height: 15.44rem;
        padding-top: 1rem;
        padding-bottom: 1.3rem;
        padding-left: 2%;
        overflow: hidden;
    }
    .aspect-img {
        width: 50%;
        padding-right: 2%;
        padding-bottom: 2%;
        height: 3rem;
        display: block;
        float: left;
        overflow: hidden;
        text-align: center;
    }

</style>
