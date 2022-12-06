<template>
    <section v-if="currBoard" class="sidebar-menu-modal" :style="cords">
        <section class="mini-modal-header">
            <span class="menu-modal-title">Menu</span>
            <button class="clickable close-mini-modal-btn" @click="closeSidebarMenuModal"></button>
            <!-- <span class="icon lg close modal-close" @click="closeSidebarMenuModal"></span> -->
        </section>
        <section class="mini-modal-content">
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
                <div class="change-background clickable">
                    <img class="change-background-img" :src="currBoard.style.imgUrl">
                    <span class="change-background-text mini-head">Change background</span>
                </div>
            </div>

        </section>
    </section>

</template>
  
<script>

export default {

    emits: ['closeSidebarMenuModal'],
    data() {
        return {
            currBoard: null
        }
    },
    created() {
        this.board()
    },
    methods: {
        board() {
            this.currBoard = JSON.parse(JSON.stringify(this.$store.getters.getCurrBoard))
        },
        closeSidebarMenuModal() {
            this.$emit('closeSidebarMenuModal')
        },
    },
    computed: {
        //   cords(){
        //     return {top:`0px`, right:`0px`}
        //   }
    },


}
</script>
  