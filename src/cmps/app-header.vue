<template>
  <header v-if="params === '/'" class="home-page-header">
    <nav>
      <div class="left-home-header">
      <router-link to="/" class="home-logo-page" @click="modal = ''">
        
        <img class="logo-img-home"
          src="https://res.cloudinary.com/mello123/image/upload/v1670406786/yd2qyxfpqsuosu76o82o.png" alt="">
      </router-link>
      <div class="hamburger" @click="isOpen=! isOpen" :class="{open: isOpen}">
  <span></span>
  <span></span>
  <span></span>
</div>
</div>
      <section class="right-home-header" :class="{open: isOpen}">
        
        <router-link to="/auth">
          <button class="login-button">Log in</button>
        </router-link>
        <button @click="enterAsGuest" class="guest-button clickable">Enter as a guest</button>
      </section>
    </nav>
  </header>
  <header v-click-slash="focusInput" v-if="params.includes('board')" class="boards-page">
    <nav :style="{ backgroundColor: getHeadColor }">


      <div class="left-header" :class="{'show-search': searchOn}">
        <router-link to="/" class="home-logo-page">
          <img class="logo-img-board"
            src="https://res.cloudinary.com/mello123/image/upload/v1670406801/dmvdzqf6o9tnxxnohnb0.png" alt="">
        </router-link>
        <router-link to="/board">
          <button class="boards-header-btn">Boards</button>
        </router-link>
        <button ref="createBtn" class="create-board-btn secondary-btn" @click="openCreateModal">Create </button>
      </div>
      <div class="right-header align-center">
        <div class="search-boards" @click="startSearch">
          <input ref="search" type="text" placeholder="Search" class="board-search-input secondary-btn"
          :class="{'show-search': searchOn}" style="font-family:Arial, FontAwesome" v-model="searchFilter"
          @blur="searchOn=false">
          <span class="magnifying-glass" style="font-family:Arial, FontAwesome">&#xF002;</span>
          <ul class="board-menu" v-if="boards">
            <div class="board-menu-header">{{searchFilter ? 'BOARDS' : 'RECENT BOARDS'}}</div>
            <button v-for="board in boardSearchList" class="board-menu-item flex align-center" @click="selectBoard(board._id)">
              <img v-if="board.style.backgroundImageThumb" class="board-thumbnail" :src="board.style.backgroundImageThumb">
              <img v-else-if="board.style.backgroundImage" class="board-thumbnail" :src="board.style.backgroundImage">
              <div v-else class="board-thumbnail" :style="{backgroundColor: board.style.backgroundColor}"></div>
              <div class="flex column">
                <span>{{board.title}}</span>
                <span class="residence">{{Object.keys(board.createdBy).length ? board.createdBy.fullname + "'s" : 'Mello'}} workplace</span>
              </div>
            </button>
          </ul>
        </div>
        <button v-if="user" class="profile-icon" @click="modal = 'user'"
          :style="{ 'background-image': `url(${user?.imgUrl})` }" :class="{'show-search': searchOn}">
          <span v-if="user && !user?.imgUrl" class="userInitials">{{ userInitials }}</span>
        </button>
        <button v-else class="profile-icon" @click="modal = 'user'" :class="{'show-search': searchOn}">
          <img class="anonymousUser-img" src="../assets/icons/user-solid.png" alt="" >
        </button>
      </div>
    </nav>
    <header-modal v-if="modal === 'about'" v-click-outside="() => modal = null" @closeUserModal="closeUserModal" />
    <user-modal v-if="modal === 'user'" v-click-outside="() => modal = null" @closeUserModal="closeUserModal"/>
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
      searchFilter: '',
      isOpen:false,
      searchOn:false
    }
  },
  components: {
    headerModal,
    userModal,
    boardCreator
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
      console.log(`this.modal = `, this.modal)
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
    selectBoard(id){
      this.searchFilter = ''
      this.$router.push(`/board/${id}`)
      },
      startSearch(){
        this.searchOn= true
        setTimeout(()=>this.focusInput(),1)
      }
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
    boards(){
      return JSON.parse(JSON.stringify(this.$store.getters.boards))
    },
    lastViewed() {
      const boards = this.boards
      return boards.sort((board1, board2) => board2.lastViewed - board1.lastViewed).slice(0, 5);
    },
    searchBoards(){
        const regex = new RegExp(this.searchFilter, 'i')
        return this.boards.filter(board => regex.test(board.title)).slice(0,5)
    },
    boardSearchList(){
      return this.searchFilter ? this.searchBoards : this.lastViewed
    },
  },
}

</script>