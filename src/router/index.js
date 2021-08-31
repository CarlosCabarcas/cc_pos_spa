import Vue from 'vue'
import store from "../store"
import VueRouter from 'vue-router'
// import NProgress from "nprogress"
import Home from '../views/'
import Login from '../views/auth/Login'
import Products from '../views/pages/inventory/Products'
import Purchase from '../views/pages/inventory/Purchase'
import RegisterClients from '../views/pages/clients/RegisterClient'
import PointOfSales from '../views/pages/sales/PointOfSales'
import ReportPurchases from '../views/pages/reports/ReportPurchases'
import ReportSales from '../views/pages/reports/ReportSales'

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
    next('/')
}
  
const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        return next()
    }
    next('/login')
}

const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/inventory/products',
                name: 'Products',
                component: Products,
                beforeEnter: ifAuthenticated
            },
            {
                path: '/inventory/purchase',
                component: Purchase,
                beforeEnter: ifAuthenticated
            },
            {
                path: '/clients/register',
                component: RegisterClients,
                beforeEnter: ifAuthenticated
            },
            {
                path: '/sales/point-of-sales',
                component: PointOfSales,
                beforeEnter: ifAuthenticated
            },
            {
                path: '/report/sales',
                component: ReportSales,
                beforeEnter: ifAuthenticated
            },
            {
                path: '/report/purchases',
                component: ReportPurchases,
                beforeEnter: ifAuthenticated
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: ifNotAuthenticated
    }
]

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: "open",
    base: process.env.BASE_URL,
    routes
});

export default router