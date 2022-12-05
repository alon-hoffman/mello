<template>
    <section class="date-display">
<span><span class="icon sm time" :class="urgency"></span>{{formattedDate.date}}</span>
    </section>
    
  </template>
  
  <script>

  export default {
    props:{
        date:Number
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
        const month= 30*day

        const dateToFormat= new Date(this.date)
            const options =  {month: 'short', day: 'numeric'}

        const timeLeft= this.date- Date.now()
        if(timeLeft>2*day){ 
          const prettyDate=dateToFormat.toLocaleDateString(undefined, options)
          return  {"class":"good","date":prettyDate}
          }
        if(timeLeft>day) return "today"
        return "over-due"

    },
  }
}
  </script>
  