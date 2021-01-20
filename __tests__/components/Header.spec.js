
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
           },
           campaignTypes:{
            authentication:"register"
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


const factory = (route,store) => {
  return shallowMount(Header, {
    mocks: {
      $route : route
    },
    localVue, store,
  });
};

describe("Header", () => {

  test("hide profile button when route is register", () => {
    const $route = {
      name: "register"
    }
    const wrapper = factory($route,store);
    expect(wrapper.vm.showProfile).toBe(false);
  });

  test("hide profile button when route is login", () => {
    const $route = {
      name: "login"
    }
    const wrapper = factory($route,store);
    expect(wrapper.vm.showProfile).toBe(false);
  });

  test("show profile button", () => {
    const $route = {
      name: "home"
    }
    const wrapper = factory($route,store);
    expect(wrapper.vm.showProfile).toBe(true);
  });

  test("hide menu when route is register", () => {
    const $route = {
      name: "register"
    }
    const wrapper = factory($route,store);
    expect(wrapper.vm.showMenu).toBe(false);
  });

  test("hide menu when route is login", () => {
    const $route = {
      name: "login"
    }
    const wrapper = factory($route,store);
    expect(wrapper.vm.showMenu).toBe(false);
  });

  test("hide menu when route is rewardDetail", () => {
    const $route = {
      name: "rewardDetail"
    }
    const wrapper = factory($route,store);
    expect(wrapper.vm.showMenu).toBe(false);
  });

  test("show menu", () => {
    const $route = {
      name: "home"
    }
    const wrapper = factory($route,store);
    expect(wrapper.vm.showMenu).toBe(true);
  });

  test("have logged data", () => {

    const wrapper = factory($route,store);
    expect(wrapper.vm.logged).toBe(store.getters.getLoginAccount);
  });

  test("have CMSContent data", () => {

    const wrapper = factory($route,store);
    expect(wrapper.vm.CMSContent).toBe(store.getters.getCMSContent);
  });

  test("have content class", () => {

    const wrapper = factory($route,store);
    expect(wrapper.vm.contentClass).toBe("coke");
  });

  test("menu click and show menu", () => {
    const $route = {
      name: "home"
    }
    const wrapper = factory($route,store);
    wrapper.find('a.nav-button').trigger('click');


    expect(wrapper.vm.expand).toBe(true);
  });








  test("mounts properly", () => {
    const wrapper = factory($route,store);
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory($route,store);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
