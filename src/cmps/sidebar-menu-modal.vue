<template>
    <section v-if="currBoard" class="sidebar-menu-modal" v-click-outside="closeSidebarMenuModal">
        <section class="mini-modal-header">
            <span class="menu-modal-title">{{ header }}</span>
            <div @click="goBack"
                v-if="(header === 'Change background') || (header === 'Photos') || (header === 'Colors')"
                class="go-back-to-menu-arrow clickable"></div>
            <!-- <span v-if="header === 'Change background'" class="menu-modal-title">Change background</span> -->
            <button class="clickable close-mini-modal-btn" @click="closeSidebarMenuModal"></button>
            <!-- <span class="icon lg close modal-close" @click="closeSidebarMenuModal"></span> -->
        </section>
        <section v-if="header === 'Menu'" class="mini-modal-content">
            <div class="menu-navigation">
                <div class="menu-navigation-item flex align-center clickable" @click="toggleCurrentDisplay">
                    <span class="icon lg" :class="oppositeDisplay"></span>
                    <span>{{currDisplay === 'Activity' ? 'View items in archive' : 'Board activity'}}</span>
                </div>
                <div @click="changeModal('Change background')" class="change-background clickable">
                    <img v-if="currBoard.style.backgroundImageThumb" class="change-background-img" :src="currBoard.style.backgroundImageThumb">
                    <img v-else-if="currBoard.style.backgroundImage" class="change-background-img" :src="currBoard.style.backgroundImage">
                    <div class="change-background-img" :style="{ backgroundColor: currBoard.style.backgroundColor }"></div>
                    <span class="change-background-text mini-head">Change background</span>
                </div>
            </div>
            <section @click="archive" class="edit-block clickable">
                <span class="icon lg archive"></span>
                <span class="header flex justify-between">
                    <span class="activity-title">Archive this board</span>
                </span> </section>
            <section  class="edit-block">
                <span class="icon lg" :class="currentDisplay"></span>
                <span class="header flex justify-between">
                    <span class="activity-title">{{currDisplay}}</span>
                    <button class="modal-btn" v-if="currDisplay === 'Items in archive'" @click="switchArchiveList">{{oppositeArchiveList}}</button>
                </span>
                <ul class="content activity-list" v-if="currDisplay === 'Activity'">
                    <li v-for="activity in currBoard.activities" class="activity-list-item flex">
                        <div class="member-avatar" :style="{'background-image' : `url(${activity.user.imgUrl})`}"></div>
                        <div class="flex column" v-if="activity.title">
                            <span><strong>{{activity.user.fullname}}</strong>{{ activity.title.before}} <span class="activity-link clickable" @click="goToCard(activity.card)">{{activity.card.title}}</span>{{activity.title.after}}</span>
                            <span class="time">{{timeSince(activity.addedAt)}}</span>
                        </div>
                    </li>
                </ul>
                <ul class="content archive-list" v-if="currDisplay === 'Items in archive'">
                    <li class="archive-list-item" v-if="currArchivedList === 'card'" v-for="card in currBoard.archivedItems.card" @click="goToCard(card)">
                        <section class="card-preview">
                            <img v-if="card.imgURL" class="preview-image" :src="card.imgURL" alt="">
                            <div v-else-if="card.coverColor" class="card-preview-cover" :style="{ 'background-color': card.coverColor }"></div>
                            <div v-if="card.labels?.length" class="labels-container flex">
                                <div v-for="label in card.labels" :style="{ 'background-color': labelColor(label) }" class="label-preview"></div>
                            </div>
                            <h1 class="preview-title">{{ card.title }} </h1>
                            <div class="icons-container flex  align-center justify-between">
                                <div class="left-icons flex  align-center">
                                    <span><span v-if="card.description" class="icon description"></span></span>
                                    <span v-if="card.checklists?.length" class="flex align-center check-list" :class="checklistCompletion.class">
                                        <span class="icon sm checklist-check"></span><span class="number">{{checklistCompletion.number}}</span></span>
                                    <span v-if="card.attachments?.length" class="attachments">
                                    <span class="icon sm attachment"></span>{{card.attachments.length}}</span>
                                </div>
                                <div class="flex">
                                    <div v-if="card.members" class="members flex align-center" v-for="member in card.members">
                                        <img class="member-img member-avatar" :src="member.imgUrl" :alt="memberInitials(member)">
                                    </div>
                                </div>
                            </div>
                        </section>
                    </li>
                    <li class="archive-list-item" v-if="currArchivedList === 'list'" v-for="list in currBoard.archivedItems.list">
                        <section class="group-preview flex align-center justify-between">
                            <span>{{list.title}}</span>
                            <button class="modal-btn flex align-center" @click="retrieveItem(list)"><span class="icon lg return"></span><span>Send to Board</span></button>
                        </section>
                    </li>
                    <li class="archive-list-item" v-if="!currBoard.archivedItems[currArchivedList].length">
                        <section class="group-preview flex justify-center">
                            <span>No {{currArchivedList}}s currently archived</span>
                        </section>
                    </li>
                </ul>
            </section>
        </section>
        <section v-if="header === 'Change background'" class="mini-modal-content">
            <div class="photos-colors-btn">

                <div @click="changeModal('Photos')" class="photos-div">
                    <img class="photos-picture"
                        src="https://res.cloudinary.com/mello123/image/upload/v1670411257/qq9xdubie5qrhpxuhq5m.png"
                        alt="">
                    <span class="photos-title">Photos</span>
                </div>
                <div @click="changeModal('Colors')" class="colors-div">
                    <img class="colors-picture"
                        src="https://res.cloudinary.com/mello123/image/upload/v1670411249/kmmaickdzuokpvukknrs.png"
                        alt="">
                    <span class="colors-title">Colors</span>
                </div>
            </div>
            <section class="custom-section">
                <h2 class="custom-title">Custom</h2>
                <label class="clickable">
                    <input @input="uploadImgToCloud" type="file" hidden>
                    <div class="plus-btn-container">
                        <div class="icon lg add plus-btn"></div>
                    </div>
                </label>
            </section>
        </section>
        <section v-if="header === 'Colors'" class="mini-modal-content">
            <div class="colors-blocks-container">
                <div class="color-block" v-for="color in colorList" :style="{ 'background-color': color }"
                    @click="setCoverColor(color)"></div>
            </div>
        </section>
        <section v-if="header === 'Photos'" class="mini-modal-content">
            <div class="unsplash-photos-container" v-if="unsplashPhotos">
                    <div class="search-boards">
                        <input @input="processChange" ref="search" type="text" placeholder="Photos" class="board-search-input"
                        style="font-family:Arial, FontAwesome" v-model="searchPhoto">
                        <span class="magnifying-glass" style="font-family:Arial, FontAwesome">&#xF002;</span>
                </div>
                        <img v-for="photoObject in getUnsplashPhotos" @click="setCoverImg(photoObject.urls)"
                            :src="photoObject.urls.thumb" class="unsplashPhoto clickable">
                    </div>
        </section>
    </section>
