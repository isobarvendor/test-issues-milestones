
import { shallowMount } from '@vue/test-utils'
import {mockListWinners} from "@/__mock__/mock";
import WinnerDetails from "@/components/WinnerDetails";


const factory = () => {
  return shallowMount(WinnerDetails, {
    propsData: {
      data:{
        exclusizeWinnerDetailsSection:[
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
      winners:mockListWinners
    },
  });
};

describe("WinnerDetails", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
