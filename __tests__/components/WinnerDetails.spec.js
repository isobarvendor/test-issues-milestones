
import { shallowMount } from '@vue/test-utils'

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
      winners:[{
        week:0,
        name:"Ron",
        email:"ron@sdadsa.com",
        fromDate:"2020-12-01",
        toDate:"2020-12-15"
      },
      {
        week:1,
        name:"Ron",
        email:"ron@sdadsa.com",
        fromDate:"2020-12-01",
        toDate:"2020-12-15"
      },
      {
        week:2,
        name:"Ron",
        email:"ron@sdadsa.com",
        fromDate:"2020-12-01",
        toDate:"2020-12-15"
      },


    ],
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
