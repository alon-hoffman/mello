<template>
    <section class="attachment-display edit-block">
      <span class="icon lg attachment"></span>
      <span class="header flex justify-between">
        <h3>Attachment</h3>
    </span>
    <ul class="dynamic-content flex column">
      <li class="todo-item-container flex clickable" 
      v-for="attachment, idx in attachments"> 
      <img :src="attachment.href"/>

      <a
      :href=attachment.href
      target="_blank"
      rel="noreferrer"
    >
    <template v-if="attachment.name">{{attachment.name}}</template>
    <template v-else>{{attachment.type}} file</template>
    </a>

      


    </li></ul>
    </section>
    
  </template>
  
  <script>

  export default {
    props:{
      attachments: Array
    },
    data() {
      return {
       
      }
    },
    computed: {
      
    },
    created() {
       console.log(this.attachments)
    },
    methods: {
      
    }
  
    
  }
  </script>
  