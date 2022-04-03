<template>
	<view>
		<view class="scroll_view_container">
			<!-- 左侧滑动区域 -->
			
			<scroll-view scroll-y="true" :style="{height: wh+'px'}" class="scroll_left">
				<block v-for="(item,index) in cateList" :key="index">
					<view :class="['srcoll_left_item', index === active ? 'active' : '']" @click="activeChange(index)">{{item.cat_name}}</view>
				</block>
				
			</scroll-view>
			
			<!-- 右侧的滑动区域 -->
			<scroll-view scroll-y="true" :style="{height: wh+'px'}" class="scroll_right" :scroll-top="scrollTop">
				<view v-for="(item2,index2) in cateLevel2" :key="index2" class="cate_lv2">
						  <view class="cate_lv2_title">/ {{item2.cat_name}} /</view>
						    <!-- 动态渲染三级分类的列表数据 -->
						    <view class="cate_lv3_list">
						      <!-- 三级分类 Item 项 -->
						      <view class="cate_lv3_item" v-for="(item3, index3) in item2.children" :key="index3" @click="gotoGoodsList(index3)">
						        <!-- 图片 -->
						        <image :src="item3.cat_icon"></image>
						        <!-- 文本 -->
						        <text>{{item3.cat_name}}</text>
						      </view>
						</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 设置一个当前窗口的高度
				// 窗口的可用高度=屏幕高度-navigationBar高度-tabBar告诉
				wh:0,
				cateList:[],
				// 设置一个激活项
				active:0,
				// 声明一个二级分类顶列表
				cateLevel2:[],
				scrollTop:0
			};
		},
		onLoad(){
			// 获取当前系统的信息
			const sysInfo = uni.getSystemInfoSync()
			// 为wh窗口可用高度动态赋值
			this.wh = sysInfo.windowHeight
			this.getCateList()
		},
		methods:{
			async getCateList(){
					const {data:res} = await uni.$http.get('/api/public/v1/categories')
					if(res.meta.status!==200) return uni.$showMsg()
					this.cateList = res.message
					// 为二级分类赋值
					this.cateLevel2  = res.message[0].children
					
				},
			activeChange(index){
				this.active  = index
				//重新为二级分类赋值
				this.cateLevel2 = this.cateList[index].children
				this.scrollTop = this.scrollTop === 0?1:0
			},
			// 点击三级分类跳转到相应的页面
			gotoGoodsList(index3){
				uni.navigateTo({
					url:'../../subpkg/goods_list/goods_list?cid='+index3
				})
			}
		},
	}
</script>

<style lang="scss">
.scroll_view_container{
	display: flex;
	.scroll_left{
		width: 120px;
		.srcoll_left_item{
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			background-color: #F7F7F7;
			&.active{
				background-color: #FFFFFF;
				position: relative;
				&::before{
					content:' ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #C00000;
					position: absolute;
					transform: translateY(50%);
				}
			}
		}
		
	}
	// 右侧的样式
	.cate_lv2_title{
		text-align: center;
		font-size: 12px;
		font-weight: bold;
		padding: 15px 0;
	}
	.cate_lv3_list{
		display: flex;
		flex-wrap: wrap;
		.cate_lv3_item {
			width: 33.3%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 10px;
			image{
				width: 60px;
				height: 60px;
			}
			text{
				font-size: 12px;
			}
		}
	}
}
</style>
