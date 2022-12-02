const editable = {
    mounted(el, binding, vnode, prevVnode) {
      vnode.dynamicChildren.forEach((child) => {
        if (child.el.nodeName !== 'H3') {
          child.el.setAttribute('contenteditable', binding.value)
        }
      })
    },
    updated(el, binding, vnode, prevVnode) {
      vnode.dynamicChildren.forEach((child) => {
        console.log('binding.value:', binding.value)
        if (child.el.nodeName !== 'H3') {
          child.el.setAttribute('contenteditable', binding.value)
        }
      })
    },
  }
  
  export const focusDirective = {
    mounted: (el) => {
      el.focus()
    },
  }
  
  export const rainbowDirective = {
    mounted(el) {
      el.onkeyup = () => {
        const color = _getRandomColor()
        el.style.backgroundColor = color
        el.style.color = _isDarkColor(color) ? 'white' : 'black'
      }
    },
  }
  
  export const customOnDirective = {
    mounted(el, binding) {
      console.log('binding', binding)
      const type = binding.arg
      const fn = binding.value
      el.addEventListener(type, fn)
    },
  }
  export const clickOnEscDirective = {
    mounted(el, { value: cb }) {
      el.clickEsc = (el) => {
        if (el.keyCode === 27) {
          cb()
        } else {  
        }
      }
      setTimeout(() => {
        document.addEventListener('keyup', el.clickEsc)
      }, 0)
    },
    unmounted(el) {
      document.removeEventListener('keyup', el.clickEsc)
      
    },
  }

  export const clickOnSlashDirective = {
    mounted(el, { value: cb }) {
      el.clickEsc = (el) => {
        if (el.keyCode === 191) {
          cb()
        } else {
        }
      }
      setTimeout(() => {
        document.addEventListener('keyup', el.clickEsc)
      }, 0)
    },
    unmounted(el) {
      document.removeEventListener('keyup', el.clickEsc)
      
    },
  }
  
  export const clickOutsideDirective = {
    mounted(el, { value: cb }) {
      el.clickOutside = ({ clientX, clientY }) => {
        const { left, top, width, height } = el.getBoundingClientRect()
        if (
          !(clientX > left &&
            clientX < left + width &&
            clientY > top &&
            clientY < top + height)
        ) {
          cb()   
        } else {
        }
      }
      setTimeout(() => {
        document.addEventListener('click', el.clickOutside)
      }, 0)
    },
    unmounted(el) {
      document.removeEventListener('click', el.clickOutside)
    },
  }
  
  export const close = {
    mounted(el, { value }, x) {
      console.log(x)
      el.onkeyup = () => {
        const color = _getRandomColor()
        el.style.backgroundColor = color
        el.style.color = _isDarkColor(color) ? 'white' : 'black'
      }
    },
  }
  
  
  
  function _isDarkColor(c) {
    c = c.substring(1) // strip #
    const rgb = parseInt(c, 16) // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff // extract red
    const g = (rgb >> 8) & 0xff // extract green
    const b = (rgb >> 0) & 0xff // extract blue
    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709
  
    return luma < 100
  }
  
  function _getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
  
  
  export { editable }
  