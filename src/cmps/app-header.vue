<template>
  <header v-if="params === '/'" class="home-page-header">
    <nav>
      <router-link to="/" class="home-logo-page">
        <!-- <img class="logo-img-home"
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
          alt=""> -->
          <img class="logo-img-home" src="../assets/icons/logo.png" alt="">
        </router-link>
        <router-link to="/login">
        <button class="login-button">Log in</button>
      </router-link>
    </nav>
  </header>
  <header v-click-slash="focusInput" v-if="params.includes('board')" class="boards-page">
    <nav>
      <div class="left-header">
        <router-link to="/" class="home-logo-page">
         <img class="logo-img-board" src="../assets/icons/logo-white.svg" alt="">
        </router-link>
        <router-link to="/board">
          <button class="boards-header-btn">Boards</button>
        </router-link>
        <button class="create-board-btn" @click="toggleCreateModal">Create </button>
      </div>
      <div class="right-header">
        <input ref="search" class="search-boards" type="text" placeholder="   &#xF002;  Search" style="font-family:Arial, FontAwesome">
        <button><img class="bell-img-header" src="../assets/icons/bell-regular.png" alt=""></button>
        <button><img class="circle-img-header" src="../assets/icons/circle-question-regular.png" alt=""></button>
        <button><img class="user-img-header" src="../assets/icons/user-solid.png" alt=""></button>
      </div>
    </nav>
    <section class="create-modal">

    </section>
  </header>
</template>
<script>
export default {
  data() {
    return {
      route: this.$route,
      isCreateModalOpen: false,
      // placeholder
    }
  },
  created() {
  },
  methods: {
    toggleCreateModal() {
      this.isCreateModalOpen = !this.isCreateModalOpen
    },
    focusInput(){
      this.$refs.search.focus()
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    params() {
      return this.$route.path
    },
  }
}
</script>