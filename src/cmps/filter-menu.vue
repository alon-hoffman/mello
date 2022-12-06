<template>
    <article class="filter-menu">
        <header class="filter-menu-header flex justify-center align-center">
            Filter
        </header>
        <section class="filter-block flex column">
            <div class="filter-block-header">Keyword</div>
            <input type="text" placeholder="Enter a keyword...">
            <p>Search cards, members, labels, and more.</p>
        </section>
        <section class="filter-block flex column">
            <div class="filter-block-header">Members</div>
            <ul class="filter-list">
                <li class="filter-list-item flex">
                    <button class="checkbox"></button>
                    <span>No members</span>
                </li>
                <li class="filter-list-item flex" v-if="board.members" v-for="member in board.members">
                    <button class="checkbox"></button>
                    <span class="member-icon flex align-center justify-center">{{memberInitials(member)}}</span>
                    <span>{{member.fullname}}</span>
                </li>
            </ul>
        </section>
        <section class="filter-block flex column">
            <div class="filter-block-header">Due date</div>
        </section>
        <section class="filter-block flex column">
            <div class="filter-block-header">Labels</div>
            <ul class="filter-list">
                <li class="filter-list-item flex">
                    <button class="checkbox"></button>
                    <span> <span class="icon sm label"></span> No labels</span>
                </li>
                <li class="filter-list-item flex" v-for="label in board.labels">
                    <button class="checkbox" ></button>
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
        filterBy: Object,
        board: Object,
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
    }
}
</script>