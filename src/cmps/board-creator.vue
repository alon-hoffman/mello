<template>
    <article class="board-creator">
        <header>Create board
                <span class="icon sm close clickable"></span>

        </header>
        <div class="preview-display flex align-center justify-center" :style="{'background-color' : newBoard.coverColor}">
            <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" alt="board example">
        </div>
        <span class="label">Background</span>
        <section class="background-selection">
            <ul class="custom-images-list">
                <li>img</li>
                <li>img</li>
                <li>img</li>
                <li>img</li>
            </ul>
            <ul class="color-list flex justify-between">
                <li class="blue-btn clickable"  @click="setCoverColor('#0079BF')"></li>
                <li class="yellow-btn clickable"  @click="setCoverColor('#D29034')"></li>
                <li class="green-btn clickable"  @click="setCoverColor('#519839')"></li>
                <li class="red-btn clickable"  @click="setCoverColor('#B04632')"></li>
                <li class="purple-btn clickable"  @click="setCoverColor('#89609e')"></li>
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
    data(){
        return{
            newBoard: null
        }
    },
    created(){
        this.newBoard = {
                title: '',
                coverColor: '#0079bf'
            }
    },
    methods:{
        setCoverColor(clr){
            this.newBoard.coverColor = clr
        },
        saveBoard(){
            if (!this.newBoard.title) return
            this.$emit('saveBoard', this.newBoard)
        }
    }
}
</script>