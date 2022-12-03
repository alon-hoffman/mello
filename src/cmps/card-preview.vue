<template>
    <section v-if="!newCard" class="card-preview">
      <img v-if="card.imgURL" :src="getCardURL">
      <h1>{{card.title}}</h1>
    </section>
    <section v-else class="card-preview" >
      <textarea v-model="newCard.title" placeholder="Enter a title for this card" ></textarea>
    </section>
    
  </template>
  
  <script>

  export default {
    props:{
    card:Object,
    newCard:Object,
        },
    // data() {
    //   return {
    //    newCard: null
    //   }
    // },
    computed: {
      getCardURL(){
        return this.card.imgURL
      }
    },
    // created() {
    //  if(!this.card) this.newCard = {title: 'aaaaaaaaaaaaaa'} 
    // },
    methods: {
      
    }
  
    
  }
  </script>
  