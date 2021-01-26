import { mount,  createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router'

import wallet from '@/pages/wallet';

import WalletRewards from '@/components/WalletRewards'
import WalletTransactions from '@/components/WalletTransactions'


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
    return mount(wallet, {

      localVue, store,router
    });
  };



describe('wallet', () => {


  test('renders a WalletRewards', () => {
    const wrapper = factory();
    const component= wrapper.findComponent(WalletRewards);
    expect(component.exists()).toBeTruthy();
  });
  test('renders a WalletTransactions', () => {
    const wrapper = factory();
    const component= wrapper.findComponent(WalletTransactions);
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
