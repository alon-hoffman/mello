<template>
    <article class="board-creator" :style="cords">
        <header>Create board
                <span class="icon sm close clickable" @click="$emit('close')"></span>

        </header>
        <div v-if="newBoard.style.backgroundColor||!newBoard.style.backgroundImageThumb" class="preview-display flex align-center justify-center" :style="{'background' : newBoard.style.backgroundColor}">
            <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" alt="board example">
        </div>
        <div v-else-if="newBoard.style.backgroundImageThumb" class="preview-display flex align-center justify-center" :style="{'background-image' : getNewBoardBackgroundUrl}">
            <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" alt="board example">
        </div>
        <span class="label">Background</span>
        <section class="background-selection">
            <ul class="custom-images-list">      
                <li v-for="photoObject in getUnsplashPhotos"><img @click="setCoverImg(photoObject.urls)"
                            :src="photoObject.urls.thumb" class="clickable"> </li>       
            </ul>
            <ul class="color-list flex justify-between">
                <li class="blue-btn clickable" @click="setBackgroundColor('#0079BF')"></li>
                <li class="yellow-btn clickable" @click="setBackgroundColor('#D29034')"></li>
                <li class="green-btn clickable" @click="setBackgroundColor('#519839')"></li>
                <li class="red-btn clickable" @click="setBackgroundColor('#B04632')"></li>
                <li class="purple-btn clickable" @click="setBackgroundColor('#89609e')"></li>
                <li class="more-btn clickable"></li>

            </ul>
        </section>
        <span class="label">Board title<span class="mandatory">*</span></span>
        <input type="text" v-model="newBoard.title" required>
        <button class="save-btn clickable" @click="saveBoard">Create</button>
    </article>
</template>

<script>
 import { boardService } from '../services/board-service.js'
 import { uploadService } from '../services/upload.service.js';
import { unsplashPhotosService } from '../services/unsplash-photos.service.js';
export default{
    props: {
    modalCords: Object,
  },
    data(){
        return{
            newBoard: null,
            unsplashPhotos:null,
        }
    },
    created(){
        this.newBoard=boardService.getEmptyBoard()
        this.getPhotosUnsplash()
             console.log( this.modalCords)
    },
    computed:{
        cords(){
        if(!this.modalCords) return ''
        return {top: `${this.modalCords.y+50}px`, left: `${this.modalCords.x}px`}
      },
      getUnsplashPhotos(){
            return this.unsplashPhotos
        },
        getNewBoardBackgroundUrl(){
          return `url("${this.newBoard.style.backgroundImageThumb}")`  
        },
    },
    methods:{
        setBackgroundColor(clr){
            this.newBoard.style.backgroundColor = clr
            if (this.newBoard.style.backgroundImage) {
                this.newBoard.style.backgroundImage=''
                this.newBoard.style.backgroundImageThumb=''
            }
        },
        // setCoverImg(url){
        //     console.log("🚀 ~ file: board-creator.vue:65 ~ setCoverImg ~ url", url)
        //     this.newBoard.style.backgroundImage = url
        // },
        saveBoard(){
            if (!this.newBoard.title) return
            console.log(`this.newBoard = `, this.newBoard)
            this.$emit('saveBoard', this.newBoard)
        },
        async uploadImgToCloud(ev) {
            // console.log(`ev = `, ev)
            const res = await uploadService.uploadImg(ev);
            this.setCoverImg(res.secure_url)
            // console.log(`res = `, res)
        },
        setCoverImg(url) {
            // console.log(`url = `, url)
            if (this.newBoard.style.backgroundColor) this.newBoard.style.backgroundColor = null
            this.newBoard.style.backgroundImage = url.full
            this.newBoard.style.backgroundImageThumb=url.thumb
        },
        async getPhotosUnsplash(){
            this.unsplashPhotos = await unsplashPhotosService.getPhoto()
            this.unsplashPhotos =this.unsplashPhotos.slice(0,4)
        },
    }
}
</script>