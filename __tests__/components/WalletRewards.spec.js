
import { shallowMount } from '@vue/test-utils'

import WalletRewards from "@/components/WalletRewards";


const factory = () => {
  return shallowMount(WalletRewards, {

    propsData: {
      data :{
       Title : "Login",
       SubTitle: "Login"
      },
      cmsData:{
        Wallets:{
          RewardsTitle :"test"
        }
      }
    }
  });
};

describe("WalletRewards", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
