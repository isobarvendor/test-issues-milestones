

import { createLocalVue, shallowMount } from '@vue/test-utils'

import CampaignPeriod from "@/components/CampaignPeriod";
import {translation} from "@/constants/index"

import Vuex from 'vuex';


let localVue, store;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({
      getters: {
        getCMSContent() {
          return [
            {Theme : {
              Theme : "Coke"
            },
            SectionMenu:{
              Menu:[
                {
                  Link:"Home"
                },
                {
                  Link:"Wallet"
                },
                {
                  Link:"Wallet"
                },
                {
                  Link:"Wallet"
                },
                {
                  Link:"Wallet"
                },
                {
                  Link:"Wallet"
                },
                {
                  Link:"Wallet"
                },
                {
                  Link:"Wallet"
                }
              ],
              Image:[
                {url :'image'}
              ],
              Description:"test description"

            }
          }
      ];
        }
      },
      state:{
        login:{
          name:"Ronald"
        }
      }
    });
  });

const factory = () => {
  return shallowMount(CampaignPeriod, {
    data() {
      return {
        periodDescription:translation.periodDescription
      };
    },
    localVue, store,
    propsData: {
      data :{
        fromDate:'2020-11-01',
        toDate:'2020-11-11',
        Title:"Campaign Period"
      },
      howData:{
        title:"test",
        slides:
        [
            {
              mobileImage:[{url:"mobile image"}],
              desktopImage:[{url:"desktop image"}],
              description:"tes"
            }
        ],
        description:"tes"
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
