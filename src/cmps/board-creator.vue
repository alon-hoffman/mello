<template>
    <article class="board-creator" :style="cords">
        <header>Create board
                <span class="icon sm close clickable" @click="$emit('close')"></span>

        </header>
        <div class="preview-display flex align-center justify-center" :style="{'background-color' : newBoard.backgroundColor}">
            <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" alt="board example">
        </div>
        <span class="label">Background</span>
        <section class="background-selection">
            <ul class="custom-images-list">
                <li v-for="image in ['https://images.unsplash.com/photo-1635698054698-1eaf72c5a894?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                'https://images.unsplash.com/photo-1668805585915-0a8b56aecfef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                'https://images.unsplash.com/photo-1666457384021-fa422f678796?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80',
                'https://images.unsplash.com/photo-1668356352028-8a7e695e3bfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80']"
                @click="setCoverImg(image)"><img :src="image"/></li>
                
            </ul>
            <ul class="color-list flex justify-between">
                <li class="blue-btn clickable"  @click="setBackgroundColor('#0079BF')"></li>
                <li class="yellow-btn clickable"  @click="setBackgroundColor('#D29034')"></li>
                <li class="green-btn clickable"  @click="setBackgroundColor('#519839')"></li>
                <li class="red-btn clickable"  @click="setBackgroundColor('#B04632')"></li>
                <li class="purple-btn clickable"  @click="setBackgroundColor('#89609e')"></li>
                <li class="more-btn clickable"></li>

            </ul>
        </section>
        <span class="label">Board title<span class="mandatory">*</span></span>
        <input type="text" v-model="newBoard.title" required>
        <button class="save-btn clickable" @click="saveBoard">Create</button>
    </article>
</template>

<script>
 
export default{
    props: {
    modalCords: Object,
  },
    data(){
        return{
            newBoard: null
        }
    },
    created(){
        this.newBoard = {
                title: '',
                style:{backgroundColor: '#0079bf'}
            },
             console.log( this.modalCords)
    },
    computed:{
        cords(){
             console.log( "hi")
        if(!this.modalCords) return ''
        return {top: `${this.modalCords.y+50}px`, left: `${this.modalCords.x}px`}
      },
    },
    methods:{
        setBackgroundColor(clr){
            this.newBoard.style.backgroundColor = clr
        },
        setCoverImg(url){
            console.log("🚀 ~ file: board-creator.vue:65 ~ setCoverImg ~ url", url)
            this.newBoard.style.backgroundImage = url
        },
        saveBoard(){
            if (!this.newBoard.title) return
            this.$emit('saveBoard', this.newBoard)
        }
    }
}
</script>