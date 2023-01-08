<template>
    <section class="user-modal">
<p v-if="user">Account</p>
<div v-if="user" class="user-description flex align-center">
    <img  v-if="user.imgUrl" :src="user.imgUrl"/>
    <span class="anonymousUser-img-container" v-else>
      <img class="anonymousUser-img" src="../assets/icons/user-solid.png"/>
    </span>
    <div class="user-info">
        <h1>{{user.fullname}}</h1>
        <small>{{user.email}}</small>
    </div>
</div>
<button v-if="user" class="user-log-out-btn" @click="logOut">Log out</button>
<span v-else>Need To log in to see details</span>
    </section>
    
  </template>
  
  <script>

  export default {
    data() {
      return {
       user:{
        imgUrl:"https://res.cloudinary.com/mello123/image/upload/v1670400597/pqqzgegaqywvcmovvroq.jpg",
        fullname:"Alon Hoffman",
        email:"a.hoffman.lon@gmail.com"
       }
      }
    },
    created() {
      this.user=this.$store.getters.loggedinUser
    },
    methods: {
      logOut(){
        setTimeout(()=>{
          this.$store.dispatch({ type: "logout" });
          this.$router.push('/')
        },100)
        this.closeUserModal()
      },
      closeUserModal(){
        this.$emit("closeUserModal")
      }
    },
    computed: {
      
    },
  }
  </script>
  