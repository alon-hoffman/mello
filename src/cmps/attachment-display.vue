<template>
  <section v-if="attachments" class="attachment-display edit-block">
    <span class="icon lg attachment"></span>
    <span class="header flex justify-between">
      <h3>Attachment</h3>
    </span>
    <ul class="dynamic-content flex column">
      <li class=" flex clickable" v-for="(attachment, index) in attachments">
        <div class="img-container"> <img :src="attachment.href" /> &nbsp</div>
          <div class="attachment-info flex "> 
          <a v-if="!isEdited" :href=attachment.href target="_blank" rel="noreferrer">
            <template v-if="attachment.name">{{ attachment.name }}&nbsp</template>
            <template v-else>{{ attachment.type }} file</template>
          </a> &nbsp
          <input ref="input" v-show="isEdited" class="attachment-edit-input" type="text" :value="getName(index)" 
           v-click-outside="saveName(index)"> 
            <span>{{formattedDueDate(attachment.createdAt)}}&nbsp</span>
          <div class="actions">
            <span @click="removeAttachment(index)">Delete </span>-&nbsp
            <span @click="startEdit">Edit</span>
          </div>
        </div>
      </li>
    </ul>
  </section>

</template>
  
<script>

export default {
  // emits:['updateAttachments'],
  props: {
    attachments:Array
    
  },
  data() {
    return {
      isEdited: false
    }
  },
  created(){
console.log(this.attachments)
  },
  computed: {

  },
  methods: {
    removeAttachment(idx) {
      const newAttachments = JSON.parse(JSON.stringify(this.attachments))
      newAttachments.splice(idx, 1)
      this.$emit('updateAttachments', newAttachments)
    },
    startEdit() {
      this.isEdited = true
       console.log(this.$refs.input)
      //ref did not work due to it not being on the template at creation 
      setTimeout(() => this.$refs.input.focus(), 1)
    },
    getName(idx) {
      if (this.attachments[idx].name) return this.attachments[idx].name
      return `${this.attachments[idx].type} file`
    },
    saveName(idx) {
      if(!this.isEdited) return
      const newName = document.querySelector('.attachment-edit-input').value
      const newAttachments = JSON.parse(JSON.stringify(this.attachments))
      newAttachments[idx].name= newName
      // this.$emit('updateAttachments', newAttachments)
    },
    formattedDueDate(timeStamp) {
            const dateToFormat=  new Date(timeStamp)
            const options = { month: 'short', day: 'numeric' }
            const date = dateToFormat.toLocaleDateString(undefined, options)
            const ampm = dateToFormat.getHours() >= 12 ? 'AM' : 'PM';
            const minutes= `${dateToFormat.getMinutes()}`.padStart(2, '0')
            const hours = (dateToFormat.getHours() % 12) + ':' + minutes + ' ' + ampm
            return (date + ' at ' + hours)
        }
  }


}
</script>
  