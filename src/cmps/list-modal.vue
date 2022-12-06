<template>
    <section class="list-modal" :style="cords">
    <!-- <section class="list-modal" :style="{top:(top), left:(right)}"> -->
<header class="mini-modal-header" >list actions</header>
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
  