
import { shallowMount } from '@vue/test-utils'

import Masthead from "@/components/Masthead";


const factory = () => {
  return shallowMount(Masthead, {

    propsData: {
      data :{
              mobileImage:[{url:"mobile image"}],
              desktopImage:[{url:"desktop image"}],
              tabletImage:[{url:"tablet image"}],
            }
    }
  });
};

describe("Masthead", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
