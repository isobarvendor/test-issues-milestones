
import { shallowMount, createLocalVue } from '@vue/test-utils'

import SubmissionLogin from "@/components/SubmissionLogin";

import Vuex from 'vuex';


let localVue, store;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({
      state:{
        errorLogin: "tes"
      }
    });
  });

const factory = () => {
  return shallowMount(SubmissionLogin, {
    localVue, store,
    propsData: {
      social:{
        line:true,
        facebook:true,
        google:true,
      }
    }
  });
};

describe("SubmissionLogin", () => {

  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
