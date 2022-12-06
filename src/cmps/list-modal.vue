<template>
    <section class="list-modal flex column" :style="cords" v-click-outside="closeModal">
    
    <header class="flex">  <span class="mini-header">List actions <button class="clickable icon ex" @click="closeMiniModal">
        <span class=""></span></button></span> </header>
        <buttons class="flex column">
        <button class="" @click="duplicateList" >Copy List...</button>
        <button @click="deleteList" >Archive List...</button>
      </buttons>
    </section>
    
  </template>
  
  <script>

  export default {
    props: {
    list: Object,
    listModalCords: Object,
  },
    data() {
      return {
       
      }
    },
    computed: {
      cords(){
        return {top: `${this.listModalCords.y+41}px`, left: `${this.listModalCords.x+230}px`}
      },
    },
    methods: {
      deleteList(){
         this.$emit('deleteList', this.list.id)
      },
      duplicateList(){
         console.log( "duplicateList")
         this.$emit('duplicateList', this.list)
      }
    }
  
    
  }
  </script>
  