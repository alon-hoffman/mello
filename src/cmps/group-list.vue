<template>
  <section v-if="lists" class="group-list" :class="{'menu-modal-open':isSidebarMenuModal}">
    <ul class="clean-list">

      <Container orientation="horizontal" class="list-containers" @drop="onColumnDrop($event)" drag-handle-selector=".column-drag-handle"
        :drop-placeholder="upperDropPlaceholderOptions">
        <Draggable v-for="list in lists" :key="list.id">
          <card-group class="column-drag-handle" @edit="$emit('edit')" :list="list" :lists="lists" @editCard="editCard"  @toggleIsCompleted="toggleIsCompleted"
            @addCard="addCard" @openListModal="openListModal"  />
        </Draggable>
        <button v-if="!isNewListEdit" class="add-line-btn clickable" @click="openEditArea">Add another
          list</button>
        <div v-else @submit.prevent="addList" class="add-list-section" v-click-outside="closeEdit">
          <input type="text" v-model="newTitle" ref="newTitle" placeholder="Enter list title..." />
          <div class="buttons">
            <button @click="addList" @keyup.enter="addCard" class="clickable add-list">Add list</button>
            <button @click="isNewListEdit = false" class="icon ex clickable close-modal"></button>&nbsp
          </div>
        </div>
      </Container>
    </ul>

  


  </section>
</template>

<script>
import cardGroup from "./card-group.vue"
import { boardService } from '../services/board-service-local'
import { Container, Draggable } from "vue3-smooth-dnd"
export default {
  props: {
    lists: Array,
    isSidebarMenuModal:Boolean,
  },
  data() {
    return {
      isNewListEdit: false,
      newTitle: '',
      upperDropPlaceholderOptions: {
        className: 'cards-drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true
      }
    };
  },
  created() {
  },
  components: {
    cardGroup,
    Container,
    Draggable,
  },
  computed: {},
  created() { },
  methods: {
    addList() {
      this.$emit('saveList', { title: this.newTitle, cards: [] })
    },
    addCard(card) {
      this.$emit("addCard", card)
    },
    closeEdit() {
      this.isNewListEdit = false
    },
    editCard(cardId) {
      this.$emit("editCard", cardId)
    },
    onColumnDrop(dropResult) {
      let lists = JSON.parse(JSON.stringify(this.lists))
      lists = boardService.applyDrag(lists, dropResult)
      this.$store.dispatch({ type: "saveLists", lists })
      // this.list = scene
    },
     openEditArea(){
      this.isNewListEdit=true
      setTimeout(()=>{
        this.$refs.newTitle.focus()
      },)
    },
  toggleIsCompleted(card){
      this.$emit("toggleIsCompleted",card)
    },
    openListModal(y, x, list){
      this.$emit("openListModal", y, x, list)        
    }
  },
  // watch: {
  //   lists: {
  //     handler(newVal, oldVal) {

  //       // dispatch({ type: "updateBoard", board:currBoard })
  //     },
  //     deep: true
  //   }
  // }
};
</script>
