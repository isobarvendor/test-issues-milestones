import { mount,  createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router'

import winners from '@/pages/winners';

import WinnerDetails from '@/components/WinnerDetails'


import {mockCMSConfig,mockCMSContent,mockListWinners} from "@/__mock__/mock";


import actions from '@/store/actions';
import mutations from '@/store/mutations';


let localVue, store,router;


  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(VueRouter);
    router = new VueRouter();
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
        },
        getListWinners(){
          return mockListWinners;
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

      },
      actions,
      mutations
    });
  });

  const factory = () => {
    return mount(winners, {

      localVue, store,router
    });
  };



describe('winners', () => {


  test('renders a WinnerDetails', () => {
    const wrapper = factory();
    const component= wrapper.findComponent(WinnerDetails);
    expect(component.exists()).toBeTruthy();
  });


  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

});
