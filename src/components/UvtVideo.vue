<template>
  <div class="flex-col m-8">
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
    <UvtElapsed :elapsed="elapsedUvt" :duration="duration" />
  </div>
</template>

<script>
// eslint-disable-next-line
import 'video.js/dist/video-js.css';

import { videoPlayer } from 'vue-video-player';
import timeConversions from '@/mixins/timeConversions';
import uvtMixin from '@/mixins/uvt';
import UvtElapsed from '@/components/UvtElapsed.vue';
import UvtTimeline from '@/components/UvtTimeline.vue';

// Local variable to track a single new viewed fragment
const fragment = {
  start: 0,
  end: 0,
};

export default {
  name: 'UvtVideo',
  mixins: [timeConversions, uvtMixin],
  components: {
    videoPlayer,
    UvtElapsed,
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
    elapsedUvt() {
      const sorted = this.sortFragments(this.internalFragments);
      const slices = this.generateSlices(sorted);
      return this.calcUvt(slices);
    },
  },
  methods: {
    onPlayerPlay(player) {
      if (this.duration < 1) {
        this.duration = this.sec2ms(this.$refs.videoPlayer.player.duration());
      }
      fragment.start = this.sec2ms(player.currentTime());
    },
    onPlayerPause(player) {
      fragment.end = this.sec2ms(player.currentTime());
      this.internalFragments.push({ ...fragment });
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
