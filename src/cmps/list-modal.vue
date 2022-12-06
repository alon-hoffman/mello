<template>
    <section class="list-modal" :style="{cords}">
<h1 >list-actions</h1>
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
  