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
        <div @click="updateImgAttachmentsColors" class="fake-button add-option-div">
            <span class="icon sm cover"></span>Cover
        </div>
        <div @click="toggleArchive" class="fake-button add-option-div">
            <span class="icon sm" :class="isArchived"></span>{{ card.isArchived ? 'Send To Board' : 'Archive' }}
        </div>
        <div @click="openMiniModal('Delete card?')" class="fake-button add-option-div delete" v-if="card.isArchived">
            <span class="icon sm remove"></span>Delete
        </div>
        <Teleport to="body">
            <custom-card class="option-custom-card" v-click-outside="closeMiniModal" :modalCords="modalCords" v-if="isMiniModalOpen">
                <template #header>
                    <section class="mini-modal-header">
                        <span> {{ miniModalTitle }} </span>
                        <button class="clickable close-mini-modal-btn" @click="closeMiniModal"></button>
                    </section>
                </template>


                <template v-if="(miniModalTitle === 'Dates')">
                    <!-- <div class="el-picker-panel__body"></div> -->
                    <section class="mini-modal-body date-section">
                        <date-picker @click="dateOpen" @change="updateDate" locale="en" type="datetime"
                            class="custom-input" label-class="icon-sm icon-clock" ref="date" v-model="newDate"
                            placeholder="Enter due date" format="YYYY-MM-DD HH:mm:ss" color="#0079bf"
                            value></date-picker>

                        <!-- <input v-model="newDate" type="text" placeholder="Enter due date"> -->
                        <!-- <div @click="updateDate" class="fake-button save-date-btn">Save</div> -->
                    </section>
                </template>


                <template v-if="(miniModalTitle === 'Members')">
                    <section class="mini-modal-body">
                        <input v-model="filterMembersBy" type="text" name="" id="" placeholder="Search members">
                        <span class="mini-head">Board members</span>
                        <label class="members-checked-box" v-for="member in getFilterMembers"
                            @click="toggleMember(member)">
                            <div class="members-checked-box-container clickable">
                                <div class="user-and-img">
                                    <!-- <section class="img-container" :style="{ backgroundColor: getRandomColor }"> -->
                                    <!-- <span class="member-list-initials">{{ memberInitials(member) }}</span> -->
                                    <img class="member-img" :src="member.imgUrl" :alt="memberInitials(member)">
                                    <!-- </section> -->
                                    {{ member.fullname }}
                                </div>
                                <img class="check-img" v-if="checkIfInMemberList(member)"
                                    src="https://res.cloudinary.com/mello123/image/upload/v1670768099/pkjhgenz250tcjpl8kzw.png">
                            </div>
                        </label>
                    </section>
                </template>
                <template v-if="(miniModalTitle === 'Labels')">
                    <section class="mini-modal-body">
                        <input v-model="filterLabelsBy" type="text" name="" id="" placeholder="Search labels">
                        <span class="mini-head">Labels</span>
                        <div class="labels-checked-section-container">
                            <section class="labels-checked-section" v-for="label in labelsForDisplay">
                                <label class="clickable labels-checked-box">
                                    <div class=" label-container">
                                        <img @click="toggleLabels(label)" class="checked-img"
                                            v-if="checkIfInLabelList(label)" src="https://res.cloudinary.com/mello123/image/upload/v1670767955/uj8ldtbjqjianjvgexcq.png">
                                        <img @click="toggleLabels(label)" class="box-img" v-else
                                            src="https://res.cloudinary.com/mello123/image/upload/v1670768011/r1u5oygdifx7hj5ddprk.png" alt="">
                                        <div class="label-color-container" @click="toggleLabels(label)"
                                            :style="{ backgroundColor: getColorWithOpacity(label.color) }">
                                            <!-- {{label.title}} -->
                                            <div class="label-circle" :style="{ backgroundColor: label.color }"></div>
                                            <div class="label-title-area">{{ label.title }}</div>
                                        </div>
                                        <span @click="changeMiniModal(label)" class="icon sm edit"></span>
                                    </div>
                                </label>
                            </section>
                        </div>
                        <div @click="openCreateLabelModal" class="fake-button go-to-create-label-btn">Create a new label
                        </div>
                    </section>
                </template>
                <template v-if="(miniModalTitle === 'Edit label')">
                    <section class="mini-modal-body edit-label-section">
                        <div class="chosen-label-space">
                            <div class="chosen-label"
                                :style="{ backgroundColor: getColorWithOpacity(chosenLabel.color) }">
                                <div class="label-circle" :style="{ backgroundColor: chosenLabel.color }"></div>
                                <span class="chosenLabel-title">{{ chosenLabel.title }}</span>
                            </div>
                        </div>
                        <span class="mini-head">Title</span>
                        <input v-model="chosenLabel.title" type="text">
                        <span class="mini-head">Select a color</span>
                        <div class="colors-palette">
                            <div class="color-box-container" v-for="color in possibleColors">
                                <div @click="setLabelBGC(color)" value="color" class="color-box"
                                :class="{'chosen-element':(color===chosenLabel.color)}"
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
                            <div class="chosen-label"
                                :style="{ backgroundColor: getColorWithOpacity(chosenLabel.color) }">
                                <div class="label-circle" :style="{ backgroundColor: chosenLabel.color }"></div>
                                <span class="chosenLabel-title">{{ chosenLabel.title }}</span>
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
                        <div v-if="(card.coverColor || card.imgURL)" @click="removeCover"
                            class="fake-button remove-cover-button">Remove cover</div>
                        <span class="mini-head">Colors</span>
                        <div class="first-colors-row">
                            <button class="green-btn" :class="{'chosen-element':(card.coverColor==='#7BC86C')}" value="#7BC86C" @click="setCover"></button>
                            <button class="yellow-btn" :class="{'chosen-element':(card.coverColor==='#F5DD29')}" value="#F5DD29" @click="setCover"></button>
                            <button class="orange-btn" :class="{'chosen-element':(card.coverColor==='#FFAF3F')}" value="#FFAF3F" @click="setCover"></button>
                            <button class="red-btn" :class="{'chosen-element':(card.coverColor==='#EF7564')}" value="#EF7564" @click="setCover"></button>
                            <button class="purple-btn" :class="{'chosen-element':(card.coverColor==='#CD8DE5')}" value="#CD8DE5" @click="setCover"></button>
                        </div>
                        <div class="second-colors-row">
                            <button class="blue-btn" :class="{'chosen-element':(card.coverColor==='#5BA4CF')}" value="#5BA4CF" @click="setCover"></button>
                            <button class="bright-blue-btn" :class="{'chosen-element':(card.coverColor==='#29CCE5')}" value="#29CCE5" @click="setCover"></button>
                            <button class="bright-green-btn" :class="{'chosen-element':(card.coverColor==='#6DECA9')}" value="#6DECA9" @click="setCover"></button>
                            <button class="pink-btn" :class="{'chosen-element':(card.coverColor==='#FF8ED4')}" value="#FF8ED4" @click="setCover"></button>
                            <button class="dark-blue-btn" :class="{'chosen-element':(card.coverColor==='#172B4D')}" value="#172B4D" @click="setCover"></button>
                        </div>
                        <span class="mini-head">Attachments</span>
                        <div v-if="card?.attachments?.length" class="attachment-imgs-container">
                            <img class="attachment-img clickable" v-for="(image, index) in getImageAttachments"
                                :src="image.href" @click="setCoverImgFromAttachments(image.href)"
                                :style="{ backgroundColor: imgAttachmentsColors[index] }" alt="">
                        </div>
                        <label class="cover-img-label">
                            <div class="fake-button cover-img-btn">Upload a cover image </div><input
                                @input="uploadAndSetCoverImg" class="cover-img-input" type="file">
                        </label>
                        <span class="mini-head">Photos from unsplash</span>

                        <input @input="processChange" ref="search" type="text" placeholder="Search for photos"
                            class="search-unsplash-photos" v-model="searchPhoto">
                        <div class="unsplash-photos-container" v-if="unsplashPhotos">
                            <img v-for="photoObject in getUnsplashPhotos" @click="setCoverImg(photoObject)"
                                :src="photoObject.urls.thumb" class="unsplashPhoto clickable">
                        </div>
                    </section>
                </template>
                <template v-if="miniModalTitle === 'Delete card?'">
                    <section class="mini-modal-body delete">
                        <p>
                            All actions will be removed from the activity feed and you won’t be able to re-open the
                            card. There is no undo.
                        </p>
                        <button class="delete-btn" @click="$emit('removeCard', card.id)">Delete</button>
                    </section>
                </template>
            </custom-card>
        </Teleport>
    </section>
