<template>
<div class="account-detail">
    <h3> Account Details </h3>
     <div class="registration-body">
    <div class="details">
        <div class="input-container">
            <v-text-field
            v-model="names"
            label=""
          ></v-text-field>
             <v-text-field
            v-model="email"
          ></v-text-field>
        </div>
     </div>
    <div class="profile-icon">
        <img src="/img/icons/pic.png"/>
    </div>
    </div>
    <div class="date-container">
        <p>Date of birth</p>
          <v-app>
              <v-row>
      <v-col cols="12" md="6" xs="12" sm="12">
              <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          top
          min-width="290px"
          dark
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date"
              readonly
              v-bind="attrs"
              v-on="on"
             prepend-icon="mdi-calendar"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
              </v-row>
          </v-app>
        </div>
        <div class="button-container">
            <a  class="button">Save</a>
        </div>

</div>
</template>

<script>
export default {
  name: "AccountDetail",
  components: {
  },
  data() {
    return {
        names: "Jane",
        email: "janet@gmail.com",
        date: new Date().toISOString().substr(0, 10),
        menu: false
    };
  },
  props: {
    data: null,
  },
  computed:{
  },
  methods:{
  },
  beforeMount() {},
  mounted(){

  }
};
</script>

<style lang="scss">
.account-detail{
    margin-top: 40px;
    .theme--light.v-application{
        background: none !important;
    }
    .v-application--wrap{
        min-height:auto !important;
    }
    .theme--light.v-input input{
        color: white;
    }
    .theme--light.v-text-field > .v-input__control > .v-input__slot:before{
        border-color: #585858;
    }
    .mdi:before, .mdi-set{
        color: white;
    }
    h3{
        font-size: 25px;
        text-transform: none;
    }
    .registration-body{
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .v-text-field__slot{
            border-bottom: 1px solid #585858;
        }
        .theme--light.v-label{
            color: #585858;
        }
        .theme--light.v-input input{
            color: #ffffff;
        }
        .details{
            margin-top: 20px;
            width: 50%;
            
        }
        .profile-icon{
        
            width: 235px;
            margin: auto;
                
        }
        .input-container{
            margin-top: 25px;
        }
        .date-container{
            display: flex;
            align-items: center;
            .radio-label{
                font-size: 14px;
                margin-left: 10px;
                line-height: 24px;
            }
            .v-input--selection-controls__input .v-icon{
                color: #585858;
            }
        }
        .button-container{
            margin-top: 40px;
            a.button{
                width: 230px;
                display: block;
            }
        }
        
    }
    @media only screen and (max-width: 1199px) {
        .registration-body{
            flex-direction: column-reverse;
            .details{
                width: 100%;
            }
            .profile-icon{
                margin-top: 35px;
            }
            a.button{
                margin:auto;
            }
        } 
        h3{
            text-align: center;
            font-size: 22px;
        }
        .button-container a.button{
            margin: auto;
        }   
    }  
}
</style>
