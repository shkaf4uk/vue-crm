<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHendler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required,
          }"
        />
        <label for="description">{{ 'Name' | localize }}</label>
        <span
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >{{ 'message_enter_name' | localize }}</span
        >
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocate" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Update_localize' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle'),
    }
  },
  data: () => ({
    name: '',
    isRuLocate: true,
  }),
  validations: {
    name: { required },
  },
  mounted() {
    this.name = this.info.userName
    this.isRuLocate = this.info.locate === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info']),
  },
  methods: {
    ...mapActions(['undateInfo']),
    async submitHendler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.undateInfo({
          userName: this.name,
          locate: this.isRuLocate ? 'ru-RU' : 'en-US',
        })
      } catch (e) {}
    },
  },
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>