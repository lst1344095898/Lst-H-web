import Vue from "vue";
import login from "../view/login";
import NotFound from "../view/NotFound";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routers = [
    {
        path:'/',
        name: 'login',
        component: login
    },
    {
        path:'/login',
        name: 'login',
        component: login
    },
    {
        path: '/*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes:routers
})
//将router 传入到实例对象
//导航守卫
//判断是否登录
router.beforeEach((to, from, next) => {
    console.log('to.path=' + to.path);
    if (to.path === '/login' || to.path === '/register') {
        next();
    } else {
        let token = localStorage.getItem("token");
        if (token === null || token === '') {
            next('/login');
        } else {
            next();
        }
    }
})
export default router