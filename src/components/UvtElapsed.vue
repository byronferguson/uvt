<template>
  <div>
    Elapsed UVT: {{ elapsedUvt }}
  </div>
</template>

<script>
import timeConversions from '@/mixins/timeConversions';
import uvtMixin from '@/mixins/uvt';

export default {
  name: 'UvtElapsed',
  mixins: [timeConversions, uvtMixin],
  props: {
    elapsed: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  computed: {
    elapsedInSec() {
      return this.ms2sec(this.elapsed);
    },
    durationInSec() {
      return this.ms2sec(this.duration);
    },
    displayElapsedPercentage() {
      return this.duration ? ((this.elapsed / this.duration) * 100).toFixed(2) : 0;
    },
    elapsedUvt() {
      return `${this.elapsedInSec}s / ${this.durationInSec}s ( ${this.displayElapsedPercentage}% )`;
    },
  },
};
</script>
