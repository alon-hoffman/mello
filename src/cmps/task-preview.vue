<template>
    <section v-if="!newTask" class="task-preview">
      <img v-if="task.imgURL" :src="getTaskURL">
      <h1>{{task.title}}</h1>
    </section>
    <section v-else class="task-preview" >
      <textarea v-model="newTask.title" placeholder="Enter a title for this task" ></textarea>
    </section>
    
  </template>
  
  <script>

  export default {
    props:{
    task:Object,
    newTask:Object,
        },
    // data() {
    //   return {
    //    newTask: null
    //   }
    // },
    computed: {
      getTaskURL(){
        return this.task.imgURL
      }
    },
    // created() {
    //  if(!this.task) this.newTask = {title: 'aaaaaaaaaaaaaa'} 
    // },
    methods: {
      
    }
  
    
  }
  </script>
  