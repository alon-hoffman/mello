<template>
    <section v-if="!newCard" class="card-preview">
      <!-- <pre v-if="card.labels"  v-for="label in card.labels"
      :style="('labelColor',label.id)">{{card.labels}}</pre> -->
      <img v-if="card.imgURL" :src="getCardURL">
      <h1>{{card.title}}</h1>
    </section>
    <section v-else class="card-preview" >
      <textarea v-model="newCard.title" placeholder="Enter a title for this card..." ></textarea>
    </section>
    
  </template>
  
  <script>

  export default {
    props:{
    card:Object,
    newCard:Object,
        },
    computed: {
      getCardURL(){
        return this.card.imgURL
      },
    },
      created(){
        const boardLabels= this.$store.getters.getCurrBoard.labels
        console.log("🚀 ~ file: card-preview.vue:28 ~ created ~ boardLabels", boardLabels)
        this.card.labels?.forEach(label=>{
          const idx= boardLabels.findIndex(boardLabel=> boardLabel=== label)
          console.log("🚀 ~ file: card-preview.vue:30 ~ created ~ idx", idx)
          // label.color= boardLabels[idx].color
        })
      },
  
  
  } 

  </script>
  