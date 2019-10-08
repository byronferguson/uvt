export default {
  methods: {
    sec2ms: seconds => Math.floor(seconds * 1000),
    ms2sec: (ms) => {
      if (Number.isInteger(ms) || Number.parseInt(ms, 10)) {
        return ((+ms) / 1000).toFixed(2);
      }
      throw new Error('Invalid input parameter');
    },
  },
};
