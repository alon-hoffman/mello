
<template>
  <section class="login-signup">
    <router-link to="/">
      <!-- logo-login-page -->
      <img class="logo-login-page"
        src="https://res.cloudinary.com/mello123/image/upload/v1670406786/yd2qyxfpqsuosu76o82o.png" alt="">
    </router-link>
    <section v-if="showLogin" class="login-signup-section">
      <h2 class="login-signup-title">Log in to Mello</h2>
      <p :style="{ color: 'red' }">{{ msg }}</p>
      <form class="login-signup-form" @submit.prevent="login">
        <input class="email-input" ref="email" type="text" v-model="credentials.email" placeholder="Enter email" />
        <input type="password" v-model="credentials.password" placeholder="Password" />
        <button class="login-signup-btn">Login</button>
      </form>
      <div class="change-login-signup-container">
        <button class="change-login-signup-btn" @click="changeShowLogin">Click to Sign up </button>
      </div>
      <!-- here google -->
      <GoogleLogin :callback="callback" />
    </section>
    <section v-else class="login-signup-section">
      <h2 class="login-signup-title">Sign up for your account</h2>
      <p :style="{ color: 'red' }">{{ msg }}</p>
      <form class="login-signup-form" @submit.prevent="signup">
        <input ref="email" class="email-input" type="text" v-model="signupInfo.email" placeholder="Enter email" />
        <input type="text" v-model="signupInfo.fullname" placeholder="Full name" />
        <input type="password" v-model="signupInfo.password" placeholder="Password" />
        <label>
          <div class="fake-button upload-avatar">
            Upload avatar image
            <input type="file" @change="uploadImgToCloud" hidden>
          </div>
          <div v-if="signupInfo.imgUrl" class="user-signup-img">
            <img :src="signupInfo.imgUrl" alt="">
          </div>
        </label>

        <button class="login-signup-btn">Signup</button>
      </form>
      <div class="change-login-signup-container">
        <button class="change-login-signup-btn" @click="changeShowLogin">Click to Log in</button>
      </div>
      <GoogleLogin :callback="callback" />
    </section>
  </section>
</template>


<script>
import { userService } from '../services/user.service.js'
import { uploadService } from '../services/upload.service.js'
import { decodeCredential } from 'vue3-google-login'

export default {
  name: 'login-signup',
  data() {
    return {
      msg: '',
      showLogin: true,
      credentials: {
        email: '',
        password: ''
      },
      signupInfo: {
        fullname: '',
        email: '',
        password: '',
        imgUrl: ''
      },
    }
  },
  methods: {
    callback(response) {
      const userData = decodeCredential(response.credential)
      let googleUser = {
        fullname: userData.name,
        email: userData.email,
        password: userData.name,
        imgUrl: userData.picture
      }
      if (this.showLogin) {
        this.credentials.email = googleUser.email
        this.credentials.password = googleUser.password
        this.login()
      } else {
        this.signupInfo.fullname = googleUser.fullname
        this.signupInfo.email = googleUser.email
        this.signupInfo.password = googleUser.password
        this.signupInfo.imgUrl = googleUser.imgUrl
        this.signup()
      }
    },
    async login() {
      if (!this.credentials.email) {
        this.msg = 'Please enter username/password'
        return
      }
      try {
        const res = await this.$store.dispatch({ type: 'login', cred: this.credentials });
        // console.log(`res = `, res)
        this.$router.push('/board')
      }
      catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },
    changeShowLogin() {
      this.showLogin = !this.showLogin
      this.msg = ''
      setTimeout(() => {
        this.$refs.email.focus()
      }, 0)
    },
    async signup() {
      if (!this.signupInfo.fullname || !this.signupInfo.password || !this.signupInfo.email) {
        this.msg = 'Please fill up the form'
        return
      }
      try{

        await this.$store.dispatch({ type: 'signup', cred: this.signupInfo });
        this.$router.push('/board')
      }
      catch (err) {

        console.log(err)
        this.msg = 'email already taken'
      }
    },
    async uploadImgToCloud(ev) {
      const res = await uploadService.uploadImg(ev);
      this.signupInfo.imgUrl = res.url
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.email.focus()
    }, 0)
  },
  components: {

  }

}
</script>

