<template>
    <section class="date-display">
<h1>date-display</h1>
    </section>
    
  </template>
  
  <script>

  export default {
    props:{
        date:object
    },
    data() {
      return {
       
      }
    },
    computed: {
    formattedDate(){
        const second= 1000
        const minute= 60*second
        const hour= 60*minute
        const day= 24*hour
        const week= 7*day
        month=30*day
    }
  }
}
  </script>
  