import { mount,  createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import Login from '@/pages/login.vue';

import LoginDetails from '@/components/LoginDetails'


import {mockCMSConfig,mockCMSContent} from "@/__mock__/mock";



const $route = {
  name: "login"
}

let localVue, store;


  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({
      getters: {
        getCMSContent() {
          return mockCMSContent;
        },
        getLoginAccount(){
          return {
            name:"ron",
            email:"ron@dsw.com",
            imageUrl:"tes"
          }
        },
        getCMSConfig(){
          return mockCMSConfig[0];
        }
      },
      state:{
        token:"",
        language: "en",
        listWallet:{
          walletStatus:[
            {amount :30}
          ]
        },

      }
    });
  });

  const factory = (route) => {
    return mount(Login, {
      mocks: {
        $route : route
      },
      localVue, store,
    });
  };



describe('login', () => {


  test('renders a LoginDetails', () => {
    const wrapper = factory($route);
    const component= wrapper.findComponent(LoginDetails);
    expect(component.exists()).toBeTruthy();
  });


  test("mounts properly", () => {
    const wrapper = factory($route);
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory($route);
    expect(wrapper.html()).toMatchSnapshot();
  });

});
