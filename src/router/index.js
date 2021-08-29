import Vue from 'vue'
import store from "../store"
import VueRouter from 'vue-router'
// import NProgress from "nprogress"
import Home from '../views/'
import Login from '../views/auth/Login'

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
        beforeEnter: ifAuthenticated
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
    routes,
    // scrollBehavior(to, from, savedPosition) {
    //     return { x: 0, y: 0 };
    // }
});

// router.beforeEach((to, from, next) => {
//     // If this isn't an initial page load.
//     if (to.path) {
//         // Start the route progress bar.
//         NProgress.start();
//         NProgress.set(0.1);
//     }
//     next();
// });
  
// router.afterEach(() => {
//     // Remove initial loading
//     const gullPreLoading = document.getElementById("loading_wrap");
//     if (gullPreLoading) {
//         gullPreLoading.style.display = "none";
//     }
//     // Complete the animation of the route progress bar.
//     setTimeout(() => NProgress.done(), 500);
//     // NProgress.done();
//     // if (isMobile) {
//     if (window.innerWidth <= 1200) {
//         store.dispatch("changeSidebarProperties");
//     }
// });
export default router