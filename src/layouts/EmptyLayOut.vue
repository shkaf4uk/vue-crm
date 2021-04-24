<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from '@/utils/messages'

export default {
  name: 'EmptyLayout',
  computed: {
    error() {
      return this.$store.getters.error
    },
  },
  watch: {
    error(fbError) {
      this.$error(
        messages[fbError.code] || this.$store.getters.info.locate === 'ru-RU'
          ? 'Что-то пошло не так'
          : 'Something went wrong'
      )
    },
  },
}
</script>