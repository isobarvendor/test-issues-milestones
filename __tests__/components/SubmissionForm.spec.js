
import { shallowMount,createLocalVue } from '@vue/test-utils'

import SubmissionForm from "@/components/SubmissionForm";

import Vuex from 'vuex';

const $route = {
  name: "register"
}

let localVue, store;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({
      getters: {
        getLoginAccount(){
          return {
            name:"ron",
            email:"ron@dsw.com",
            imageUrl:"tes"
          }
        },
        getCMSConfig(){
          return {
            Wallet:{
              Wallet:true
           }
          }
        }
      },
      state:{
        language: "id",
        listWallet:{
          walletStatus:[
            {amount :30}
          ]
        }
      }
    });
  });

const factory = () => {
  return shallowMount(SubmissionForm, {
    localVue, store,
    propsData: {
      cmsData:{
        ThankYouSubmission:{
          Ttitle :"Thanks",
          Message:"Thank you"
        },
        ThankYouPage:{
          Title :"Thanks",
          Message:"Thank you"
        }
      },
      data :{
        submissionFormFields:{
          isNameActive:true,
          isEmailActive:true
        },
        campaignTypes:{
          submissionType:"with_code_submission",
          mechanicType:"lucky_draw",
          Title:"Lucky draw"
        },
      }
    }
  });
};

describe("SubmissionForm", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
