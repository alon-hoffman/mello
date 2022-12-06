<template>
    <div class="modal-screen" :class="isOn" @click="$emit('toggleEdit')"></div>
    <article v-if="card" v-click-outside-big-modal="checkCloseModal" class="modal" :class="isOn">
        <span class="icon lg close modal-close" @click="closeModal"></span>
        <div class="card-cover" v-if="card?.coverColor" :style="{ 'background-color': card.coverColor }"></div>
        <div class="modal-container">
            <header class="modal-header edit-block">
                <span class="icon lg card"></span>
                <input v-if="card" class="header" type="text" v-model="card.title">
                <p class="content">in list <span class="move-card-link">{{ groupTitle }}</span></p>
            </header>
            <div class="modal-content flex">
                <section class="edit-blocks">
                    <section class="detail-items flex wrap">
                        <div class="detail-item" v-if="card.members?.length">
                            <div class="detail-item-header">Members</div>
                            <div class="detail-item-content flex">
                                <div class="member-avatar clickable" v-for="member in card.members">
                                    {{ memberInitials(member) }}</div>
                                <div class="member-avatar add clickable"></div>
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
                               
                                <!-- <button class="label-avatar flex align-center clickable" v-for="label in labelsDisplay"
                                    :style="{ 'background-color': label.color }">
                                    <div class="bullet"></div>
                                    {{ label.title }}
                                </button> -->
                                <button class="label-avatar flex align-center add clickable"></button>
                            </div>
                        </div>
                        <div class="detail-item" v-if="card.dueDate">
                            <div class="detail-item-header">Due date</div>
                            <div class="detail-item-content flex align-center">
                                <button class="checkbox" :class="isCompleted"
                                    @click="(card.dueDate.isCompleted = !card.dueDate.isCompleted)"></button>
                                <div class="date-display">{{ formattedDueDate }} <span
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
                            <template v-if="card.description">{{ card.description }}</template>
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
                    <attachmentDisplay v-if="card.attachments" :attachments="card.attachments" @updateAttachments="updateAttachments" />
                    <section class="edit-block" v-if="card.checklists" v-for="checklist in card.checklists">
                        <span class="icon lg checkList"></span>
                        <span class="header flex justify-between">
                            <!-- <h3>{{checklist.title}}</h3> -->
                            <input type="text" v-model="checklist.title">
                            <div class="checklist-options">
                                <!-- <button class="modal-btn">Hide Checked items</button> -->
                                <button class="modal-btn" @click="removeChecklist">Delete</button>
                            </div>
                        </span>
                        <span class="sub-icon">{{ calcProgress(checklist) }}%</span>
                        <div class="content">
                            <progress class="progress-bar" :class="allDone(checklist)" :value="calcProgress(checklist)"
                                max="100"></progress>
                        </div>

                        <ul class="dynamic-content todo-list flex column">
                            <li class="todo-item-container flex clickable" v-for="todo in checklist.todos"
                                @click="openEditMode(todo)" v-click-outside="() => closeEditMode(todo)">
                                <div class="todo-item flex">
                                    <button class="checkbox" :class="isDone(todo.isDone)"
                                        @click.stop="todo.isDone = !todo.isDone"></button>
                                    <span v-if="!todo.editMode" :class="isDone(todo.isDone)">{{ todo.title }}</span>
                                    <section v-else class="edit-todo flex wrap">
                                        <textarea class="edit-mode" v-model="todo.title"></textarea>
                                        <div class="break"></div>
                                        <button class="modal-btn add-todo-btn"
                                            @click.stop="closeEditMode(todo)">save</button>
                                        <span class="icon lg close" @click.stop="removeTodo(checklist, todo)"></span>
                                    </section>
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
                                <textarea placeholer="Add an item" v-model="newTodo.title"></textarea>
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
                <modal-sidebar :card="getCurrCard" :isMiniModalOpen="isMiniModalOpen" @closeMiniModal="closeMiniModal"
                    @updateCard="updateCard" @updateLabels="updateLabels" @removeCard="removeCard"
                    @openMiniModal="openMiniModal" @sideModalChange="changeCard" />
            </div>
        </div>
    </article>
