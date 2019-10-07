export default {
  methods: {
    sortFragments(fragments = []) {
      return [...fragments].sort((a, b) => {
        const startTime = a.start - b.start;

        // Fragments share a start time, so check end times
        if (startTime === 0) {
          return (a.end - b.end);
        }

        // Sort in ASC based on start time
        return startTime;
      });
    },
    generateSlices(fragments = []) {
      if (fragments.length <= 1) {
        return fragments;
      }

      // `Slice`: unique aggregate slice of time
      const slices = [];
      let slice = {};

      // Process each pre-ordered fragment
      for (let i = 0; i < fragments.length; i++) { // eslint-disable-line
        const fragment = fragments[i];

        // Check to see if processing a current "slice"
        if (slice.hasOwnProperty('start')) { // eslint-disable-line
          // If the fragment begins after the current slice, commit current slice
          if (fragment.start >= slice.end) {
            // add to list of unique slices
            slices.push(slice);

            // clear slice
            slice = {};
          } else if (fragment.end > slice.end) {
            slice.end = fragment.end;
          }
        }

        // start a new slice if empty
        if (!slice.hasOwnProperty('start')) { // eslint-disable-line
          slice.start = fragment.start;
          slice.end = fragment.end;
        }
      }

      // add final slice
      slices.push(slice);

      return slices;
    },
    calcUvt(slices = [{}]) {
      return slices.reduce((total, slice) => total + (slice.end - slice.start), 0);
    },
    uvtFromFragments(fragments = []) {
      const sorted = this.sortFragments(fragments);
      const slices = this.generateSlices(sorted);
      return this.calcUvt(slices);
    },
  },
};
