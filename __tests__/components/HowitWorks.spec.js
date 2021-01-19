
import { shallowMount } from '@vue/test-utils'

import HowitWorks from "@/components/HowitWorks";


const factory = () => {
  return shallowMount(HowitWorks, {

    propsData: {
      data :{
        slides:
          [
            {
              mobileImage:[{url:"mobile image"}],
              desktopImage:[{url:"desktop image"}],
              description:"tes"
            }
        ]
      }
    }
  });
};

describe("HowitWorks", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
