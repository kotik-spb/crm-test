<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <li>
      <router-link
        v-for="link in links"
        :key="link.url"
        tag="li"
        :to="link.url"
        active-class="active"
        :exact="link.exact"
      >
        <a class="pointer waves-effect waves-orange">{{ link.title }}</a>
      </router-link>
    </li>
  </ul>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";
export default {
  props: ["value"],
  data() {
    return {
      links: [
        { title: localizeFilter("Menu_Bill"), url: "/", exact: true },
        { title: localizeFilter("Menu_History"), url: "/history" },
        { title: localizeFilter("Menu_Planning"), url: "/planning" },
        { title: localizeFilter("Menu_NewRecord"), url: "/record" },
        { title: localizeFilter("Menu_Categories"), url: "/categories" }
      ]
    };
  }
};
</script>
