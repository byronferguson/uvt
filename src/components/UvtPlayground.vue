<template>
  <div class="mb-12">
    <h1 class="h1">Fragment Playground</h1>

    <section class="card">
      <p>
        This section can be used to enter various time fragments
        for evaluation/testing purposes. The fragments are displayed
        in a list, the "slices" are factored from these fragments and
        represented by the red line and displayed in a list.
      </p>
    </section>

    <h4 class="h3">
      Timeline Slices <span v-if="!fragments.length" class="text-xs italic">(No Fragments to Display)</span>
    </h4>
    <UvtTimeline
      class="mx-auto"
      :width="width"
      :duration="duration * 1000"
      :fragments="fragments"
    />

    <UvtElapsed
      :elapsed="elapsedUvt"
      :duration="durationInMs"
      class="text-2xl text-right mr-8"
    />

    <section class="flex">
      <form class="card flex-1">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="start">
            Duration (s)
          </label>
          <input
            class="input"
            id="start"
            type="number"
            min="1"
            v-model="duration"
          />
        </div>
      </form>

      <form class="card flex-1">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="start">
            Start Time (ms)
          </label>
          <input
            class="input"
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
            class="input"
            id="start"
            type="number"
            v-model="end"
          />
        </div>
        <div class="flex items-center justify-between">
          <button @click.prevent="addFragment" class="btn" type="button">
            Add Fragment
          </button>
        </div>
      </form>
    </section>

    <section class="flex">
      <div class="flex-col flex-1">
        <h3 class="h3">List of Fragments</h3>
        <ul class="card" v-if="fragments.length">
          <li
            v-for="(fragment, index) in fragments"
            :key="index"
            @click="() => removeFragment(index)"
            class="fragment-list-item"
          >
            <div class="flex-col justify-between text-xl">
              <div>Start: {{ fragment.start }}</div>
              <div>End: {{ fragment.end }}</div>
            </div>
            <button @click="() => removeFragment(index)" class="btn" type="button">
              <span class="lnr lnr-cross"></span>
            </button>
          </li>
        </ul>
        <div class="card" v-else>
          <h3 class="h4">No Fragments to Display</h3>
        </div>
      </div>

      <div class="flex-col flex-1">
        <h3 class="h3">List of Slices</h3>
        <ul class="card" v-if="slices.length">
          <li
            v-for="(slice, index) in slices"
            :key="index"
            class="fragment-list-item"
          >
            <div class="flex-col justify-between text-xl">
              <div>Start: {{ slice.start }}</div>
              <div>End: {{ slice.end }}</div>
            </div>
          </li>
        </ul>
        <div class="card" v-else>
          <h3 class="h4">No Slices to Display</h3>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import timeConversions from '@/mixins/timeConversions';
import uvtMixin from '@/mixins/uvt';
import UvtElapsed from '@/components/UvtElapsed.vue';
import UvtTimeline from '@/components/UvtTimeline.vue';

export default {
  name: 'UvtPlayground',
  mixins: [timeConversions, uvtMixin],
  components: {
    UvtElapsed,
    UvtTimeline,
  },
  data() {
    return {
      duration: 30,
      start: null,
      end: null,
      fragments: [],
    };
  },
  computed: {
    width: () => window.screen.width - 128,
    durationInMs() {
      return this.duration * 1000;
    },
    elapsedUvt() {
      return this.calcUvt(this.slices);
    },
    slices() {
      const sorted = this.sortFragments(this.fragments);
      return this.generateSlices(sorted);
    },
  },
  methods: {
    addFragment() {
      // Convert to number from string
      const start = +this.start;
      const end = +this.end;

      // Determine if current values are valid
      if (start >= 0 && end <= (this.duration * 1000) && start <= end) {
        this.fragments.push({ start, end });

        this.start = null;
        this.end = null;
      }
    },
    removeFragment(index) {
      this.fragments.splice(index, 1);
    },
  },
};
</script>

<style lang="postcss" scoped>
.h1 {
  @apply mx-6 mt-8 mb-6 text-5xl text-center font-bold;
}

.h3 {
  @apply mx-6 mt-8 mb-2 text-3xl text-center font-bold;
}

.h4 {
  @apply text-xl text-center font-light;
}

.card {
  @apply bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-4;
}

.btn {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;

  &:hover {
    @apply bg-blue-700;
  }

  &:focus {
    @apply outline-none shadow-outline;
  }
}

.input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;

  &:focus {
    @apply outline-none shadow-outline;
  }
}

.fragment-list-item {
  @apply flex items-center justify-between bg-gray-200 rounded px-6 py-4 my-4;

  &:hover {
    @apply bg-gray-300;
  }
}

</style>
