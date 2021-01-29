
import { shallowMount,createLocalVue } from '@vue/test-utils'

import RewardsCatalogue from "@/components/RewardsCatalogue";
import Vuex from 'vuex';
import mutations from '@/store/mutations';
import {REDEEM_PRIZE} from '@/store/action_types';


Object.defineProperty(window, 'location', {
  writable: true,
  value: { assign: jest.fn() }
});

let localVue, store,actions;
let $mq ="xl";

actions = {
  [REDEEM_PRIZE]: jest.fn()
}



  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({
      state:{
        language: "id",
        listWallet:{
          walletStatus:[
            {amount :130}
          ]
        }
      },
      actions,
      mutations

    });
  });

const factory = () => {
  return shallowMount(RewardsCatalogue, {

    propsData: {
      data :{
        prizeList:[{
          name:"Reward1",
          prizeId:"prizeid",
          prizeCost:[{amount :10}],
        }
      ]

      }
    },

    localVue, store
  });
};

describe("RewardsCatalogue", () => {

  test("test can redeem function", async() => {

    const wrapper = factory();
    wrapper.vm.canRedeem(wrapper.vm.data.prizeList[0].prizeCost);
    expect(wrapper.text().includes('Redeem now')).toBe(true);

  });

  test("test redeem function", async() => {
    window.location.assign= jest.fn() // Create a spy

    const wrapper = factory();
    wrapper.find('.rewards-right').trigger('click');
    expect(store.state.redeemPrize).toBe(null);
    expect(actions[REDEEM_PRIZE]).toHaveBeenCalled();

    //expect(window.location.assign).toHaveBeenCalledWith("/congratulations");


  });


  test("test go detail", async() => {
    window.location.assign= jest.fn() // Create a spy

    const wrapper = factory();
    wrapper.vm.goDetail(0);

    expect(window.location.assign).toHaveBeenCalledWith("rewardsDetail/0");


  });

  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
