
import { shallowMount } from '@vue/test-utils'

import CoinDetail from "@/components/CoinDetail";


const factory = () => {
  return shallowMount(CoinDetail);
};

describe("CoinDetail", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
