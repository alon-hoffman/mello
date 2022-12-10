<template>
  <router-view></router-view>
  <section ref="title" class="board-details"  :style="chosenBackground" v-if="board">
    <div class="board-header">
      <div class="board-header-left">
        <input ref="title" v-if="reactiveTitle" class="board-details-title" type="text" v-model="reactiveTitle" :style="{width:`${(reactiveTitle.length+1.5)*9.82}px`}" @keyup.enter="updateTitle"   @blur="updateTitle">
        <button @click="toggleStar" class="star-board-details-btn" title="Click to star or unstar this board. Starred boards show up at the top of your board list">
          <span v-if="!board.isStarred" class="icon sm star-empty"></span>
          <span v-else class="icon sm star-full" style="color:yellow" ></span>
        </button>
      </div>
      <div class="board-header-right">
        <button class="filter-btn" :class="filterOpen" @click="openFilter">
          <span class="icon sm filter"></span> Filter
        </button>
        <span class="separator-line">|</span>
        <div class="members-and-share-container">
          <div class="member-list"><img class="member-avatar-header" v-for="member in getMembersBoard" :src="member.imgUrl" alt="" /></div>
          
          <button class="add-user-btn">
            <span class="icon sm share"></span> Share
          </button>
        </div>
        <span class="separator-line">|</span>
        <button v-if="!isSidebarMenuModal" @click="openSidebarMenuModal" class="more-btn clickable">
          <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
              fill="currentColor"></path>
          </svg>
        </button>
        <sidebarMenuModal v-else :currBoard="board" @closeSidebarMenuModal="closeSidebarMenuModal" @editCard="toggleEdit"/>
      </div>
    </div>
    <group-list @addCard="addCard"
                @editCard="toggleEdit" 
                @saveList="saveList"
                @toggleIsCompleted="updateCard"
                @openListModal="openListModal"
                :isSidebarMenuModal="isSidebarMenuModal"
                v-if="board.groups" :lists="board.groups" />

    <listModal v-if="listModalOpen" :list="list"
                :listModalCords="listModalCords" 
                @archiveList="archiveList"
                @deleteList="deleteList" 
                @duplicateList="duplicateList"
                @closeTitleModal="(listModalOpen=false)"/>

    <filter-menu v-if="isFilterMenu"
                 :filterBy="filterBy"
                 :board="board"
                 v-click-outside="closeFilter"
                 @updateFilter="updateFilter"
                 @close="closeFilter"
                 />

  </section>
</template>

<script>
import sidebar from "../cmps/sidebar.vue"
import groupList from "../cmps/group-list.vue"
import cardEdit from "../cmps/card-edit.vue"
import listModal from "../cmps/list-modal.vue"
import sidebarMenuModal from "../cmps/sidebar-menu-modal.vue"
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG,SOCKET_EMIT_BOARD_UPDATED, SOCKET_EMIT_SET_TOPIC} from '../services/socket.service'
import filterMenu from "../cmps/filter-menu.vue"

