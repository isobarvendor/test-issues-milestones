
import {shallowMount  } from '@vue/test-utils'

import Footer from "@/components/Footer";
import {translation} from "@/constants/index"

const factory = () => {
  return shallowMount(Footer, {
    data() {
      return {
        footer:translation.footer
      };
    },
    propsData: {
      data :{
       copyright:{
         copyright:"tes"
       }
      }
    }
  });
};

describe("Footer", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
