<template>
  <div class="grey darken-1 empty-layout">
    <form class="card auth-card" @submit.prevent="submitRegisterForm">
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{
              invalid:
                ($v.email.$dirty && !$v.email.required) ||
                ($v.email.$dirty && !$v.email.email),
            }"
          />
          <label for="email">Email</label>
          <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
            >Поле Email не должно быть пустым</small
          >
          <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
            >Введите корректный Email</small
          >
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{
              invalid:
                ($v.password.$dirty && !$v.password.required) ||
                ($v.password.$dirty && !$v.password.minLength),
            }"
          />
          <label for="password">Пароль</label>
          <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
            >Введите password</small
          >
          <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
            >Password должен быть минимум
            {{ $v.password.$params.minLength.min }} символов. Сейчас он
            {{ password.length }}</small
          >
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="userName"
            :class="{ invalid: $v.userName.$dirty && !$v.userName.required }"
          />
          <label for="name">Имя</label>
          <small
            class="helper-text invalid"
            v-if="$v.userName.$dirty && !$v.userName.required"
            >Введите ваше имя</small
          >
        </div>
        <p>
          <label>
            <input type="checkbox" v-model="agree" />
            <span>С правилами согласен</span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Зарегистрироваться
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Уже есть аккаунт?
          <router-link to="/login">Войти!</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  metaInfo() {
    return {
      title: this.$title('Registration'),
    }
  },
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    userName: '',
    agree: false,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    userName: { required },
    agree: { checked: (v) => v },
  },
  methods: {
    async submitRegisterForm() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        userName: this.userName,
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (error) {}
    },
  },
}
</script>