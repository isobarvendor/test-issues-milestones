
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Registration from "@/components/Registration";
import Vuex from 'vuex';

const $route = {
  name: "register"
}

let localVue, store;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({
      getters: {
        getLoginAccount(){
          return {
            name:"ron",
            email:"ron@dsw.com",
            imageUrl:"tes"
          }
        }
      }
    });
  });

const factory = () => {
  return shallowMount(Registration, {
    mocks: {
      $route
    },
    localVue, store,
    propsData: {
      data :{
        title:"title",
        privacyRegister:{
          desription:"description"
        }
      }
    }
  });
};

describe("Registration", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
