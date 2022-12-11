<template>
  <article class="custom-card flex column gap-1 items-center" :style="cords">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <!-- <slot name="default"></slot> -->
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </article>
</template>
<script>

export default{
  props: {
    modalCords: Object
  },
  created(){
    // console.log(this.modalCords)
  },
  computed:{
    cords(){
        if(!this.modalCords) return ''
        return {top: `min(100vh - 50px,${this.modalCords.y+50}px)`, left: `min(60vw, ${this.modalCords.x}px)`}
      },
  }
}
</script>

<style scoped>
.custom-card {
  position: fixed;
  /* top: 60px; */
  top: min(60px, calc(100vh - 500px));
  right: min(400px, calc(80vw - 340px));
  justify-content: space-between;
  background: white;
  width: max-content;
  z-index: 10;
  box-shadow: #091e4240 0 8px 16px -4px, #091e4214 0 0 0 1px;
  border-radius: 5px;
  max-height: 88vh;
  overflow-y: auto;
}
.custom-card .create-board{
 top: 50%;
 left: 50%;

}

.custom-card header {
  font-size: 2rem;
}

.custom-card main {
  text-align: center;
}

.custom-card footer {
  font-size: 1rem;
  color: gray;
}
.custom-card::-webkit-scrollbar {
        width: 6px;
        height: 12px;
      }
.custom-card::-webkit-scrollbar-track {
        background: rgba(105, 105, 105, 0.473); 
        border-radius: 10px;
      }
.custom-card::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.171); 
        border-radius: 10px;
}


@media (max-width: 500px){
  .custom-card{
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
  }
}
</style>
