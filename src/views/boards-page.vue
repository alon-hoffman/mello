<template>
    <main class="gallery-container flex full">
      <article class="gallery flex">
      <aside class="gallery-sidebar">
        <nav class="flex column">
          <button class="gallery-nav-btn flex">
              <img src="../assets/icons/trello.svg" alt="">
              Boards
            </button>
          <button class="gallery-nav-btn flex">
            <img src="../assets/icons/trello.svg" alt="">
            Templates</button>
          <button class="gallery-nav-btn">
            <img src="../assets/icons/home.svg" alt="hm">
            Home</button>
        </nav>
        <div class="flex justify-between">
          Workspaces
          <img src="../assets/icons/add.svg" alt="">
        </div>
      </aside>
      
      <section class="full">
      <h3 class="gallery-header">
          <img src="../assets/icons/time.png" alt="">
        Recently viewed
      </h3>
      <ul class="gallery-list flex wrap">
        <li class="gallery-item">
            <router-link :to="'/board/' + 'taco'">
            <div class="board-preview">
              Traco
              <div class="board-preview-options">
                <img class="icon" src="../assets/icons/star-regular.svg" alt="star-regular">
              </div>
            </div>
          </router-link>
        </li>
        <li class="gallery-item">
          <div class="board-preview">
            Dummy board
            <div class="board-preview-options">
              <img class="icon" src="../assets/icons/star-regular.svg" alt="star-regular">
            </div>
          </div>
        </li>
        <li class="gallery-item">
          <div class="board-preview">
            Dummy board
            <div class="board-preview-options">
              <img class="icon" src="../assets/icons/star-regular.svg" alt="star-regular">
            </div>
          </div>
        </li>
        <li class="gallery-item">
          <div class="board-preview">
            Dummy board
            <div class="board-preview-options">
              <img class="icon" src="../assets/icons/star-regular.svg" alt="star-regular">
            </div>
          </div>
        </li>
        <li class="gallery-item">
          <div class="board-preview">
            Dummy board
            <div class="board-preview-options">
              <img class="icon" src="../assets/icons/star-regular.svg" alt="star-regular">
            </div>
          </div>
        </li>
        <!-- <li class="board-preview">Dummy board</li>
        <li class="board-preview">Dummy board</li>
        <li class="board-preview">Dummy board</li>
        <li class="board-preview">Dummy board</li> -->

        <!-- <li class="board-preview" v-for="board in boards">
          Dummy board
        </li> -->
      </ul>
    </section>

  </article>
    </main>
  
    
  </template>
  
  <script>
  export default {
    name: 'boards-page',
    data() {
      return {
        boards:null,
      }
    },
    computed: {
    },
   async created() {
    this.boards=await this.$store.dispatch({ type: "loadBoards" });
    },
    methods: {
    }
    
  }
  </script>
  