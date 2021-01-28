
import { mount } from '@vue/test-utils'

import Masthead from "@/components/Masthead";
const spy = jest.fn(); // or `jasmine.createSpy()`
const testWidth = 1200;

beforeAll(() => {
  window.addEventListener('resize', spy);
});

it('does not fire resize event by default', () => {
  expect(spy).not.toHaveBeenCalled();
  expect(window.innerWidth).not.toBe(testWidth);
});



const factory = () => {
  return mount(Masthead, {

    propsData: {
      data :{
              mobileImage:[{url:"mobile image"}],
              desktopImage:[{url:"desktop image"}],
              tabletImage:[{url:"tablet image"}],
            }
    }
  });
};

describe("Masthead", () => {


  beforeAll(() => {
    window.innerWidth = testWidth;
    window.dispatchEvent(new Event('resize'));
    // const resizeEvent = document.createEvent('Event');
    // resizeEvent.initEvent('resize', true, true);
    // window.dispatchEvent(resizeEvent);
  });
  test('updates the window width', () => {
    const wrapper = factory();
    expect(spy).toHaveBeenCalled();
    expect(window.innerWidth).toBe(testWidth);
    expect(wrapper.find('[mq="sm"]').find('image').attributes().href).toBe(wrapper.vm.data.mobileImage[0].url);
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
