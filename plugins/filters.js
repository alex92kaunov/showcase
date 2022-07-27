import Vue from 'vue'

Vue.filter('numberFormat', val => val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
