<template>
	<view>
		<!-- 搜索组件 -->
		<view class="search_box">
			<my-search @click="gotoHome">
			</my-search>
		</view>
		 <!-- 轮播图区域 -->
		    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		      <!-- 循环渲染轮播图的 item 项 -->
			   <!-- 动态绑定图片的 src 属性 -->
		      <swiper-item v-for="(item, i) in swiperList" :key="i">
		        <navigator class="swiper-item" 
				:url="'/subpkg/goods_details/goods_details?goods_id=' + item.goods_id"
				>
		         
		          <image :src="item.image_src"></image>
		        </navigator>
		      </swiper-item>
		    </swiper>
			<!-- 分类导航区域 -->
		<view class="nav_list">
			<view class="nav_item" 
			v-for="(item,index) in navList" 
			:key="index"
			@click="handleToSwitch(item)"
			>
				<image :src="item.image_src" class="nav_image"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor_list">
			<view class="floor_item" v-for="(item,index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" class="floor_title"></image>
				<!-- 楼层的图片区域 -->
				<view class="floor_img_box">
					  <!-- 左侧大图片的盒子 -->
					  <navigator class="left_img_box" :url="item.product_list[0].url">
					    <image 
						:src="item.product_list[0].image_src" 
						 mode="widthFix" 
						 :style="{width: item.product_list[0].image_width + 'rpx'}"
						 ></image>
					  </navigator>
					<!-- 右侧的4个小图片的盒子 -->
					<view class="right_img_box">
						<navigator 
						class="right_img_item"  
						v-for="(item2,index2) in item.product_list"
						:key="index2"
						:url="item2.url"
						
						>
							<image
							:src="item2.image_src"
							mode="widthFix"
							v-if="index2!==0"
							:style="{width: item2.image_width + 'rpx'}"
							></image>
						</navigator>
					</view>
				</view>
			</view>
			
		</view>
		
	
	</view>
</template>

<script>
	import badgeMix from '../../mixins/tabbar_badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				// 1. 轮播图的数据列表，默认为空数组
				      swiperList: [],
			
				// 1. 分类导航的数据列表
					  navList: [],
				// 定义楼层数据
					floorList:[]
			};
		},
		onLoad(){
			 // 2. 在小程序页面刚加载的时候，调用获取轮播图数据的方法
			    this.getSwiperList(),
			 // 2. 在 onLoad 中调用获取数据的方法
			    this.getNavList(),
				// 调用获取楼层数据的反复
				this.getFloorList()
		},
		methods:{
			 // 3. 获取轮播图数据的方法
			    async getSwiperList() {
			      // 3.1 发起请求
			      const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
			      // 3.2 请求失败
			      if (res.meta.status !== 200) {
			        return uni.$showMsg()
			      }
			      // 3.3 请求成功，为 data 中的数据赋值
			      this.swiperList = res.message
				  // console.log(this.swiperList)
				  uni.$showMsg('数据请求成功！')
			    },
			   async getNavList(){
					const{data:res} = await uni.$http.get('/api/public/v1/home/catitems')
					if(res.meta.status !==200) return uni.$showMsg()
					this.navList  = res.message
				},
				// 事件处理函数
				handleToSwitch(item){
					if(item.name === "分类"){
						uni.switchTab({
							url:'../cate/cate'
						})
					}
				},
				// 获取楼层的数据
				async getFloorList(){
				const{data:res} = await	uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status!==200){
					return uni.$showMsg()
				}
				
				// 对获取对数据进行处理
				res.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						// 给prod挂载一个自定义属性
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList  = res.message
				// console.log(this.floorList)
			},
			gotoHome(){
				uni.navigateTo({
					url:"../../subpkg/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
swiper{
 height: 330rpx;

 .swiper-item,
 image {
   width: 100%;
   height: 100%;
 }
}
// 导航栏的样式

.nav_list{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	margin: 15px 0;
}
.nav_item{
	height: 128rpx;
	width: 124rpx;
	.nav_image{
		width: 100%;
		height: 100%;
	}
}
.floor_title {
  height: 60rpx;
  width: 100%;
  display: flex;
}
// 设置整个装图片盒子的样式
.floor_img_box{
	display: flex;
	
	
}
// 右侧小图片的样式
.right_img_box{
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-around;
	  padding-left: 10rpx;
	
}

// 头部搜索框的样式
.search_box{
	// 设置定位效果为“吸顶”
	position: sticky;
	//吸顶的位置
	top: 0;
	// 防止轮播图把它覆盖，提高层级 
	z-index: 999;
}
</style>
