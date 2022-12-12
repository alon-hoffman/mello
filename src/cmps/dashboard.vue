<template>
        <div class="modal-screen" :class="isOn" @click="toggleScreen">
            <article class="dashboard-modal">
                <section class="daily-progress">
                    <Bar class="demo-chart"
                         id="my-chart-id"
                         :options="chartOptions"
                         :data="chartData"
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
        chartData: {
            labels: [ 'January', 'February', 'March' ],
            datasets: [ { data: [40, 20, 12] } ]
        },
        chartOptions: {
            responsive: true
        }
        }
    },
    methods:{
        toggleScreen(){
            this.$store.commit({ type: 'toggleScreen' })
        },
    },
    computed:{
        isOn() {
          return {on: this.$store.getters.isScreen}
        },
        recentDays(){
            let time = Date.now()
            const options = { weekday: 'long', day: 'numeric', month: 'numeric' }
            const workweek = []
            for (let i = 0; i < 7; i++){
                workweek.push(time.toLocaleString(undefined, options))
            }
        },
    }
}
</script>
