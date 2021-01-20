
import { createLocalVue, shallowMount } from '@vue/test-utils'
import SubmissionMechanics from "@/components/SubmissionMechanics";
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
  return shallowMount(SubmissionMechanics, {
    localVue, store,
    propsData: {
        dataForm:{
          SocialMedia:{
            Line:true,
            Google:true,
            Facebook:true,
            Email:true
          },
          campaignTypes:{
            authentication :true
          }
        }
      }
  });
};

describe("SubmissionMechanics", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
