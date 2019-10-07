export default {
  methods: {
    sec2ms: seconds => Math.floor(seconds * 1000),
    ms2sec: ms => (ms / 1000).toFixed(2),
  },
};
