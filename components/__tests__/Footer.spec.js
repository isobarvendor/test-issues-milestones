
import { mount } from '@vue/test-utils'

import Footer from "../Footer";


const factory = () => {
  return mount(Footer, {

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
