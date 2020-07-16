<template>
    <el-main class="news-container" v-loading="loading" fullscreen="false" >
		<ul class="mui-table-view" >
			<li v-for="item in newslist" class="mui-table-view-cell mui-media" :key="item.id" @click="godetail(item.id)" v-loading="loading">
					<img v-if="item.havePic" :src='item.imageurls[0].url' alt="" class="mui-media-object mui-pull-left">
					<img v-if="!item.havePic" src="../../../static/img/bucunzai.jpg" alt="" class="mui-media-object mui-pull-left">
					<div class="mui-media-body">
						{{item.title}}
						<p class='mui-ellipsis'>时间：{{item.pubDate}}  来源：{{item.source}}</p>
					</div>
			</li>
		</ul>
    </el-main>
</template>

<script>

export default {
	name: "news",
	data() {
		return {
			name: '行业新闻',
			newslist: [],
			loading:true
		}
	},
	mounted() {
		this.$emit('pagename', this.name)
		let timestamp = (new Date()).getTime()
			this.axios({
				method: "post",
				url: "http://route.showapi.com/109-35",
				data: {
					showapi_appid: '100636',
					showapi_sign: 'dfb7b745e64a423092593bebb3085c13',
					showapi_timestamp: timestamp,
					showapi_res_gzip: '1',
					channelId: '',
					channelName: '财经最新',
					title: '钢',
					page: '1',
					needContent: '0',
					needHtml: '1',
					needAllList: '0',
					maxResult: '20',
					id: ''
				},
				transformRequest: [function (data) {
					let ret = ''
					for (let it in data) {
					  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				  }]
			}).then((res) => {
				// console.log(res.data.showapi_res_body.pagebean.contentlist)
				this.newslist = this.newslist.concat(res.data.showapi_res_body.pagebean.contentlist)
				// console.log(this.newslist)
				this.savenews()
				this.loading = false
			})
		// console.log('songs', this.songs)
	},
	methods:{
		savenews(){
			this.$store.commit('savenews',this.newslist)
			console.log('仓库数据', this.$store.state.newslist)
		},
		godetail(id){
			this.$router.push('/newsdetail/'+ id)
		}
	}

}
</script>

<style scoped>
.news-container {
	padding: 0;
    overflow: hidden;
    margin-top: 1rem;
    margin-bottom: 1.3rem;
	height: 100%;
	min-height: 15.44rem;
  }

  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s;
  }
  .news-container >>> .header2 {
    background-color: #42b983;
  }
  .news-container >>> .footer2 {
    background-color: #42b983;
  }
	.mui-media-body {
		font-size: 0.3rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

	}
	.mui-media-body p {
		font-size: 0.2rem;
		text-indent: 0;
	}
</style>
