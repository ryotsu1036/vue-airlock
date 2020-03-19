import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Merge from "../views/Merge.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/Layout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "home",
        component: Home,
        meta: { requiresAuth: true }
      },
      {
        path: "about",
        component: About,
        meta: { requiresAuth: true }
      },
      {
        path: "merge",
        component: Merge,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    name: "admin",
    path: "/admin",
    component: () => import("../views/admin/Layout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "home",
        component: Home,
        meta: { requiresAuth: true }
      },
      {
        path: "about",
        component: About,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: "/login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next("/login");
  }
  next();
});

export default router;
