<template>
  <div class="mb-64">
    <UvtTimeline
      class="mx-auto"
      :width="width"
      :duration="duration * 1000"
      :fragments="fragments"
    />

    <h1 class="text-3xl text-right mr-8">Elapsed UVT: {{ elapsedUvt }} secs</h1>

    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="start">
          Duration (s)
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="start"
          type="number"
          v-model="duration"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click.prevent="updateDuration"
        >
          Update Duration
        </button>
      </div>
    </form>

    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="start">
          Start Time (ms)
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="start"
          type="number"
          v-model="start"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="start">
          End Time (ms)
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="start"
          type="number"
          v-model="end"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click.prevent="addFragment"
        >
          Add Fragment
        </button>
      </div>
    </form>

    <h3 class="mx-6 mt-8 mb-2">List of Fragments</h3>
    <ul>
      <li
        v-for="(fragment, index) in fragments"
        :key="index"
      >
        {{ index }}. {{ fragment.start }} - {{ fragment.end }} <button @click="() => removeFragment(index)">X</button>
      </li>
    </ul>

    <h3 class="mx-6 mt-8 mb-2">List of Slices</h3>
    <ul>
      <li
        v-for="(slice, index) in slices"
        :key="index"
      >
        {{ index }}. {{ slice.start }} - {{ slice.end }}
      </li>
    </ul>

  </div>
</template>

<script>
import timeConversions from '@/mixins/timeConversions';
import uvtMixin from '@/mixins/uvt';
import UvtTimeline from '@/components/UvtTimeline.vue';

export default {
  name: 'UvtPlayground',
  mixins: [timeConversions, uvtMixin],
  components: {
    UvtTimeline,
  },
  data() {
    return {
      duration: 30,
      start: null,
      end: null,
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
    };
  },
  computed: {
    width: () => window.screen.width,
    elapsedUvt() {
      return this.ms2sec(this.uvtFromFragments(this.fragments));
    },
    slices() {
      return this.generateSlices(this.fragments);
    }
  },
  methods: {
    addFragment() {
      const start = +this.start;
      const end = +this.end;

      if(start >= 0 && end <= (this.duration * 1000) && start <= end) {
        this.fragments.push({ start, end });

        this.start = null;
        this.end = null;
      } else {
        console.log('BAD');
      }
    },
    removeFragment(index) {
      this.fragments.splice(index, 1);
    },
    updateDuration() {
      const duration = this.duration * 1000;
    }
  },
};
</script>
