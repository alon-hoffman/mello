import { createRouter, createWebHashHistory } from 'vue-router'

import homePage from './views/home-page.vue'
import boardChart from './views/board-chart.vue'
// import carApp from './views/car-app.vue'
import boardsPage from './views/boards-page.vue'
import boardDetails from './views/board-details.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'
import cardEdit from './cmps/card-edit.vue'

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: homePage
  },
  {
    // path: '/boards',
    path: '/board/:boardId',
    name: 'board-details',
    component: boardDetails,
    children: [
      {
        path: 'card/:id',
        name: 'card-edit',
        component: cardEdit,
      },
      {
        path: 'chart',
        name: 'board-chart',
        component: boardChart
      }
    ]
  },
  {
    path: '/board',
    name: 'boards-page',
    component: boardsPage
  },
  // {
  //   path: '/boardApp',
  //   name: 'board-details',
  //   component: boardApp
  // },
  {
    path: '/auth',
    name: 'loginSignup',
    component: loginSignup
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  }
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

