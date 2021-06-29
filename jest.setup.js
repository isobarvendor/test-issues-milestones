
import Vue from 'vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import { config } from '@vue/test-utils';
import { Plugin } from 'vue-responsive-video-background-player'

Vue.use(Plugin)

Vue.use(VeeValidate)
Vue.use(Vuetify)


// Mock Nuxt components
config.stubs['nuxt'] = { template : '<div />' }
config.stubs['nuxt-link'] = {template : '<a><slot /></a>'}
config.stubs['no-ssr'] = {template : '<span><slot /></span>' }

config.stubs['client-only'] = {template: '<div><slot /></div>' } ;
config.stubs['mq-layout'] = {template: '<div><slot /></div>' } ;


process.env.phoneCode=66;
process.env.minPhoneNumber=9;
process.env.maxPhoneNumber=9;
process.env.origin="";
process.env.voucherParameter="c";
process.env.language="th";
process.env.GTM="GTM-TGJL2CD";
config.phoneCode=process.env.phoneCode;
config.minPhoneNumber=process.env.minPhoneNumber,
config.maxPhoneNumber=process.env.maxPhoneNumber,
config.voucherParameter=process.env.voucherParameter,
config.gtm= {
  id: process.env.GTM
}
