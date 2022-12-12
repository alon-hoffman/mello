<template>
        <div class="modal-screen" :class="isOn" @click="closeScreen"></div>

</template>

<script>
export default{
    isOn() {
      return {on: this.$store.getters.isScreen}
    },
}
</script>