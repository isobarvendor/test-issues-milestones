
import { mount } from '@vue/test-utils'

import MastheadVideo from "@/components/MastheadVideo";


const factory = () => {
  return mount(MastheadVideo, {

    propsData: {
      data :{
              mobileImage:[{url:"mobile image"}],
              desktopImage:[{url:"desktop image"}],
              tabletImage:[{url:"tablet image"}],
            }
    }
  });
};

describe("MastheadVideo", () => {





  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
