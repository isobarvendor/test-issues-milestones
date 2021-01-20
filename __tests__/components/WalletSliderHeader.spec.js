
import { shallowMount } from '@vue/test-utils'

import WalletSliderHeader from "@/components/WalletSliderHeader";


const factory = () => {
  return shallowMount(WalletSliderHeader);
};

describe("WalletSliderHeader", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
