<template>
  <section v-if="lists" class="group-list">
    <ul class="clean-list">
      <card-group @edit="$emit('edit')"
        v-for="list in lists"
        :list="list"
        :key="list.id"
        @editCard="editCard"
        @addCard="addCard"
      />
      <button v-if="!isNewListEdit" class="add-line-btn clickable" @click="isNewListEdit=true">Add another list</button>
      <div v-else @submit.prevent="addList" class="add-list-section" v-click-outside="closeEdit">
        <input type="text" v-model="newTitle"  placeholder="Enter list title..."/>
        <div class="buttons">
        <button @click="addList" class="clickable">Add list</button>
        <button @click="isNewListEdit=false" class="icon ex"></button>
      </div>
      </div>
    </ul>
  </section>
</template>

<script>
import cardGroup from "./card-group.vue";
export default {
  props: {
    lists: Array,
  },
  data() {
    return {
      isNewListEdit:false,
      newTitle:''
    };
  },
  created(){
console.log(`this.lists = `, this.lists)
  },
  components: {
    cardGroup,
  },
  computed: {},
  created() {},
  methods: {
    addList(){
      this.isNewListEdit=false
      this.$emit('saveList', {title:this.newTitle, cards:[]})
    },
    addCard(card){
      console.log("🚀 ~ file: group-list.vue:50 ~ addCard ~ card", card)
      this.$emit("addCard", card)
    },
    closeEdit(){
      this.isNewListEdit=false
    },
    editCard(cardId){
      this.$emit("editCard",cardId)
    }
  },
};
</script>