</template>

<script >
import customCard from './custom-card.vue';
import { utilService } from '../services/util.service';
import DatePicker from 'vue3-persian-datetime-picker';
import { uploadService } from '../services/upload.service.js'
import { FastAverageColor } from 'fast-average-color';
import { unsplashPhotosService } from '../services/unsplash-photos.service.js';



export default {
    props: {
        card: Object,
        modalCords: Object,
        isMiniModalOpen: Boolean,
        miniModalTitle: String,
    },
    emits: ['updateCard', 'updateLabels', 'sideModalChange', 'openMiniModal', 'closeMiniModal', 'removeCard'],
    data() {
        return {

            filterMembersBy: '',
            filterLabelsBy: '',
            checklist: "Checklist",
            boardMembers: null,
            boardLabels: null,
            currMember: null,
            isDatePickerOpen: false,
            newDate: this.card.dueDate,
            attachment: {
                href: '',
                file: null,
                createdAt: '',
                type: '',
            },
            possibleColors: ['#b7ddb0', '#f5ea92', '#fad29c', '#efb3ab', '#dfc0eb', '#7bc86c', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5', '#5aac44', '#e6c60d', '#e79217', '#cf513d', '#a86cc1', '#8bbdd9', '#8fdfeb', '#b3f1d0', '#f9c2e4', '#505f79', '#5ba4cf', '#29cce5', '#6deca9', '#ff8ed4', '#344563', '#026aa7', '#00aecc', '#4ed583', '#e568af', '#091e42'],
            chosenLabel: null,
            unsplashPhotos: null,
            fac: new FastAverageColor(),
            searchPhoto: null,
            imgAttachmentsColors: []
        }
    },
    async created() {
        if (!this.$store.getters.boards) await this.$store.dispatch({ type: "loadBoards" });
        this.boardMembers = this.$store.getters.getMembersOfBoard
        this.boardLabels = JSON.parse(JSON.stringify(this.$store.getters.getLabelsOfBoard))
        this.processChange = utilService.debounce(() => this.searchPhotosUnsplash())
    },
    methods: {
        async openMiniModal(value) {
            if (value === 'Cover') {
                this.unsplashPhotos = await unsplashPhotosService.getPhoto()
                this.unsplashPhotos.splice(9, 1)
            }
            this.$emit('openMiniModal', value)
            setTimeout(() => {
                if (value === 'Dates') this.$refs.date.focus()
            }, 0)
            // "imgURL": "https://res.cloudinary.com/mello123/image/upload/v1670495494/m1eqbxy10jmm4ukliduo.jpg",
            // learn taco recipe
        },
        changeMiniModal(label) {
            this.chosenLabel = JSON.parse(JSON.stringify(label))
            // this.miniModalTitle = 'Edit label'
            this.$emit('openMiniModal', 'Edit label')

        },
        openCreateLabelModal() {
            this.chosenLabel = {
                color: "#7bc86c",
                title: ""
            },
                this.$emit('openMiniModal', 'Create label')
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
                const idx = this.card.members.findIndex((m) => m.fullname === member.fullname)
                if (idx !== -1) this.card.members.splice(idx, 1)
                else this.card.members.push(member)
            }
            else this.card.members = [member]
            this.updateCard()

        },
        toggleLabels(label) {
            if (this.card.labels?.length) {
                const idx = this.card.labels.findIndex((l) => l === label.id)
                if (idx !== -1) this.card.labels.splice(idx, 1)
                else this.card.labels.push(label.id)
            }
            else this.card.labels = [label.id]
            this.updateCard()

        },
        checkIfInMemberList(member) {
            if (!this.card.members) return
            return this.card.members.filter((currMember) => currMember.fullname === member.fullname).length > 0
        },
        checkIfInLabelList(label) {
            if (!this.card.labels) return false
            return this.card.labels.includes(label.id)
        },
        updateCard() {
            this.$emit('updateCard', this.card)
        },
        addChecklist() {
            const newChecklist = {
                title: this.checklist,
                id: utilService.makeId(),
                todos: [],
            }
            if (!this.card.checklists) this.card.checklists = []
            const activity = { action: 'addDetail', card: this.card, detail: this.checklist }
            this.$store.dispatch({ type: 'addActivity', activity })
            this.card.checklists.push(newChecklist)
            this.checklist = "Checklist"
            setTimeout(() => { this.$emit('closeMiniModal') }, 500)
            this.updateCard()
        },
        setLabelBGC(selectedColor) {
            this.chosenLabel.color = selectedColor
            this.updateCard()

        },
        setCover(e) {
            if (this.card.imgURL) this.card.imgURL = null
            this.card.coverColor = e.target.value
            this.updateCard()

        },
       async setCoverImg(photoObject) {
            if(photoObject.color){
                // photoObject.
                this.card.coverColor = photoObject.color
                this.card.imgURL = photoObject.urls.thumb
            }
            else {
                this.card.coverColor= await this.getAverageColor(photoObject)
                this.card.imgURL = photoObject
            }
            this.updateCard()

        },
        async setCoverImgFromAttachments(photoUrl) {
           const color= await this.getAverageColor(photoUrl)
           this.card.coverColor = color
           this.card.imgURL = photoUrl
           this.updateCard()

        },
        updateImgAttachmentsColors() {
            this.openMiniModal('Cover')
            if (!this.getImageAttachments?.length) return
            this.imgAttachmentsColors = []
            this.getImageAttachments.forEach((attachment) => {
                this.getAverageColor(attachment.href)
            })
        },
        async getAverageColor(imgUrl) {
            let res = await this.fac.getColorAsync(imgUrl)
            this.imgAttachmentsColors.push(res.hex)
            return res.hex
        },
        async searchPhotosUnsplash() {
            this.unsplashPhotos = await unsplashPhotosService.getPhoto(this.searchPhoto)
        },
        removeCover() {
            if (this.card.coverColor) {
                this.card.coverColor = null
            }
            else {
                this.card.imgURL = null
            }
            this.updateCard()
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
                file: null,
            }
            this.updateCard()
        },
        updateChosenLabel(action) {
            const labelIdx = this.boardLabels.findIndex((label) => label.id === this.chosenLabel.id)
            if (action === 'save') this.boardLabels.splice(labelIdx, 1, this.chosenLabel)
            else this.boardLabels.splice(labelIdx, 1)
            this.$emit('updateLabels', this.boardLabels)
            // this.miniModalTitle = 'Labels'
            this.$emit('openMiniModal', 'Labels')

        },
        addChosenLabel() {
            this.chosenLabel.id = utilService.makeId()
            this.boardLabels.push(this.chosenLabel)
            this.$emit('updateLabels', this.boardLabels)
            // this.miniModalTitle = 'Labels'
            this.$emit('openMiniModal', 'Labels')

        },
        updateDate() {
            const time = +new Date(this.newDate).getTime()
            this.card.dueDate = { time, isCompleted: false }

            // this.card.dueDate.isCompleted = false
            setTimeout(() => { this.$emit('closeMiniModal') }, 1000)
            this.updateCard()
        },
        async uploadImgToCloud(ev) {
            // console.log(`ev = `, ev)
            const res = await uploadService.uploadImg(ev);
            this.attachment.href = res.url;
            this.attachment.type = 'img';
            this.addAttachment()
            this.$emit('closeMiniModal')
        },
        async uploadAndSetCoverImg(ev) {
            const res = await uploadService.uploadImg(ev);
            //Adding with 'w_auto' makes it that smaller devices will show a smaller image file
            const parts = res.secure_url.split("/");
              // Find the index of the "upload" part of the URL
            const uploadIndex = parts.indexOf("upload");

            // Insert the 'w_auto' transformation parameter after the "upload" part
            parts.splice(uploadIndex + 1, 0, "w_auto");
            const imageUrl=parts.join("/")
            this.setCoverImg(imageUrl)
        },
        dateOpen() {
            this.isDatePickerOpen = true
        },
        getColorWithOpacity(color) {
            color += '4F'
            return color
        },
        toggleArchive() {
            this.card.isArchived = !this.card.isArchived
            const activity =
            {
                action: this.card.isArchived ? 'archiveItem' : 'retrieveItem',
                card: this.card
            }
            this.$store.dispatch({type: 'addActivity', activity})
            if(this.card.isArchived) this.$store.commit({type: 'archiveItem', item :this.card})
            else this.$store.commit({type: 'retrieveItem', item: this.card })
            this.updateCard(this.card)
        },
        isIncluded(id){
            return {checked: this.boardLabels.includes(id)}
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
        getImageAttachments() {

            if(!this.card.attachments) return
            return this.card.attachments.filter((attachment) => attachment.type === "img")
        },
        labelsForDisplay() {
            const regex = new RegExp(this.filterLabelsBy, 'i')
            return this.boardLabels.filter((label) => {
                return regex.test(label.title)
            })
        },
        getUnsplashPhotos() {
            return this.unsplashPhotos
        },
        isArchived() {
            return { archive: !this.card.isArchived, return: this.card.isArchived }
        },
        
    },
    components: {
        customCard,
        DatePicker,
    },
}
</script>