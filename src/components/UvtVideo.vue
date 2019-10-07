<template>
  <div class="uvt-video">
    <video-player
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @timeupdate="onPlayerTimeUpdate($event)"
    />
    <UvtTimeline
      :width="width - 140"
      :duration="duration"
      :fragments="internalFragments"
      class="uvt-timeline"
    />
    <h3>Elapsed UVT: {{ displayElapsedUvt }}s / {{ displayDuration }}s ({{ displayElapsedPercentage }}% )</h3>
  </div>
</template>

<script>
// eslint-disable-next-line
import 'video.js/dist/video-js.css';

import { videoPlayer } from 'vue-video-player';
import uvtMixin from '@/mixins/uvt';
import UvtTimeline from '@/components/UvtTimeline.vue';

// Local variable to track a single new viewed fragment
const fragment = {
  start: 0,
  end: 0,
};

export default {
  name: 'UvtVideo',
  mixins: [uvtMixin],
  components: {
    videoPlayer,
    UvtTimeline,
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: () => 'video/mp4',
    },
    muted: {
      type: Boolean,
      required: false,
      default: () => true,
    },
    lang: {
      type: String,
      required: false,
      default: () => 'en',
    },
    width: {
      type: Number,
      required: true,
    },
    fragments: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      playerOptions: {
        // videojs options
        muted: this.muted,
        language: this.lang,
        sources: [{
          type: this.type,
          src: this.src,
        }],
        width: this.width,
      },
      duration: 0,
      elapsedUvt: 0,
      internalFragments: [...this.fragments],
    };
  },
  computed: {
    displayElapsedUvt() {
      return this.ms2sec(this.elapsedUvt);
    },
    displayDuration() {
      return this.ms2sec(this.duration);
    },
    displayElapsedPercentage() {
      return this.duration ? ((this.elapsedUvt / this.duration) * 100).toFixed(2) : 0;
    },
  },
  mounted() {
    this.updateElapsedUvt();
  },
  methods: {
    sec2ms: seconds => Math.floor(seconds * 1000),
    ms2sec: ms => (ms / 1000).toFixed(2),
    onPlayerPlay(player) {
      if (this.duration < 1) {
        this.duration = this.sec2ms(this.$refs.videoPlayer.player.duration());
      }
      fragment.start = this.sec2ms(player.currentTime());
    },
    onPlayerPause(player) {
      fragment.end = this.sec2ms(player.currentTime());
      this.internalFragments.push({ ...fragment });
      this.updateElapsedUvt();
    },
    onPlayerTimeUpdate(player) {
      const currentTime = this.sec2ms(player.currentTime());

      if (!player.scrubbing()) {
        fragment.end = currentTime;
        this.internalFragments.push({ ...fragment });
        fragment.start = fragment.end;
      } else {
        fragment.start = currentTime;
      }
    },
    updateElapsedUvt() {
      console.log('updateElapsedUvt');
      const sorted = this.sortFragments(this.internalFragments);
      const slices = this.generateSlices(sorted);
      this.elapsedUvt = this.calcUvt(slices);
    },
  },
};
</script>

<style scoped>
.uvt-video {
  margin: 2rem;
}

.uvt-timeline {
  margin-left: 90px;
  margin-top: 4px;
  margin-bottom: 6px;
}
</style>
