<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line" v-for="cur in currencies" :key="cur">
          <!-- в фильтр-функцию на самом деле передается 2 параметра: 1й -
          зачнение функции getCurrency(cur) -->
          <span>{{ getCurrency(cur) | currency(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates"],
  data() {
    return {
      currencies: ["RUB", "USD", "EUR"]
    };
  },
  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates["RUB"] / this.rates["EUR"])
      );
    }
  },
  mounted() {
    this.$store.dispatch("recalcBills");
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    }
  }
};
</script>

<style></style>
