<template>
    <article class="filter-menu">
        <header class="filter-menu-header flex justify-center align-center">
            Filter
        </header>
        <section class="filter-block flex column">
            <div class="filter-block-header">Keyword</div>
            <input type="text" placeholder="Enter a keyword..." v-model="filterBy.keyword" @change="$emit('updateFilter', filterBy)">
            <p>Search cards and groups.</p>
        </section>
        <section class="filter-block flex column" v-if="board.members">
            <div class="filter-block-header">Members</div>
            <ul class="filter-list">
                <li class="filter-list-item flex">
                    <button class="checkbox" :class="noMembers" @click="clearCategory('members')"></button>
                    <span>No members</span>
                </li>
                <li class="filter-list-item flex" v-for="member in board.members" @click="toggle(member._id, 'members')">
                    <button class="checkbox" :class="isIncluded(member._id, 'members')"></button>
                    <span class="member-icon flex align-center justify-center">{{memberInitials(member)}}</span>
                    <span>{{member.fullname}}</span>
                </li>
            </ul>
        </section>
        <!-- <section class="filter-block flex column">
            <div class="filter-block-header">Due date</div>
        </section> -->
        <section class="filter-block flex column" v-if="board.labels">
            <div class="filter-block-header">Labels</div>
            <ul class="filter-list">
                <li class="filter-list-item flex" @click="resetLabels">
                    <button class="checkbox" :class="noLabels" @click="clearCategory('labels')"></button>
                    <span>No labels</span>
                </li>
                <li class="filter-list-item flex align-center" v-for="label in board.labels" @click="toggle(label.id, 'labels')">
                    <button class="checkbox" :class="isIncluded(label.id, 'labels')" ></button>
                    <button class="modal-btn" :style="{ backgroundColor: getColorWithOpacity(label.color) }">
                        <span class="label-circle" :style="{ backgroundColor: label.color }">aa</span>
                        {{label.title}}</button>
                </li>
            </ul>

        </section>
    </article>
</template>

<script>
export default{
    props: {
        board: Object,
        filterBy: Object
    },
    methods: {
        memberInitials(member) {
            const fullName = member.fullname.split(' ');
            const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
            return initials.toUpperCase();
        },
        getColorWithOpacity(color) {
            color += '4F'
            return color
        },
        clearCategory(category){
            this.filterBy[category] = []
            this.$emit('updateFilter', this.filterBy)
        },
        toggle(id, category){
            let array = this.filterBy[category]
            array = array.includes(id) ? array.filter(el => el !== id) : [...array, id]
            this.filterBy[category] = [...array]
            this.$emit('updateFilter', this.filterBy)
        },
        isIncluded(id, category){
            return {checked: this.filterBy[category].includes(id)}
        },
    },
    computed: {
        noLabels(){
            return {checked: !this.filterBy.labels.length}
        },
        noMembers(){
            return {checked: !this.filterBy.members.length}
        }
    }
}
</script>