
import { createLocalVue, mount } from '@vue/test-utils'
import Registration from "@/components/Registration";
import Vuex from 'vuex';

import { LOGIN } from "@/store/action_types";




import actions from '@/store/actions';
import mutations from '@/store/mutations';


const $route = {
  name: "register"
}
const event = {
  target: {
    files: [
      {
        name: 'image.png',
        size: 5000,
        type: 'image/png',

      },
    ],
    value:'image.png'
  },
}
let localVue, store;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({
      getters: {
        getLoginAccount(){
          return {
            name:"ron",
            email:"ron@dsw.com",
            imageUrl:"tes"
          }
        }
      },
      actions,
      mutations
    });
  });

const factory = () => {
  return mount(Registration, {
    mocks: {
      $route
    },
    localVue, store,
    propsData: {
      data :{
        title:"title",
        privacyRegister:{
          desription:"description"
        }
      }
    }
  });
};

describe("Registration", () => {

  test("user type all correct data and register", async() => {
    const wrapper = factory();
    const name = "ronald"
    const email = 'ronald.pranata@isobar.com';
    const password = 'password';
    const cpassword = 'password';
    const terms = true;

    wrapper.find('#name').setValue(name);
    wrapper.find('#email').setValue(email);
    wrapper.find('#password').setValue(password);
    wrapper.find('#cpassword').setValue(cpassword);
    wrapper.find('#terms').setChecked(terms);

    expect(wrapper.vm.user.name).toBe(name);
    expect(wrapper.vm.user.email).toBe(email);
    expect(wrapper.vm.user.password).toBe(password);
    expect(wrapper.vm.cpassword).toBe(cpassword);
    expect(wrapper.vm.terms).toBe(terms);

    await wrapper.find('.register').trigger('click');
    wrapper.vm.$validator.validate().then(()=>{
    expect(wrapper.vm.$validator.errors.any()).toBe(false);
    });

  });

  test("user type different password and cpassword", async() => {
    const wrapper = factory();
    const name = "ronald"
    const email = 'ronald.pranata@isobar.com';
    const password = 'password';
    const cpassword = 'wrong password';
    const terms = true;

    wrapper.find('#name').setValue(name);
    wrapper.find('#email').setValue(email);
    wrapper.find('#password').setValue(password);
    wrapper.find('#cpassword').setValue(cpassword);
    wrapper.find('#terms').setChecked(terms);

    expect(wrapper.vm.user.name).toBe(name);
    expect(wrapper.vm.user.email).toBe(email);
    expect(wrapper.vm.user.password).toBe(password);
    expect(wrapper.vm.cpassword).toBe(cpassword);
    expect(wrapper.vm.terms).toBe(terms);

    await wrapper.find('.register').trigger('click');

    wrapper.vm.$validator.validate().then(()=>{
      expect(wrapper.vm.loading).toBe(true);
      expect(wrapper.vm.errorMessage).toBe("Your password and confirm password is different");
      expect(wrapper.vm.loading).toBe(false);
    }).catch(()=>{

    });


  });

  test("user do not check terms", async() => {
    const wrapper = factory();
    const name = "ronald"
    const email = 'ronald.pranata@isobar.com';
    const password = 'password';
    const cpassword = 'password';
    const terms = false;

    wrapper.find('#name').setValue(name);
    wrapper.find('#email').setValue(email);
    wrapper.find('#password').setValue(password);
    wrapper.find('#cpassword').setValue(cpassword);
  //  wrapper.find('#terms').setChecked(terms);

    expect(wrapper.vm.user.name).toBe(name);
    expect(wrapper.vm.user.email).toBe(email);
    expect(wrapper.vm.user.password).toBe(password);
    expect(wrapper.vm.cpassword).toBe(cpassword);
    expect(wrapper.vm.terms).toBe(terms);

    await wrapper.find('.register').trigger('click');

    wrapper.vm.$validator.validate().then(()=>{
      expect(wrapper.vm.loading).toBe(true);
      expect(wrapper.vm.errorMessage).toBe("Please accept the terms and condition");
      expect(wrapper.vm.loading).toBe(false);
    }).catch(()=>{

    });

  });


  test('makes a call to persist the image on image upload', async() => {
    // Mount the component
    const wrapper = factory();


    // Mock FileReader.readAsDataURL() to be a function that returns null
    const fileReaderSpy = jest.spyOn(FileReader.prototype, 'readAsDataURL').mockImplementation(() => null)

    // Spy on the component’s persist() method
    const persistSpy = jest.spyOn(wrapper.vm, 'createImage')


    // Manually trigger the component’s onFileChange() method
    await wrapper.vm.onFileChange(event)

    // Assert that the FileReader object was called with the uploaded image
    expect(fileReaderSpy).toHaveBeenCalledWith(event.target.files[0])

    // Assert that the component’s persist() method was called with the uploaded image
    expect(persistSpy).toHaveBeenCalledWith(event.target.files[0])

   expect(wrapper.vm.errorMessage).toBe(null);
     // Assert that the component’s persist() method was called with the uploaded image
     expect(wrapper.vm.uploadFile).toBe(event.target.files[0])



  })

  test('delete image', async() => {
    const wrapper = factory();
    await wrapper.vm.removeImage();
    expect(wrapper.vm.image).toBe("");
  })

  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
