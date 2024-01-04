<template>
	<div class="video-list-box">
		<swiper
			id="swiper-container"
			@slideChange="onSwiperChange"
      :loop="true"
			direction="vertical"
    >
      <swiper-slide v-for="(item, index) in videoList" :key="item.id">
				<AppVideoPlayer ref="player" :src="item.src" :index="index" :activeIndex="activeIndex" @change="$event => onVideoChange($event, index)"></AppVideoPlayer>
			</swiper-slide>
    </swiper>
		<HomeVideoInfo :info="activeItem" :playing="playing"></HomeVideoInfo>
		<HomeVideoRight :info="activeItem" :playing="playing"></HomeVideoRight>			
	</div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import AppVideoPlayer from "./AppVideoPlayer.vue";
import HomeVideoInfo from "./HomeVideoInfo.vue"
import HomeVideoRight from "./HomeVideoRight.vue"

export default {
	name: "VideoContainer",
	components: {
		Swiper,
		SwiperSlide,
		AppVideoPlayer,
		HomeVideoInfo,
		HomeVideoRight
	},
	props: {
		videoList: {
			type: Array,
			default: () => [{}]
		}
	},
	data() {
		return {
			activeIndex: 0,
			playing: false,
		};
	},
	computed: {
		activeItem(){
			return this.videoList[this.activeIndex] || {}
		}
	},
	methods: {
		onSwiperChange(e) {
			this.activeIndex = e.activeIndex;
		},
		onVideoChange(e, index) {
			this.playing = e
			if(e) this.activeIndex = index;
		}
	}
};
</script>

<style lang="scss" scoped>
.video-list-box {
	position: absolute;
	top: 0;
	height: 100vh;
	overflow: scroll;
	background-color: #000;
}

#swiper-container {
	width: 100%;
	height: 100vh;
}

.swiper-item {
	width: 100%;
	height: 100vh;
	background-color: #000;
}
</style>
