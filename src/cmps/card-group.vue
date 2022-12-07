
<template>
  <section ref="col" class="card-group">
    <div class="title-container">
      <input class="group-title" type="text" v-model="title" />
      <svg @click="openListModal" class="clickable" width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
          fill="currentColor"></path>
      </svg>
    </div>

    <Container group-name="col" @drop="(e) => onCardDrop(list.id, e)" :get-child-payload="getCardPayload(list.id)"
      drag-class="card-ghost" drop-class="card-ghost-drop" :drop-placeholder="dropPlaceholderOptions">
      <Draggable v-for="card in list.cards" :key="card.id">
        <card-preview :card="card" @click="$emit('editCard', card.id)" class="clickable" @toggleIsCompleted="toggleIsCompleted"/>
        
      </Draggable>
      <div @keyup.enter="addCard"  class="add-card-section"   v-click-outside="closeNewCard" v-if="isCardEdited">
        <textarea v-model="newTitle" placeholder="Enter a title for this card..." ></textarea>
        <div class="buttons">
          <div class="left-buttons">
            <button @click="addCard" class="clickable">Add card</button>
            <span class="icon lg close clickable" @click="closeNewCard"></span>
          </div>
          <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
              fill="currentColor"></path>
          </svg>
        </div>
      </div>
    </Container>


    <button v-if="!isCardEdited" class="add-card clickable" @click="isCardEdited = true">
      <span class="icon add sm"></span> Add a card
    </button>
    <!-- <div @keyup.enter="addCard"  class="add-card-section"   v-click-outside="closeNewCard" v-if="isCardEdited">
      <textarea v-model="newTitle" placeholder="Enter a title for this card..." ></textarea>
      <div class="buttons">
        <div class="left-buttons">
          <button @click="addCard" class="clickable">Add card</button>
          <span class="icon lg close clickable" @click="closeNewCard"></span>
        </div>
        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
            fill="currentColor"></path>
        </svg>
      </div>
    </div> -->
  </section>

</template>
  
<script>
import cardPreview from "../cmps/card-preview.vue"
import { boardService } from '../services/board-service-local'
import { Container, Draggable } from "vue3-smooth-dnd";
export default {
  props: {
    list: Object,
    lists: Array,
  },
  data() {
    return {
      title: this.list.title,
      isCardEdited: false,
      check: true,
      newTitle:'',
      upperDropPlaceholderOptions: {
        className: 'cards-drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
      dragLists:null,
      counter:1
    }
  },
  methods: {
    closeNewCard() {
      this.newCard = { title: '', groupId: this.list.id }
      this.isCardEdited = false
    },
    addCard() {
      //XXX
      
      const newCard= {title:this.newTitle, groupId: this.list.id}
      this.$emit('addCard', newCard)
      this.newTitle=""
    },
    onColumnDrop(dropResult) {
      const list = Object.assign({}, this.list)
      list.cards = boardService.applyDrag(list.cards, dropResult)
      this.$store.dispatch({ type: "saveList", list })
    },
    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const column = this.lists.filter((l) => l.id === columnId)[0]
        const list = JSON.parse(JSON.stringify(column))
        list.cards = boardService.applyDrag(list.cards, dropResult)
          this.$store.dispatch({ type: "saveList", list })
      }
    },
    getCardPayload(columnId) {
      return index => {
        return this.lists.filter(p => p.id === columnId)[0].cards[index]
      }
    },
    toggleIsCompleted(card){
      this.$emit("toggleIsCompleted",card)
    },
    openListModal(){
      const  {y, x} = this.$refs.col.getBoundingClientRect()
      this.$emit("openListModal",y, x, this.list)      
    }
  },
  components: {
    cardPreview,
    Container,
    Draggable,
  },
  watch: {
    list: {
      handler(newVal, oldVal) {
      },
      deep: true
    }
  }


}
</script>
  