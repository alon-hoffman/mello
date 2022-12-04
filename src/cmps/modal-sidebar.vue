<template>
    <section class="modal-add-menu">
        <h4>Add to card</h4>
        <div @click="openMiniModal('Members')" class="fake-button add-option-div" value="hello">
            <span class="icon sm user"></span>Members</div>
        <div @click="openMiniModal('Labels')" class="fake-button add-option-div">
            <span class="icon sm label"></span>Labels
        </div>
        <div @click="openMiniModal('Checklist')" class="fake-button add-option-div">
            <span class="icon sm checklist-check"></span>Checklist</div>
        <div @click="openMiniModal('Dates')" class="fake-button add-option-div">
            <span class="icon sm time"></span>Dates</div>
        <div @click="openMiniModal('Attachment')" class="fake-button add-option-div"> 
            <span class="icon sm attach"></span>Attachment</div>
        <div @click="openMiniModal('Cover')" class="fake-button add-option-div">
            <span class="icon sm cover"></span>Cover
        </div>
        <div @click="$emit('removeCard' ,card.id)" class="fake-button add-option-div">
            <span class="icon sm archive"></span>Archive
        </div>
        <custom-card class="option-custom-card" v-click-outside="closeMiniModal" v-if="IsMiniModalOpen">
            <template #header>
                <section class="mini-modal-header">
                    <span> {{ miniModalTitle }} </span>
                    <button class="clickable close-mini-modal-btn" @click="closeMiniModal">X</button>
                </section>
            </template>


            <template v-if="(miniModalTitle === 'Dates')">
                <!-- <div class="el-picker-panel__body"></div> -->
                <section class="mini-modal-body">
                    <el-date-picker type="date" placeholder="Pick a day" size="large" />
                </section>
            </template>
            <template v-if="(miniModalTitle === 'Members')">
                <section class="mini-modal-body">
                    <input v-model="filterMembersBy" type="text" name="" id="" placeholder="Search members">
                    <span>Board members</span>
                    <label class="members-checked-box" v-for="member in getFilterMembers"
                        @click="toggleMembers(member)">
                        <div class="members-checked-box-container">
                            <div class="user-and-img">
                                <section class="img-container">
                                    <span class="member-list-icon icon lg user"></span>
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
                    <span>Labels</span>
                    <section class="labels-checked-section" v-for="label in boardLabels">
                        <label class="clickable labels-checked-box">
                            <div class=" label-container" @click="toggleLabels(label)">
                                <img @click="toggleLabels(label)" class="checked-img" v-if="checkIfInLabelList(label)"
                                    src="../assets/icons/checkbox-try.svg">
                                <img @click="toggleLabels(label)" class="box-img" v-else src="../assets/icons/gray-square.svg" alt=""> 
                                <!-- <el-checkbox v-model="checked1" size="large" /> -->
                                <input v-on:keyup.enter="updateLabels" class="checkbox" v-model="label.title" type="text" :style="{ backgroundColor: label.color }">
                                <span class="icon sm edit"></span>
                                <!-- <button class="color-space" :style="{ backgroundColor: label.color }">
                                    <p class="round-circle" :style="{ backgroundColor: label.color }"></p>
                                </button> -->
                                <!-- <input class="checkbox " type="type" :style="{ backgroundColor: label.color }"> -->
                            </div>
                        </label>
                        <!-- <button @submit="updateLabels" class="clickable change-text-btn"> -->
                            <!-- <img class="pencil-img" src="../assets/icons/edit.svg" alt=""> -->
                            <!-- </button> -->
                    </section>
                </section>
            </template>
            <template v-if="(miniModalTitle === 'Checklist')">
                <section class="mini-modal-body">
                    <span>Title</span>
                    <input v-model="checklist" @submit="addChecklist" type="text">
                    <button @click="addChecklist" class="add-checkbox-btn">Add</button>
                </section>
            </template>
            <template v-if="(miniModalTitle === 'Attachment')">
                <section class="mini-modal-body">
                    <span>Attach a link</span>
                    <input type="text" placeholder="Paste any link here...">
                </section>
            </template>
            <template v-if="(miniModalTitle === 'Cover')">
                <section class="mini-modal-body">
                    <span>Colors</span>
                    <div class="first-colors-row">
                        <button class="green-btn"></button>
                        <button class="yellow-btn"></button>
                        <button class="orange-btn"></button>
                        <button class="red-btn"></button>
                        <button class="purple-btn"></button>
                    </div>
                    <div class="second-colors-row">
                        <button class="blue-btn"></button>
                        <button class="bright-blue-btn"></button>
                        <button class="bright-green-btn"></button>
                        <button class="pink-btn"></button>
                        <button class="dark-blue-btn"></button>
                    </div>
                    <span>Attachments</span>
                    <label class="cover-img-label">
                        <div class="fake-button cover-img-btn">Upload a cover image </div><input
                            @input="setBackgroundCard" class="cover-img-input" type="file">
                    </label>
                </section>
            </template>
        </custom-card>
    </section>
