<template>
    <section class="sidebar-menu-modal" :style="{cords}">
        <section class="header-modal"></section>
<h1>list-actions</h1>
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
        return {top:`${this.listModalCords.y}+px`, right:`${this.listModalCords.x}+px`}
      }
    },
    methods: {
      
    }
  
    
  }
  </script>
  