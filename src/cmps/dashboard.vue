<template>
        <div class="modal-screen" :class="isOn" @click="toggleScreen">
            <article class="dashboard-modal">
                <section class="daily-progress" @click="lastWorkweek">
                    <Bar class="demo-chart"
                         id="my-chart-id"
                         :options="dailyProgressOptions"
                         :data="dailyProgressData"
                         :style="{'margin': 'auto'}"
                         />
                </section>
                <section class="overall-done"></section>
                <section class="tasks-per-member"></section>
                <section class="tasks-per-label"></section>
                <section class="info"></section>
               
            </article>
        </div>

</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default{
    components: { Bar },
    data() {
        return {
            includeSaturday: true,
            includeSunday: true,
        // dailyProgressData: {
        //     labels: this.workweek,
        //     datasets: [ { data: [40, 20, 12] } ]
        // },
        dailyProgressOptions: {
            responsive: true,
            
            plugins: { legend: { display: false, }, },
        }
        }
    },
    methods:{
        toggleScreen(){
            this.$store.commit({ type: 'toggleScreen' })
        },
        isDayToSkip(time){
            return (this.includeSaturday && time.getDay() === 6) || (this.includeSunday && time.getDay() === 0)
        },
    },
    computed:{
        isOn() {
          return {on: this.$store.getters.isScreen}
        },
        lastWorkweek(){
            let time = new Date()
            const options = { weekday: 'short', day: 'numeric', month: 'numeric' }
            const workweek = []
            for (let i = 0; i < 7; i++){
                if(this.isDayToSkip(time)) i--              
                else workweek.unshift(time.toLocaleString(undefined, options))
                time = new Date(time - 86400000)
            }
            return workweek
        },
        dailyProgressData(){
            return {
                labels: this.lastWorkweek,
                datasets: [ { data: [40, 20, 12] } ]
            }
        }
    }
}
</script>
