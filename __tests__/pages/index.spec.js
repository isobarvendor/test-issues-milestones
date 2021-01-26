import { mount,  createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import Index from '@/pages/index.vue';
import CampaignPeriod from '@/components/CampaignPeriod'
import Prizes from '@/components/Prizes'
import HowItWorks from '@/components/HowItWorks'
import SubmissionMechanics from '@/components/SubmissionMechanics'
import Footer from '@/components/Footer'
import Masthead from '@/components/Masthead'

import {mockCMSConfig,mockCMSContent} from "@/__mock__/mock";

import actions from '@/store/actions';
import mutations from '@/store/mutations';


const $route = {
  name: "index"
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
        token:"32432432",
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

  const factory = (route) => {
    return mount(Index, {
      mocks: {
        $route : route
      },
      localVue, store,
    });
  };



describe('index', () => {

  test('renders a Masthead', () => {
    const wrapper = factory($route);
    const component= wrapper.findComponent(Masthead);
    expect(component.exists()).toBeTruthy();
  });
  test('renders a CampaignPeriod', () => {
    const wrapper = factory($route);
    const campaignPeriod = wrapper.findComponent(CampaignPeriod);
    expect(campaignPeriod.exists()).toBeTruthy();
  });
  test('renders a Prizes', () => {
    const wrapper = factory($route);
    const prizes = wrapper.findComponent(Prizes);
    expect(prizes.exists()).toBeTruthy();
  });

  test('renders a HowItWorks', () => {
    const wrapper = factory($route);
    const component= wrapper.findComponent(HowItWorks);
    expect(component.exists()).toBeTruthy();
  });

  test('renders a SubmissionMechanics', () => {
    const wrapper = factory($route);
    const component= wrapper.findComponent(SubmissionMechanics);
    expect(component.exists()).toBeTruthy();
  });

  test('renders a Footer', () => {
    const wrapper = factory($route);
    const component= wrapper.findComponent(Footer);
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
