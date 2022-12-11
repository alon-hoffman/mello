<template>
    <div class="modal-screen" :class="isOn" @click="$emit('toggleEdit')">
    <article v-if="card" v-click-outside-big-modal="checkCloseModal" class="modal" :class="isOn">
        <div class="icon lg close modal-close clickable" @click="closeModal" :style="isDarkCover"></div>
        <div class="card-cover" v-if="card.coverColor" :style="{ 'background-color': card.coverColor , 'background-image' : `url(${card.imgURL})`}">
            <span class="cover-btn icon lg cover flex align-center" @click="openCoversModal">Cover</span>
        </div>
        <div class="archive-cover flex" v-if="card.isArchived">
            <span class="icon lg archive"></span>This card is archived.
        </div>
        <div class="modal-container">
            <header class="modal-header edit-block">
                <span class="icon lg card"></span>
                <input v-if="card" class="header" type="text" v-model="card.title" @change="updateCard(card)">
                <p class="content">in list <span class="move-card-link">{{ groupTitle }}</span></p>
            </header>
            <div class="modal-content flex">
                <section class="edit-blocks">
                    <section class="detail-items flex wrap">
                        <div class="detail-item" v-if="card.members?.length">
                            <div class="detail-item-header">Members</div>
                            <div class="detail-item-content flex">
                                <div class="member-avatar" v-for="member in card.members">
                                    <img class="member-img" :src="member.imgUrl" :alt="memberInitials(member)">
                                </div>
                                <div ref="Members" class="member-avatar add clickable" @click="openMiniModalLocal('Members')"></div>
                            </div>
                        </div>
                        <div class="detail-item" v-if="card.labels?.length">
                            <div class="detail-item-header">Labels</div>
                            <div class="detail-item-content flex">
                                    <div class="chosen-label" v-for="label in labelsDisplay"
                                        :style="{ backgroundColor: getColorWithOpacity(label.color) }">
                                        <div class="label-circle" :style="{ backgroundColor: label.color }"></div>
                                        <span class="chosenLabel-title">{{ label.title }}</span>
                                    </div>
                                <button ref="Labels" class="label-avatar flex align-center add clickable" @click="openMiniModalLocal('Labels')"></button>
                            </div>
                        </div>
                        <div class="detail-item" v-if="card.dueDate">
                            <div class="detail-item-header">Due date</div>
                            <div class="detail-item-content flex align-center">
                                <button class="checkbox" :class="isCompleted"
                                    @click="toggleDueDate"></button>
                                <div ref="Dates" class="date-display" @click="openMiniModalLocal('Dates')">{{ formattedDueDate }} <span
                                        :class="isCompleted">complete</span></div>
                            </div>
                        </div>
                    </section>
                    <section class="edit-block">
                        <span class="icon lg description"></span>
                        <h3 class="header">Description <button class="modal-btn"
                                v-if="(card.description && !realTextArea)" @click="toggleTextArea">Edit</button></h3>
                        <div v-if="!realTextArea" class="content fake-text-area fake-button" :class="isDescription"
                            @click="toggleTextArea">
                            <pre v-if="card.description">{{ card.description }}</pre>
                            <template v-else>Add a more detailed description...</template>

                        </div>
                        <div class="content" v-if="realTextArea">
                            <textarea ref="textarea" v-model="card.description" class="real-text-area" name="" id=""
                                cols="30" rows="3" placeholder="Add a more detailed description…"
                                v-click-outside="closeTextArea"></textarea>
                            <button @click="addDescription" class="save-description-btn">Save</button>
                            <button @click="closeTextArea" class="cancel-description-btn fake-button">Cancel</button>
                        </div>
                    </section>
                    <attachment-display v-if="getAttachments" :attachments="getAttachments" @updateAttachments="updateAttachments" />
                    <section class="edit-block" v-if="card.checklists" v-for="checklist in card.checklists">
                        <span class="icon lg checkList"></span>
                        <span class="header flex justify-between">
                            <input type="text" v-model="checklist.title">
                            <div class="checklist-options">
                                <button class="modal-btn" @click="removeChecklist(checklist)">Delete</button>
                            </div>
                        </span>
                        <span class="sub-icon">{{ calcProgress(checklist.todos) }}%</span>
                        <div class="content">
                            <progress class="progress-bar" :class="allDone(checklist)" :value="calcProgress(checklist.todos)"
                                max="100"></progress>
                        </div>

                        <ul class="dynamic-content todo-list flex column">
                            <li class="todo-item-container flex clickable" v-for="todo in checklist.todos"
                                @click="openEditMode(todo)" v-click-outside="() => closeEditMode(todo)">
                                <div class="todo-item edit-block">
                                    <button class="icon checkbox" :class="isDone(todo.isDone)"
                                        @click.stop="toggleTodo(todo)"></button>
                                    <span v-if="!todo.editMode" class="header" :class="isDone(todo.isDone)">{{ todo.title }}</span>
                                    <textarea v-else class="header edit-mode" v-model="todo.title"></textarea>
                                    <div v-if="todo.editMode" class="content edit-todo">
                                        <button class="modal-btn add-todo-btn"
                                        @click.stop="closeEditMode(todo)">Save</button>
                                        <span class="icon lg close" @click.stop="removeTodo(checklist, todo)"></span>
                                    </div>
                                </div>
                                <!-- <div class="todo-item-options flex align-center">
                                        <span class="icon sm time"></span>
                                        <span class="icon sm share"></span>
                                        <span class="icon sm more"></span>
                                    </div> -->
                            </li>
                            <button v-if="!checklist.newTodo" class="modal-btn" @click="openAddTodo(checklist)"
                                v-click-outside="() => closeAddTodo(checklist)">Add an item</button>
                            <section v-else class="add-todo flex wrap">
                                <textarea placeholer="Add an item" v-model="newTodo.title" @keyup.enter="saveTodo(checklist)" v-click-outside="() => closeAddTodo(checklist)"></textarea>
                                <div class="add-todo-options flex">
                                    <button class="modal-btn add-todo-btn" @click="saveTodo(checklist)">Add</button>
                                    <button class="modal-btn" @click="closeAddTodo(checklist)">Cancel</button>
                                </div>
                            </section>
                        </ul>

                    </section>
                    <section class="edit-block">
                        <span class="icon lg activity"></span>
                        <span class="header flex justify-between">
                            <h3>Activity</h3>
                            <button class="modal-btn hide-deets" @click="toggleHideDetails">{{isHideDetails ? 'Show Details' : 'Hide Details'}}</button>
                        </span>
                        <div class="sub-icon member-avatar"></div>
                        <div class="content comment-box">
                            <textarea type="text" placeholder="Write a comment..." v-model="newComment" required>
                            </textarea>
                            <button class="modal-btn save-btn" @click.stop="addComment">Save</button>
                        </div>
                        <ul class="dynamic-content activity-list" v-if="!isHideDetails">
                            <li class="activity-list-item flex" v-for="activity in card.activities">
                                <div class="member-avatar" :style="{'background-image' : activity.user.imgURL}"></div>
                                <div class="flex column" v-if="activity.title">
                                    <span><strong>{{activity.user.fullname}}</strong>{{ activity.title.before}} this card {{activity.title.after}}</span>
                                    <span class="time">{{timeSince(activity.addedAt)}}</span>
                                </div>
                            </li>
                        </ul>
                    </section>
                </section>
                <modal-sidebar ref="modalSidebar"
                               :card="getCurrCard" 
                               :isMiniModalOpen="isMiniModalOpen"
                               :miniModalTitle="miniModalTitle"
                               :modalCords ="modalCords"
                               @closeMiniModal="closeMiniModal"
                               @updateCard="updateCard" 
                               @updateLabels="updateLabels" 
                               @removeCard="removeCard"
                               @openMiniModal="openMiniModal" />
            </div>
        </div>
    </article>
    </div>
