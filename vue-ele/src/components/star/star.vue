<template>
	<div class="star" :class="starType">
		<span v-for="(itemClass,index) in itemClasses" class="star-item" :class="itemClass" :key="index"></span>

	</div>
</template>
<script>
	const LENGTH = 5; //星星数量
	const CLS_ON = 'on';//整颗星类名
	const CLS_HALF = 'half';//半颗星星类名
	const CLS_OFF = 'off'; //灰色星星类名
	export default {
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
			starType() {
				return "star-" + this.size
			},
			itemClasses() {
				let result = [];
				let score = Math.floor(this.score * 2) / 2;  //分数 取整数或者半  4 或者 4.5。如果是 .5 显示半颗星
				let hasDecimal = score % 1 !== 0; //判断是否有小数 有则是半颗星
				let integer = Math.floor(score);//整颗星
				//整颗星
				for (let i = 0;i < integer;i++) {
					result.push(CLS_ON)
				}
				//如果有小数则是半颗星 向数组添加CLS_HALF 类 (因为只可能存在一个半颗星 所以不用循环)
				if (hasDecimal) {
					result.push(CLS_HALF)
				}
				//剩下的用灰色星星补全
				while (result.length <  LENGTH) {
					result.push(CLS_OFF)
				}
				return result;
			}
		}
	}
</script>
<style lang="stylus" rel='stylesheet/stylus'>
	@import '../../common/stylus/mixin.styl'
	.star
		font-size:0
		&.star-48
			.star-item
				width: 20px
				height: 20px
				margin-right: 22px
				background-size: 20px 20px
				&.on
					bg-image('star48_on')
				&.half
					bg-image('star48_half')	
				&.off
					bg-image('star48_off')
				&:last-child
					margin-right: 0
		&.star-36
			.star-item
				width: 15px
				height: 15px
				margin-right: 6px
				background-size: 15px 15px
				&:last-child
					margin-right: 0
				&.on
					bg-image('star36_on')
				&.half
					bg-image('star36_half')
				&.off
					bg-image('star36_off')
		&.star-24
			.star-item
				width: 10px
				height: 10px
				margin-right: 3px
				background-size: 10px 10px
				&:last-child
					margin-right: 0
				&.on
					bg-image('star24_on')
				&.half
					bg-image('star24_half')
				&.off
					bg-image('star24_off')
		.star-item
			display:inline-block
			background-repeat: no-repeat
</style>