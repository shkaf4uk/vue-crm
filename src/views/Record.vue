<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_NewRecord' | localize }}</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="categories.length === 0">
      {{ 'No_categories_yet' | localize }}
      <router-link to="/categories">{{
        'Add_new_category' | localize
      }}</router-link>
    </p>

    <form class="form" v-else @submit.prevent="handleSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
        <label>{{ 'Select_category' | localize }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{ 'Income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{ 'Consumption' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        />
        <label for="amount">{{ 'Amount' | localize }}</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          >{{ 'minValueCategory' | localize }}
          {{ $v.amount.$params.minValue.min }}</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required,
          }"
        />
        <label for="description">{{ 'Description' | localize }}</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
          >{{ 'Enter_description' | localize }}</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Create' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.$title('Menu_NewRecord'),
    }
  },
  name: 'record',
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    description: '',
  }),
  validations: {
    amount: { minValue: minValue(1) },
    description: { required },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')

    if (this.categories && this.categories.length !== 0) {
      this.category = this.categories[0].id
    }

    this.loading = false

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    },
  },
  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          })
          const bill =
            this.type === 'income'
              ? Number(this.info.bill) + Number(this.amount)
              : Number(this.info.bill) - Number(this.amount)

          await this.$store.dispatch('undateInfo', { bill })
          this.$message(
            this.$store.getters.info.locate === 'ru-RU'
              ? 'Запись успешно создана'
              : 'Record created successfully'
          )
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (error) {}
      } else {
        let mess
        this.$store.getters.info.locate === 'ru-RU'
          ? (mess = 'Недостаточно средств на счете')
          : (mess = 'Insufficient funds on the account')
        return this.$message(`${mess} (${this.amount - this.info.bill})`)
      }
    },
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
}
</script>