</template>

<script>
import modalSidebar from './modal-sidebar.vue'
import attachmentDisplay from './attachment-display.vue'
import { utilService } from '../services/util.service';
export default {
    props: {
        isScreen: Boolean
    },
    emits: ['toggleEdit', 'updateCard', 'updateLabels'],
    data() {
        return {
            card: null,
            realTextArea: false,
            isMiniModalOpen: false,
            newTodo: {
                title: '',
                isDone: false
            },
            // currTodo: null
        }
    },
    async created() {
        if (!this.$store.getters.boards) await this.$store.dispatch({ type: "loadBoards" });
        const { boardId } = this.$route.params
        this.$store.commit({ type: 'setBoardById', id: boardId });


        this.realTextArea = false
        const { id } = this.$route.params
        const board = this.$store.getters.getCurrBoard
        board.groups.forEach(group => {
            group.cards.forEach(card => {

                if (card.id === id) {
                    this.card = JSON.parse(JSON.stringify(card))
                    // setCurrCard(state, { cardId })
                    return
                }
            })
        })
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
            // this.updateCard()
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
        addDescription() {
            //need to add description to card
        },
        updateCard(currCard) {
            if(currCard)this.$store.dispatch({ type: "saveCard", card: currCard })
            else this.$store.dispatch({ type: "saveCard", card: this.card })
        },
        updateLabels(labels) {
            this.$store.commit({ type: "updateLabels", labels })
        },
        changeCard(card) {

            this.card = card
        },
        removeCard(cardId) {
            this.$store.dispatch({ type: "removeCard", cardId });
            this.closeModal()
        },
        openMiniModal() {
            this.isMiniModalOpen = true
        },
        closeMiniModal() {
            setTimeout(() => {
                this.isMiniModalOpen = false
            }, 0)
        },
        memberInitials(member) {
            const fullName = member.fullname.split(' ');
            const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
            return initials.toUpperCase();
        },
        removeChecklist(checklistId) {
            const checklistIdx = this.card.checklists.findIndex(c => c.id === checklistId)
            this.card.checklists.splice(checklistIdx, 1)
        },
        openAddTodo(checklist) {
            checklist.newTodo = true;
        },
        closeAddTodo(checklist) {
            this.newTodo = { title: '' }
            checklist.newTodo = false;
        },
        saveTodo(checklist) {
            this.newTodo.id = utilService.makeId()

            checklist.todos.push(this.newTodo)
            this.closeAddTodo(checklist)
        },
        closeEditMode(todo) {
            todo.editMode = false
        },
        openEditMode(todo) {
            todo.editMode = true
        },
        removeTodo(checklist, todo) {
            todo.editMode = false
            const todoIdx = checklist.todos.findIndex(t => t.id == todo.id)
            checklist.todos.splice(todoIdx, 1)
        },
        isDone(isDone) {
            return { checked: isDone }
        },
        calcProgress(checklist) {
            const ratio = checklist.todos.reduce((acc, todo) => todo.isDone ? acc + 1 : acc, 0)
            const percent = (100 * (ratio / checklist.todos.length)).toFixed(1)
            // console.log('doneRatio', checklist)
            return percent
        },
        getColorWithOpacity(color) {
            color += '4F'
            return color
        },
        allDone(checklist) {
            return { done: this.calcProgress(checklist) == 100 }
        }
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
            const hours = (dateToFormat.getHours() % 12) + ':' + dateToFormat.getMinutes() + ' ' + ampm
            return (date + ' at ' + hours)
        },
        isCompleted() {
            return { checked: this.card.dueDate.isCompleted }
        },
        updateAttachments(attachments){
            this.card.attachments = attachments
            // this.updateCard()
        }



    },
    unmounted() {
        this.realTextArea = false
    },
    components: {
        modalSidebar,
        attachmentDisplay
    },
    //     watch:{
    //         card:{
    //             handler(newVal, oldVal){
    //                 this.updateCard()
    //             },
    //             deep:true
    //         }
    // }
}
</script>