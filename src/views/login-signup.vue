
<template>
  <section class="login-signup">
    <router-link to="/">
      <!-- logo-login-page -->
      <img class="logo-login-page" src="../assets/icons/logo.png" alt="">
    </router-link>
    <section v-if="!showLogin" class="login-section">
      <h2>Login</h2>
      <button class="change-login-btn" @click="changeShowLogin">Click to change to Login/Signup </button>
      <form class="login-signup-form" @submit.prevent="login">
        <input ref="username" type="text" v-model="credentials.username" placeholder="Username" />
        <input type="password" v-model="credentials.password" placeholder="Password" />
        <button class="login-signup-btn">Login</button>
      </form>
    </section>
    <section v-else class="signup-section">
      <h2>Signup</h2>
      <button class="change-login-btn" @click="changeShowLogin">Click to change to Login/Signup </button>
      <form class="login-signup-form" @submit.prevent="signup">
        <input type="text" v-model="signupInfo.fullName" placeholder="Full name" />
        <input type="text" v-model="signupInfo.username" placeholder="Username" />
        <input type="password" v-model="signupInfo.password" placeholder="Password" />
        <button class="login-signup-btn">Signup</button>
      </form>
    </section>
  </section>
</template>


<script>
import { userService } from '../services/user.service.js'
export default {
  name: 'login-signup',
  data() {
    return {
      showLogin: false,
      credentials: {
        username: '',
        password: ''
      },
      signupInfo: {
        fullName: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch({ type: 'login', cred: this.credentials });
      this.$router.push('/board')
    },
    changeShowLogin() {
      this.showLogin = !this.showLogin
    },
    async signup() {
      await this.$store.dispatch({ type: 'signup', cred: this.signupInfo });
      this.$router.push('/board')
    },
  },
  mounted() {
    this.$refs.username.focus()
  }

}
</script>

