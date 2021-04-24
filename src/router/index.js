import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";

import Home from "../views/Home.vue";
import Categories from "../views/Categories.vue";
import Login from "../views/Login.vue";
import DetailRecord from "../views/DetailRecord.vue";
import History from "../views/History.vue";
import Planning from "../views/Planning.vue";
import Profile from "../views/Profile.vue";
import Record from "../views/Record.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        meta: { layout: "main", auth: true },
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        meta: { layout: "empty" },
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        meta: { layout: "empty" },
        component: Register,
    },
    {
        path: "/categories",
        name: "Categories",
        meta: { layout: "main", auth: true },
        component: Categories,
    },
    {
        path: "/detail-record/:id",
        name: "DetailRecord",
        meta: { layout: "main", auth: true },
        component: DetailRecord,
    },
    {
        path: "/history",
        name: "History",
        meta: { layout: "main", auth: true },
        component: History,
    },
    {
        path: "/planning",
        name: "Planning",
        meta: { layout: "main", auth: true },
        component: Planning,
    },
    {
        path: "/profile",
        name: "Profile",
        meta: { layout: "main", auth: true },
        component: Profile,
    },
    {
        path: "/record",
        name: "Record",
        meta: { layout: "main", auth: true },
        component: Record,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requireAuth = to.matched.some((record) => record.meta.auth);

    if (requireAuth && !currentUser) {
        next("/login?message=login");
    } else {
        next();
    }
});

export default router;