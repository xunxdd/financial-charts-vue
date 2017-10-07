import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Chart from '@/components/chart'
import IndicatorChart from '@/components/indicatorChart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/home',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/chart/:type',
      component: Chart,
      props: true
    },
    {
      path: '/indicator/:type',
      component: IndicatorChart,
      props: true
    }
  ]
})
