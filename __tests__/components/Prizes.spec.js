
import { shallowMount } from '@vue/test-utils'

import Prizes from "@/components/Prizes";


const factory = () => {
  return shallowMount(Prizes, {
    propsData: {
      data:{
        exclusizePrizesSection:[
          {
            image:[
              {url: "imageurl"}
            ],
            title:"Exclusive Prize"
          }
        ],
        title:"title",
        description:"description"
      },
      winners:{
        luckyWinnerSection:[{
          lucky:"tes"
        }],
        title:"title",
        ButtonTitle:"Button"
      },
    },
  });
};

describe("Prizes", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
