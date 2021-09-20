<template>
  <div class="winner-details container redbox-withwhiteborder">
    <v-row no-gutters>
      <v-col cols="12" sm="12" md="4" >
        <v-row no-gutters class="logo-title">
          <v-col cols="4" md="12" sm="4" >
            <img src="/develop/fanta-logo.png" class="logo" />
          </v-col>

          <v-col cols="8" md="12" sm="8" class="participate-text-container">
            <div class="tagline" v-html="howData.title"></div>
            <BR />
            <BR />
          </v-col>
        </v-row>
        <div class="desc-container desc-mobile" v-if="$vuetify.breakpoint.xs">
                  <div class="close-icon" @click="close">
          <img src="/img/icons/close.png" />
        </div>
        <v-row no-gutters class="logo-title">
          <h1>{{ winnerText.header }}</h1>
        </v-row>
        <v-row no-gutters class="logo-title">
          <!-- <p>All winners will be contacted by 31st July</p> -->
        </v-row>
        <span v-if="showWinnerDetail">
          <v-card class="table-head">
            <!-- <v-card-title>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-text-field
                style="color: white;"
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title> -->
            <v-data-table
              dark
              :headers="headers"
              :items="winnerWeekDetail"
              :page.sync="page"
              :pageCount.sync="numberOfPages"
              :search.sync="search"
              :options.sync="options"
              :server-items-length.sync="totalWinner"
              :loading="loading"
              class="elevation-1"
            ></v-data-table>
          </v-card>
        </span>
        <span v-else>
          <div class="winner-body">
            <div
              class="first-box box"
              :key="'winner' + index"
              @click="showWinners(winnerLists[0].week)"
              v-if="winnerLists.length == 1"
            >
              <div class="week">
                <!-- {{ monthName(winnerLists[0].week) }} -->
              </div>
              <div class="date">
                {{ winnerLists[0].startDate }} -
                <!-- {{ endMonth(winnerLists[0].week) }} -->
                {{ winnerLists[0].endDate }}
              </div>
            </div>
            <div
              v-else
              :class="item.length == 2 ? 'two-container' : 'top-margin'"
              v-for="(item, index) in winnerListsSecond"
              :key="'winner' + index"
            >
              <div
                class="second-box box"
                v-for="(item2, index2) in item"
                :key="'winners' + index2"
                @click="showWinners(item2.week)"
              >
                <div class="week">
                  {{ monthName(item2.week) }}
                  {{ item2.week }}
                </div>
                <div class="date">
                  {{ startMonth(item2.week) }} - {{ endMonth(item2.week) }}
                </div>
              </div>
            </div>
          </div>
        </span>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="8" class="desc-container" v-if="!$vuetify.breakpoint.xs" >
                <div class="close-icon" @click="close">
          <img src="/img/icons/close.png" />
        </div>
        <v-row no-gutters class="logo-title">
          <h1>{{ winnerText.header }}</h1>
        </v-row>
        <v-row no-gutters class="logo-title">
          <!-- <p>All winners will be contacted by 31st July</p> -->
        </v-row>
        <span v-if="showWinnerDetail">
          <v-card class="table-head">
            <!-- <v-card-title>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-text-field
                style="color: white;"
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title> -->
            <v-data-table
              dark
              :headers="headers"
              :items="winnerWeekDetail"
              :page.sync="page"
              :pageCount.sync="numberOfPages"
              :search.sync="search"
              :options.sync="options"
              :server-items-length.sync="totalWinner"
              :loading="loading"
              class="elevation-1"
            ></v-data-table>
          </v-card>
        </span>
        <span v-else>
          <div class="winner-body">
            <div
              class="first-box box"
              :key="'winner' + index"
              @click="showWinners(winnerLists[0].week)"
              v-if="winnerLists.length == 1"
            >
              <div class="week">
                <!-- {{ monthName(winnerLists[0].week) }} -->
              </div>
              <div class="date">
                {{ winnerLists[0].startDate }} -
                <!-- {{ endMonth(winnerLists[0].week) }} -->
                {{ winnerLists[0].endDate }}
              </div>
            </div>
            <div
              v-else
              :class="item.length == 2 ? 'two-container' : 'top-margin'"
              v-for="(item, index) in winnerListsSecond"
              :key="'winner' + index"
            >
              <div
                class="second-box box"
                v-for="(item2, index2) in item"
                :key="'winners' + index2"
                @click="showWinners(item2.week)"
              >
                <div class="week">
                  {{ monthName(item2.week) }}
                  {{ item2.week }}
                </div>
                <div class="date">
                  {{ startMonth(item2.week) }} - {{ endMonth(item2.week) }}
                </div>
              </div>
            </div>
          </div>
        </span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from "moment";
