<template>
    <article class="board-creator">
        <header></header>
        <div class="preview-display"></div>
        <section class="background-selection">
            <ul class="custom-images-list">
                <li class="modal-add-menu blue-btn clickable"></li>
                <li class="modal-add-menu yellow-btn clickable"></li>
                <li class="modal-add-menu green-btn clickable"></li>
                <li class="modal-add-menu red-btn clickable"></li>
            </ul>
            <ul class="color-list"></ul>
        </section>
        <input type="text" v-model="newBoard.title" placeholder="title">

    </article>
</template>
<!-- rgb(0, 121, 191) -->

<script>
export default{
    data(){
        return{
            newBoard: {
                title: '',
                coverColor: '#FFFFFF'
        }
        }
    }
}
</script>