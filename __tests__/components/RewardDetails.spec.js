
import { mount,createLocalVue } from '@vue/test-utils'

import RewardDetails from "@/components/RewardDetails";


import mutations from '@/store/mutations';



import Vuex from 'vuex';

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

  const mockRouter = {
    replace: jest.fn()
  }

const factory = () => {
  return mount(RewardDetails, {
    mocks: {
      $mq:$mq,
      $router: mockRouter
    },
    propsData: {
      data :{
       name:"Reward1",
       shortDescription:"shortdescription",
       redeeemDescription:"shortdescription",
       prizeId:"prizeid",
       prizeCost:[{amount :10}],
      }
    },
    localVue, store
  });
};

describe("RewardDetails", () => {

  test("test all computed value", () => {
    const wrapper = factory();
    expect(wrapper.vm.listWallet).toBe(store.state.listWallet);
  });

  test("test back button", async() => {

    const wrapper = factory();
    wrapper.find('.back-icon').find('img').trigger('click');
    await expect(mockRouter.replace).toHaveBeenCalledWith('/rewards');

  });

  test("test can redeem function", async() => {

    const wrapper = factory();
    wrapper.vm.canRedeem(wrapper.vm.data.prizeCost);
    expect(wrapper.text().includes('coins')).toBe(true);

  });

  test("test redeem function", async() => {
    window.location.assign= jest.fn() // Create a spy

    const wrapper = factory();
    wrapper.find('.button').trigger('click');
    expect(store.state.redeemPrize).toBe(null);
    expect(actions[REDEEM_PRIZE]).toHaveBeenCalled();

   // expect(window.location.assign).toHaveBeenCalledWith("/congratulations");


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
