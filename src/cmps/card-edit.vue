<template>
            <div  class="modal-screen" :class="isOn" @click="$emit('toggleEdit')"></div>
            <article class="modal" :class="isOn">
                <header class="modal-header edit-block">
                    <img class="icon" src="../assets/icons/dashboard.svg" alt="">
                    <input class="header" type="text" v-model="demoCard.title">
                    <p class="content">in list <span class="move-card-link">traco</span></p>
                </header>
                <div class="modal-content flex">
                    <section class="edit-blocks">
                        <section class="edit-block">
                            <img class="icon" src="../assets/icons/description.svg" alt="">
                            <h3 class="header">Description</h3>
                            <div class="content fake-text-area fake-button" @click="toggleTextArea">Add a more detailed description…</div>
                            <!-- <textarea name="" id="" cols="30" rows="3" placeholder="Add a more detailed description…"></textarea> -->
                        </section>
                        <section class="edit-block">
                            <img class="icon" src="../assets/icons/activities.svg" alt="activities">
                            <span class="header flex justify-between">
                                <h3>Activity</h3>
                                <button class="fake-button">Hide Details</button>
                            </span>
                            <ul class="content">
                                <li class="edit-block">
                                    <img src="../assets/icons/profile-confluence.svg" alt="EE" class="icon">
                                    <div class="comment-box">
                                        <textarea type="text" placeholder="Write a comment..."></textarea>
                                        <footer class="comment-options"></footer>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </section>
                    <modal-sidebar @updateCard="updateCard" @updateLabels="updateLabels"/>
                </div>
            </article>
</template>

<script>
import modalSidebar from './modal-sidebar.vue'
export default{
    props:{
        isScreen : Boolean
    },
    emits: ['toggleEdit','updateCard','updateLabels'],
    data(){
        return {
            demoCard: {
                title: 'Make logo',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
        }
    },
    methods:{
        toggleTextArea(){
            console.log('toggle between real and fake textarea')
        },
        updateCard(card){
            this.$emit('updateCard',card)
        },
        updateLabels(labels){
            this.$emit('updateLabels',labels)
        },
    },
    computed: {
    isOn() {
           return { on: this.isScreen === true }
       },
   },
   components: {
    modalSidebar
   },
}
</script>