<template>
  <section class="board-details" v-if="board">
    <!-- <sidebar/> -->
    <card-edit :isScreen="isScreen" @toggleEdit="toggleEdit" @updateCard="updateCard" @updateLabels="updateLabels"/>
    <div class="board-header">
      <div class="board-header-left">
        <h1 class="editable board-details-title">Traco</h1>
        <button class="star-board-details-btn">
          <img class="star-img-board" src="../assets/icons/star-regular-2.png" alt="" />
        </button>
      </div>
      <div class="board-header-right">
        <button class="filter-btn">
          <img class="filter-img-board" src="../assets/icons/filter.png" />Filter
        </button>
        <div class="member-list"><img src="" alt="" /></div>
        <button class="add-user-btn">
          <img class="add-user-img" src="../assets/icons/add-user.png" /> share
        </button>
        <button class="more-btn">
          <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
              fill="currentColor"></path>
          </svg>
        </button>
      </div>
    </div>
    <group-list @saveList="saveList"
                @cardEdit="toggleEdit" 
                v-if="board.groups" :lists="board.groups" />
  </section>
</template>

<script>
import sidebar from "../cmps/sidebar.vue";
import groupList from "../cmps/group-list.vue";
import cardEdit from "../cmps/card-edit.vue";
//icons

export default {
  components: {
    sidebar,
    groupList,
    cardEdit,
  },
  computed: {
    isScreen() {
      return this.$store.getters.isScreen;
    },
    board() {
      return JSON.parse(JSON.stringify(this.$store.getters.getCurrBoard))
    },
  },
  async created() {
    if(!this.$store.getters.boards) await this.$store.dispatch({ type: "loadBoards" });
    // todo check if the param really is _id
    const { _id } = this.$route.params
    await this.$store.commit({ type: "setBoardById"}, {_id });
  },
  methods: {
    toggleEdit(cardId) {
      this.$store.commit({ type: "toggleScreen" });
    },
    saveList(list){
      this
      this.$store.dispatch({ type: 'saveList', list})
    },
    updateCard(card){
      this.$store.dispatch({ type: 'saveCard', card})
    },
    updateLabels(labels){
      this.$store.commit({ type: "updateLabels",labels });
    }
    // saveList(list) {
    //   console.log("🚀 ~ file: board-details.vue:84 ~ updateList:", list)
    //   // this.board.groups.push({ title })
    //   this.$store.dispatch({ type: "updateBoard", list });
    // },
  },
};
</script>
