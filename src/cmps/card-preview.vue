<template>
  <section v-if="card" class="card-preview">

    <img v-if="card.imgURL" :src="cardUrl" class="preview-image">
    <div v-else-if="card.coverColor" class="card-preview-cover" :style="{ 'background-color': card.coverColor }"></div>
    <div v-if="dynamicCard.labels?.length" class="labels-container flex">
      <div @click.stop="toggleLabeAreShown" v-for="label in labels" :style="{ 'background-color': label.color }" class="label-preview flex align-center" :class="{'active':labelsAreShown}">
       <div v-if="labelsAreShown" class="dot" :style="{'background-color': label.dotColor}" ></div> <span >&nbsp{{label.title}}</span></div>
    </div>
    <h1 class="preview-title">{{ card.title }}</h1>
    <div class="icons-container flex align-center justify-between">
      <div class="left-icons flex  align-center">
        <dateDisplay class="icon" v-if="dynamicCard.dueDate" :date="card.dueDate" @toggleIsCompleted="toggleIsCompleted" />
        <span v-if="dynamicCard.description" class="icon description"></span>

        <div class=" flex align-center check-list" v-if="checklistCompletion" :class="checklistCompletion.class" style="align-self: baseline"> 
          <span class="icon sm checklist-check"></span><span class="number">{{checklistCompletion.number}}</span></div>

        <span v-if="dynamicCard.attachments?.length" class="attachments">
          <span class="icon sm attachment"></span>{{dynamicCard.attachments.length}}</span>
      </div>
      <div class="members flex align-center">
      <img class="member-img member-avatar" :src="member.imgUrl" :alt="memberInitials(member)" v-if="dynamicCard.members" v-for="member in card.members">

    </div>
    </div>
  </section>
  <!-- <section v-else class="card-preview" >
      <textarea v-model="newTitle" placeholder="Enter a title for this card..." ></textarea>
    </section> -->

</template>
  
  <script>
  import dateDisplay from "../cmps/date-display.vue"
  import { utilService } from "../services/util.service"
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
        components:{
          dateDisplay
        },
    computed: {
      cardUrl(){
        return this.card.imgURL
      },
      labels(){
        this.updateLabels()
        return this.card.labels?.map(label=>{
         const idx= this.boardLabels.findIndex(boardLabel=> boardLabel.id=== label)
         const labelInfo= this.boardLabels[idx]
         const dotColor= labelInfo.color
         const color = this.labelsAreShown? utilService.LightenDarkenColor(labelInfo.color, 50): labelInfo.color
         return {color,title:labelInfo.title, dotColor}
        })
      },
      labelsAreShown(){
        return this.$store.getters.getLabeAreShown
      },
      dynamicCard(){
        return this.card
      },
      checklistCompletion(){
        var doneTodos=0
        var todos=0
        if(!this.card.checklists) return false
         this.card.checklists?.forEach(checklist => {
          checklist.todos.forEach(todo =>{
            if(todo.isDone) doneTodos++
            todos++
          })
         });
         const todoState = {number:`${doneTodos}/${todos}`, class:"notDone"}
         if (doneTodos===todos) todoState.class = "preview-done"
         if (!todos) return false
         return todoState
      },
      icons(){

      }
    },
      created(){
        this.updateLabels()
        this.newLabels= this.card?.labels?.map(label=>{
         const idx= this.boardLabels.findIndex(boardLabel=> boardLabel.id=== label)
         if(idx>-1)  return {color:this.boardLabels[idx].color}
         return "red"
        })

  },
  methods: {
    memberInitials(member) {
      const fullName = member.fullname.split(' ');
      const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
      return initials.toUpperCase();
    },
    toggleIsCompleted(isCompleted) {
      this.card.isCompleted = isCompleted;
      this.$emit("toggleIsCompleted", this.card)
    },
    toggleLabeAreShown(){
      this.$store.commit({ type: "toggleLabeAreShown" })
    },
    updateLabels(){
      this.boardLabels= this.$store.getters.getCurrBoard.labels
    }
  }


}

</script>
  