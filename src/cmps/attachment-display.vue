<template>
    <section class="attachment-display edit-block">
      <span class="icon lg attachment"></span>
      <span class="header flex justify-between">
        <h3>Attachment</h3>
    </span>
    <ul class="dynamic-content flex column">
      <li class="todo-item-container flex clickable" 
      v-for="attachment, idx in attachments"> 
      <div class="img-container"> <img :src="attachment.href"/> </div>
      <div class="attachment-info flex justify-between">
      <a v-if="!isEdited"
      :href=attachment.href
      target="_blank"
      rel="noreferrer"
    >
    <template v-if="attachment.name">{{attachment.name}}</template>
    <template v-else>{{attachment.type}} file</template>
    </a>
    <input class="attachment-edit-input" v-else type="text" :value="getName(idx)"
    @blur="(saveName,idx)" @keyup.enter="(saveName,idx)">
    <div class="actions">
      <span @click="removeAttachment(idx)">Delete </span>-&nbsp
      <span @click="startEdit">Edit</span>
    </div>
  </div>
    </li></ul>
    </section>
    
  </template>
  
  <script>

  export default {
    props:{
      attachments: Array
    },
    data() {
      return {
       isEdited: false
      }
    },
    computed: {
      
    },
    methods: {
      removeAttachment(idx){
       const newAttachments=   JSON.parse(JSON.stringify( this.attachments))
       newAttachments.splice(idx, 1)
       this.$emit("updateAttachments",newAttachments)
      },
      startEdit(){
        this.isEdited = true
        //ref did not work due to it not being on the template at creation 
        setTimeout(() => document.querySelector('.attachment-edit-input').focus(),1)
      },
      getName(idx){
        if(this.attachments[idx].name)return this.attachments[idx].name
        return `${this.attachments[idx].type} file`
      },
      saveName(idx){
         console.log( "asdas")
        const newName= document.querySelector('.attachment-edit-input').value
        const newAttachments=   JSON.parse(JSON.stringify( this.attachments))
       newAttachments.splice(idx, 1,newName)
       this.$emit("updateAttachments",newAttachments)        
      }
    }
  
    
  }
  </script>
  