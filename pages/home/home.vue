<template>
	<view>
		<!-- 轮播图的区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<!-- 循环渲染轮播图的item项 -->
			<swiper-item v-for="(item,index) in swiperList" :key = "index.goods_id">
				<view class="swiper-item">
					<!-- 动态绑定图片的src属性 -->
						<image :src="item.image_src"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 这是轮播图的数据列表
				swiperList: []
			};
		},
		onLoad() {
			// 调用这个方法。获取轮播图的数据
			// console.log("这个地方执行没有？？")
			this.getSwiperList()
		},
		methods: {
			async getSwiperList() {
				// uni.$http.get('/api/public/v1/home/swiperdata')的返回值是一个promise，可以用async和await来优化
				const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status!==200){
					return uni.showToast({
						title:"数据请求失败！",
						duration:1500,
						icon:'none'
						})
				}
			this.swiperList = res.message
			console.log(this.swiperList)
			}
		}
	}
</script>

<style lang="scss">
.swiper-item{
	height: 300rpx;
}
.swiper-item image{
		width: 100%;
		height: 100%;
	}
</style>
