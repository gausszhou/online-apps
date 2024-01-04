<template>
	<div class="home-top-bar">
		<div class="home-top-search iconfont icon-search" @click="search"></div>
		<div class="home-top-nav">
			<div class="top-nav-item recommend">推荐</div>
			<div class="top-nav-item same-city">同城</div>
		</div>
		<div class="home-top-live iconfont icon-live"></div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
	data() {
		return {}
	},
	methods: {
		search() {

		}
	}
})

</script>

<style lang="scss">
.home-top-bar {
	position: absolute;
	left: 0;
	top: 0px;
	width: 100%;
	height: 50px;
	margin: 0 auto;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	color: #fff;

	.home-top-search,
	.home-top-live {
		padding: 0 20px;
	}

	.home-top-nav {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;

		.top-nav-item {
			font-size: 15px;
			margin: 0 20px;
		}
	}
}</style>
