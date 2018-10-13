<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" @click="selectMenu(index,$event)" class="menu-item" :class="{'current':currentIndex===index}">
				<span class="text border-1px">
					<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
					{{item.name}}
				</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook" ref="foodList">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px">
							<div class="icon">
								<img width="57" height="57" :src="food.icon">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopcart>
</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import axios from 'axios'
	import shopcart from "@/components/shopcart/shopcart"
	import cartcontrol from "@/components/cartcontrol/cartcontrol"

	export default {
		props:{
			seller:{
				type:Object
			}
		},
		components:{
			shopcart,
			cartcontrol
		},
		data() {
			return {
				listHeight:[],
				classMap:['decrease','discount','guarantee','invoice','special'],
				goods:[],
				scrollY:"",
				selectedFood:{}
			}
		},
		computed: {
			currentIndex() {
				for ( let i = 0; i < this.listHeight.length; i++ ) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if(!height2 || this.scrollY >= height1 && this.scrollY < height2) {
						return i;  //左侧对应的索引
					}
				}
				return 0;
			},
			selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
		},
		mounted() {
			axios.get('/static/data.json')
				.then(response => {
					let res = response.data;
					let goods = res.goods;
					this.goods = goods;
					
					//初始化滚动事件要写在$nextTick方法里面
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					})
					
				});
				
				
		},
		methods:{
			//初始化滚动
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{
					click:true
				})
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
					click:true,
					probeType:3 //实时记录滚动的位置
				})
				
				this.foodsScroll.on('scroll',(pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				})
			},
			//计算每个食品分类高度
			_calculateHeight() {
				let foodList = this.$refs.foodList; //右侧每个食品分类
				let height = 0;
				this.listHeight.push(height);
				for( let i = 0; i < foodList.length; i++ ) {
					let item = foodList[i];
					height = height + item.clientHeight;
					this.listHeight.push(height); //每个分类食品的高度放到数组里面
				}
				
			},
			//点击左侧食品
			selectMenu(index,event) {
				let foodList = this.$refs.foodList;
				this.foodsScroll.scrollToElement(foodList[index],300)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	@import "../../common/stylus/base.styl"
	.goods
		display: flex
		position: absolute
		top: 174px
		bottom: 46px
		width: 100%
		overflow: hidden
		.menu-wrapper
			flex: 0 0 80px
			width: 80px
			background: #f3f5f7
			.menu-item
				display: table
				height: 54px
				width: 56px
				padding: 0 12px
				line-height: 14px
				&.current
					position: relative
					z-index: 10
					margin-top: -1px
					background: #fff
					font-weight: 700
					.text
						border-none()
				.icon
					display: inline-block
					vertical-align: top
					width: 12px
					height: 12px
					margin-right: 2px
					background-size: 12px 12px
					background-repeat: no-repeat
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
				.text
					display: table-cell
					width: 56px
					vertical-align: middle
					border-1px(rgba(7, 17, 27, 0.1))
					font-size: 12px
		.foods-wrapper
			flex: 1
			.title
				padding-left: 14px
				height: 26px
				line-height: 26px
				border-left: 2px solid #d9dde1
				font-size: 12px
				color: rgb(147, 153, 159)
				background: #f3f5f7
			.food-item
				display: flex
				margin: 18px
				padding-bottom: 18px
				border-1px(rgba(7, 17, 27, 0.1))
				&:last-child
					border-none()
					margin-bottom: 0
				.icon
					flex: 0 0 57px
					margin-right: 10px
				.content
					flex: 1
					.name
						margin: 2px 0 8px 0
						height: 14px
						line-height: 14px
						font-size: 14px
						color: rgb(7, 17, 27)
					.desc, .extra
						line-height: 10px
						font-size: 10px
						color: rgb(147, 153, 159)
					.desc
						line-height: 12px
						margin-bottom: 8px
					.extra
						.count
							margin-right: 12px
					.price
						font-weight: 700
						line-height: 24px
						.now
							margin-right: 8px
							font-size: 14px
							color: rgb(240, 20, 20)
						.old
							text-decoration: line-through
							font-size: 10px
							color: rgb(147, 153, 159)
					.cartcontrol-wrapper
						position: absolute
						right: 0
						bottom: 12px
</style>