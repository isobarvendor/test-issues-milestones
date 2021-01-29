
import { mount } from '@vue/test-utils'

import WalletRewards from "@/components/WalletRewards";
import SliderHeader from "@/components/WalletSliderHeader";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

let $mq ="lg";
const factory = () => {
  return mount(WalletRewards, {
    mocks: {
      $mq:$mq
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 2,
          spaceBetween: 10,
          breakpoints: {
            // when window width is >= 320px

            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          },
          freeMode: true,
          pagination: {
            el: ".prize-swiper-pagination",
            clickable: true,
            bulletClass: "prize-swiper-pagination-bullet",
            bulletActiveClass: "prize-swiper-pagination-bullet-active",
          }
        },
        currentPage: 1
      };
    },
    propsData: {
      data :{
        "expirationWallet": [
          {
              "gpp_user_id": "UUID|CDS region",
              "amount": 20,
              "currency_id": "coin",
              "currency_name": "CCA-coin",

              "configuration_id": "exampleConfig123",
              "last_modified": 1557764018189,
              "valid_thru": 1355228281846,
              "already_spent": 15,
              "spent_amount": 0
          },
          {
              "gpp_user_id": "UUID|CDS region",
              "amount": 1,
              "configuration_id": "exampleConfig123",
              "currency_id": "coin",
              "currency_name": "CCA-coin",
              "valid_thru": 1581811199000,
              "already_spent": 0,
              "spent_amount": 0
          },
          {
              "gpp_user_id": "UUID|CDS region",
              "amount": 40,
              "currency_id": "coin",
              "currency_name": "CCA-coin",

              "configuration_id": "exampleConfig123",
              "last_modified": 1557764018189,
              "valid_thru": 1345228281846,
              "already_spent": 0,
              "spent_amount": 0
          }
      ]

      },
      cmsData:{
        Wallets:{
          RewardsTitle :"test"
        }
      }
    }
  });
};

describe("WalletRewards", () => {


  test('renders a SliderHeader', () => {
    const wrapper = factory();
    const component= wrapper.findComponent(SliderHeader);
    expect(component.exists()).toBeTruthy();
  });

  test('renders a Swiper', () => {
    const wrapper = factory();
    const component= wrapper.findComponent(Swiper);
    expect(component.exists()).toBeTruthy();
  });

  test('renders a SwiperSlide ', () => {
    const wrapper = factory();
    const component= wrapper.findComponent(SwiperSlide);
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
