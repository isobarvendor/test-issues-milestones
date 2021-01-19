
import { shallowMount } from '@vue/test-utils'

import CampaignPeriod from "../CampaignPeriod";


const factory = () => {
  return shallowMount(CampaignPeriod, {

    propsData: {
      data :{
        fromDate:'2020-11-01',
        toDate:'2020-11-11'
      }
    }
  });
};

describe("CampaignPeriod", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
