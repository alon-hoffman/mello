<template>
  <router-view></router-view>
  <section class="board-details"  :style="chosenBackground" v-if="board">
    <!-- <sidebar/> -->
    <!-- <card-edit :isScreen="isScreen" @toggleEdit="toggleEdit" @updateCard="updateCard" @updateLabels="updateLabels"/> -->
    <div class="board-header">
      <div class="board-header-left">
        <!-- <h1 class="editable board-details-title">{{board.title}}</h1> -->
        <input class="board-details-title" type="text" v-model="board.title" v-click-outside="updateBoard">
        <button class="star-board-details-btn">
          <span class="icon sm star-empty"></span>
        </button>
      </div>
      <div class="board-header-right">
        <button class="filter-btn" @click="openFilter">
          <span class="icon sm filter"></span> Filter
        </button>
        <span class="separator-line">|</span>
        <div class="member-list"><img src="" alt="" /></div>
        
        <button class="add-user-btn" title="Click to star or unstar this board. Starred boards show up at the top of your board list">
          <span class="icon sm share"></span> Share
        </button>
        <span class="separator-line">|</span>
        <button v-if="!isSidebarMenuModal" @click="openSidebarMenuModal" class="more-btn clickable">
          <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
              fill="currentColor"></path>
          </svg>
        </button>
        <sidebarMenuModal v-else  @closeSidebarMenuModal="closeSidebarMenuModal"/>
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
                :listModalCords="listModalCords" @deleteList="deleteList" @duplicateList="duplicateList"/>

    <filter-menu v-if="isFilterMenu" :filterBy="filterBy" :board="board" v-click-outside="closeFilter"/>

  </section>
</template>

<script>
import sidebar from "../cmps/sidebar.vue"
import groupList from "../cmps/group-list.vue"
import cardEdit from "../cmps/card-edit.vue"
import listModal from "../cmps/list-modal.vue"
import sidebarMenuModal from "../cmps/sidebar-menu-modal.vue"
import filterMenu from "../cmps/filter-menu.vue"
//icons

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
      listModalCords:{
        y:null,
        x:null
      },
      isSidebarMenuModal:false,
      isFilterMenu: false,
      filterBy:{
        keyword: '',
        dueDate: '',
        labels: [],
      }
    }
  },
  computed: {
    isScreen() {
      return this.$store.getters.isScreen;
    },
    board() {
      return JSON.parse(JSON.stringify(this.$store.getters.getCurrBoard||{}))
    },
    chosenBackground(){
      if(this.board.style){
        const {backgroundColor, backgroundImage} = this.board.style
        if(backgroundImage) return {'background': `url(${backgroundImage})`, 'background-size': 'cover'}
        return {'background': backgroundColor}
      }
      },
  },
  async created() {
    if(!this.$store.getters.boards) await this.$store.dispatch({ type: "loadBoards" });
    // todo check if the param really is _id
    const { boardId } = this.$route.params
    this.$store.commit({ type: 'setBoardById',  id:boardId });
    console.log(this.board.members)
  },
  methods: {
    toggleEdit(cardId) {
      this.$store.commit({ type: "setCurrCard",cardId} );
      const id= this.$store.getters.getCurrBoard._id
      this.$router.push(`/board/${id}/card/${cardId}`)
    },
    updateBoard(){
      this.$store.dispatch({type: 'updateBoard', board: this.board})
    },
    addCard(card){
      this.$store.dispatch({ type: 'addCard', card})
    },
    updateCard(card){
      this.$store.dispatch({ type: 'saveCard', card})
    },
    updateLabels(labels){
      this.$store.commit({ type: "updateLabels",labels });
    },
    saveList(list) {
      // this.board.groups.push({ title })
      this.$store.dispatch({ type: "addList", list });
    },
    openListModal(y, x, list){
      this.listModalCords.y = y
      this.listModalCords.x = x
      this.list=list
      this.listModalOpen=true
    },
    deleteList(groupId){
      this.$store.dispatch({ type: "removeList", groupId });
    },
    openSidebarMenuModal(){
      this.isSidebarMenuModal=true
    },
    closeSidebarMenuModal(){
      this.isSidebarMenuModal=false
    },
    duplicateList(list){
      console.log("🚀 ~ file: board-details.vue:117 ~ duplicateList ~ list", list)
      this.$store.dispatch({ type: "duplicateList", list });
    },
    openFilter(){
      this.isFilterMenu = true
    },
    closeFilter() {
      this.isFilterMenu = false
    },
  },
};
</script>
