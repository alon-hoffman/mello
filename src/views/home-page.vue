<template>
  <section class="home text-center ">
    <div class="ctsbPE flex column">
        <div class="iPePOS">
          <!-- <div> -->
            <div class="h1-container">
              <h1 class="main-home-page-title"> Mello brings all your cards, teammates, and tools together</h1>
            </div>
            <p>Keep everything in the same place - even if your team isn't.</p>
          <!-- </div> -->
        </div>
        <button @click="enterAsGuest" class="guest-button">Start demo</button>
        <img class="trello-board-img" alt="img"
          src="https://res.cloudinary.com/mello123/image/upload/v1670406778/przlb3phmyfo3iizxymw.png">
    </div>


  </section>


</template>

<script>
export default {
  name: 'home',
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    enterAsGuest() {
      this.$router.push('/board')
    }
  },
  computed: {
  },

}
</script>
