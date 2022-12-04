<template>
    <article class="board-creator">
        <header></header>
        <div class="preview-display"></div>
        <section class="background-selection"></section>
        <input type="text" v-model="newBoard.title" placeholder="title">

    </article>
</template>


<script>
export default{
    data(){
        return{
            newBoard: {title: '',
        }
        }
    }
}
</script>