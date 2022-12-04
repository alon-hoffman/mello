<template>
    <section v-if="!newCard" class="card-preview">
     <div v-if="newLabels" class="labels-container flex">
        <div   v-for="label in newLabels"
      :style="{'background-color':label.color}" class="label-preview"></div>
     </div> 
      <img v-if="card.imgURL" :src="getCardURL">
      <h1>{{card.title}}</h1>
      <div class="icons flex">
        <div class="left-icons">
          <span v-if="card.description">description</span>
          <span v-if="card.checkList">checkList</span>
        </div>
      </div>
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
        data(){
          return{
            newLabels:null
          }
        },
    computed: {
      getCardURL(){
        return this.card.imgURL
      },
    },
      created(){
        const boardLabels= this.$store.getters.getCurrBoard.labels
         this.newLabels= this.card.labels?.map(label=>{
          const idx= boardLabels.findIndex(boardLabel=> boardLabel.id=== label)
          if(idx>-1)  return {color:boardLabels[idx].color}
          return "red"
        })
      },
  
  
  } 

  </script>
  