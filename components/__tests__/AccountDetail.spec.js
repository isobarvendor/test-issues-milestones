
import { mount } from '@vue/test-utils'

import AccountDetail from "../AccountDetail";


const $route = {
  name: "register"
}


const factory = () => {
  return mount(AccountDetail, {

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