import * as _ from "lodash";
import deepClone from "deep-clone";
import { translation } from "@/constants/index";
import { GET_LIST_WINNERS } from "@/store/action_types";
export default {
  name: "WinnerDetails",
  components: {},
  data() {
    return {
      showWinnerDetail: false,
      winnerWeek: null,
      weekly: false,
      monthly: false,
      search: null,
      options: {},
      loading: true,
      winnerText: translation.winnerText,
      numberOfPages: 0,
      itemsPerPage: 10,
      totalWinner: 0,
      page: 1,
      winnersData: [],
      winnerMonth: [],
      headers: [
        {
          text: "No",
          align: "center",
          sortable: false,
          value: "no"
        },
        { text: "Name", value: "name", align: "center" },
        /* { text: 'Email', value: 'email' , align: 'center', }, */
        { text: "Phone", value: "phone", align: "center" },
        { text: "Prize", value: "prize", align: "center" }
        // {
        //   text: "Winning code",
        //   value: "mixcode",
        //   align: "center",
        //   sortable: false
        // }
      ]
    };
  },
  props: {
    data: null,
    howData: null
  },
  computed: {
    winnerWeekDetail() {
      return _.map(this.winnersData, (o, index) => {
        return {
          no: index + 1 + (this.page - 1) * this.itemsPerPage,
          name: o.name,
          /* email:o.email ? o.email : null, */
          phone: o.phone ? o.phone : null,
          prize: o.prize
          // mixcode: o.mixCode ? o.mixCode : null
        };
      });
    },
    winnerLists() {
      //console.log(this.winnerMonth);
      return this.winnerMonth;
    },
    winnerListsSecond() {
      let secondRow = deepClone(this.winnerLists);
      let secondRowResult = secondRow.splice(0, secondRow.length);
      //
      return _.chunk(secondRowResult, 2);
    }
  },
  methods: {
    async checkWinnerMonth() {
      let startMonth = moment(this.data.fromDate).format("M");
      let startDate = moment(this.data.fromDate).format("DD MMM YYYY");
      let endMonth = moment(this.data.toDate).format("M");
      let endDate = moment(this.data.toDate).format("DD MMM YYYY");
      let campaignWeek = [
        {},
        {
          startDate: moment(1630454400000).format("DD MMM YYYY"),
          endDate: moment(1630454400000)
            .add(11, "day")
            .format("DD MMM YYYY")
        },
        {
          startDate: moment(startDate)
            .add(12, "day")
            .format("DD MMM YYYY"),
          endDate: moment(startDate)
            .add(23, "day")
            .format("DD MMM YYYY")
        }
      ];
      // let startMonth = moment(1622739600).format("M");
      // let startDate = moment(1622739600).format("DD MMM YYYY");
      // let endMonth = moment(1631811600).format("M");
      // let endDate = moment(1631811600).format("DD MMM YYYY");
      // for (let l = 5; l <= 11; l++) {
      // console.log(startMonth);
      for (let l = 1; l <= campaignWeek.length; l++) {
        let startWeek = startMonth;
        await this.$store
          .dispatch(GET_LIST_WINNERS, { count: true, params: { week_eq: l } })
          .then(res => {
            // console.log(res.data);
            if (res.data > 0) {
              // this.winnerMonth.push({
              //   week: l,
              //   startDate: startDate,
              //   endDate: endDate
              // });
              this.winnerMonth.push({
                week: l,
                startDate: campaignWeek[l].startDate,
                endDate: campaignWeek[l].endDate
              });
            }
          });
        startWeek++;
      }
    },
    getListWinners(data) {
      let req = {};
      req["week_eq"] = this.winnerWeek;
      this.$store
        .dispatch(GET_LIST_WINNERS, { count: false, params: req })
        .then(res => {
          this.winnersData = res.data;
        });
    },
    async getCountData(params) {
      await this.$store
        .dispatch(GET_LIST_WINNERS, { count: true, params: params })
        .then(res => {
          this.totalWinner = res.data;
        });
    },
    async getDataFromApi() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      //console.log(this.options);
      let req = {};

      let sortByLabel = "";
      //console.log(sortBy);
      for (let k = 0; k < sortBy.length; k++) {
        // console.log('sort',sortBy[k]);
        sortByLabel += sortBy[k] + (sortDesc[k] ? ":DESC" : ":ASC");
        if (sortBy.length - 1 != k) {
          sortByLabel += ",";
        }
      }
      if (sortByLabel != "") {
        req["_sort"] = sortByLabel;
      }
      req["week_eq"] = this.winnerWeek;
      req["_limit"] = itemsPerPage;
      req["_start"] = (page - 1) * itemsPerPage;

      //   req['email_eq']=this.search;

      if (this.search != "") {
        req["_where[_or][0][name_contains]"] = this.search;
        /* req['_where[_or][1][email_contains]']=this.search; */
        req["_where[_or][2][prize_contains]"] = this.search;
        req["_where[_or][3][mixCode_contains]"] = this.search;
      }
      this.page = page;
      this.numberOfPages = this.totalWinner / itemsPerPage;
      this.itemsPerPage = itemsPerPage;

      this.$store
        .dispatch(GET_LIST_WINNERS, { count: false, params: req })
        .then(res => {
          this.getCountData(req);

          this.winnersData = res.data;

          this.loading = false;
        });
    },

    async getSearchDataFromApi() {
      this.loading = true;
      let req = {};

      req["week_eq"] = this.winnerWeek;
      this.page = 1;
      if (this.search != "") {
        req["_where[_or][0][name_contains]"] = this.search;
        /* req['_where[_or][1][email_contains]']=this.search; */
        req["_where[_or][2][prize_contains]"] = this.search;
        req["_where[_or][3][mixCode_contains]"] = this.search;
        req["_limit"] = this.itemsPerPage;
        req["_start"] = (this.page - 1) * this.itemsPerPage;
      } else {
        req["_limit"] = this.itemsPerPage;
        req["_start"] = (this.page - 1) * this.itemsPerPage;
      }

      //console.log(req)
      this.$store
        .dispatch(GET_LIST_WINNERS, { count: false, params: req })
        .then(res => {
          this.getCountData(req);

          this.winnersData = res.data;

          this.numberOfPages = this.totalWinner / this.itemsPerPage;

          this.loading = false;
        });
    },

    replace_String(string, numberofchar, chartoreplace) {
      return string
        .substring(0, numberofchar)
        .split("")
        .map(ele => (ele = chartoreplace))
        .join("")
        .concat(string.substring(numberofchar, string.length));
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    monthName(month) {
      return moment()
        .month(month - 1)
        .format("MMMM");
    },
    startMonth(month) {
      return moment()
        .clone()
        .month(month - 1)
        .startOf("month")
        .format("DD MMM YYYY");
    },
    endMonth(month) {
      return moment()
        .clone()
        .month(month - 1)
        .endOf("month")
        .format("DD MMM YYYY");
    },
    close() {
      if (this.showWinnerDetail) {
        window.location.assign("/winners");
      } else {
        window.location.assign("/");
      }
    },
    openPDF(link) {
      window.open(link, "_blank");
    },
    showWinners(week) {
      this.showWinnerDetail = true;
      this.winnerWeek = week;
      this.getListWinners();
    },
    maskEmail(email) {
      return this.replace_String(email, 6, "*");
    }
  },
  beforeMount() {},
  mounted() {
    //this.getListWinners();
    //this.getCountData();
    this.checkWinnerMonth();
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true
    },
    search: {
      handler() {
        this.getSearchDataFromApi();
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
.logo-title {
  font-family: "SiamSquare" !important;
  color: white !important;
  font-size: 30px;
}
.winner-details {
  .theme--light.v-input input, .theme--light.v-input textarea{
    color: #fff !important;
  }

  .text-start {
    text-align: center;
  }
  .next-draw {
    text-align: center;
    padding: 30px;
  }
  h3 {
    small {
      font-size: 16px;
    }
  }
  .row > .col,
  .row > [class*="col-"] {
    padding: 10px;
  }
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  .close-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
  }
  .winner-body {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    padding: 0px 15px;
    .title {
      font-size: 30px;
      margin-bottom: 40px;
    }
    .redeem-expiry {
      margin-top: 60px;
      width: 70%;
      h4 {
        font-size: 25px;
        margin-bottom: 30px;
      }
      p {
        padding-bottom: 30px;
      }
    }
    .box {
      border: 1px solid #77bc1f;

      border: 1px solid #77bc1f;
      border-radius: 5px;

      padding-top: 20px;
      padding-left: 15px;
      padding-bottom: 20px;
      position: relative;
    }
    .week {
      font-weight: bold;
      text-transform: uppercase;
    }
    .first-box {
      width: 100%;
      .week {
        margin-bottom: 5px;
      }
      .date {
        font-family: "SiamSquare";
        font-size: 30px;
      }
    }
    .two-container {
      display: flex;
      margin-top: 25px;
      justify-content: space-between;
      .second-box {
        width: 49%;
        .week {
          margin-bottom: 5px;
        }
        .date {
          font-family: "SiamSquare";
          font-size: 30px;
        }
      }
    }
  }
  .image-fluid {
    img {
      height: 100vh;
    }
  }
  a.button.rewards-bottom {
    margin-top: 30px;
  }
  .container.week-winner {
    padding-left: 50px;
    padding-top: 30px;
  }
  @media only screen and (max-width: 1199px) {
    .desc-mobile{
      padding-right: 0px !important;
      .v-data-table-header-mobile th, .v-data-table__mobile-row:first-child{
        display: none !important;
      }
      .theme--dark.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:last-child, .theme--dark.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:last-child, .theme--dark.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th{
        border-bottom: solid 1px #fff !important;
      }
      .theme--dark.v-data-table .v-data-footer{
        border-top: solid 1px #fff !important;
      }
    }
    .container.week-winner {
      padding-left: 0px;
      padding-top: 20px;
    }
    .col-sm-1.col {
      width: 20px !important;
      flex-grow: 0.2 !important;
    }
    flex-direction: column;
    width: 100%;
    position: relative;
    p {
      line-height: 24px;
    }
    .winner-body {
      width: 100%;
      margin-top: 45px;
      margin-bottom: 0px;
      margin: 50px 0px;
      .title {
        font-size: 20px;
        margin-bottom: 20px;
      }
      .redeem-expiry {
        margin-top: 40px;
        border-bottom: 1px solid #585858;
        width: 100%;
        h4 {
          font-size: 20px;
          margin-bottom: 20px;
        }
        p {
          padding-bottom: 20px;
          line-height: 24px;
        }
      }
      .two-container {
        flex-direction: column;
        margin-top: 0px;
        .second-box {
          margin-top: 25px;
          width: 100%;
        }
      }
    }
    .image-fluid {
      img {
        height: auto;
        width: 100%;
      }
    }
    a.button.rewards-bottom {
      margin: auto;
      margin-top: 40px;
    }
    a.button.mobile {
      margin: auto;
      margin-top: -80px;
      position: relative;
      z-index: 10;
    }
    .close-icon {
      position: absolute;
      top: 0px;
      right: 0px;
      margin-top: 10px;
    }
  }
}

.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
.button-carousel {
  font-size: 30px;
  position: absolute;
  top: 30%;
  right: 30px;
}
.table-head {
  background-color: #77bc1f !important;
  font-family: "SiamSquare";
  
}
.desc-container {
  .v-data-table.elevation-1.theme--dark {
    background-color: #77bc1f !important;
    border-color: #77bc1f !important;
    color: white;
  }
  .v-data-table tbody tr:hover {
    background-color: #77bc1f !important;
  }
}
.top-margin {
  margin-top: 20px;
}

td{
  font-size: 1.2rem !important;
}

th{
  font-size: 1.2rem !important;
  
}

tr{
  height: 60px;
}
@media screen and (max-width: 500px) {
  .v-data-table__mobile-table-row{
  height: 150px;
  }
}

.v-data-footer{
  font-size: 19.2px;
  font-family: "SiamSquare";
}


</style>
