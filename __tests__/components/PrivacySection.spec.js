
import { shallowMount } from '@vue/test-utils'

import PrivacySection from "@/components/PrivacySection";


const factory = () => {
  return shallowMount(PrivacySection, {

    propsData: {
      data :{
        privacyTop:
          [
            {
              LastUpdated:"12 December 2020",
              title:"privacy",
              description:"description"
            }
        ],
        privacyContent:
        [
          {
            title:"privacy",
            description:"description"
          }
      ],
      privacyBottom:
      [
        {
          title:"privacy",
          description:"description"
        },
        {
          title:"privacy",
          description:"description"
        },
        {
          title:"privacy",
          description:"description"
        }
    ]
      }
    }
  });
};

describe("PrivacySection", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
