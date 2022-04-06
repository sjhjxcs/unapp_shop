<template>
	<view>
		<view class="goods_list">
		      <view v-for="(goods,i) in goodsList" @click="gotoGoodsItem(goods)">
				 <my-goods :goods = "goods"></my-goods>
		      </view>
		    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj:{
					// 查询关键字
					query:'',
					// 商品分类id
					cid:'',
					// 页码数
					pagenum:1,
					// 每页共展示多少条数据
					pagesize:10,
				
				},
				// 保存数据的数组
				goodsList:[],
				// 商品的总条数
				total:0,
				// 节流阀
				isloading:false
				
			};
		},
		onLoad(options){
			console.log(options)
			this.queryObj.query = options.query||''
			this.queryObj.cid  = options.cid||''
			// console.log(this.queryObj)
			// 调用这个获取数据的方法
			this.getGoodsList()
		},
		methods:{
			async getGoodsList(cb){
				// 打卡节流阀
				this.isloading = true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				  // 只要数据请求完毕，就立即按需调用 cb 回调函数
				  cb && cb()
				  
				// 请求完毕之后关闭节流阀
				this.isloading = false
				if(res.meta.status!==200) return uni.$showMsg()
				// 重新获取页面数据后，实现新旧数据的拼接
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
				console.log(this.goodsList)
				},
				// 添加一个触底的事件
				onReachBottom(){
					// 判断数据是否加载完毕了
					if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total){
						return uni.$showMsg("数据加载完毕了!")
					}
					// 防止发起额外的请求，判断是否在请求数据，如果是，不发起额外的请求
					if(this.isloading) return 
					// 让页面值+1
					this.queryObj.pagenum++
					// 重新获取列表数据
					this.getGoodsList()
				},
				// 监听页面的onPullDownRefresh事件处理函数
				onPullDownRefresh(){
					// 重置关键数据
					this.queryObj.pagenum = 1,
					this.total = 0,
					this.isloading = false,
					this.goodsList = [],
					// 重新发起数据请求
					this.getGoodsList(()=>uni.stopPullDownRefresh())
				},
				gotoGoodsItem(goods){
					uni.navigateTo({
						url:'../goods_details/goods_details?goods_id='+goods.goods_id
					})
				}
		}
		
	}
</script>

<style lang="scss">

</style>
