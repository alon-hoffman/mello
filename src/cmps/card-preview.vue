<template>
    <section v-if="card" class="card-preview">
    
      <img v-if="card.imgURL" :src="cardUrl">
      <div v-else-if="card.coverColor" class="card-preview-cover" :style="{'background-color' : card.coverColor}"></div>
      <div v-if="dynamicCard.labels" class="labels-container flex">
        <div   v-for="label in labels"
      :style="{'background-color':label.color}" class="label-preview"></div>
     </div> 
      <h1>{{card.title}}</h1>
      <div class="icons-container flex  align-center justify-between">
        <div class="left-icons flex  align-center">
          <span v-if="dynamicCard.description" class="icon description"></span>
          <span v-if="dynamicCard.dueDate">Due date</span>
          <span v-if="dynamicCard.checklists" class="icon sm checklist-check"></span>
          <span v-if="dynamicCard.attachment" class="icon sm attach"></span>
        </div>
        <div v-if="dynamicCard.members" class="members flex align-center">
        <div class="member-avatar" v-for="member in card.members">{{memberInitials(member)}}</div>
      </div>
    </div>
    </section>
    <!-- <section v-else class="card-preview" >
      <textarea v-model="newTitle" placeholder="Enter a title for this card..." ></textarea>
    </section> -->
    
  </template>
  
  <script>

  export default {
    props:{
    card:Object,
        },
        data(){
          return{
            newLabels:null,
            boardLabels:null,
            newCard:null,
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
      methods:{
        memberInitials(member){
            const fullName = member.fullname.split(' ');
            const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
            return initials.toUpperCase();
        }
      }
  
  
  } 

  </script>
  