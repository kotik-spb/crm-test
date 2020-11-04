import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    meta: { layout: "empty" },
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    meta: { layout: "empty" },
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/",
    name: "Home",
    meta: { layout: "main", auth: true },
    component: Home
  },
  {
    path: "/categories",
    name: "Categories",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Categories.vue")
  },
  {
    path: "/detail/:id",
    name: "Detail",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Detail.vue")
  },
  {
    path: "/history",
    name: "History",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/History.vue")
  },
  {
    path: "/planning",
    name: "Planning",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Planning.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Profile.vue")
  },
  {
    path: "/record",
    name: "Record",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Record.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  console.log(to);

  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
