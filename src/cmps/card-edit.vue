<template>
    <div class="modal-screen" :class="isOn" @click="$emit('toggleEdit')" ></div>
    <article  v-click-outside="closeModal" class="modal" :class="isOn">
        <header class="modal-header edit-block">
            <span class="icon lg card"></span>
            <input v-if="card" class="header" type="text" v-model="card.title">
            <p class="content">in list <span class="move-card-link">traco</span></p>
        </header>
        <div class="modal-content flex">
            <section class="edit-blocks">
                <section v-click-outside="closeTextArea" class="edit-block">
                    <span class="icon lg description"></span>
                    <h3 class="header">Description</h3>
                    <div v-if="!realTextArea" class="content fake-text-area fake-button" @click="toggleTextArea">Add a
                        more detailed description…</div>
                        <div class="content" v-if="realTextArea">
                            <textarea ref="textarea" class="real-text-area"  name="" id="" cols="30" rows="3"
                            placeholder="Add a more detailed description…"></textarea>
                            <button @click="addDescription" class="save-description-btn">Save</button>
                            <button @click="closeTextArea" class="cancel-description-btn fake-button">Cancel</button>
                        </div>
                </section>
                <section class="edit-block">
                    <span class="icon lg activity"></span>
                    <span class="header flex justify-between">
                        <h3>Activity</h3>
                        <button class="fake-button">Hide Details</button>
                    </span>
                    <ul class="content">
                        <li class="edit-block">
                            <span class="icon lg user"></span>
                            <div class="comment-box">
                                <textarea type="text" placeholder="Write a comment..."></textarea>
                                <footer class="comment-options"></footer>
                            </div>
                        </li>
                    </ul>
                </section>
            </section>
            <modal-sidebar @updateCard="updateCard" @updateLabels="updateLabels" @removeCard="removeCard" @sideModalChange="changeCard"/>
        </div>
    </article>
</template>

<script>
import modalSidebar from './modal-sidebar.vue'
export default {
    props: {
        isScreen: Boolean
    },
    emits: ['toggleEdit', 'updateCard', 'updateLabels'],
    data() {
        return {
            //XXX find solution for getting to modal not through board details
           card:JSON.parse(JSON.stringify(this.$store.getters.getCard)),
            realTextArea: false
        }
    },
    async created() {
         console.log(this.$route.params )
        this.realTextArea = false
        if(!this.$store.getters.getCard) await this.$store.dispatch({ type: "loadBoards" });
    // todo check if the param really is _id
    const { _id } = this.$route.params
    this.$store.commit({ type: "setBoardById"}, {_id });
    },
    methods: {
        closeModal(){
      this.$router.back()
        },
        toggleTextArea() {
            this.realTextArea = true
            this.$refs.textarea.focus()
            // console.log('toggle between real and fake textarea')
        },
        closeTextArea() {
            // console.log(`foo = `)
            this.realTextArea = false
        },
        addDescription(){
//need to add description to card
        },
        updateCard() {
            this.$store.dispatch({ type:"saveCard", card:this.card})
        },
        
        updateLabels(labels) {
            this.$emit('updateLabels', labels)
        },
        changeCard(card){
           this.card= card
        },
        removeCard(cardId){
            this.$store.dispatch({ type: "removeCard",cardId });
            // updateCard()
        }
    },
    computed: {
        isOn() {
            return { on: this.isScreen === true }
        },
    },
    unmounted(){
        this.realTextArea = false
    },
    components: {
        modalSidebar
    },
    watch:{
        card:{
            handler(newVal, oldVal){
                this.updateCard()
            },
            deep:true
        }
}
}
</script>