
import { shallowMount,createLocalVue } from '@vue/test-utils'

import RewardDetails from "@/components/RewardDetails";
import Vuex from 'vuex';


let localVue, store;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({
      state:{
        language: "id",
        listWallet:{
          walletStatus:[
            {amount :30}
          ]
        }
      }
    });
  });

const factory = () => {
  return shallowMount(RewardDetails, {

    propsData: {
      data :{
       name:"Reward1",
       shortDescription:"shortdescription",
       redeeemDescription:"shortdescription",
       prizeId:"prizeid",
       prizeCost:[{ammount :100}],
      }
    },
    localVue, store
  });
};

describe("RewardDetails", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
