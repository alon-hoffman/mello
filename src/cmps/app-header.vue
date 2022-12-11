<template>
  <header v-if="params === '/'" class="home-page-header">
    <nav>
      <router-link to="/" class="home-logo-page">
        <!-- <img class="logo-img-home"
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
          alt=""> -->
        <img class="logo-img-home"
          src="https://res.cloudinary.com/mello123/image/upload/v1670406786/yd2qyxfpqsuosu76o82o.png" alt="">
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
    <nav :style="{ backgroundColor: getHeadColor }">


      <div class="left-header">
        <router-link to="/" class="home-logo-page">
          <img class="logo-img-board"
            src="https://res.cloudinary.com/mello123/image/upload/v1670406801/dmvdzqf6o9tnxxnohnb0.png" alt="">
        </router-link>
        <router-link to="/board">
          <button class="boards-header-btn">Boards</button>
        </router-link>
        <button ref="createBtn" class="create-board-btn secondary-btn" @click="openCreateModal">Create </button>
      </div>
      <div class="right-header">
        <div class="search-boards">
          <input ref="search" type="text" placeholder="Search" class="board-search-input"
            style="font-family:Arial, FontAwesome">
          <span class="magnifying-glass" style="font-family:Arial, FontAwesome">&#xF002;</span>
        </div>
        <!-- <button><img class="bell-img-header" src="../assets/icons/bell-regular.png" alt=""></button> -->

        <button class="secondary-btn"><img class="circle-img-header" @click="modal = 'about'"
            src="../assets/icons/circle-question-regular.png" alt=""></button>
        <button class=" secondary-btn" @click="modal = 'user'">
          <img v-if="user?.imgUrl" class="user-img-header" :src="getUserImg" alt="../assets/icons/user-solid.png">
          <span v-else-if="user" class="userInitials">{{ userInitials }}</span>
          <img v-else class="anonymousUser-img" src="../assets/icons/user-solid.png" alt="">
        </button>
      </div>
    </nav>
    <header-modal v-if="modal === 'about'" v-click-outside="() => modal = null" @closeUserModal="closeUserModal"/>
    <user-modal v-if="modal === 'user'" v-click-outside="() => modal = null" />
    <board-creator :modalCords="modalCords" v-if="modal === 'create'" v-click-outside="() => modal = null"
      @saveBoard="saveBoard" />


  </header>
</template>
<script>
import { FastAverageColor } from 'fast-average-color';
import { utilService } from '../services/util.service';
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_BOARD_UPDATED, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'
import { takeWhile } from 'lodash';
import headerModal from './about-modal.vue'
import userModal from './user-modal.vue'
import boardCreator from './board-creator.vue'


export default {
  data() {
    return {
      route: this.$route,
      isCreateModalOpen: false,
      isUserModalOpen: false,
      headColor: '',
      fac: new FastAverageColor(),
      isUserModalOpen: false,
      modal: null,
      modalCords: null,
      
      // placeholder
    }
  },
  created() {
  },
  components: {
    headerModal,
    userModal,
    boardCreator
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
    enterAsGuest() {
      this.$router.push('/board')
    },

    openUserModal() {
      this.isUserModalOpen = true
    },
    closeUserModal() {
      this.modal = null
    },
    async getAverageColor(imgUrl) {
      try {
        let res = await this.fac.getColorAsync(imgUrl)
        return res.hex
      }
      catch (err) {
        console.log(`err = `, err)
      }
    },
    openCreateModal() {
      const { y, x } = this.$refs.createBtn.getBoundingClientRect()
      this.modalCords = { y, x }
      this.modal = 'create'
    },
    async saveBoard(board) {
      await this.$store.dispatch({ type: "addBoard", board })
      const newBoard = this.$store.getters.boards[this.$store.getters.boards.length - 1]
      this.$router.push('/board/' + newBoard._id)
    },
    getParams() {
      if (this.$route.path.includes('board/'))
        this.getHeaderColor()
      return
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    params() {
      return this.$route.path
    },
    board() {

      return this.$store.getters.getCurrBoard
    },
    getHeadColor() {
      if (this.$route.path.includes('board/')) {
        if (this.board?.style?.backgroundImage) return this.board?.style?.averageImgColor
        return this.board?.style.backgroundColor + 'aa'
      }
      else return '#026AA7'
    },
    getUserImg() {
      const user = this.$store.getters.loggedinUser
       return user.imgUrl
      
    },
    userInitials() {
      const userInitials = this.user.fullname.split(' ');
      const initials = userInitials.shift().charAt(0) + userInitials.pop().charAt(0);
      return initials.toUpperCase();
    },
    user(){
return this.$store.getters.loggedinUser
    },
  },
  watch: {
    // $route :{
    //   handler(to, from){
    //     this.headColor="#026AA7"
    //     if(this.modal) this.modal=null
    //     if (this.$route.path.includes('board/'))
    //     this.setHeaderColor()  
    //   },
    //   deep:true
    // }
  }
}

</script>