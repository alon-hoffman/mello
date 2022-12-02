<template>
    <section class="modal-add-menu">
        <h4>Add to card</h4>
        <div @click="openMiniModal('Members')" class="fake-button add-option-div" value="hello"><img
                class="add-option-img" src="../assets/icons/person.svg" alt="">Members</div>
        <div @click="openMiniModal('Labels')" class="fake-button add-option-div"><img class="add-option-img"
                src="../assets/icons/tags.svg" alt="">Labels
        </div>
        <div @click="openMiniModal('Checklist')" class="fake-button add-option-div"><img class="add-option-img"
                src="../assets/icons/check_box_marked.svg" alt="">Checklist</div>
        <div @click="openMiniModal('Dates')" class="fake-button add-option-div"><img class="add-option-img"
                src="../assets/icons/clock-regular.svg" alt="">Dates</div>
        <div @click="openMiniModal('Attachment')" class="fake-button add-option-div"><img class="add-option-img"
                src="../assets/icons/attach.svg" alt="">Attachment</div>
        <div @click="openMiniModal('Cover')" class="fake-button add-option-div"><img class="add-option-img"
                src="../assets/icons/cover.svg" alt="">Cover
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
                                    <img class="anonymous-user-img" src="../assets/icons/anonymous-user.svg">
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
                                <img class="checked-img" v-if="checkIfInLabelList(label)"
                                    src="../assets/icons/checkbox-try.svg">
                                <img class="box-img" v-else src="../assets/icons/gray-square.svg" alt="">
                                <input v-on:keyup.enter="updateLabels" class="checkbox " v-model="label.title" type="text" :style="{ backgroundColor: label.color }">
                                <!-- <button class="color-space" :style="{ backgroundColor: label.color }">
                                    <p class="round-circle" :style="{ backgroundColor: label.color }"></p>
                                </button> -->
                                <!-- <input class="checkbox " type="type" :style="{ backgroundColor: label.color }"> -->
                            </div>
                        </label>
                        <button @submit="updateLabels" class="clickable change-text-btn"><img class="pencil-img" src="../assets/icons/edit.svg"
                                alt=""></button>
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
    emits: ['updateCard','updateLabels'],
    props: {
        card: {
            type: Object
        }
    },
    data() {
        return {
            IsMiniModalOpen: false,
            miniModalTitle: null,
            cardCopy: {
                id:'c103',
                title: "im new",
                members: [
                    {
                        "_id": "u101",
                        "fullname": "Alon Hoffman",
                        "imgUrl": "https://www.google.com"
                    },
                    {
                        "_id": "u102",
                        "fullname": "Itai Morag",
                        "imgUrl": "https://www.google.com"
                    },
                ],
                labels: ["l102", "l104"]
            },
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
            const idx = this.cardCopy.members.findIndex((m) => m._id === member._id)
            if (idx !== -1) this.cardCopy.members.splice(idx, 1)
            else this.cardCopy.members.push(member)
            this.updateCard()
        },
        toggleLabels(label) {
            console.log(`label = `, label)
            const idx = this.cardCopy.labels.findIndex((l) => l === label._id)
            if (idx !== -1) this.cardCopy.labels.splice(idx, 1)
            else this.cardCopy.labels.push(label._id)
            this.updateCard()
        },
        checkIfInMemberList(member) {
            return this.cardCopy.members.filter((currMember) => currMember._id === member._id).length
        },
        checkIfInLabelList(label) {
            return this.cardCopy.labels.includes(label._id)
        },
        updateCard() {
            this.$emit('updateCard', this.cardCopy)
            // this.$emit('updateCard', this.card)
        },
        addChecklist(){
            const newChecklist={
                title: `${this.checklist}`,
                id:utilService.makeId()
            }
            if(!this.cardCopy.checklists) this.cardCopy.checklists=[]
            this.cardCopy.checklists.push(newChecklist)
            this.IsMiniModalOpen = false
            this.checklist="checklist"
            this.updateCard()
        },
        updateLabels(){
            this.$emit('updateLabels', this.boardLabels)
            console.log(`this.boardLabels = `, this.boardLabels)
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
}
</script>