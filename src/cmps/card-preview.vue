<template>
    <section v-if="!newCard" class="card-preview">
      <pre v-if="card.labels"  v-for="label in card.labels"
      :style="('labelColor',label.id)">{{card.labels}}</pre>
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
      created(){
         console.log( "hi")
        // setLabelColors(){
        //   this.card.labels?.forEach(label=>{
            
        //   })
        const labels= this.$store.getters.getCurrBoard.labels
        console.log("🚀 ~ file: card-preview.vue:31 ~ //setLabelColors ~ labels", labels)
      },
    methods: {
      labelColor(id){
       console.log("🚀 ~ file: card-preview.vue:29 ~ labelColor ~ id", id)
       const labels= this.$store.getters.getCurrBoard.labels
       const labelColor= labels.findIndex(label=>label.id===id)

       console.log("🚀 ~ file: card-preview.vue:30 ~ color ~ labelColor", labelColor)
      }
    }
  
    
  }
  </script>
  