</template>


<script>
import customCard from './custom-card.vue';
import { utilService } from '../services/util.service';
export default {
    emits: ['updateCard','updateLabels','sideModalChange'],
    data() {
        return {
            IsMiniModalOpen: false,
            miniModalTitle: null,
            card:JSON.parse(JSON.stringify(this.$store.getters.getCard)),
            filterMembersBy: '',
            filterLabelsBy: '',
            checklist: "checklist",
            boardMembers: null,
            boardLabels: null,
            currMember: null
        }
    },
    async created() {
        if (!this.$store.getters.boards) await this.$store.dispatch({ type: "loadBoards" });
        this.boardMembers = this.$store.getters.getMembersOfBoard
        this.boardLabels = JSON.parse(JSON.stringify(this.$store.getters.getLabelsOfBoard))
    },
    methods: {
        openMiniModal(value) {
            this.miniModalTitle = value
            this.IsMiniModalOpen = true
        },
        closeMiniModal() {
            this.IsMiniModalOpen = false
        },
        setBackgroundCard() {

        },
        toggleMembers(member) {
            console.log("🚀 ~ file: modal-sidebar.vue:158 ~ toggleMembers ~ member", member)
            if(this.card.members?.length){
            const idx = this.card.members.findIndex((m) => m._id === member._id)
            if (idx !== -1) this.card.members.splice(idx, 1)
            else this.card.members.push(member)
            }
            else this.card.members=[member]
            console.log("🚀 ~ file: modal-sidebar.vue:164 ~ toggleMembers ~ this.card.members", this.card.members)

            // this.updateCard()
        },
        toggleLabels(label) {
            console.log(`label = `, label)
            const idx = this.card.labels.findIndex((l) => l === label._id)
            if (idx !== -1) this.card.labels.splice(idx, 1)
            else this.card.labels.push(label._id)
            this.updateCard()
        },
        checkIfInMemberList(member) {
            if(!this.card.members) return
            return this.card.members.filter((currMember) => currMember._id === member._id).length
        },
        checkIfInLabelList(label) {
            return this.card.labels.includes(label._id)
        },
        updateCard() {
            this.$emit('updateCard', this.card)
            // this.$emit('updateCard', this.card)
        },
        addChecklist(){
            const newChecklist={
                title: `${this.checklist}`,
                id:utilService.makeId()
            }
            if(!this.card.checklists) this.card.checklists=[]
            this.card.checklists.push(newChecklist)
            this.IsMiniModalOpen = false
            this.checklist="checklist"
            this.updateCard()
        },
        updateLabels(){
            this.$emit('updateLabels', this.boardLabels)
            // console.log(`this.boardLabels = `, this.boardLabels)
        },
    },
    computed: {
        getFilterMembers() {
            const regex = new RegExp(this.filterMembersBy, 'i')
            return this.boardMembers.filter((member) => {
                return regex.test(member.fullname)
            })
        }
    },
    components: {
        customCard,
    },
    watch:{
        card:{
            handler(newVal, oldVal){
                // this.$emit('updateCard', this.card)
                 this.$emit("sideModalChange",this.card)
            },
            deep:true
        }
}
}
</script>