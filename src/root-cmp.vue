<template>
  <section>
    <user-msg/>
    <app-header />
    <router-view/>
  </section>
</template>

<script>


import { store } from './store/store'
import appHeader from './cmps/app-header.vue'
import userMsg from './cmps/user-msg.vue'
import { userService } from './services/user.service'


export default {

  async created() {
    await this.$store.dispatch({ type: "loadBoards" })
    const user = userService.getLoggedinUser()
    if (user)  store.commit({type: 'setLoggedinUser', user})
  },
  components: {
    appHeader,
    userMsg
  },
}
</script>