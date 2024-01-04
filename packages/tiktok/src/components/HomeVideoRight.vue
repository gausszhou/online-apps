<template>
	<div class="video-right">
		<i class="video-right-item icon iconfont icon-love"></i>
		<div class="video-right-text">{{info.loveNumber}}</div>
		<i class="video-right-item icon iconfont icon-comment"></i>
		<div class="video-right-text">{{info.commentNumber}}</div>
		<i class="video-right-item icon iconfont icon-quan"></i>
		<div class="video-right-text">{{info.shareNumber}}</div>
		<div class="video-right-item"></div>
		<div  :class="{ playing }">
			<i class="video-right-item icon iconfont icon-disc"></i>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeVideoRight',
	props: {
		info:{
			type:Object,
			default:{}
		},
		playing: {
			type: Boolean
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.video-right {
	position: absolute;
	right: 4px;
	bottom: 0;
	width: 50px;
	height: 400px;
	z-index: 2;
	padding-left: 20px;
}

.video-right-item {
	margin-top: 10px;
	width: 30px;
	height: 30px;
	overflow: hidden;
}

.video-right-text{
	margin-top: 5px;
	margin-bottom: 10px;
	width: 30px;
	font-size: 12px;
	text-align: center;
	color: #ccc;
}

.video-right-item.icon {
	width: 30px;
	height: 30px;
	font-size: 30px;
	color: #fff;
}

.video-author-avatar image {
	width: 30px;
	height: 30px;
	
	border-radius: 50%;
}

.playing {
	animation: rotate infinite 1s linear forwards;
	transform-origin: center center;
}

@keyframes rotate {
	0% {
		transform: rotate(0);
	}

	50% {
		transform: rotate(180deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
