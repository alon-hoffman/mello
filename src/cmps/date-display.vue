<template>
    <section class="date-display">
<span @click.stop="toggleIsCompleted " class="flex align-items" :class="formattedDate.class"
 ><span class="icon sm time" ></span>{{formattedDate.date}}</span>
    </section>
    
  </template>
  
  <script>

  export default {
    props:{
        date:Object
    },
    data() {
      return {
       prettyDate:null,
       wakeMeUp:true
      }
    },
    computed: {
    formattedDate(){
      const second= 1000
        const minute= 60*second
        const hour= 60*minute
        const day= 24*hour
        const month= 30*day

        const dateToFormat= new Date(this.date.time)
            const options =  {month: 'short', day: 'numeric'}

        if(this.date.isCompleted){
          const prettyDate=dateToFormat.toLocaleDateString(undefined, options)
          this.prettyDate = prettyDate
          return  {"class":"preview-done","date":prettyDate}
        }
        const timeLeft= this.date.time- Date.now()
        if(timeLeft<0){
          const prettyDate=dateToFormat.toLocaleDateString(undefined, options)
          return  {"class":"over-due","date":prettyDate}
        }
        if(timeLeft<day){
          const prettyDate=dateToFormat.toLocaleDateString(undefined, options)
          return  {"class":"today","date":prettyDate}
        }
        if(timeLeft<2*day){
          const prettyDate=dateToFormat.toLocaleDateString(undefined, options)
          return  {"class":"","date":prettyDate}
        }
        if(timeLeft<month){
          const prettyDate=dateToFormat.toLocaleDateString(undefined, options)
          return  {"class":"","date":prettyDate}
        }
        options.year= 'numeric'
        const prettyDate=dateToFormat.toLocaleDateString(undefined, options)
          return  {"class":"","date":prettyDate}
    },
  },
    methods:{
      toggleIsCompleted(){
        this.date.isCompleted=!this.date.isCompleted
        this.$emit("toggleIsCompleted",this.date.isCompleted)
      }
    }
  }

  </script>
  