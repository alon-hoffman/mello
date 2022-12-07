<template>
  <section class="home text-center">
    <div class="ctsbPE">
      <div class="oFuOf">
        <div class="iPePOS">
          <div>
            <div class="h1-container">
              <h1> Mello brings all your cards, teammates, and tools together</h1>
            </div>
            <p>Keep everything in the same place—even if your team isn't.</p>
          </div>
        </div>
        <button @click="enterAsGuest" class="guest-button">Enter as a guest</button>
        <img class="trello-board-img" alt="img" src="https://res.cloudinary.com/mello123/image/upload/v1670406778/przlb3phmyfo3iizxymw.png">
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
