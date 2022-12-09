<template>
  <article class="custom-card flex column gap-1 items-center">
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

<style scoped>
.custom-card {
  position: fixed;
  top: 60px;
  right: 100px;
  justify-content: space-between;
  background: white;
  /* padding-inline: 2em; */
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
</style>
