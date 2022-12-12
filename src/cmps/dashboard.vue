<template>
        <div class="modal-screen" :class="isOn" @click="closeScreen"></div>
        <!-- <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
        /> -->
</template>

<script>
export default{
    isOn() {
      return {on: this.$store.getters.isScreen}
    },
}
</script>
