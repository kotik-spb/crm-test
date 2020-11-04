<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записей пока нет! <router-link to="/record">Добавьте первую!</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" :page="page" :pageCount="pageSize" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin";
import { Pie } from "vue-chartjs";
export default {
  name: "History",
  metaInfo() {
    return {
      title: this.$title("Menu_History")
    };
  },
  extends: Pie,
  mixins: [paginationMixin],
  data() {
    return {
      loading: true,
      records: []
    };
  },
  async mounted() {
    this.records = (await this.$store.dispatch("fetchRecords")).sort((a, b) => {
      if (new Date(a.date) < new Date(b.date)) return 1;
      if (new Date(a.date) > new Date(b.date)) return -1;
      return 0;
    });
    const categories = await this.$store.dispatch("fetchCategories");

    this.setup(categories);

    this.loading = false;
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map(record => {
          return {
            ...record,
            categoryName: categories.find(c => c.id === record.categoryId)
              .title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ? "Доход" : "Расход"
          };
        })
      );
      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [
          {
            label: "Расходы по категориям",
            data: categories.map(c => {
              return this.records.reduce((acc, r) => {
                if (r.categoryId === c.id && r.type === "outcome") {
                  acc += +r.amount;
                }
                return acc;
              }, 0);
            }),
            backgroundColor: [
              "#227dac",
              "#9f0052",
              "#ffbe00",
              "#443988",
              "#ff3f20",
              "#5fa55a",
              "#01b4bc",
              "#f6d51f",
              "#fa8925",
              "#fa5457",
              "#8c7860",
              "#3b4d61",
              "#c51c07",
              "#fbd00f"
            ],
            borderColor: [
              "#227dac",
              "#9f0052",
              "#ffbe00",
              "#443988",
              "#ff3f20",
              "#5fa55a",
              "#01b4bc",
              "#f6d51f",
              "#fa8925",
              "#fa5457",
              "#8c7860",
              "#3b4d61",
              "#c51c07",
              "#fbd00f"
            ],
            borderWidth: 1
          }
        ]
      });
    }
  },
  components: {
    HistoryTable
  }
};
</script>
