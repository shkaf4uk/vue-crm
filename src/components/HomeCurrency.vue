<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ 'Account_currency' | localize }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ 'Currency' | localize }}</th>
              <th>{{ 'Course' | localize }}</th>
              <th>{{ 'Date' | localize }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencis" :key="cur">
              <td>{{ cur }}</td>
              <td>{{ rates[cur] }}</td>
              <td>{{ date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencis: ['UAH', 'USD', 'EUR'],
  }),
}
</script>