</template>
  
<script>
import { utilService } from '../services/util.service';
import { uploadService } from '../services/upload.service.js';
import { unsplashPhotosService } from '../services/unsplash-photos.service.js';
import { FastAverageColor } from 'fast-average-color';
export default {
    emits: ['closeSidebarMenuModal'],
    props: {
        currBoard: Object
    },
    data() {
        return {
            // currBoard: null,
            header: 'Menu',
            unsplashPhotos: null,
            colorList: ['#0079bf', '#d29034', '#519839', '#b04632', '#89609e', '#cd5a91', '#4bbf6b', '#00aecc', '#838c91',],
            searchPhoto:null,
            processChange:null,
            currDisplay: 'Activity',
            currArchivedList: 'card',
            fac: new FastAverageColor(),
        }
    },
    created() {
         this.processChange = utilService.debounce(() => this.searchPhotosUnsplash())
         console.log(this.currBoard.archivedItems.list)
    },
    methods: {
        timeSince(time){
            return utilService.timeSince(time)
        },
        closeSidebarMenuModal() {
            this.$emit('closeSidebarMenuModal')
        },
       async changeModal(value) {
            if (value === 'Photos') this.unsplashPhotos = await unsplashPhotosService.getPhoto()
            this.header = value
        },
        async searchPhotosUnsplash(){
            this.unsplashPhotos = await unsplashPhotosService.getPhoto(this.searchPhoto)
        },
        goBack() {
            if ((this.header === 'Colors') || (this.header === 'Photos')) this.header = 'Change background'
            else this.header = 'Menu'
        },
        setCoverColor(color) {
            if(this.currBoard.style.backgroundImage) this.currBoard.style.backgroundImage = null
            this.currBoard.style.backgroundColor = color
            this.$store.dispatch({ type: "updateBoard", board:this.currBoard })
        },
        async getAverageColor(imgUrl) {
            try {
                let res = await this.fac.getColorAsync(imgUrl)
                console.log(`res.hex = `, res.hex)
                return res.hex
            }
            catch (err) {
                console.log(`err = `, err)
            }
        },
       async setCoverImg(url) {
        if(!url.full){
            this.currBoard.style.averageImgColor= await this.getAverageColor(url)
            if (this.currBoard.style.backgroundColor) this.currBoard.style.backgroundColor = null
                this.currBoard.style.backgroundImage = url
                this.currBoard.style.backgroundImageThumb=url
                this.$store.dispatch({ type: "updateBoard", board:this.currBoard })
        } 
          else {
              this.currBoard.style.averageImgColor= await this.getAverageColor(url.full)
                if (this.currBoard.style.backgroundColor) this.currBoard.style.backgroundColor = null
                this.currBoard.style.backgroundImage = url.full
                this.currBoard.style.backgroundImageThumb=url.thumb
                this.$store.dispatch({ type: "updateBoard", board:this.currBoard })
          } 
        },
        async uploadImgToCloud(ev) {
            // console.log(`ev = `, ev)
            const res = await uploadService.uploadImg(ev);
            this.setCoverImg(res.secure_url)
            // console.log(`res = `, res)
        },
        goToCard(card){
            if (card?.id) {
                this.closeSidebarMenuModal()
                this.$emit('editCard', card.id)
            }
        },
        async archive(){
        if(this.currBoard.isArchived = true) this.currBoard.isArchived = false
        else this.currBoard.isArchived = true
        await this.$store.dispatch({ type: "updateBoard", board:this.currBoard })
        await this.$store.dispatch({ type: "loadBoards" });
        this.$router.push('/board/')
        },
        toggleCurrentDisplay(){
            this.currDisplay = this.currDisplay === 'Activity' ? `Items in archive` : 'Activity'  
        },
        checklistCompletion(card){
        var doneTodos=0
        var todos=0
         card.checklists.forEach(checklist => {
          checklist.todos.forEach(todo =>{
            if(todo.isDone) doneTodos++
            todos++
          })
         });
         const todoState = {number:`${doneTodos}/${todos}`, class:"notDone"}
         if (doneTodos===todos) todoState.class = "preview-done"
         return todoState
        },
        labelColor(labelId){
            return this.currBoard.labels.find(label => label.id == labelId).color
        },
        switchArchiveList(){
            this.currArchivedList = this.currArchivedList === 'card' ? 'list' : 'card'
            console.log(this.currArchivedList)
        },
        retrieveItem(item){
            console.log(item)
            this.$store.dispatch({ type: 'retrieveItem', item })
        },
        memberInitials(member) {
            const fullName = member.fullname.split(' ');
            const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
            return initials.toUpperCase();
        },
    },
    computed: {
        getUnsplashPhotos(){
            return this.unsplashPhotos
        },
        currentDisplay(){
            return {activity: this.currDisplay === 'Activity', collection: this.currDisplay === 'Items in archive'}
        },
        oppositeDisplay(){
            return {collection: this.currDisplay === 'Activity', activity: this.currDisplay === 'Items in archive'}

        },
        oppositeArchiveList(){
            return this.currArchivedList === 'card' ? 'Switch to lists' : 'Switch to cards'
        },

    },


}
</script>
  