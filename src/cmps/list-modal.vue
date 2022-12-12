<template>
    <section class="list-modal flex column" :style="cords" v-click-outside="closeTitleModal">
    
    <header class="flex">  <span class="mini-header">List actions <button class="clickable icon ex" @click="closeTitleModal">
        <span class=""></span></button></span> </header>
        <buttons class="flex column">
        <button class="clickable" @click="duplicateList" >Copy List...</button>
        <button class="clickable" @click="archiveList" >Archive List...</button>
        <button class="clickable" @click="deleteList" >Delete List...</button>
      </buttons>
    </section>
    
  </template>
  
  <script>

  export default {
    props: {
    list: Object,
    listModalCords: Object,
  },
    data() {
      return {
       
      }
    },
    computed: {
      cords(){
        return {top: `${this.listModalCords.y+41}px`, left: `${this.listModalCords.x}px`}
      },
    },
    methods: {
      deleteList(){
        this.$emit('deleteList', this.list.id)
        this.closeTitleModal()
      },
      duplicateList(){
        this.$emit('duplicateList', this.list)
        this.closeTitleModal()
      },
      closeTitleModal(){
        this.$emit('closeTitleModal')
      },
      archiveList(){
        this.$store.dispatch({ type: "addActivity", activity: {action: 'archiveItem' , card: {}, detail: this.list.title} })
        this.$emit('archiveList', this.list.id)
        this.closeTitleModal()
      },
    }
  
    
  }
  </script>
  