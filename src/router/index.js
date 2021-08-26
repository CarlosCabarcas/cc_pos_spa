import Vue from 'vue'
import VueRouter from 'vue-router'
// import NProgress from "nprogress"
import Home from '../views/'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Home
}]

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