import { mount,  createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router'

import rewards from '@/pages/rewards';

import RewardsCatalogue from '@/components/RewardsCatalogue'


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
        getListPrize(){
         return  [{
            name:"Reward1",
            prizeId:"prizeid",
            prizeCost:[{ammount :100}],
          },
          {
            name:"Reward2",
            prizeId:"prizeid",
            prizeCost:[{ammount :100}],
          }
        ]
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
      mutations,
    });
  });

  const factory = () => {
    return mount(rewards, {
      data(){
        return {
          listPrizes:store.getters.getListPrize
        }
      },
      localVue, store,router
    });
  };



describe('rewards', () => {


  test('renders a RewardsCatalogue', () => {
    const wrapper = factory();
    const component= wrapper.findComponent(RewardsCatalogue);
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
