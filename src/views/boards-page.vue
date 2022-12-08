<template>
  <main class="gallery-container flex full">
    <section class="main-container-boards">

      <article class="gallery flex">
        <aside class="gallery-sidebar">

          <nav class="flex column">
            <button class="gallery-nav-btn">
              <span class="icon sm board"></span>
              Boards
            </button>
            <button class="gallery-nav-btn">
              <span class="icon sm template"></span>
              Templates</button>
            <button class="gallery-nav-btn">
              <span class="icon sm pulse"></span>
              Home</button>
          </nav>
          <div class="workspace-div flex justify-between">
            Workspaces
            <!-- <img src="../assets/icons/add.svg" alt=""> -->
          </div>
        </aside>

        <section class="boards-showcase-container">
          <template v-if="boards"
            v-for="display in [{ computed: favoriteBoards, title: 'Favorite Boards' }, { computed: lastViewed, title: 'Last Viewed' }, { computed: boards, title: 'All Boards' }]">
            <section class="boards-showcase">
              <h3 class="gallery-header">
                <span class="icon lg time"></span>
                {{ display.title }}
              </h3>
              <ul class="gallery-list flex wrap">
                <li class="gallery-item" v-for="board in display.computed">
                  <router-link :style="{ 'text-decoration': 'none' }" :to="('/board/' + board._id)">
                    <div class="board-preview" :style="chosenBackground(board.style)">
                      {{ board.title }}
                      <div class="board-preview-options">
                        <span class="icon sm star-empty" @click="toggleStarred(board._id)"></span>
                      </div>
                    </div>
                  </router-link>
                </li>
                <li v-if="(display.computed === boards)"
                  class="fake-board-preview clickable flex align-center justify-center"
                  @click="(boardCreateMode = true)">
                  Create new board
                </li>
              </ul>
           
            </section>
          </template>
        </section>

          <board-creator v-if="boardCreateMode" @saveBoard="saveBoard" @close="closeCreator"
            v-click-outside="closeCreator" />
      </article>
    </section>
  </main>
</template>
  


<script>
import boardCreator from '../cmps/board-creator.vue'
export default {
  name: 'boards-page',
  data() {
    return {
      boardCreateMode: false,
    }
  },
  async created() {
    if (!this.$store.getters.boards) await this.$store.dispatch({ type: "loadBoards" });
  },
  computed: {
    boards() {
      return this.$store.getters.boards
    },
    favoriteBoards() {
      const boards = this.$store.getters.boards
      // console.log(`boards = `, boards)
      return boards.filter(board => board.isStarred)
    },
    lastViewed() {
      const boards = this.$store.getters.boards
      const filteredBoards = boards.filter(board => board.lastViewed)
      return filteredBoards.sort((board1, board2) => board2.lastViewed - board1.lastViewed)
    }
  },
  methods: {
    toggleStarred(boardId) {
      // this.$store.commit({ type: 'toggleStarred', boardId });
    },
    closeCreator() {
      this.boardCreateMode = false
    },
    saveBoard(board) {
      this.$store.dispatch({ type: "addBoard", board })
      this.closeCreator()
    },
    chosenBackground(style) {
      const { backgroundColor, backgroundImage } = style
      if (backgroundImage) return { 'background': `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`, 'background-size': 'cover' }
      return { 'background': `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), ${backgroundColor}` }
    },
  },
  components: {
    boardCreator
  }

}
</script>
  