<template>
    <section class="user-modal">
<p>Account</p>
<div class="user-description flex align-center">
    <img :src="user.img"/>
    <div class="user-info">
        <h1>{{user.fullname}}</h1>
        <small>{{user.email}}</small>
    </div>
</div>
<button @click="logOut">Log out</button>
    </section>
    
  </template>
  
  <script>

  export default {
    data() {
      return {
       user:{
        img:"https://res.cloudinary.com/mello123/image/upload/v1670400597/pqqzgegaqywvcmovvroq.jpg",
        fullname:"Alon Hoffman",
        email:"a.hoffman.lon@gmail.com"
       }
      }
    },
    computed: {
      
    },
    created() {
      
    },
    methods: {
        logOut(){
             console.log( "log out")
        }
    }
  }
  </script>
  