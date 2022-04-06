
<template>
	<view class="goods_list">
		<view class="goods_item">
		  <!-- 商品左侧图片区域 -->
		  <view class="goods_item_left">
		    <image :src="goods.goods_small_logo|| defaultPic" class="goods_pic"></image>
		  </view>
		  <!-- 商品右侧信息区域 -->
		  <view class="goods_item_right">
		    <!-- 商品标题 -->
		    <view class="goods_name">{{goods.goods_name}}</view>
		    <view class="goods_info_box">
		      <!-- 商品价格 -->
		      <view class="goods_price">￥{{goods.goods_price | tofixed}} </view>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goods:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		// 添加一个过滤器
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods_list{
	.goods_item{
		display: flex;
		flex-wrap: nowrap;
		border-bottom: 1px solid #F0F0F0;
		.goods_item_left{
			// width: 50%;
			margin-right: 10px;
			.goods_pic{
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods_item_right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			.goods_name{
				font-size: 12px;
				color: #333333;
				padding-bottom: 10px;
			}
		}
		.goods_info_box{
			.goods_price{
				        font-size: 16px;
				        color: #c00000;

			}
		}
		
	}
}

</style>
