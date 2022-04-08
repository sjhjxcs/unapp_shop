<template>
	<view class="goods_list">
		<view class="goods_item">
			<!-- 商品左侧图片区域 -->
			<view class="goods_item_left">
				<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
				<image :src="goods.goods_small_logo|| defaultPic" class="goods_pic"></image>
			</view>
			<!-- 商品右侧信息区域 -->
			<view class="goods_item_right">
				<!-- 商品标题 -->
				<view class="goods_name">{{goods.goods_name}}</view>
				<view class="goods_info_box">
					<!-- 商品价格 -->
					<view class="goods_price">￥{{goods.goods_price | tofixed}} </view>
					<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler">
					</uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			},
			// 是否展示图片左侧的radio
			showRadio: {
				type: Boolean,
				// 如果外界没有指定show-radio属性的值，则默认不展示radio组件
				default: false
			},
			// 展示不展示那个numberbox区域
			showNum: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		// 添加一个过滤器
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			  // radio 组件的点击事件处理函数
			  radioClickHandler() {
			    // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
			    // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
			    this.$emit('radio-change', {
			      // 商品的 Id
			      goods_id: this.goods.goods_id,
			      // 商品最新的勾选状态
			      goods_state: !this.goods.goods_state
			    })
			  },
			// NumberBox 组件的 change 事件处理函数
			// NumberBox 组件的 change 事件处理函数
			  numChangeHandler(val) {
			    // 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
			    this.$emit('num-change', {
			      // 商品的 Id
			      goods_id: this.goods.goods_id,
			      // 商品的最新数量
			      goods_count: +val
			    })
			  }
		}
	}
</script>

<style lang="scss">
	.goods_list {
		background-color: white;

		.goods_item {
			display: flex;
			flex-wrap: nowrap;
			border-bottom: 1px solid #F0F0F0;

			.goods_item_left {
				// width: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 10px;

				.goods_pic {
					width: 100px;
					height: 100px;
					display: block;
				}
			}

			.goods_item_right {
				display: flex;
				flex-direction: column;
				justify-content: center;

				.goods_name {
					font-size: 12px;
					color: #333333;
					padding-bottom: 10px;
				}
			}

			.goods_info_box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.goods_price {
					font-size: 16px;
					color: #c00000;

				}
			}

		}
	}
</style>
