<template>
  <header v-if="params === '/'" class="home-page-header">
    <nav>
      <router-link to="/" class="home-logo-page">
        <!-- <img class="logo-img-home"
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
          alt=""> -->
        <img class="logo-img-home" src="https://res.cloudinary.com/mello123/image/upload/v1670406786/yd2qyxfpqsuosu76o82o.png" alt="">
      </router-link>
      <section class="right-home-header">
        <router-link to="/auth">
          <button class="login-button">Log in</button>
        </router-link>
        <button @click="enterAsGuest" class="guest-button clickable">Enter as a guest</button>
      </section>
    </nav>
  </header>
  <header v-click-slash="focusInput" v-if="params.includes('board')" class="boards-page">
    <nav>
      <div class="left-header">
        <router-link to="/" class="home-logo-page">
          <img class="logo-img-board" src="https://res.cloudinary.com/mello123/image/upload/v1670406801/dmvdzqf6o9tnxxnohnb0.png" alt="">
        </router-link>
        <router-link to="/board">
          <button class="boards-header-btn">Boards</button>
        </router-link>
        <button class="create-board-btn" @click="toggleCreateModal">Create </button>
      </div>
      <div class="right-header">
        <div class="search-boards">
          <input ref="search" type="text" placeholder="Search" class="board-search-input"
          style="font-family:Arial, FontAwesome">
          <span class="magnifying-glass" style="font-family:Arial, FontAwesome">&#xF002;</span>
        </div>
        <button><img class="bell-img-header" src="../assets/icons/bell-regular.png" alt=""></button>
        <button><img class="circle-img-header" src="../assets/icons/circle-question-regular.png" alt=""></button>
        <button class="open-user-modal-btn" @click="openUserModal"><img class="user-img-header" src="../assets/icons/user-solid.png" alt=""></button>
      </div>
    </nav>
    <section class="user-modal" v-if="isUserModalOpen">
<span class="mini-head">hello</span>
    </section>
    <section class="create-modal">

    </section>
  </header>
</template>
<script>
import { FastAverageColor } from 'fast-average-color';

export default {
  data() {
    return {
      route: this.$route,
      isCreateModalOpen: false,
      isUserModalOpen:false,
      // placeholder
    }
  },
  created() {
  },
  methods: {
    toggleCreateModal() {
      this.isCreateModalOpen = !this.isCreateModalOpen
    },
    focusInput() {
      this.$refs.search.focus()
    },
    enterAsGuest(){
      this.$router.push('/board')
    },
    openUserModal(){
this.isUserModalOpen=true
    },
    closeUserModal(){
      this.isUserModalOpen=false
    }


  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    params() {
      return this.$route.path
    },
    avgColor() {
      const fac = new FastAverageColor();
      fac.getColorAsync(this.$store.getters.getBoardImg)
        .then(color => {
          console.log(color)
        })
        .catch(e => {
          console.log(e);
        });
    },
  }
}
</script>