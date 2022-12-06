<template>
    <section class="list-modal" :style="{ top: cords+'px' }">
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
        return this.listModalCords.height
      }
    },
    methods: {
      
    }
  
    
  }
  </script>
  