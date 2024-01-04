<template>
	<div class="video-content-box">
		<video ref="videoRef" class="video" :src="src" :controls="false" :autoplay="false" :loop="false"
			 @progress="onVideoProgress" @ended="onVideoEnded"></video>
		<div class="mask" @click.self="pause" :class="{ 'is-playing': playing }">
			<i class="icon-play iconfont icon-live" v-if="playing === false" @click.self="play"></i>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AppVideoPlayer',
	props: {
		src: {
			type: String,
			default: ''
		},
		index: {
			type: Number
		},
		activeIndex: {
			type: Number
		}
	},
	data() {
		return {
			playing: false
		};
	},
	watch: {
		activeIndex: {
			handler(newV) {
				if (this.index !== this.activeIndex) {
					 this.pause();
				} 
			},
			immediate: true
		}
	},
	mounted() {
		this.$video = this.$refs.videoRef;
	},
	methods: {
		play() {
			console.log('play', this.index)
			this.$video?.play();
			this.playing = true;
			this.$emit('change', true);
		},
		pause() {
			this.playing = false;
			this.$video?.pause();
			this.$emit('change', false);
		},
		onVideoClick(e) {
			if (this.playing) {
				this.pause()
			} else {
				this.play()
			}
		},
		onVideoProgress() {
			if (this.$video.currentTime > 0) {
				this.playing = true;
				this.$emit('change', true);
			}
		},
		onVideoEnded() {
			this.playing = false;
			this.$emit('change', false);
			// next
		}
	}
};
</script>

<style lang="scss">
.video-content-box {
	width: 100%;
	height: 100%;
	position: relative;
}

.video {
	width: 100%;
	height: 100%;
}
.mask {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: #ffffff11;
}

.mask.is-playing {
	background-color: #ffffff00;
}

.icon-play {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: #ffffff77;
	font-size: 40px;
}
</style>
