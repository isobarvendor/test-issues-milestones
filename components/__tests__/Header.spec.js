
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify';
import Header from "../Header";
import Vuex from 'vuex';

const $route = {
  name: "register"
}

let localVue, store;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    let vuetify = new Vuetify()
    store = new Vuex.Store({
      getters: {
        getCMSContent() {
          return [
            {Theme : {
              Theme : "Coke"
            }
          }
          ];
        },
        getLoginAccount(){
          return null;
        }
      },
      state:{
        language: "id",
        listWallet:"null"
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
