<template>
    <section v-if="currBoard" class="sidebar-menu-modal">
        <section class="mini-modal-header">
            <span v-if="header === 'menu'" class="menu-modal-title">Menu</span>
            <div v-if="header === 'change background'" class="go-back-to-menu-arrow">◀️</div>
            <span v-if="header === 'change background'" class="menu-modal-title">Change background</span>
            <button class="clickable close-mini-modal-btn" @click="closeSidebarMenuModal"></button>
            <!-- <span class="icon lg close modal-close" @click="closeSidebarMenuModal"></span> -->
        </section>
        <section v-if="header === 'menu'" class="mini-modal-content">
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
                <div @click="changeModal('change background')" class="change-background clickable">
                    <img class="change-background-img" :src="currBoard.style.backgroundImage">
                    <span class="change-background-text mini-head">Change background</span>
                </div>
            </div>
            <section class="edit-block">
                <span class="icon lg activity"></span>
                <span class="header flex justify-between">
                    <span class="activity-title">Activity</span>
                    <button class="fake-button">needs to be unread activity</button>
                </span>
                <ul class="activities">
                    <li>
                        <section class="member">
                            <div class="member-avatar"></div>
                        </section>
                        <section class="content">
                            <div>member name</div>

                        </section>
                    </li>
                </ul>
            </section>
        </section>
        <section v-if="header === 'change background'" class="mini-modal-content">
            <div class="photos-colors-btn">
                
                <div @click="changeModal('photos')" class="photos-div">
                    <!-- <img src="" alt=""> -->
                    <span>Photos</span>
                </div>
                <div @click="changeModal('colors')" class="colors-div">
                    <!-- <img src="" alt=""> -->
                    <span>colors</span>
                </div>
            </div>
            <section class="custom-section">
                <span class="custom-title">Custom</span>
                <div class="plus-btn-container">
                    <span class="plus-btn"></span>
                </div>
            </section>
        </section>
    </section>
</template>
  
<script>

export default {

    emits: ['closeSidebarMenuModal'],
    data() {
        return {
            currBoard: null,
            header: 'menu',
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
        changeModal(value) {
            this.header = value
        },
    },
    computed: {
        //   cords(){
        //     return {top:`0px`, right:`0px`}
        //   }
    },


}
</script>
  