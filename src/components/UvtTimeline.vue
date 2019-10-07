<template>
  <svg :viewBox="viewBox" :width="width" v-if="fragments.length">
    <line
      v-for="(slice, index) in slices"
      :key="index"
      :x1="slice.start"
      :x2="slice.end"
      :style="style"
    />
  </svg>
</template>

<script>
import UvtMixin from '@/mixins/uvt';

export default {
  name: 'UvtTimeline',
  mixins: [UvtMixin],
  props: {
    width: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: () => 'rgb(255, 0 , 0)',
    },
    fragments: {
      type: Array,
      required: true,
    },
  },
  computed: {
    viewBox() {
      return `0 0 ${this.duration} ${this.height}`;
    },
    height() {
      return this.duration * 0.015;
    },
    style() {
      return `stroke:${this.color};stroke-width:${this.height}`;
    },
    slices() {
      const sorted = this.sortFragments(this.fragments);
      return this.generateSlices(sorted);
    },
  },
};
</script>
