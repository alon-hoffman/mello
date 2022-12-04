<template>
    <article class="board-creator">
        <header>Create board
                <span class="icon sm close clickable"></span>

        </header>
        <div class="preview-display"></div>
        <span class="label">backgrounds</span>
        <section class="background-selection">
            <ul class="custom-images-list">
                <li>img</li>
                <li>img</li>
                <li>img</li>
                <li>img</li>
            </ul>
            <ul class="color-list flex justify-between">
                <li class="blue-btn clickable"></li>
                <li class="yellow-btn clickable"></li>
                <li class="green-btn clickable"></li>
                <li class="red-btn clickable"></li>
                <li class="purple-btn clickable"></li>
                <li class="more-btn clickable"></li>

            </ul>
        </section>
        <span class="label">backgrounds</span>
        <input type="text" v-model="newBoard.title" placeholder="title" required>

    </article>
</template>

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