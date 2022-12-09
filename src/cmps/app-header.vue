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
        <button ref="createBtn" class="create-board-btn" @click="openCreateModal">Create </button>
      </div>
      <div class="right-header">
        <div class="search-boards">
          <input ref="search" type="text" placeholder="Search" class="board-search-input"
            style="font-family:Arial, FontAwesome">
          <span class="magnifying-glass" style="font-family:Arial, FontAwesome">&#xF002;</span>
        </div>
        <button><img class="bell-img-header" src="../assets/icons/bell-regular.png" alt=""></button>

        <button><img class="circle-img-header" @click="modal = 'about'" src="../assets/icons/circle-question-regular.png"
            alt=""></button>
        <button class="open-user-modal-btn" @click="modal = 'user'"><img class="user-img-header"
            src="../assets/icons/user-solid.png" alt=""></button>
      </div>
    </nav>
    <header-modal v-if="modal === 'about'" v-click-outside="() => modal = null" />
    <user-modal v-if="modal === 'user'" v-click-outside="() => modal = null" />
    <board-creator :modalCords="modalCords" v-if="modal === 'create'" v-click-outside="() => modal = null" />


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
      modalCords: null
      // placeholder
    }
  },
  async created() {
   
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
      this.isUserModalOpen = false
    },
    async getAverageColor(imgUrl) {
      let res = await this.fac.getColorAsync(imgUrl)
      return res.hex
    },
    async setHeaderColor() {
      let board = this.$store.getters.getCurrBoard
      if (board?.style.backgroundColor) this.headColor =board?.style.backgroundColor+'aa'
      else{
        let boardHeaderColor =await this.getAverageColor(board?.style.backgroundImage)
        this.headColor =boardHeaderColor
        //  this.blendHexColors(boardHeaderColor,'#f0f0f0',20 ) 
      }
    },
   blendHexColors(c0, c1, p) {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
},
    openCreateModal() {
      const { y, x } = this.$refs.createBtn.getBoundingClientRect()
      this.modalCords = { y, x }
      this.modal = 'create'
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
    getHeadColor() {
      console.log(`this.headColor = `, this.headColor)
      if (!this.headColor||this.headColor==="#026AA7") return "#026AA7"
      else return this.headColor
    },
  },
  watch:{
    $route (to, from){
      this.headColor="#026AA7"
      console.log(`foo = `)
      setTimeout(()=>{

        if (this.$route.path.includes('board/'))
        this.setHeaderColor()
      },500)
       
    },
        // this.show = false;
    }
  }

</script>