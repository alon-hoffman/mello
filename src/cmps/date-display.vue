<template>
    <section class="date-display">
<span><span class="icon sm time" :class="urgency"></span>{{formattedDate}}</span>
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
  
        const timeLeft= this.date- Date.now()
        if(timeLeft>2*day){ 
          const dayOfMonth= dateToFormat.getDate()
          const monthName= (getMonthShortName(2))
          //  {"class":"good","date":`${this.date.toLocaleString()}`}
          }
        if(timeLeft>day) return "today"
        return "over-due"

    },
  }
}
  </script>
  