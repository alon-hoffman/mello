<template>
  <main class="gallery-container flex full">
    <section class="main-container-boards">

      <article class="gallery flex">
        <aside class="gallery-sidebar">

          <nav class="flex">
            <button  @click="setArchive(false, $event)"  class="gallery-nav-btn" :class="{active:!archived}">
              <span class="icon sm board board-btn-page"></span>
              Boards
            </button>
            <button  @click="setArchive(true, $event)"  class="gallery-nav-btn" :class="{active:archived}">
              <span class="icon sm archive"></span>
              Archive</button>
            <button @click="$router.push(to='/')" class="gallery-nav-btn">
              <span  class="icon sm pulse"></span>
              Home</button>
          </nav>
          
        </aside>

        <section  class="boards-showcase-container">
          <template v-if="boards"
            v-for="display in boardGroups">
              <h3 class="gallery-header">
                <span :class="display.icon"></span>
                {{ display.title }}
              </h3>
              <ul class="gallery-list boards-showcase-container">
                <li class="gallery-item" v-for="board in display.computed">
                  <router-link :style="{ 'text-decoration': 'none' }" :to="('/board/' + board._id)">
                    <div class="board-preview" :style="chosenBackground(board.style)">
                      {{ board.title }}
                      <div v-if="!board.isStarred" class="board-preview-options"  @click.stop="toggleStarred(board)">
                        <span class="icon sm star-empty"></span>
                      </div>
                      <div v-else class="star-container"  @click.stop="toggleStarred(board)">
                        <span class="icon sm star-full"></span>
                      </div>
                    </div>
                  </router-link>
                </li>
                <li  @click="(boardCreateMode = true)" v-if="(display.computed === boards)"
                  class="clickable gallery-item ">
                  <div class="board-preview fake-board-preview flex align-center">Create new board</div>
                </li>
              </ul>
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
      archived:false
    }
  },
  async created() {
    if (!this.$store.getters.boards) await this.$store.dispatch({ type: "loadBoards" })
    //need to watch out may be too big to send request every time
  },
  computed: {
    boardGroups(){
      if(this.archived)return [{computed:this.archivedBoard, title:"Archived boards",icon:"icon lg archive"}]
      // if(this.archived)  console.log( "archived")
      return [{ computed: this.favoriteBoards, title: 'Starred Boards',icon:'icon lg star-empty' },
       { computed: this.lastViewed, title: 'Recently Viewed',icon:'icon lg time' }, 
       { computed: this.boards, title: 'All Boards',icon:'' }]
    },
    boards() {
      // console.log(`this.$store.getters.boards = `, this.$store.getters.boards)
      return this.$store.getters.boards?.filter(board => !board.isArchived);
    },
    favoriteBoards() {
      const boards = this.$store.getters.boards
      // console.log(`boards = `, boards)
      return boards.filter(board => board.isStarred).filter(board => !board.isArchived)
    },
    lastViewed() {
      const boards = this.$store.getters.boards.filter(board => !board.isArchived);
      const filteredBoards = boards.filter(board => board.lastViewed)
      return filteredBoards.sort((board1, board2) => board2.lastViewed - board1.lastViewed).slice(0, 4);
    },
    archivedBoard(){
      return this.$store.getters.boards?.filter(board => board.isArchived)
    }
  },
  methods: {
    toggleStarred(board) {
      board.isStarred = !board.isStarred
      this.$store.dispatch({ type: "updateBoard", board:this.currBoard })
    },
    closeCreator() {
      this.boardCreateMode = false
    },
    async saveBoard(board) {
    await  this.$store.dispatch({ type: "addBoard", board })
      this.closeCreator()
      const newBoard= this.$store.getters.boards[this.$store.getters.boards.length - 1]
      
      this.$router.push('/board/' + newBoard._id)

    },
    chosenBackground(style) {
      const { backgroundColor, backgroundImage, backgroundImageThumb } = style
      if(backgroundImageThumb) return { 'background': `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.0)), url(${style.backgroundImageThumb})`, 'background-size': 'cover' }
      if(backgroundImage) return { 'background': `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.0)), url(${style.backgroundImage})`, 'background-size': 'cover' }
      return { 'background': `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), ${backgroundColor}` }
    },
    setArchive(bool, ev){
      this.archived= bool
      // for (const btn in this.$refs){
      //   console.log("🚀 ~ file: boards-page.vue:124 ~ setArchive ~ btn", btn)
      //   btn.classList.remove('active')
      // }
    }
  },
  components: {
    boardCreator
  }

}
</script>
  