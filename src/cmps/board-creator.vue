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
                <li><img src="https://res.cloudinary.com/mello123/image/upload/v1670411257/qq9xdubie5qrhpxuhq5m.png"/></li>
                <li>jaskdj</li>
                <li>img</li>
                <li>img</li>
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
             console.log(`${this.modalCords.y}px`)
        return {top: `${this.modalCords.y+50}px`, left: `${this.modalCords.x}px`}
      },
    },
    methods:{
        setBackgroundColor(clr){
            this.newBoard.style.backgroundColor = clr
        },
        saveBoard(){
            if (!this.newBoard.title) return
            this.$emit('saveBoard', this.newBoard)
        }
    }
}
</script>