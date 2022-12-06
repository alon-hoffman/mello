<template>
    <section class="modal-add-menu">
        <span class="options-head">Add to card</span>
        <div @click="openMiniModal('Members')" class="fake-button add-option-div" value="hello">
            <span class="icon sm user"></span>Members
        </div>
        <div @click="openMiniModal('Labels')" class="fake-button add-option-div">
            <span class="icon sm label"></span>Labels
        </div>
        <div @click="openMiniModal('Add checklist')" class="fake-button add-option-div">
            <span class="icon sm checklist-check"></span>Checklist
        </div>
        <div @click="openMiniModal('Dates')" class="fake-button add-option-div">
            <span class="icon sm time"></span>Dates
        </div>
        <div @click="openMiniModal('Attach from...')" class="fake-button add-option-div">
            <span class="icon sm attach"></span>Attachment
        </div>
        <div @click="openMiniModal('Cover')" class="fake-button add-option-div">
            <span class="icon sm cover"></span>Cover
        </div>
        <div @click="$emit('removeCard', card.id)" class="fake-button add-option-div">
            <span class="icon sm archive"></span>Archive
        </div>
        <custom-card class="option-custom-card" v-click-outside="closeMiniModal" v-if="isMiniModalOpen">
            <template #header>
                <section class="mini-modal-header">
                    <span> {{ miniModalTitle }} </span>
                    <button class="clickable close-mini-modal-btn" @click="closeMiniModal"></button>
                </section>
            </template>


            <template v-if="(miniModalTitle === 'Dates')">
                <!-- <div class="el-picker-panel__body"></div> -->
                <section class="mini-modal-body date-section">
                    <date-picker @click="dateOpen" @change="updateDate" locale="en" type="datetime" class="custom-input"
                        label-class="icon-sm icon-clock" ref="date" v-model="newDate" placeholder="Enter due date"
                        format="YYYY-MM-DD HH:mm:ss" color="#0079bf" value></date-picker>

                    <!-- <input v-model="newDate" type="text" placeholder="Enter due date"> -->
                    <!-- <div @click="updateDate" class="fake-button save-date-btn">Save</div> -->
                </section>
            </template>


            <template v-if="(miniModalTitle === 'Members')">
                <section class="mini-modal-body">
                    <input v-model="filterMembersBy" type="text" name="" id="" placeholder="Search members">
                    <span class="mini-head">Board members</span>
                    <label class="members-checked-box" v-for="member in getFilterMembers" @click="toggleMember(member)">
                        <div class="members-checked-box-container">
                            <div class="user-and-img">
                                <section class="img-container" :style="{ backgroundColor: getRandomColor }">
                                    <span class="member-list-initials">{{ memberInitials(member) }}</span>
                                </section>
                                {{ member.fullname }}
                            </div>
                            <img class="check-img" v-if="checkIfInMemberList(member)"
                                src="../assets/icons/gray-check.svg">
                        </div>
                    </label>
                </section>
            </template>
            <template v-if="(miniModalTitle === 'Labels')">
                <section class="mini-modal-body">
                    <input v-model="filterLabelsBy" type="text" name="" id="" placeholder="Search labels">
                    <span class="mini-head">Labels</span>
                    <div class="labels-checked-section-container">
                        <section class="labels-checked-section" v-for="label in boardLabels">
                            <label class="clickable labels-checked-box">
                                <div class=" label-container">
                                    <img @click="toggleLabels(label)" class="checked-img" v-if="checkIfInLabelList(label)"
                                    src="../assets/icons/checkbox-try.svg">
                                    <img @click="toggleLabels(label)" class="box-img" v-else
                                    src="../assets/icons/gray-square.svg" alt="">
                                    <div class="label-color-container" @click="toggleLabels(label)"
                                    :style="{ backgroundColor: label.color }">
                                    <!-- {{label.title}} -->
                                    <div class="label-circle" :style="{ backgroundColor: label.color }"></div>
                                    <div class="label-title-area">{{ label.title }}</div>
                                </div>
                                <span @click="changeMiniModal(label)" class="icon sm edit"></span>
                            </div>
                        </label>
                    </section>
                </div>
                    <div @click="openCreateLabelModal" class="fake-button go-to-create-label-btn">Create a new label</div>
                </section>
            </template>
            <template v-if="(miniModalTitle === 'Edit label')">
                <section class="mini-modal-body edit-label-section">
                    <div class="chosen-label-space">
                        <div class="chosen-label" :style="{ backgroundColor: chosenLabel.color }">{{ chosenLabel.title
                        }}
                        </div>
                    </div>
                    <span class="mini-head">Title</span>
                    <input v-model="chosenLabel.title" type="text">
                    <span class="mini-head">Select a color</span>
                    <div class="colors-palette">
                        <div class="color-box-container" v-for="color in possibleColors">
                            <div @click="setLabelBGC(color)" value="color" class="color-box"
                                :style="{ backgroundColor: color }">
                            </div>
                        </div>
                    </div>
                    <div class="remove-color-btn-container">
                        <div @click="updateDate" class="fake-button remove-color-btn">Remove color</div>
                    </div>
                    <div class="save-delete-btn-container">
                        <div class="save-label-btn" @click="updateChosenLabel('save')">Save</div>
                        <div class="delete-label-btn" @click="updateChosenLabel('delete')">Delete</div>
                    </div>
                </section>
            </template>
            <template v-if="(miniModalTitle === 'Create label')">
                <section class="mini-modal-body edit-label-section">
                    <div class="chosen-label-space">
                        <div class="chosen-label" :style="{ backgroundColor: chosenLabel.color }">{{ chosenLabel.title
                        }}
                        </div>
                    </div>
                    <span class="mini-head">Title</span>
                    <input v-model="chosenLabel.title" type="text">
                    <span class="mini-head">Select a color</span>
                    <div class="colors-palette">
                        <div class="color-box-container" v-for="color in possibleColors">
                            <div @click="setLabelBGC(color)" value="color" class="color-box"
                                :style="{ backgroundColor: color }">
                            </div>
                        </div>
                    </div>
                    <div class="remove-color-btn-container">
                        <div @click="updateDate" class="fake-button remove-color-btn">Remove color</div>
                    </div>
                    <div class="save-delete-btn-container">
                        <div class="add-label-btn" @click="addChosenLabel">Create</div>
                    </div>
                </section>
            </template>
            <template v-if="(miniModalTitle === 'Add checklist')">
                <section class="mini-modal-body">
                    <span class="mini-head">Title</span>
                    <input v-model="checklist" @submit="addChecklist" type="text">
                    <button @click="addChecklist" class="add-checkbox-btn">Add</button>
                </section>
            </template>
            <template v-if="(miniModalTitle === 'Attach from...')">
                <section class="mini-modal-body add-attachment-computer">
                    <form @submit.prevent="addAttachment">
                        <label class="img-upload-container">
                            <div class="clickable add-attachment-computer">
                                <!-- <label> -->
                                <p>Computer</p>
                                <input type="file" @change="uploadImgToCloud" hidden />
                                <!-- </label> -->
                            </div>
                        </label>
                        <section class="under-computer">

                            <span class="mini-head">Attach a link</span>
                            <input type="text" v-model="attachment.href" placeholder="Paste any link here" />
                            <div @click="addAttachment" class="attach-btn fake-button">Attach</div>
                        </section>
                    </form>
                </section>
            </template>
            <template v-if="(miniModalTitle === 'Cover')">
                <section class="mini-modal-body">
                    <div v-if="(card.coverColor||card.imgURL)" @click="removeCover" class="fake-button remove-cover-button">Remove cover</div>
                    <span class="mini-head">Colors</span>
                    <div class="first-colors-row">
                        <button class="green-btn" value="#7BC86C" @click="setCover"></button>
                        <button class="yellow-btn" value="#F5DD29" @click="setCover"></button>
                        <button class="orange-btn" value="#FFAF3F" @click="setCover"></button>
                        <button class="red-btn" value="#EF7564" @click="setCover"></button>
                        <button class="purple-btn" value="#CD8DE5" @click="setCover"></button>
                    </div>
                    <div class="second-colors-row">
                        <button class="blue-btn" value="#5BA4CF" @click="setCover"></button>
                        <button class="bright-blue-btn" value="#29CCE5" @click="setCover"></button>
                        <button class="bright-green-btn" value="#6DECA9" @click="setCover"></button>
                        <button class="pink-btn" value="#FF8ED4" @click="setCover"></button>
                        <button class="dark-blue-btn" value="#172B4D" @click="setCover"></button>
                    </div>
                    <span class="mini-head">Attachments</span>
                    <div v-if="card.attachments?.length" class="attachment-imgs-container">
                        <img class="attachment-img" v-for="image in getImageAttachments" :src="image.href" @click="setCoverImg(image.href)" :style="{ backgroundImage: image.href }" alt="">
                    </div>
                    <label class="cover-img-label">
                        <div class="fake-button cover-img-btn">Upload a cover image </div><input
                            @input="setBackgroundCard" class="cover-img-input" type="file">
                    </label>
                    <span class="mini-head">Photos from unsplash</span>
                </section>
            </template>
        </custom-card>
    </section>
