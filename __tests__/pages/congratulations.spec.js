import { mount,  createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router'

import congratulations from '@/pages/congratulations';

import Congrats from '@/components/Congrats'


import {mockCMSConfig,mockCMSContent} from "@/__mock__/mock";


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

      },
      state:{
        redeemPrize:{
          redeemPrize:{
            imgUrl:'image'
          }
        }
      },
      actions,
      mutations
    });
  });

  const factory = () => {
    return mount(congratulations, {

      localVue, store,router
    });
  };



describe('congratulations', () => {


  test('renders a Congrats', () => {
    const wrapper = factory();
    const component= wrapper.findComponent(Congrats);
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
