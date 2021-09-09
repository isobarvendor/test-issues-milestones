
import { shallowMount } from '@vue/test-utils'

import AccountDetail from "@/components/AccountDetail";


const $route = {
  name: "register"
}


const factory = () => {
  return shallowMount(AccountDetail, {

    propsData: {
      cmsData:{
        Account:{
          Title :"Account"
        }
      },
      data :{
        name:"Ron",
        email:"Rs",
        imageUrl:"image"
      }
    }
  });
};

describe("AccountDetail", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});