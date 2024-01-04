<template>
	<div class="page-home">
		<div class="view-content">
			关注
		</div>
		<AppBottomTabBar></AppBottomTabBar>
	</div>
</template>

<script>
import AppBottomTabBar from '../../components/AppBottomTabBar.vue';
export default {
	components: {
		AppBottomTabBar
	},
	data() {
		return {
			title: 'Home'
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style>
	
.view-content{
	width: 100%;
	height: 100%;
}
</style>