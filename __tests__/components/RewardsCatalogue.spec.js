
import { shallowMount,createLocalVue } from '@vue/test-utils'

import RewardsCatalogue from "@/components/RewardsCatalogue";
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
  return shallowMount(RewardsCatalogue, {

    propsData: {
      data :{
        prizeList:[{
          name:"Reward1",
          prizeId:"prizeid",
          prizeCost:[{ammount :100}],
        },
        {
          name:"Reward2",
          prizeId:"prizeid",
          prizeCost:[{ammount :100}],
        }
      ]

      }
    },
    localVue, store
  });
};

describe("RewardsCatalogue", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
