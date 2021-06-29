
import { shallowMount } from '@vue/test-utils'
import {mockListWinners} from "@/__mock__/mock";
import WinnerDetails from "@/components/WinnerDetails";
import {translation} from "@/constants/index"

import moment from "moment";
import * as _ from 'lodash';

const factory = () => {
  return shallowMount(WinnerDetails, {
    data() {
      return {
        showWinnerDetail:false,
        winnerWeek:null,
        weekly:false,
        monthly:false,
        search:null,
        winnerText:translation.winnerText,
        headers: [
            {
              text: 'No',
              align: 'center',
              sortable:false,
              value: 'no',
            },
            { text: 'Name', value: 'name', align: 'center' },
            { text: 'Email', value: 'email' , align: 'center' },
            { text: 'Phone', value: 'phone' , align: 'center' },
            { text: 'Prize', value: 'prize' , align: 'center' },
          ]
      };
    },
    propsData: {
      data:{
        exclusizeWinnerDetailsSection:[
          {
            image:[
              {url: "imageurl"}
            ],
            title:"Exclusive Prize"
          }
        ],
        title:"title",
        description:"description"
      },
      winners:mockListWinners,
      howData:{
        title:"how"
      }
    },
  });
};

describe("WinnerDetails", () => {

  /*test("test all computed value", () => {
    const wrapper = factory();
    expect(wrapper.vm.winnerLists).toStrictEqual(_.uniqBy(_.filter(_.orderBy(wrapper.vm.winners, ['week'], ['desc']), (o)=>{ return o.week!=0&&o.fromDate!=""&&o.toDate!="" }),'week'));

    let secondRow=wrapper.vm.winnerLists;
    let secondRowResult=secondRow.splice(1, secondRow.length-1);
    expect(wrapper.vm.winnerListsSecond).toStrictEqual( _.chunk(secondRowResult, 2));

    expect(wrapper.vm.winnerWeekDetail).toStrictEqual(_.filter(wrapper.vm.winners,(o)=>{ return o.week == wrapper.vm.winnerWeek}));


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
