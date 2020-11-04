<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{ invalid: $v.name.$dirty && !$v.name.required }"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
          >
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            Минимальная величина {{ $v.limit.$params.minValue.min }}
          </span>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      name: "",
      limit: 100,
      select: null,
      current: null
    };
  },
  validations: {
    name: {
      required
    },
    limit: {
      required,
      minValue: minValue(100)
    }
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find(c => c.id === catId);
      this.name = title;
      this.limit = limit;
    }
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.name = title;
    this.limit = limit;
  },
  mounted() {
    window.M.updateTextFields();
    this.select = window.M.FormSelect.init(this.$refs.select);
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.name,
          limit: this.limit
        };
        await this.$store.dispatch("updateCategory", categoryData);
        this.$message("Категория успешно обновлена!");
        this.$emit("updated", categoryData);
      } catch (e) {}
    }
  }
};
</script>
