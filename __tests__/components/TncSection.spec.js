
import { shallowMount } from '@vue/test-utils'

import TncSection from "@/components/TncSection";


const factory = () => {
  return shallowMount(TncSection, {

    propsData: {
      data :{
        TncTop:
          [
            {
              LastUpdated:"12 December 2020",
              title:"privacy",
              description:"description"
            },
            {
              LastUpdated:"12 December 2020",
              title:"privacy",
              description:"description"
            },
            {
              LastUpdated:"12 December 2020",
              title:"privacy",
              description:"description"
            }
        ],
        TncBottom:
        [
          {
            LastUpdated:"12 December 2020",
            title:"privacy",
            description:"description"
          },
          {
            LastUpdated:"12 December 2020",
            title:"privacy",
            description:"description"
          },
          {
            LastUpdated:"12 December 2020",
            title:"privacy",
            description:"description"
          }
      ]
      }
    }
  });
};

describe("TncSection", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
