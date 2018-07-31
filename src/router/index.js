import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import SignIn from '@/view/signIn'
import SignUp from '@/view/signUp'
import Profit from '@/view/profit'
import Help from '@/view/help'
import Form from '@/view/form'
import AddressDetails from '@/view/addressDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/profit',
      name: 'Profit',
      component: Profit
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/addressDetails',
      name: 'AddressDetails',
      component: AddressDetails
    }
  ]
})
