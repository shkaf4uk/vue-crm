<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ 'Account_currency' | localize }}</span>

        <p class="currency-line" v-for="cur in currencis" :key="cur">
          <span>
            {{ getCurrency(cur) | currency(cur) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$title('Menu_Bill'),
    }
  },
  props: ['rates'],
  data: () => ({
    currencis: ['UAH', 'USD', 'EUR'],
  }),
  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates['UAH'] / this.rates['USD'])
      )
    },
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    },
  },
}
</script>