</template>

<script>
import modalSidebar from './modal-sidebar.vue';
import attachmentDisplay from './attachment-display.vue';
import { utilService } from '../services/util.service';
import { socketService, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service';
export default {
    props: {
        isScreen: Boolean
    },
    emits: ['toggleEdit', 'updateCard', 'updateLabels'],
    data() {
        return {
            // card: null,
            realTextArea: false,
            isMiniModalOpen: false,
            newTodo: {
                title: '',
                isDone: false
            },
            // boardMembers: null,
            newComment: '',
            isHideDetails: false,
            modalCords: null,
            miniModalTitle: null
        }
    },
    async created() {
        if (!this.$store.getters.boards) await this.$store.dispatch({ type: "loadBoards" });
        const { boardId } = this.$route.params
        this.$store.commit({ type: 'setBoardById', id: boardId });
        socketService.emit(SOCKET_EMIT_SET_TOPIC, boardId)
        this.realTextArea = false
        // this.boardMembers = this.$store.getters.getMembersOfBoard
    },
    methods: {
        checkCloseModal() {
            //   this.$router.back()
            if (this.isMiniModalOpen) return
            else {
                const url = this.$route.path
                const route = url.substring(0, url.indexOf('card'))
                this.$router.push(route)
            }
        },
        closeModal() {
            const url = this.$route.path
            const route = url.substring(0, url.indexOf('card'))
            this.$router.push(route)
        },
        toggleTextArea() {
            this.realTextArea = true
            setTimeout(() => this.$refs.textarea.focus(), 0)
        },
        closeTextArea() {
            this.realTextArea = false
        },
        updateCard(currCard) {
            console.log("🚀 ~ file: card-edit.vue:211 ~ updateCard ~ currCard")
            if(currCard)this.$store.dispatch({ type: "saveCard", card: currCard })
            // else this.$store.dispatch({ type: "saveCard", card: currCard })
            // else this.$store.dispatch({ type: "saveCard", card: this.card })
        },
        updateLabels(labels) {
            this.$store.commit({ type: "updateLabels", labels })
        },
        removeCard(cardId) {
            const card = {title: this.card.title, groupId: this.card.groupId}
            const activity = {card,  action: 'removeCard'}
            this.$store.commit({type: 'retrieveItem', item: this.card })
            this.$store.dispatch({ type: 'addActivity', activity})
            this.$store.dispatch({ type: "removeCard", cardId });
            this.closeModal()
        },
        openMiniModal(title) {
            this.miniModalTitle = title
            this.isMiniModalOpen = true
        },
        closeMiniModal() {
            setTimeout(() => {
                this.isMiniModalOpen = false
                this.modalCords = null
            }, 0)
        },
        toggleDueDate(){
            this.card.dueDate.isCompleted = !this.card.dueDate.isCompleted
            const action = this.card.dueDate ? 'dateComplete' : 'dateIncomplete'
            const activity = { action, card:this.card }
            this.$store.dispatch({type: 'addActivity', activity})
            this.updateCard(this.card)
        },
        memberInitials(member) {
            const fullName = member.fullname.split(' ');
            const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
            return initials.toUpperCase();
        },
        removeChecklist(checklist) {
            const activity = { action: 'removeDetail', card: this.card, detail: checklist.title}
            this.$store.dispatch({ type: 'addActivity', activity})
            const checklistIdx = this.card.checklists.findIndex(c => c.id === checklist.id)
            this.card.checklists.splice(checklistIdx, 1)
            this.updateCard(this.card)
        },
        toggleTodo(todo){
            todo.isDone = !todo.isDone
            if(todo.isDone){
                const activity = { action: 'todo', card: this.card, detail: todo.title}
                this.$store.dispatch({ type: 'addActivity', activity})
            }
            this.updateCard(this.card)
        },
        openAddTodo(checklist) {
            checklist.newTodo = true;
            console.log(checklist.newTodo)
            this.updateCard(this.card)
        },
        closeAddTodo(checklist) {
            this.newTodo = { title: '' }
            checklist.newTodo = false;
            this.updateCard(this.card)
        },
        saveTodo(checklist) {
            if(!this.newTodo.title) return
            this.newTodo.id = utilService.makeId()
            checklist.todos.push(this.newTodo)
            this.newTodo = { title: ''}
            this.updateCard(this.card)
        },
        closeEditMode(todo) {
            todo.editMode = false
            this.updateCard(this.card)
        },
        openEditMode(todo) {
            todo.editMode = true
            this.updateCard(this.card)
        },
        removeTodo(checklist, todo) {
            todo.editMode = false
            const todoIdx = checklist.todos.findIndex(t => t.id == todo.id)
            checklist.todos.splice(todoIdx, 1)
            this.updateCard(this.card)
        },
        isDone(isDone) {
            return { checked: isDone }
        },
        calcProgress(todos) {
            if (!todos.length) return 0
            const ratio = todos.reduce((acc, todo) => todo.isDone ? acc + 1 : acc, 0)
            const percent = Math.floor(100 * (ratio / todos.length))
            return percent
        },
        getColorWithOpacity(color) {
            color += '4F'
            return color
        },
        allDone(checklist) {
            return { done: this.calcProgress(checklist.todos) == 100 }
        },
        updateAttachments(newAttachments){
            // if(typeof newAttachments==="object") return
            this.card.attachments = newAttachments
            this.updateCard(this.card)
        },
        addComment(){
            const activity = {action: 'addComment', card: this.card, detail: this.newComment}
            this.$store.dispatch({type: 'addActivity', activity})
            this.newComment = ''
            this.updateCard(this.card)
        },
        timeSince(time){
            return utilService.timeSince(time)
        },
        toggleHideDetails(){
            this.isHideDetails = !this.isHideDetails
        },
        setModalCords(title) {
            const { y, x } = this.$refs[title].getBoundingClientRect()
            this.modalCords = { y, x }
            this.updateCard(this.card)
        },
        openMiniModalLocal(title){
            this.setModalCords(title)
            this.$refs.modalSidebar.openMiniModal(title)
        },
        openCoversModal(){
            this.$refs.modalSidebar.updateImgAttachmentsColors()
        },
    },
    computed: {
        isOn() {
            return { on: this.isScreen === true }
        },
        groupTitle() {
            const board = this.$store.getters.getCurrBoard
            return board.groups.find(group => group.id === this.card.groupId).title
        },
        getCurrCard() {
            return this.card
        },
        getAttachments(){
        if(!this.card.attachments||!this.card.attachments.length) return false
        return this.card.attachments
        },
        isDescription() {
            return { "written-description": !!this.card.description }
        },
        labelsDisplay() {
            const labels = [...this.$store.getters.getCurrBoard.labels]
            return labels.filter(label => this.card.labels.includes(label.id))
        },
        formattedDueDate() {
            const dateToFormat = new Date(this.card.dueDate.time)
            const options = { month: 'short', day: 'numeric' }
            const date = dateToFormat.toLocaleDateString(undefined, options)
            const ampm = dateToFormat.getHours() >= 12 ? 'AM' : 'PM';
            const minutes= `${dateToFormat.getMinutes()}`.padStart(2, '0')
            const hours = (dateToFormat.getHours() % 12) + ':' + minutes + ' ' + ampm
            return (date + ' at ' + hours)
        },
        isCompleted() {
            return { checked: this.card.dueDate.isCompleted }
        },
        boardMembers(){
            return this.$store.getters.getMembersOfBoard
        },
        card(){
            const { id } = this.$route.params
            const board = this.$store.getters.getCurrBoard
            let card
            if(board){
                 board.groups.find(group => {
                    return group.cards.find(c => {
                        if (c.id === id) {
                            card = c
                            return true
                        }
                    })
                })
            }
            if(card) return JSON.parse(JSON.stringify(card))
        },
        isDarkCover(){
            // if (utilService.isDarkskColor(card))
        },
    },
    unmounted() {
        this.realTextArea = false
    },
    components: {
        modalSidebar,
        attachmentDisplay
    },
}
</script>