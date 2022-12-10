<template>
    <section class="list-modal flex column" :style="cords" v-click-outside="closeTitleModal">
    
    <header class="flex">  <span class="mini-header">List actions <button class="clickable icon ex" @click="closeTitleModal">
        <span class=""></span></button></span> </header>
        <buttons class="flex column">
        <button class="clickable" @click="duplicateList" >Copy List...</button>
        <button class="clickable" @click="$emit('archiveList', list.id)" >Archive List...</button>
        <button class="clickable" @click="deleteList" >Delete List...</button>
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
      },
      closeTitleModal(){
        this.$emit('closeTitleModal')
      }
    }
  
    
  }
  </script>
  