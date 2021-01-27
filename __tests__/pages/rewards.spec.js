import { mount,  createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router'

import VueMeta from 'vue-meta'
import rewards from '@/pages/rewards';

import RewardsCatalogue from '@/components/RewardsCatalogue'


import {mockCMSConfig,mockCMSContent} from "@/__mock__/mock";


import actions from '@/store/actions';
import mutations from '@/store/mutations';
import { GET_LIST_PRIZE } from '@/store/action_types';

actions[GET_LIST_PRIZE]=jest.fn();
let localVue, store,router;


  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(VueMeta, { keyName: 'head' })
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

  test("dispatch get list prize", async () => {

    const wrapper = factory();

    expect(actions[GET_LIST_PRIZE]).toHaveBeenCalled()

  })

  test("data computed value", () => {
    const wrapper = factory();
    expect(wrapper.vm.data).toBe(store.getters.getCMSContent);
  });

  test("config computed value", () => {
    const wrapper = factory();
    expect(wrapper.vm.configData).toBe(store.getters.getCMSConfig);
  });

  test("listPrizesData computed value", () => {
    const wrapper = factory();
    expect(wrapper.vm.listPrizesData).toBe(store.getters.getListPrize);
  });

  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();

  });


  test('has correct <head> content', () => {
    // test title
    const wrapper = factory();
    expect(wrapper.vm.$metaInfo.title).toBe('Coke Campaign Title')

    // test meta entry
    const descriptionMeta = wrapper.vm.$metaInfo.meta.find(
      (item) => item.hid === 'description'
    )
    expect(descriptionMeta.name).toBe('description')
    expect(descriptionMeta.content).toBe('Home page description')
  })

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

});
