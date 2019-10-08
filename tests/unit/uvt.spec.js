// import { shallowMount } from '@vue/test-utils';
import uvt from '@/mixins/uvt';

describe('uvt.js', () => {
  const fragments = [
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
  ];

  const sorted = [
    {
      start: 0,
      end: 500,
    },
    {
      start: 0,
      end: 1000,
    },
    {
      start: 500,
      end: 5000,
    },
    {
      start: 2000,
      end: 3000,
    },
    {
      start: 2000,
      end: 4000,
    },
    {
      start: 9000,
      end: 12000,
    },
  ];

  const slices = [
    {
      start: 0,
      end: 5000,
    },
    {
      start: 9000,
      end: 12000,
    },
  ];

  const elapsedUvt = 8000;

  describe('sortFragments()', () => {
    it('valid input (2+ fragments) returns sorted list', () => {
      expect(uvt.methods.sortFragments(fragments)).toEqual(sorted);
    });

    // Add additional safety cases to develop against
  });

  describe('generateSlices()', () => {
    it('valid input returns list of "slices"', () => {
      expect(uvt.methods.generateSlices(sorted)).toEqual(slices);
    });

    // Add additional safety cases to develop against
  });

  describe('calcUvt()', () => {
    it('valid input returns overall UVT (ms)', () => {
      expect(uvt.methods.calcUvt(slices)).toEqual(elapsedUvt);
    });

    // Add additional safety cases to develop against
  });

  describe('uvtFromFragments()', () => {
    it('valid input returns overall UVT (ms)', () => {
      expect(uvt.methods.uvtFromFragments(fragments)).toEqual(elapsedUvt);
    });

    // Add additional safety cases to develop against
  });
});
