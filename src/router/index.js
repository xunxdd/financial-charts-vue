import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Chart from '@/components/chart'
import IndicatorChart from '@/components/indicatorChart'
import AllPlotsChart from '@/components/allPlotsChart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: AllPlotsChart
    },
    {
      path: '/allPlots',
      component: AllPlotsChart
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
    },
    {
      path: '/info',
      component: Hello
    }
  ]
})
