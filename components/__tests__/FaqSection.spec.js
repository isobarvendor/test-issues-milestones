
import { shallowMount } from '@vue/test-utils'

import FaqSection from "../FaqSection";


const factory = () => {
  return shallowMount(FaqSection, {

    propsData: {
      data :{
        helpQuestion:
          [
            {
              questions:"questions",
              answer:"answer"
            },
            {
              questions:"questions",
              answer:"answer"
            },
            {
              questions:"questions",
              answer:"answer"
            }
        ]
      }
    }
  });
};

describe("FaqSection", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
