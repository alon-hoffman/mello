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
                                    <!-- <span class="icon lg user"></span> -->
                                </section>
                                {{ member.fullname }}
                            </div>
                            <!-- <img class="check-img" v-if="checkIfInMemberList(member)"
                                src="../assets/icons/gray-check.svg"> -->
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
                                <!-- <img class="checked-img" v-if="checkIfInLabelList(label)"
                                    src="../assets/icons/checkbox-try.svg">
                                <img class="box-img" v-else src="../assets/icons/gray-square.svg" alt=""> -->
                                <!-- <svg width="16px" height="16px" viewBox="-3 -4 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" role="presentation"><path d="M1.49022 3.21486C1.2407 2.94412 0.818938 2.92692 0.548195 3.17644C0.277453 3.42597 0.260252 3.84773 0.509776 4.11847L2.91785 6.73131C3.2762 7.08204 3.80964 7.08204 4.14076 6.75092C4.18159 6.71082 4.18159 6.71082 4.38359 6.51218C4.57995 6.31903 4.79875 6.1037 5.03438 5.87167C5.70762 5.20868 6.38087 4.54459 7.00931 3.92318L7.0362 3.89659C8.15272 2.79246 9.00025 1.9491 9.47463 1.46815C9.73318 1.20602 9.73029 0.783922 9.46815 0.525367C9.20602 0.266812 8.78392 0.269712 8.52537 0.531843C8.05616 1.00754 7.21125 1.84829 6.09866 2.94854L6.07182 2.97508C5.4441 3.59578 4.77147 4.25926 4.09883 4.92165C3.90522 5.11231 3.72299 5.29168 3.55525 5.4567L1.49022 3.21486Z"></path></svg> -->
                                <el-checkbox v-model="checked1" size="large" />
                                <input v-on:keyup.enter="updateLabels" class="checkbox" v-model="label.title" type="text" :style="{ backgroundColor: label.color }">
                                <span class="icon sm edit"></span>
                                <!-- <button class="color-space" :style="{ backgroundColor: label.color }">
                                    <p class="round-circle" :style="{ backgroundColor: label.color }"></p>
                                </button> -->
                                <!-- <input class="checkbox " type="type" :style="{ backgroundColor: label.color }"> -->
                            </div>
                        </label>
                        <button @submit="updateLabels" class="clickable change-text-btn">
                            <!-- <img class="pencil-img" src="../assets/icons/edit.svg" alt=""> -->
                            </button>
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