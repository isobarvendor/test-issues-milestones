
import { shallowMount } from '@vue/test-utils'

import WalletTransactions from "@/components/WalletTransactions";


const factory = () => {
  return shallowMount(WalletTransactions, {

    propsData: {
      data :{
        transactions:[{
          walletRollingTotal:10
        }]
      }
    }
  });
};

describe("WalletTransactions", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
