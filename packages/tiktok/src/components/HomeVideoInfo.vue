<template>
	<div class="video-info">
		<div class="video-info-author">@{{ info.author }}</div>
		<div class="video-info-title">{{ info.title }}</div>
		<div class="video-info-music">
			<div class="video-info-music-inner" :class="{ playing }">@{{ info.musicTitle }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeVideoInfo',
	props: {
		playing: {
			type: Boolean
		},
		info: {
			type: Object,
			defalut: () => {
				return {
					author: '胡彦斌',
					tilte: '秦时明月汉时光，万里长征人未还。',
					musicTitle: '月光色'
				}	
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.video-info {
	position: absolute;
	left: 0;
	bottom: 50px;
	width: 75%;
	height: 150px;
	z-index: 2;
	padding-left: 20px;
}

.video-info-author {
	font-size: 18px;
	color: #eee;
}

.video-info-title {
	font-size: 14px;
	margin-top: 15px;
	color: #ddd;
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	line-clamp: 2;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.video-info-music {
	width: 75%;
	font-size: 14px;
	margin-top: 15px;
	color: #ddd;
	overflow: hidden;
}
.video-info-music-inner {
	width: 150%;
	white-space: nowrap;
}
.video-info-music-inner.playing {
	animation: slideLeft 8s linear 0.2s infinite;
}
@keyframes slideLeft {
	0% {
		transform: translate(0%);
	}
	99% {
		transform: translateX(-100%);
	}
	100% {
		transform: translateX(0%);
	}
}
</style>
