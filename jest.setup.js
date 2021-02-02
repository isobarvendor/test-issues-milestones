
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
