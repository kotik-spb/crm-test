<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
        <th>Удалить</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) in records" :key="record.id">
        <td>{{ idx + 1 + (page - 1) * pageCount }}</td>
        <td>{{ record.amount | currency }}</td>
        <td>{{ record.date | date("datetime") }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">
            {{ record.typeText }}
          </span>
        </td>
        <td>
          <button
            v-tooltip="'Посмотреть запись'"
            class="btn-small btn blue lighten-1"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
        <td>
          <button
            v-tooltip="'Удалить запись'"
            class="btn-small btn red darken-3"
            @click="deleteRecordById(record.id)"
          >
            <i class="material-icons">delete</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    },
    page: {
      type: Number
    },
    pageCount: {
      type: Number
    }
  },
  methods: {
    async deleteRecordById(noteId) {
      try {
        await this.$store.dispatch("deleteRecordById", noteId);
        this.$message(`Запись была удалена!`);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
.icon-red {
  background-color: crimson;
}
</style>
