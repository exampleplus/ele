<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul>
				<li class="menu-item" v-for="(item,index) in goods">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper">
			<ul>
				<li v-for="(item,index) in goods" class="food-list" ref="foodList">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="(food,index) in item.foods" class="food-item border-1px" @click="seeFood(food,$event)">
							<div class="icon">
								<img width="57" height="57" :src="food.icon">
							</div>
							<div class="content">
								<div class="name">{{food.name}}</div>
								<div class="desc">{{food.description}}</div>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
										<span class="now">￥{{food.price}}</span>
										<span class="old"v-show="food.oldPrice">￥{{food.oldPrice}}</span>
									</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="footer">
			
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		props:{
			seller:{
				type:Object
			}
		},
		data() {
			return {
				classMap:['decrease','discount','guarantee','invoice','special'],
				goods:[]
			}
		},
		mounted() {
			axios.get('/static/data.json')
				.then(response => {
					let res = response.data;
					let goods = res.goods;
					this.goods = goods;
					console.log(this.goods)
				})
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	@import "../../common/stylus/base.styl"
	.goods
		width:100%
		display:flex
		position:absolute
		top:174px
		bottom:46px
		overflow:hidden
		.menu-wrapper
			flex: 0 0 80x
			width:80px
			background:#f4f5f7
			.menu-item
				display:table
				width:56px
				height:54px
				background-color:#f3f5f7
				padding:0 12px
				line-height:14px
				border-bottom:1px solid #ccc
				.text
					display: table-cell
			    width: 56px
			    vertical-align: middle
			    position: relative
			    font-size: 12px
.icon
						display:inline-block
						vertical-align:top
						position:relative
						width:12px
						height:12px
						margin-right:2px
						background-size:12px 12px
						background-repeat:no-repeat
		.foods-wrapper
			flex:1
			.title
				padding-left:14px
				height:26px
				font-size:12px
				line-height:26px
				color:rgb(147,153,159)
				background-color:#f3f5f7
				border-left:2px solid #d9dde1
			.food-item
				display:flex
				margin:18px
				padding-bottom:18px
				border-1px(rgba(7,17,27,0.1))
				&:last-child
					border-none()
					margin-bottom:0
			.icon
				flex:0 0 57px
				margin-right:18px
			.content
				flex:1
</style>