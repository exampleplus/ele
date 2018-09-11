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
					<span class="icon"></span>
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
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
	</div>
</template>
<script>
	export default {
		props:{
			seller: {
				type:Object,
				default: {
					
				}
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.header
		.content-wrapper
			position: relative
			padding: 24px 12px 18px 24px
			
	
</style>