
import {createLocalVue, shallowMount } from '@vue/test-utils'

import Congrats from "../Congrats";
import Vuex from 'vuex';


let localVue, store;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({
      state:{
        redeemPrize:{
          redeemPrize:{
            imgUrl:'image'
          }
        }
      }
    });
  });

const factory = () => {
  return shallowMount(Congrats, {
    localVue, store
  });
};

describe("Congrats", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
