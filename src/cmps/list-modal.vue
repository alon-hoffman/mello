<template>
    <section class="list-modal" :style="cords">
    <!-- <section class="list-modal" :style="{top:(top), left:(right)}"> -->
<header class="mini-modal-header" >list actions</header>
<buttons @click="deleteList" >Archive List</buttons>
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
      top(){
        // return `${this.listModalCords.y}px`
        {}
      },
      right(){
        return `${this.listModalCords.x}px`
      }
    },
    methods: {
      deleteList(){
         this.$emit('deleteList', this.list.id)
      }
    }
  
    
  }
  </script>
  