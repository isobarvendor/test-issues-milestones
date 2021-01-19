
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Header from "@/components/Header";
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
        },
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
  return shallowMount(Header, {
    mocks: {
      $route
    },
    localVue, store
  });
};

describe("Header", () => {


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
