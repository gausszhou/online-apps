<template>
	<div class="page-home">
		<HomeVideoContainer :videoList="videoList" />
		<HomeTopBar />
		<AppBottomTabBar />
	</div>
</template>

<script>
import AppBottomTabBar from '@/components/AppBottomTabBar.vue';
import HomeVideoContainer from '@/components/HomeVideoContainer.vue';
import HomeTopBar from '@/components/HomeTopBar.vue';
export default {
	components: {
		HomeTopBar,
		HomeVideoContainer,
		AppBottomTabBar
	},
	data() {
		return {
			title: 'Home',
			videoList: [],
		};
	},
	created() {
		this.getVideoList()
	},
	methods: {
		getVideoList() {
			fetch("/mock/videos.json").then(res=> res.json())
			.then(res => {
				console.log(res)
				this.videoList = res.list
			})
		},
	}
};
</script>

<style>
.page-home {
	height: 100vh;
	position: relative;
}
</style>