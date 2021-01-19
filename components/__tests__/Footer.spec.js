
import {shallowMount  } from '@vue/test-utils'

import Footer from "../Footer";


const factory = () => {
  return shallowMount(Footer, {

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
