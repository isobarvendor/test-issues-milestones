<template>
<div class="registration">
    <h3> Register for an account </h3>
     <div class="registration-body">
    <div class="details">
        <div class="input-container">
            <v-text-field label="Name">   </v-text-field>
            <v-text-field label="Email address">   </v-text-field>
            <v-text-field label="Password" :type="'password'">   </v-text-field>
            <v-text-field label="Confirm password" :type="'password'">   </v-text-field>
        </div>
        <div class="radio-container">
            <v-radio-group v-model="radioGroup">
                <v-radio 
                ></v-radio>
            </v-radio-group>
            <div class="radio-label">I accept the <a href="#">Terms and Conditions</a> & <a href="#">Privacy Policy</a> for sign up.</div>
        </div>
        <div class="button-container">
            <a  class="button">Register</a>
        </div>
        
    </div>
    <div class="profile-icon">
            <img src="/img/icons/profile-icon.png"/>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "Registration",
  components: {
  },
  data() {
    return {
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
.registration{
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
            margin-top: 40px;
            width: 50%;
        }
        .input-container{
            margin-top: 25px;
        }
        .radio-container{
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
    }  
}
</style>
