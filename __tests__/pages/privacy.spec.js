import { mount,  createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router'

import privacy from '@/pages/privacy.vue';

import PrivacySection from '@/components/PrivacySection'


import {mockCMSConfig,mockCMSContent} from "@/__mock__/mock";





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

  const factory = () => {
    return mount(privacy, {

      localVue, store,router
    });
  };



describe('privacy', () => {


  test('renders a PrivacySection', () => {
    const wrapper = factory();
    const component= wrapper.findComponent(PrivacySection);
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
