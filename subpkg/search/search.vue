<template>
<view>
	<view class="search_box">
		<uni-search-bar 
		placeholder="请输入搜索的内容" 
		:radius="100" 
		cancelButton="none"
		class="search_box_bar"
		@input="input"
		>
		</uni-search-bar>
	</view>
	<!-- 渲染搜索的数据列表区域 -->
	<!-- 搜索建议列表 -->
	<view class="sugg_list" v-if="searchResults.length!==0">
	  <view class="sugg_item" v-for="(item, index) in searchResults" :key="index" @click="gotoGoodsDeatails(item.goods_id)">
	    <view class="goods_name">{{item.goods_name}}</view>
	    <uni-icons type="arrowright" size="16"></uni-icons>
	  </view>
	</view>
	
	<!-- 搜索历史的展示 -->
	<view class="history_box" v-else>
		<!-- 标题区域 -->
		<view class="history_title">
			<text>搜索历史</text>
			<uni-icons type="trash" size="17" @click="clean"></uni-icons>
		</view>
		<!-- 列表区域 -->
		<view class="history_list">
			<uni-tag 
			:text="item"
			v-for="(item,index) in historys"
			:key="index"
			@click="gotoGoodsList(item)"
			></uni-tag>
		</view>
	</view>
</view>
	
</template>

<script>
	export default {
		data() {
			return {
				// 保存用户在输入框输入的内容
				inputData:'',
				// 设置一个延迟器，防抖作用，timerId
				timer:null,
				// 保存搜索的结果
				searchResults:[],
				// 存放搜索历史的假数据
				historyList:[]
			};
		},
		// 计算属性
		computed:{
			historys(){
				//注意：由于数组是引用类型，所以不要直接基于愿数组调用reverse方法，以免修改原数组中元素的顺序。
				// 而是应该新建一个内存无关的数组，再进行reverse反转
				return [...this.historyList].reverse()
			}
		},
		onLoad(){
			this.historyList =  JSON.parse(uni.getStorageSync('inputData')||'[]')
		},
		methods:{
			// input输入事件对应的方法
			input(e){
				// input框获取输入值的防抖方法
				// 清除 timer 对应的延时器
				clearTimeout(this.timer)
				 // 重新启动一个延时器，并把 timerId 赋值给 this.timer
				this.timer = setTimeout(() => {
				  this.inputData = e
				  // 根据关键词，查询搜索建议列表
				  this.getSearchList()
				}, 500)
			},
			// 获取搜索框的数据
			async getSearchList() {
			  // 判断关键词是否为空
			  if (this.inputData.length===0) {
			    this.searchResults = []
			    return
			  }
			  // 发起请求，获取搜索建议列表
			  //必须带参数否则无法获取数据
			  const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.inputData})
			  if (res.meta.status !== 200) return uni.$showMsg()
			  this.searchResults = res.message
			  // 调用获取历史数据
			   // 1. 查询到搜索建议之后，调用 getHistoryList() 方法保存搜索关键词
			  this.getHistoryList()
			  console.log(this.searchResults)
			},
			
			// 获取历史数据
			getHistoryList(){
				    // 2.1 直接把搜索关键词 push 到 historyList 数组中
				// if(this.historys.indexOf(this.inputData)===-1)
				// {
				// 	this.historyList.push(this.inputData)
				// }
				
				 // 1. 将 Array 数组转化为 Set 对象
				  const set = new Set(this.historyList)
				  // 2. 调用 Set 对象的 delete 方法，移除对应的元素
				  set.delete(this.inputData)
				  // 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
				  set.add(this.inputData)
				  // 4. 将 Set 对象转化为 Array 数组
				  this.historyList = Array.from(set)
				  
				  // 对搜索历史数据进行持久化对存储
				  uni.setStorageSync('inputData',JSON.stringify(this.historyList))
			},
			
			// 点击商品跳转到商品详情页
			gotoGoodsDeatails(goods_id){
				uni.navigateTo({
					// 跳转到指定页面并传递参数
					url:'../goods_details/goods_details?goods_id='+goods_id
				})
			},
			
			// 清除历史数据的方法
			clean(){
				this.historyList = []
				uni.getStorageSync('inputData','[]')
			},
			
			// 跳转到商品列表页面
			gotoGoodsList(item){
				uni.navigateTo({
					url:'../goods_list/goods_list?query='+item
				})
			}
		
		}
	}
</script>

<style lang="scss">
.search_box{
	position: sticky;
	top: 0;
	z-index: 999;
}
.sugg_list{
	.sugg_item{
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #efefef;
		font-size: 12px;
		padding: 13px 0;
		.goods_name{
			// 文字不允许换行显示（单行文本）
			white-space: nowrap;
			// 溢出部分隐藏
			overflow: hidden;
			// 文字溢出后，使用...代替
			text-overflow: ellipsis;
			margin-right: 3px;
		
		}
		
	}
}
// 搜索历史的样式
.history_box{
	padding: 0 5px;
	.history_title{
		display: flex;
		justify-content: space-between;
		height: 40px;
		align-items: center;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}
	.history_list{
		uni-tag{
			margin-top: 5px;
			margin-right: 5px;
		}
	}
}
</style>
