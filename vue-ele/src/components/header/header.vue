<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<!-- 公告 -->
		<div class="bulletin-wrapper">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			seller: {
				type: Object,
				default: {

				}
			}
		},
		data() {
			return {
				classMap:['decrease','discount','guarantee','invoice','special']
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	.header
		color:#fff
		position:relative
		background: #999
		.content-wrapper
			position: relative 
			padding: 24px 12px 18px 24px
			.avatar
				display:inline-block
			.content
				display:inline-block
				margin-left:16px
			.title
				margin:2px 0 8px 0
				.brand
					display:inline-block;
					width:30px;
					height:18px;
					vertical-align:bottom
					bg-image('brand')
					background-size:30px 18px
					background-repeat:no-repeat
				.name
					margin-left:6px
					font-size:16px
					font-weight:bold
					line-height:8px
			.description
					margin-bottom:10px
					line-height:12px
					font-size:12px
			.support
				font-size:10px
				line-height:12px
				.icon
					display:inline-block
					vertical-align:top
					width:20px
					height:20px
					margin-right:4px
					bg-image('decrease_1')
				  background-size: 12px 12px
		      background-repeat: no-repeat
</style>
