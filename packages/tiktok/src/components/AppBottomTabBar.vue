<template>
	<div class="tab-box">
		<div class="tab-item" :class="{ active: activeIndex == index }" v-for="(nav, index) in navList" :key="index"
			@click="navTo(nav, index)">
			<span class="tab-item-text" v-if="nav.text">{{ nav.text }}</span>
			<div class="tab-item-view" v-if="nav.icon" :class="nav.icon"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "appBottomTabBar",
	data() {
		return {
			activeIndex: 0,
			navList: [{
				text: "首页",
				path: "/index"
			},
			{
				text: "关注",
				path: "/follow"
			},
			{
				icon: "iconfont icon-plus",
				path: ""
			},
			{
				text: "消息",
				path: "/message"
			},
			{
				text: "我的",
				path: "/mine"
			}
			]
		};
	},
	methods: {
		navTo(item, index) {
			if (item.path) {
				this.$router.push(item.path)
			}
		}
	}
};
</script>

<style lang="scss">
.tab-box {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	background-color: rgba(0, 0, 0, 1);
}

.tab-item {
	flex: 1 1 100%;
	text-align: center;

	.tab-item-text {
		color: #fff;
		font-size: 14px;
	}

	.tab-item-view {
		height: 35px;
		border-radius: 5px;
		background-color: #fff;
		font-size: 16px;
		color: #000;
		line-height: 35px;
		margin: 0 5px;
	}

	&.active {
		.tab-item-text {
			font-weight: 700;
		}
	}
}
</style>
