<template>
    <section class="list-modal flex column" :style="cords" v-click-outside="closeModal">
    
    <header class="flex">  <span class="mini-header">list actions <button class="clickable icon ex" @click="closeMiniModal">
        <span class=""></span></button></span> </header>
<buttons @click="deleteList" >Archive List</buttons>
<buttons @click="duplicateList" >Duplicate List</buttons>
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
  