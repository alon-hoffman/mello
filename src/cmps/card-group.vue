<template>
  <section class="card-group">
  <div class="flex m-10">
    <draggable class="dragArea list-group w-full " :list="mutableList" @change="log">
      <div
        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
        v-for="element in list"
        :key="element.name"
      >
        {{ element.name }}
      </div>
    </draggable>
  </div>
  </section>
</template>
<script>
  import { defineComponent } from 'vue'
  import { VueDraggableNext } from 'vue-draggable-next'
  export default defineComponent({
    components: {
      draggable: VueDraggableNext,
      props:{
    list:Object,
  }
    },
    data() {
      return {
        enabled: true,
        mutableList:null,
        dragging: false,
      }
    },
    created(){
      this.mutableList= this.list
    },
    methods: {
      log(event) {
        console.log(event)
      },
    },
  })
</script>




<!-- <template>
    <section class="card-group">
      <div class="title-container">
      <input class="group-title" type="text" v-model="title" />
      <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" fill="currentColor"></path></svg>
    </div>
      <card-preview v-for="card in list.cards" :card="card" @click="$emit('cardEdit', card._id)"/>
      <button  v-if="!isCardEdited" class="add-card clickable" @click="isCardEdited=true">
        <span>+</span> Add a card
      </button>
      <div v-click-outside="closeNewCard" class="add-card-section" v-else>
        <card-preview :newCard="newCard" />
      <div class="buttons">
        <div class="left-buttons">
          <button @click="cardAdd" class="clickable">Add card</button>
          <img @click="closeNewCard" class="clickable" src='../assets/icons/close.png'>
        </div>
          <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" fill="currentColor"></path></svg>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import cardPreview from "../cmps/card-preview.vue"
  export default {
    props:{
    list:Object,
  },
    data() {
      return {
       title:this.list.title,
       isCardEdited:false,
        check:true,
        newCard: {title: ''}
      }
    },  
    methods: {
      closeNewCard(){
        this.newCard = {title: ''}
        this.isCardEdited=false
      },
      cardAdd(){
        this.list.cards.push(this.newCard)
        this.$emit('saveList', this.list)
      },
    },
    components:{
      cardPreview
    },
  
    
  }
  </script>
   -->