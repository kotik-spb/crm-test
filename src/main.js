import Vue from "vue";
import Vuelidate from "vuelidate";
import Paginate from "vuejs-paginate";
import VueMeta from "vue-meta";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";
import tooltipDirective from "@/directives/tooltip.directive";
import messagePlugin from "@/utils/message.plugin";
import titlePlugin from "@/utils/title.plugin";
import Loader from "@/components/app/Loader";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("localize", localizeFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyBFuq6GadkWjZq6NV_NuNucYY3lRuH6ZeE",
  authDomain: "vue-crm-d7175.firebaseapp.com",
  databaseURL: "https://vue-crm-d7175.firebaseio.com",
  projectId: "vue-crm-d7175",
  storageBucket: "vue-crm-d7175.appspot.com",
  messagingSenderId: "765716306353",
  appId: "1:765716306353:web:93789d484558ecc0370590"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
