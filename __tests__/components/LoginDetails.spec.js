
import { shallowMount } from '@vue/test-utils'

import LoginDetails from "@/components/LoginDetails";

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
const factory = ($mq) => {
  return shallowMount(LoginDetails, {
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
    }
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

  /*test("user login", async() => {
    const wrapper = factory();
    await wrapper.find('[name="email"]');
    await wrapper.find('[name="password"]');
    window.location.assign= jest.fn() // Create a spy
    await wrapper.find('.login').trigger('click');
    expect(window.location.assign).toHaveBeenCalledWith("/");
  });*/

  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });


  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
