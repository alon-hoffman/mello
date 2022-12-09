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
                <div class="about-this-board-container clickable">
                    <span class="text-area">
                        <span class="icon sm board mello-icon"></span>
                        <div class="text-container">
                            <span class="about-this-board-title mini-head">About this board</span>
                            <div class="add-description-title">Add a description to your board</div>
                        </div>
                    </span>
                </div>
                <div @click="changeModal('Change background')" class="change-background clickable">
                    <img v-if="currBoard.style.backgroundImage" class="change-background-img" :src="currBoard.style.backgroundImage">
                    <div class="change-background-img" :style="{ backgroundColor: currBoard.style.backgroundColor }"></div>
                    <span class="change-background-text mini-head">Change background</span>
                </div>
            </div>
            <section @click="archive" class="edit-block clickable">
                <span class="icon lg archive"></span>
                <span class="header flex justify-between">
                    <span class="activity-title">Archive board</span>
                    <!-- <button class="fake-button">needs to be unread activity</button> -->
                </span> </section>
            <section  class="edit-block">
                <span class="icon lg activity"></span>
                <span class="header flex justify-between">
                    <span class="activity-title">Activity</span>
                    <!-- <button class="fake-button">needs to be unread activity</button> -->
                </span>
                <ul class="content activity-list">
                    <li v-for="activity in currBoard.activities" class="activity-list-item flex">
                        <div class="member-avatar"></div>
                        <div class="flex column" v-if="activity.title">
                            <span><strong>{{activity.user}}</strong>{{ activity.title.before}} <span class="activity-link clickable" @click="goToCard(activity)">{{activity.card.title}}</span>{{activity.title.after}}</span>
                            <span class="time">{{timeSince(activity.addedAt)}}</span>
                        </div>
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
                        <img v-for="photoObject in getUnsplashPhotos" @click="setCoverImg(photoObject.urls.full)"
                            :src="photoObject.urls.thumb" class="unsplashPhoto clickable">
                    </div>
        </section>
    </section>
</template>
  
<script>
import { utilService } from '../services/util.service';
import { uploadService } from '../services/upload.service.js';
import { unsplashPhotosService } from '../services/unsplash-photos.service.js';

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

        }
    },
    created() {
         this.processChange = utilService.debounce(() => this.searchPhotosUnsplash())       
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
        setCoverImg(url) {
            if (this.currBoard.style.backgroundColor) this.currBoard.style.backgroundColor = null
            this.currBoard.style.backgroundImage = url
            this.$store.dispatch({ type: "updateBoard", board:this.currBoard })
        },
        async uploadImgToCloud(ev) {
            // console.log(`ev = `, ev)
            const res = await uploadService.uploadImg(ev);
            this.setCoverImg(res.secure_url)
            // console.log(`res = `, res)
        },
        goToCard(activity){
            if (activity.card?.id) {
                this.closeSidebarMenuModal()
                this.$emit('editCard', activity.card.id)
            }
        },
        async archive(){
        this.currBoard.isArchived = true
        await this.$store.dispatch({ type: "updateBoard", board:this.currBoard })
        await this.$store.dispatch({ type: "loadBoards" });
        this.$router.push('/board/')
        }
    },
    computed: {
        getUnsplashPhotos(){
            return this.unsplashPhotos
        }
        //   cords(){
        //     return {top:`0px`, right:`0px`}
        //   }
    },


}
</script>
  