</template>


<script>
import customCard from './custom-card.vue';
import { utilService } from '../services/util.service';
import DatePicker from 'vue3-persian-datetime-picker';
import { uploadService } from '../services/upload.service.js';

export default {
    props: {
        card: Object,
        isMiniModalOpen: Boolean,
    },
    emits: ['updateCard', 'updateLabels', 'sideModalChange', 'openMiniModal', 'closeMiniModal'],
    data() {
        return {

            miniModalTitle: null,
            filterMembersBy: '',
            filterLabelsBy: '',
            checklist: "checklist",
            boardMembers: null,
            boardLabels: null,
            currMember: null,
            isDatePickerOpen: false,
            newDate: this.card.dueDate,
            // date: '2020-10-10',
            attachment: {
                href: '',
                file: null,
                createdAt: '',
                type: '',
            },
            possibleColors: ['#b7ddb0', '#f5ea92', '#fad29c', '#efb3ab', '#dfc0eb', '#7bc86c', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5', '#5aac44', '#e6c60d', '#e79217', '#cf513d', '#a86cc1', '#8bbdd9', '#8fdfeb', '#b3f1d0', '#f9c2e4', '#505f79', '#5ba4cf', '#29cce5', '#6deca9', '#ff8ed4', '#344563', '#026aa7', '#00aecc', '#4ed583', '#e568af', '#091e42'],
            chosenLabel: null
        }
    },
    async created() {
        if (!this.$store.getters.boards) await this.$store.dispatch({ type: "loadBoards" });
        // console.log(this.card)
        this.boardMembers = this.$store.getters.getMembersOfBoard
        this.boardLabels = JSON.parse(JSON.stringify(this.$store.getters.getLabelsOfBoard))
    },
    methods: {
        openMiniModal(value) {
            this.miniModalTitle = value

            this.$emit('openMiniModal')
            setTimeout(() => {
                if (value === 'Dates') this.$refs.date.focus()
            }, 0)
            // this.isMiniModalOpen = true
        },
        changeMiniModal(label) {
            console.log(`label = `, label)
            this.chosenLabel = JSON.parse(JSON.stringify(label))
            this.miniModalTitle = 'Edit label'
        },
        openCreateLabelModal() {
            this.chosenLabel = {
                color: "#7bc86c",
                title: ""
            },
                this.miniModalTitle = 'Create label'

        },
        closeMiniModal() {
            this.$emit('closeMiniModal')
        },
        memberInitials(member) {
            const fullName = member.fullname.split(' ');
            const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
            return initials.toUpperCase();
        },
        toggleMember(member) {
            if (this.card.members?.length) {
                const idx = this.card.members.findIndex((m) => m._id === member._id)
                if (idx !== -1) this.card.members.splice(idx, 1)
                else this.card.members.push(member)
            }
            else this.card.members = [member]
        },
        toggleLabels(label) {
            if (this.card.labels?.length) {
                const idx = this.card.labels.findIndex((l) => l === label.id)
                if (idx !== -1) this.card.labels.splice(idx, 1)
                else this.card.labels.push(label.id)
            }
            else this.card.labels = [label.id]
        },
        checkIfInMemberList(member) {
            if (!this.card.members) return
            return this.card.members.filter((currMember) => currMember._id === member._id).length > 0
        },
        checkIfInLabelList(label) {
            if (!this.card.labels) return false
            return this.card.labels.includes(label.id)
        },
        updateCard() {
            console.log(`this.card = `, this.card)
            this.$emit('updateCard', this.card)
        },
        addChecklist() {
            const newChecklist = {
                title: this.checklist,
                id: utilService.makeId(),
                todos:[],
            }
            if (!this.card.checklists) this.card.checklists = []
            this.card.checklists.push(newChecklist)
            this.IsMiniModalOpen = false
            this.checklist = "checklist"
            this.updateCard()
            setTimeout(()=>{this.$emit('closeMiniModal')},500)
        },
        setLabelBGC(selectedColor) {
            this.chosenLabel.color = selectedColor
        },
        setCover(e) {
            if(this.card.imgURL) this.card.imgURL=null
            this.card.coverColor = e.target.value
        },
        setCoverImg(url){
            if(this.card.coverColor) this.card.coverColor=null
            this.card.imgURL=url
        },
        removeCover(){
            if(this.card.coverColor){
console.log(`cover = `)
                this.card.coverColor=null
            } 
            else{
                console.log(`img = `)
                this.card.imgURL=null
            }
        },
        addAttachment() {
            if (this.attachment.href && !this.attachment.type) this.attachment.type = 'link';
            if (!this.attachment.type) return;
            this.attachment.createdAt = Date.now();
            if (!this.card.attachments?.length) this.card.attachments = []
            this.card.attachments.unshift(this.attachment)
            this.attachment = {
                href: '',
                createdAt: '',
                type: '',
            }
        },
        updateChosenLabel(action) {
            const labelIdx = this.boardLabels.findIndex((label) => label.id === this.chosenLabel.id)
            if (action === 'save') this.boardLabels.splice(labelIdx, 1, this.chosenLabel)
            else this.boardLabels.splice(labelIdx, 1)
            this.$emit('updateLabels', this.boardLabels)
            this.miniModalTitle = 'Labels'
            // this.closeMiniModal()
        },
        addChosenLabel() {
            this.chosenLabel.id=utilService.makeId()
            this.boardLabels.push(this.chosenLabel)
            this.$emit('updateLabels', this.boardLabels)
            this.miniModalTitle = 'Labels'
        },
        updateDate() {
            const time = +new Date(this.newDate).getTime()
            this.card.dueDate = { time, isCompleted: false }

            // this.card.dueDate.isCompleted = false
            setTimeout(()=>{this.$emit('closeMiniModal')},1000)
            
        },

        async uploadImgToCloud(ev) {
            const res = await uploadService.uploadImg(ev);
            console.log(`res = `, res)
            this.attachment.href = res.url;
            this.attachment.type = 'img';
            this.addAttachment()
            this.$emit('closeMiniModal')
        },
        dateOpen() {
            this.isDatePickerOpen = true
        },
    },
    computed: {
        getFilterMembers() {
            const regex = new RegExp(this.filterMembersBy, 'i')
            return this.boardMembers.filter((member) => {
                return regex.test(member.fullname)
            })
        },
        getRandomColor() {
            return utilService.getRandomColor()
        },
        getImageAttachments(){
         return this.card.attachments.filter((attachment)=>attachment.type==="img")   
        }
    },
    components: {
        customCard,
        DatePicker,
    },
    watch: {
        card: {
            handler(newVal, oldVal) {
                console.log("change")
                this.$emit("updateCard", this.card)
            },
            deep: true
        },
        // newDate: {
        //     handler(newVal, oldVal) {
        //         console.log("change")
        //         this.$emit("sideModalChange", this.card)
        //     },
        //     deep: true
        // }
    }
}
</script>