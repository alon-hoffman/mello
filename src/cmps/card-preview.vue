<template>
    <section v-if="!newCard" class="card-preview">
     <div v-if="newLabels" class="labels-container flex">
        <div   v-for="label in labels"
      :style="{'background-color':label.color}" class="label-preview"></div>
     </div> 
      <img v-if="card.imgURL" :src="cardUrl">
      <div v-else-if="card.coverColor" class="card-preview-cover" :style="{'background-color' : card.coverColor}"></div>
      <h1>{{card.title}}</h1>
      <div class="icons flex">
        <div class="left-icons">
          <span v-if="dynamicCard.description" class="icons description"></span>
          <span v-if="dynamicCard.dueDate">description</span>
          <span v-if="dynamicCard.checkList">checkList</span>
          <span v-if="dynamicCard.attachment">checkList</span>
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
            newLabels:null,
            boardLabels:null,
            newCard:false
          }
        },
    computed: {
      cardUrl(){
        return this.card.imgURL
      },
      labels(){
        return this.card.labels?.map(label=>{
         const idx= this.boardLabels.findIndex(boardLabel=> boardLabel.id=== label)
         if(idx>-1)  return {color:this.boardLabels[idx].color}
         return "red"
        })
      },
      dynamicCard(){
        return this.card
      }
    },
      created(){
        this.boardLabels= this.$store.getters.getCurrBoard.labels
        this.newLabels= this.card?.labels?.map(label=>{
         const idx= this.boardLabels.findIndex(boardLabel=> boardLabel.id=== label)
         if(idx>-1)  return {color:this.boardLabels[idx].color}
         return "red"
        })

      },
  
  
  } 

  </script>
  