<template>
  <div class="mx-16">
    <h1 class="h1">Playable Videos</h1>
    <section class="flex justify-around">
      <UvtVideo
        v-for="video in videos"
        :key="video.id"
        :src="video.src"
        :type="video.type"
        :fragments="video.fragments"
        :width="500"
      />
    </section>
    <hr />
    <UvtPlayground />
  </div>
</template>

<script>
import UvtPlayground from '@/components/UvtPlayground.vue';
import UvtVideo from '@/components/UvtVideo.vue';

// 9000-12000 2000-4000 0-1000 0-500 2000-3000 500-5000
// 8000
// 0-5000 9000-12000

export default {
  name: 'App',
  components: {
    UvtPlayground,
    UvtVideo,
  },
  data() {
    return {
      videos: [
        {
          id: 1,
          src: '/assets/CreaturesUnderwater.mp4',
          type: 'video/mp4',
          fragments: [
            {
              start: 9000,
              end: 12000,
            },
            {
              start: 2000,
              end: 4000,
            },
            {
              start: 0,
              end: 1000,
            },
            {
              start: 0,
              end: 500,
            },
            {
              start: 2000,
              end: 3000,
            },
            {
              start: 500,
              end: 5000,
            },
          ],
        },
        {
          id: 2,
          src: '/assets/WhiteKeyboard.mp4',
          type: 'video/mp4',
          fragments: [],
        },
      ],
    };
  },
};
</script>

<style lang="postcss" scoped>
.h1 {
  @apply mx-6 mt-8 mb-6 text-5xl text-center font-bold;
}
</style>
