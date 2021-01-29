
import { shallowMount,createLocalVue } from '@vue/test-utils'

import {mockCMSConfig,mockCMSContent} from "@/__mock__/mock";

import SubmissionForm from "@/components/SubmissionForm";

import actions from '@/store/actions';
import mutations from '@/store/mutations';


import Vuex from 'vuex';

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
        language: "id",
        listWallet:{
          walletStatus:[
            {amount :30}
          ]
        }
      },
      actions,
      mutations
    });
  });

const factory = () => {
  return shallowMount(SubmissionForm, {
    localVue, store,
    propsData: {
      cmsData:store.getters.getCMSContent[0],
      data :store.getters.getCMSConfig
    }
  });
};

describe("SubmissionForm", () => {

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
     expect(wrapper.vm.form.uploadFile).toBe(event.target.files[0])



  })

  test("user type all correct data and submit", async() => {
    const wrapper = factory();
    const name = "ronald"
    const email = 'ronald.pranata@isobar.com';
    const code = "XXXXXX"
    const privacy = true;

    const terms = true;

    wrapper.find('#name').setValue(name);
    wrapper.find('#email').setValue(email);
    wrapper.find('#code').setValue(code);

    wrapper.find('#form_tnc').setChecked(terms);
    wrapper.find('#form_pp').setChecked(privacy);

    expect(wrapper.vm.form.name).toBe(name);
    expect(wrapper.vm.form.email).toBe(email);
    expect(wrapper.vm.form.code).toBe(code);

    expect(wrapper.vm.form.terms).toBe(terms);
    expect(wrapper.vm.form.privacy).toBe(privacy);

    await wrapper.find('.get-code').trigger('click');
    await wrapper.vm.submit();
    expect(wrapper.vm.$validator.errors.any()).toBe(false);


  });

  test("user type no name data and submit", async() => {
    const wrapper = factory();
    const name = ""
    const email = 'ronald.pranata@isobar.com';
    const code = "XXXXXX"
    const privacy = true;

    const terms = true;

    wrapper.find('#name').setValue(name);
    wrapper.find('#email').setValue(email);
    wrapper.find('#code').setValue(code);

    wrapper.find('#form_tnc').setChecked(terms);
    wrapper.find('#form_pp').setChecked(privacy);

    expect(wrapper.vm.form.name).toBe(name);
    expect(wrapper.vm.form.email).toBe(email);
    expect(wrapper.vm.form.code).toBe(code);

    expect(wrapper.vm.form.terms).toBe(terms);
    expect(wrapper.vm.form.privacy).toBe(privacy);

    await wrapper.find('.get-code').trigger('click');
    await wrapper.vm.submit();
    expect(wrapper.vm.loading).toBe(true);
    expect(wrapper.vm.$validator.errors.any()).toBe(true);
  });

  test("user not check terms", async() => {
    const wrapper = factory();
    const name = "ronald"
    const email = 'ronald.pranata@isobar.com';
    const code = "XXXXXX"
    const privacy = true;

    const terms = true;

    wrapper.find('#name').setValue(name);
    wrapper.find('#email').setValue(email);
    wrapper.find('#code').setValue(code);


    wrapper.find('#form_tnc').setChecked(terms);

    expect(wrapper.vm.form.name).toBe(name);
    expect(wrapper.vm.form.email).toBe(email);
    expect(wrapper.vm.form.code).toBe(code);

    expect(wrapper.vm.form.terms).toBe(terms);
    expect(wrapper.vm.form.privacy).toBe(false);

    await wrapper.find('.get-code').trigger('click');
    await wrapper.vm.submit();
    expect(wrapper.vm.loading).toBe(true);
   // wrapper.vm.$validator.validateAll();
    //expect(wrapper.vm.errorMessage).toBe("accept our terms and conditions");


  });

  test("user not check privacy", async() => {
    const wrapper = factory();
    const name = "ronald"
    const email = 'ronald.pranata@isobar.com';
    const code = "XXXXXX"
    const privacy = true;

    const terms = true;

    wrapper.find('#name').setValue(name);
    wrapper.find('#email').setValue(email);
    wrapper.find('#code').setValue(code);


    wrapper.find('#form_pp').setChecked(privacy);

    expect(wrapper.vm.form.name).toBe(name);
    expect(wrapper.vm.form.email).toBe(email);
    expect(wrapper.vm.form.code).toBe(code);

    expect(wrapper.vm.form.terms).toBe(false);
    expect(wrapper.vm.form.privacy).toBe(privacy);

    await wrapper.find('.get-code').trigger('click');
    await wrapper.vm.submit();
    expect(wrapper.vm.loading).toBe(true);
    //wrapper.vm.$validator.validateAll();

   // expect(wrapper.vm.errorMessage).toBe("Please accept our privacy policies");


  });


  test("test all computed value", () => {
    const wrapper = factory();
    expect(wrapper.vm.submissionType).toBe(wrapper.vm.data.campaignTypes.submissionType);
    expect(wrapper.vm.submissionFormFields).toBe(wrapper.vm.data.submissionFormFields);
    expect(wrapper.vm.campaignType).toBe(wrapper.vm.data.campaignTypes.mechanicType);
    expect(wrapper.vm.campaignTitle).toBe(wrapper.vm.data.campaignTypes.Title);
    expect(wrapper.vm.thankyouSubmission).toBe(wrapper.vm.cmsData.ThankYouSubmission);
    expect(wrapper.vm.thankyouPage).toBe(wrapper.vm.cmsData.ThanksYouPage);
    expect(wrapper.vm.loginInfo).toBe(store.getters.getLoginAccount);

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
