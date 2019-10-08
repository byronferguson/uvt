// import { shallowMount } from '@vue/test-utils';
import timeConversions from '@/mixins/timeConversions';

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message';
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg },
//     });
//     expect(wrapper.text()).toMatch(msg);
//   });
// });

describe('timeConversions.js', () => {
  describe('sec2ms()', () => {
    const sec = 5;
    const ms = sec * 1000;

    it('converts number from sec->ms', () => {
      expect(timeConversions.methods.sec2ms(sec)).toEqual(ms);
    });

    it('converts numeric string from sec->ms', () => {
      expect(timeConversions.methods.sec2ms(`${sec}`)).toEqual(ms);
    });
  });

  describe('ms2sec()', () => {
    const ms = 5000;
    const result = '5.00';

    it('converts number from ms->sec', () => {
      expect(timeConversions.methods.ms2sec(ms)).toEqual(result);
    });

    it('converts numeric string from ms->sec', () => {
      expect(timeConversions.methods.ms2sec(`${ms}`)).toEqual(result);
    });
  });
});
