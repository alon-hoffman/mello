<template>
  <section class="home text-center">
    <div class="ctsbPE">
      <div class="oFuOf">
        <div class="iPePOS">
          <div>
            <div class="h1-container">
              <h1> Trello brings all your tasks, teammates, and tools together</h1>
            </div>
            <p>Keep everything in the same place—even if your team isn't.</p>
          </div>
        </div>
        <button @click="enterAsGuest" class="guest-button">Enter as a guest</button>
        <img class="trello-board-img" alt="Vue logo" src="https://images.ctfassets.net/rz1oowkt5gyp/5lDhjfcNTvIKeiBPtxRdQ7/67717ed94b8f6e7fb13a59c109933596/HeroBoard__CalendarView_4x.png?w=960&fm=webp">
      </div>
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
    enterAsGuest(){
      this.$router.push('/board')
    }
  },
  computed: {
  },

}
</script>
