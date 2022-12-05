<template>
    <div class="modal-screen" :class="isOn" @click="$emit('toggleEdit')"></div>
    <article v-if="card"  v-click-outside-big-modal="checkCloseModal" class="modal" :class="isOn">
        <span class="icon lg close modal-close" @click="closeModal"></span>
        <div class="card-cover" v-if="card?.coverColor" :style="{'background-color' : card.coverColor}"></div>
        <div class="modal-container">
            <header class="modal-header edit-block">
                <span class="icon lg card"></span>
                <input v-if="card" class="header" type="text" v-model="card.title">
                <p class="content">in list <span class="move-card-link">{{groupTitle}}</span></p>
            </header>
            <div class="modal-content flex">
                <section class="edit-blocks">
                    <section class="detail-items flex wrap">
                        <div class="detail-item" v-if="card.members?.length">
                            <div class="detail-item-header">Members</div>
                            <div class="detail-item-content flex" >
                                <div class="member-avatar clickable" v-for="member in card.members">{{memberInitials(member)}}</div>
                                <div class="member-avatar add clickable"></div>
                            </div>
                        </div>
                        <div class="detail-item" v-if="card.labels?.length">
                            <div class="detail-item-header">Labels</div>
                            <div class="detail-item-content flex">
                                <button class="label-avatar flex align-center clickable" 
                                v-for="label in labelsDisplay"
                                :style="{'background-color': label.color}">
                                <div class="bullet"></div>
                                {{label.title}}</button>
                                <button class="label-avatar flex align-center add clickable"></button>
                            </div>
                        </div>
                        <div class="detail-item" v-if="card.dueDate">
                            <div class="detail-item-header">Due date</div>
                            <div class="detail-item-content flex align-center">
                                <div class="checkbox" :class="isCompleted" @click="(card.dueDate.isCompleted = !card.dueDate.isCompleted)"></div>
                                <div class="date-display">{{formattedDueDate}} <span :class="isCompleted">complete</span></div>
                            </div>
                        </div>
                    </section>
                    <section class="edit-block">
                        <span class="icon lg description"></span>
                        <h3 class="header">Description <button class="modal-btn" v-if="(card.description && !realTextArea)" @click="toggleTextArea">Edit</button></h3>
                        <div v-if="!realTextArea" class="content fake-text-area fake-button" :class="isDescription"
                         @click="toggleTextArea">
                            <template v-if="card.description" >{{card.description}}</template>
                            <template v-else>Add a more detailed description...</template>
    
                        </div>
                            <div class="content" v-if="realTextArea">
                                <textarea ref="textarea" v-model="card.description" class="real-text-area"  name="" id="" cols="30" rows="3"
                                placeholder="Add a more detailed description…" v-click-outside="closeTextArea"></textarea>
                                <button @click="addDescription" class="save-description-btn">Save</button>
                                <button @click="closeTextArea" class="cancel-description-btn fake-button">Cancel</button>
                            </div>
                    </section>
                    <section class="edit-block">
                        <span class="icon lg checkList"></span>
                        <span class="header flex justify-between">
                            <h3>Checklist</h3>
                            <div class="checklist-options">
                                <button class="modal-btn">Hide Checked items</button>
                                <button class="modal-btn">Delete</button>
                            </div>
                        </span>
                        <span class="sub-icon">50%</span>
                        <div class="content">
                            <progress class="progress-bar" value="32" max="100"> 32% </progress>
                        </div>
                        
                        <ul class="dynamic-content todo-list flex column">
                                <li class="todo-item flex">
                                    <div class="checkbox"></div>
                                    <span>Has a fridge</span>
                                </li>
                                <li class="flex">
                                    <div class="checkbox"></div>
                                    <span>Working wheels</span>
                                </li>
                                <li class="flex">
                                    <div class="checkbox"></div>
                                    <span>todo</span>
                                </li>
                            </ul>
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
                <modal-sidebar :card="getCurrCard" :isMiniModalOpen="isMiniModalOpen" @closeMiniModal="closeMiniModal" @updateCard="updateCard" @updateLabels="updateLabels" @removeCard="removeCard" @openMiniModal="openMiniModal" @sideModalChange="changeCard"/>
            </div>
        </div>
    </article>
</template>

<script>
import modalSidebar from './modal-sidebar.vue'
import { FastAverageColor } from 'fast-average-color';

export default {
    props: {
        isScreen: Boolean
    },
    emits: ['toggleEdit', 'updateCard', 'updateLabels'],
    data() {
        return {
            //XXX find solution for getting to modal not through board details
           card:null,
            realTextArea: false,
            isMiniModalOpen: false,
        }
    },
    async created() {
        if(!this.$store.getters.boards) await this.$store.dispatch({ type: "loadBoards" });

        const { boardId } = this.$route.params

        this.$store.commit({ type: 'setBoardById',  id:boardId });        


        this.realTextArea = false
        const {id}= this.$route.params
        const board = this.$store.getters.getCurrBoard
        board.groups.forEach(group=>{
            group.cards.forEach(card=>{

                if (card.id=== id) 
                {
                    this.card=JSON.parse(JSON.stringify(card))

                    // setCurrCard(state, { cardId })
                    return
                }
            })
        })
    },
    methods: {
        checkCloseModal(){
    //   this.$router.back()
            if(this.isMiniModalOpen ) return
            else{
                const url= this.$route.path
                    const route= url.substring(0, url.indexOf('card'))
                    this.$router.push(route)
            }      
        },
        closeModal(){
            const url= this.$route.path
        const route= url.substring(0, url.indexOf('card'))
        this.$router.push(route)
        },
        toggleTextArea() {
            this.realTextArea = true
            setTimeout(() => this.$refs.textarea.focus(), 0)
            
        },
        closeTextArea() {
            this.realTextArea = false
        },
        addDescription(){
//need to add description to card
        },
        updateCard() {
            this.$store.dispatch({ type:"saveCard", card:this.card})
        },
        updateLabels(labels) {
            this.$store.commit({type: "updateLabels", labels})
        },
        changeCard(card){
            
           this.card= card
        },
        removeCard(cardId){
            this.$store.dispatch({ type: "removeCard",cardId });
            this.closeModal()
        },
        openMiniModal(){
            this.isMiniModalOpen = true
        },
        closeMiniModal(){
            setTimeout(()=>{
                this.isMiniModalOpen = false
            },0)
        },
        memberInitials(member){
            const fullName = member.fullname.split(' ');
            const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
            return initials.toUpperCase();
        },
    },
    computed: {
        isOn() {
            return { on: this.isScreen === true }
        },
        groupTitle(){
            return this.card?.groupId
        },
        getCurrCard(){
            return this.card
        },
        isDescription(){
            return {"written-description":!!this.card.description}
        },
        labelsDisplay(){
            const labels = [...this.$store.getters.getCurrBoard.labels]
            return labels.filter(label => this.card.labels.includes(label.id))
        },
        formattedDueDate(){
            const dateToFormat = new Date(this.card.dueDate.time)
            const options =  {month: 'short', day: 'numeric'}
            const date = dateToFormat.toLocaleDateString(undefined, options)
            const ampm = dateToFormat.getHours() >= 12 ? 'AM' : 'PM';
            const hours = (dateToFormat.getHours() % 12) + ':' + dateToFormat.getMinutes() + ' ' + ampm
            return (date + ' at ' + hours)
        },
        isCompleted(){
            return {checked: this.card.dueDate.isCompleted}
        }
        
       
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