export default {
  components: {
    sidebar,
    groupList,
    cardEdit,
    listModal,
    sidebarMenuModal,
    filterMenu,
  },
  data(){
    return{
      listModalOpen: false,
      list:null,
      reactiveTitle:null,
      listModalCords:{
        y:null,
        x:null
      },
      isSidebarMenuModal:false,
      isFilterMenu: false,
      filterBy: {
                keyword: '',
                labels: [],
                members: [],
              }
            }
          },
          async created() {
            if(!this.$store.getters.boards) await this.$store.dispatch({ type: "loadBoards" });
            const { boardId } = this.$route.params
            socketService.emit(SOCKET_EMIT_SET_TOPIC, boardId)
            socketService.on(SOCKET_EMIT_BOARD_UPDATED, (board)=>{ 
              this.$store.commit({ type: "updateBoard", board })
    })
            this.$store.commit({ type: 'setBoardById',  id:boardId });
            const board = JSON.parse(JSON.stringify(this.$store.getters.getCurrBoard||{}))
            this.reactiveTitle= board.title
            board.lastViewed= Date.now()
            this.updateBoard(board)
          },
  computed: {
    isScreen() {
      return this.$store.getters.isScreen;
    },
    isFilter(){
      if(!this.filterBy) return false
      const {keyword, members, labels} = this.filterBy
      if (!keyword && !members.length && !labels.length) return false
      return true
    },
    getMembersBoard(){
      return this.$store.getters.getMembersOfBoard
    },
    board(){
      const board = JSON.parse(JSON.stringify(this.$store.getters.getCurrBoard||{}))
      
      if(!this.isFilter) return board
      const {labels, members, keyword} = this.filterBy
      const regex = new RegExp(keyword, 'i')
      board.groups = board.groups.filter(group => {

        // KEYWORD FILTER
        if (keyword){
          if(regex.test(group.title)) return true
          group.cards = group.cards.filter(card => regex.test(card.title))
          if (!group.cards.length) return false
        } 
        // LABEL FILTER
        if (labels.length){
          group.cards = group.cards.filter(card => {
            if (!card.labels || !card.labels.length) return false
            return card.labels.some(label => labels.includes(label))})
          if (!group.cards.length) return false
        }

        // MEMBERS FILTER
        if(members.length){
          group.cards = group.cards.filter(card => {
            if (!card.members || !card.members.length) return false
            return card.members.some(member => members.includes(member.fullname))})
          if (!group.cards.length) return false
        }
        return true
      })
      return board
    },
    chosenBackground(){
      if(this.board.style){
        const {backgroundColor, backgroundImage} = this.board.style
        if(backgroundImage) return {'background': `url(${backgroundImage})`, 'background-size': '100% 100%','background-repeat': 'no-repeat'}
        return {'background': backgroundColor}
      }
      },
      filterOpen(){
        return {open: this.isFilterMenu}
      }
  },
  methods: {
    toggleEdit(cardId) {
      this.$store.commit({ type: "setCurrCard",cardId} );
      const id= this.$store.getters.getCurrBoard._id
      this.$router.push(`/board/${id}/card/${cardId}`)
    },
    toggleStar(){
      const board = JSON.parse(JSON.stringify(this.$store.getters.getCurrBoard||{}))
      board.isStarred =!board.isStarred
      this.updateBoard(board)
    },
    updateTitle(){
      const board = JSON.parse(JSON.stringify(this.$store.getters.getCurrBoard||{}))
      board.title= this.reactiveTitle
      this.$refs.title.blur()
      this.updateBoard(board)
    },
    updateBoard(board = this.board){
      this.$store.dispatch({type: 'updateBoard', board})
    },
    addCard(card){
      const activity = {card, action: 'addCard'}
      this.$store.dispatch({type: 'addActivity', activity})
      this.$store.dispatch({ type: 'addCard', card})
    },
    updateCard(card){
      this.$store.dispatch({ type: 'saveCard', card})
    },
    updateLabels(labels){
      this.$store.commit({ type: "updateLabels",labels });
    },
    saveList(list) {
      this.$store.dispatch({ type: "addList", list });
    },
    openListModal(y, x, list){
      this.listModalCords.y = y
      this.listModalCords.x = x
      this.list=list
      this.listModalOpen=true
    },
    archiveList(groupId){
      this.$store.dispatch({ type: "archiveList", groupId})
    },
    deleteList(groupId){
      this.$store.dispatch({ type: 'addActivity' , activity: {action: 'removeList', card: {groupId}}})
      this.$store.dispatch({ type: "removeList", groupId });
    },
    openSidebarMenuModal(){
      this.isSidebarMenuModal=true
    },
    closeSidebarMenuModal(){
      this.isSidebarMenuModal=false
    },
    duplicateList(list){
      this.$store.dispatch({ type: "duplicateList", list });
    },
    openFilter(){
      this.isFilterMenu = true
    },
    closeFilter() {
      this.isFilterMenu = false
    },
    updateFilter(filter){
      this.filterBy = filter
    },
  },
};
</script>
