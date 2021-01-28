
import { mount,createLocalVue } from '@vue/test-utils'

import Vuetify from 'vuetify'

import Vuex from 'vuex'

import LoginDetails from "@/components/LoginDetails";

import { LOGIN } from "@/store/action_types";




import actions from '@/store/actions';
import mutations from '@/store/mutations';



Object.defineProperty(window, 'location', {
  writable: true,
  value: { assign: jest.fn() }
});

const redirectTo=(source)=>{
  return "/api/oauth2/authorize/" +
  source +
  "?redirect_uri=" +
  window.location.origin +
  "/settoken";
}

let $mq ="md";
let vuetify;
let localVue, store;


beforeEach(() => {
  vuetify = new Vuetify();
  localVue = createLocalVue()
  localVue.use(Vuex)
  store = new Vuex.Store({
    actions,
    mutations
  })
})


const factory = ($mq) => {
  return mount(LoginDetails, {
    mocks: {
      $mq:$mq
    },
    propsData: {
      data :{
       Title : "Login",
       SubTitle: "Login"
      },
      social:{
        line:true,
        facebook:true,
        google:true,
      }
    },
    vuetify, localVue,store
  });
};

describe("LoginDetails", () => {


  test('should redirect anonymous users to login using facebook mq=md', () => {
    $mq ="md";
    const wrapper = factory($mq);
    window.location.assign= jest.fn() // Create a spy
    wrapper.find('.fb').trigger('click');
    expect(window.location.assign).toHaveBeenCalledWith(redirectTo('facebook'));
  })


  test('should redirect anonymous users to login using line mq=md', () => {
    $mq ="md";
    const wrapper = factory($mq);
    window.location.assign= jest.fn() // Create a spy
    wrapper.find('.line').trigger('click');
    expect(window.location.assign).toHaveBeenCalledWith(redirectTo('line'));
  })

  test('should redirect anonymous users to login using google mq=md', () => {
    $mq ="md";
    const wrapper = factory($mq);
    window.location.assign= jest.fn() // Create a spy
    wrapper.find('.google').trigger('click');
    expect(window.location.assign).toHaveBeenCalledWith(redirectTo('google'));
  })


  test('should redirect anonymous users to login using facebook mq=sm', () => {
    $mq ="sm";
    const wrapper = factory($mq);
    window.location.assign= jest.fn() // Create a spy
    wrapper.find('.fb').trigger('click');
    expect(window.location.assign).toHaveBeenCalledWith(redirectTo('facebook'));
  })


  test('should redirect anonymous users to login using line mq=sm', () => {
    $mq ="sm";
    const wrapper = factory($mq);
    window.location.assign= jest.fn() // Create a spy
    wrapper.find('.line').trigger('click');
    expect(window.location.assign).toHaveBeenCalledWith(redirectTo('line'));
  })

  test('should redirect anonymous users to login using google mq=sm', () => {
    $mq ="sm";
    const wrapper = factory($mq);
    window.location.assign= jest.fn() // Create a spy
    wrapper.find('.google').trigger('click');
    expect(window.location.assign).toHaveBeenCalledWith(redirectTo('google'));
  })


  test('should redirect anonymous users to login using facebook mq=xl', () => {
    $mq ="xl";
    const wrapper = factory($mq);
    window.location.assign= jest.fn() // Create a spy
    wrapper.find('.fb').trigger('click');
    expect(window.location.assign).toHaveBeenCalledWith(redirectTo('facebook'));
  })


  test('should redirect anonymous users to login using line mq=xl', () => {
    $mq ="xl";
    const wrapper = factory($mq);
    window.location.assign= jest.fn() // Create a spy
    wrapper.find('.line').trigger('click');
    expect(window.location.assign).toHaveBeenCalledWith(redirectTo('line'));
  })

  test('should redirect anonymous users to login using google mq=xl', () => {
    $mq ="xl";
    const wrapper = factory($mq);
    window.location.assign= jest.fn() // Create a spy
    wrapper.find('.google').trigger('click');
    expect(window.location.assign).toHaveBeenCalledWith(redirectTo('google'));
  })
  test('should redirect anonymous users to register page', async() => {
    $mq ="xl";
    const wrapper = factory($mq);
    window.location.assign= jest.fn() // Create a spy
    await wrapper.find('.signUp').trigger('click');
    expect(window.location.assign).toHaveBeenCalledWith("/register");
  })

  test("user type login and click login", async() => {
    const wrapper = factory();
    const email = 'ronald.pranata@isobar.com';
    const password = 'password';
    const commit = jest.fn()
    const dispatch = jest.fn()

    wrapper.find('#email').setValue(email);
    wrapper.find('#password').setValue(password);

    expect(wrapper.vm.login.email).toBe(email);
    expect(wrapper.vm.login.password).toBe(password);

    await wrapper.find('.login').trigger('click');
    wrapper.vm.$validator.validate();
    expect(wrapper.vm.$validator.errors.any()).toBe(false);


   // const result = actions[LOGIN]({ commit, dispatch });

    //expect(dispatch).toHaveBeenCalled();


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
