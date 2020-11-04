<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <Navbar @click="isOpen = !isOpen" />
      <Sidebar v-model="isOpen" :key="locale" />
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          to="/record"
          class="btn-floating btn-large blue"
          href="#"
          v-tooltip="'Создать новую запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/app/Sidebar";
import Navbar from "@/components/app/Navbar";
import messages from "@/utils/messages";
export default {
  data() {
    return {
      isOpen: false,
      loading: true
    };
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
      this.loading = false;
    }
  },
  components: {
    Sidebar,
    Navbar
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так!");
    }
  }
};
</script>
