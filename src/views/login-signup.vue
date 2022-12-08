
<template>
  <section class="login-signup">
    <router-link to="/">
      <!-- logo-login-page -->
      <img class="logo-login-page" src="https://res.cloudinary.com/mello123/image/upload/v1670406786/yd2qyxfpqsuosu76o82o.png" alt="">
    </router-link>
    <section v-if="!showLogin" class="login-signup-section">
      <h2 class="login-signup-title">Log in to Mello</h2>
      <form class="login-signup-form" @submit.prevent="login">
        <input class="email-input" ref="email" type="text" v-model="credentials.email" placeholder="Enter email" />
        <input type="password" v-model="credentials.password" placeholder="Password" />
        <button class="login-signup-btn">Login</button>
      </form>
      <div class="change-login-signup-container">
        <button class="change-login-signup-btn" @click="changeShowLogin">Click to Sign up </button>
      </div>
    </section>
    <section v-else class="login-signup-section">
      <h2 class="login-signup-title">Sign up for your account</h2>
      <form class="login-signup-form" @submit.prevent="signup">
        <input type="text" v-model="signupInfo.fullName" placeholder="Full name" />
        <input class="email-input" type="text" v-model="signupInfo.email" placeholder="Enter email" />
        <input type="password" v-model="signupInfo.password" placeholder="Password" />
        <button class="login-signup-btn">Signup</button>
      </form>
      <div class="change-login-signup-container">
        <span class="change-login-signup-btn" @click="changeShowLogin">Click to Log in</span>
      </div>
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
        email: '',
        password: ''
      },
      signupInfo: {
        fullName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch({ type: 'login', cred: this.credentials });
      this.$router.push('/#/board')
    },
    changeShowLogin() {
      this.showLogin = !this.showLogin
      setTimeout(()=>{
      this.$refs.email.focus()
    },0)
    },
    async signup() {
      await this.$store.dispatch({ type: 'signup', cred: this.signupInfo });
      this.$router.push('/board')
    },
  },
  mounted() {
    setTimeout(()=>{
      this.$refs.email.focus()
    },0)
  }

}
</script>

