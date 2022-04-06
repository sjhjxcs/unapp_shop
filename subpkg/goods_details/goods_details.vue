<template>
	<view v-if="goods_info.goods_name" class="goods_body">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item
			v-for="(item1,index1) in goods_info.pics"
			:key="index1"
			@click="preview(index1)"
			>
				<image :src="item1.pics_big"></image>
			</swiper-item>
		</swiper>
		
		<!--商品信息区域  -->
		<view class="goods_info_box">
			<!-- 商品价格 -->
			<view class="price">¥{{goods_info.goods_price}}</view>
			<!-- 商品信息主题区域 -->
			<view class="goods_body_name">
				<!-- 商品的名字 -->
				<view class="goods_name">
					{{goods_info.goods_name}}
				</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="25" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			
			<!-- 运费 -->
			<view class="goods_express">
				快递：免运费
			</view>
		</view>
		
		<!-- 富文本渲染区域 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		
		<!-- 商品导航组件区域 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info:{},
				options: [{
							icon: 'shop',
							text: '店铺',
							infoBackgroundColor:'#007aff',
							infoColor:"red"
						}, {
							icon: 'cart',
							text: '购物车',
							info: 2
						}],
					    buttonGroup: [{
					      text: '加入购物车',
					      backgroundColor: '#ff0000',
					      color: '#fff'
					    },
					    {
					      text: '立即购买',
					      backgroundColor: '#ffa200',
					      color: '#fff'
					    }
					    ]
			};
		},
		onLoad(options){
			const  goods_id = options.goods_id
			this.getGoodsDetails(goods_id)
			console.log(options)
		},
		methods:{
		  async	getGoodsDetails(goods_id){
		  const {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
		   // 使用字符串的 replace() 方法，将 webp 的后缀名替换为 jpg 的后缀名
		 res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
		  this.goods_info = res.message
		  console.log(this.goods_info)
			},
			// 实现轮播图中图片的预览效果
			preview(index1){
				uni.previewImage({
					// 预览时，默认显示图片的索引
					current:index1,
					// 所有图片的url地址的数组
					urls:this.goods_info.pics.map(x=>x.pics_big)
				})
			},
			
			onClick (e) {
				console.log("鼠标点击事件的处理：",e)
				if(e.content.text==='购物车'){
					// 切换到购物车页面
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
		}
	},
	}
</script>

<style lang="scss">
swiper{
	height: 750rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
// 商品主体区域的样式
.goods_info_box{
	.price{
		color: #FF5A5F;
		margin-left: 10px;
		margin-top: 10px;
		font-weight: bold;
	}
	.goods_body_name{
		margin-top: 10px;
		display: flex;
		justify-content:space-between;
		
		font-size: 16px;
		.goods_name{
			width: 340px;
			
		}
	}
	.favi{
		width: calc(100%-340px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-left:2px solid #DCDFE6;
		padding-left: 15px;
	}
	.goods_express{
		color: #8F939C;
	}
}

// 页面的底部导航区域的样式实现
.goods_nav{
	position: fixed;
	bottom: 0;
	width: 100%;
	left: 0;
}
// 主体区域添加一个样式
.goods_body{
	padding-bottom: 50px;
}

</style>
