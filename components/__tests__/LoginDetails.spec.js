
import { shallowMount } from '@vue/test-utils'

import LoginDetails from "../LoginDetails";


const factory = () => {
  return shallowMount(LoginDetails, {

    propsData: {
      data :{
       Title : "Login",
       SubTitle: "Login"
      },
      social:{
        line:true,
        facebook:true,
        google:true,
      }
    }
  });
};

describe("LoginDetails", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
