function id(e) {
  return document.getElementById(e)
}
var sounds = {
  menuNav: new Audio('assets/sfx/nav.mp3'),
  menuSelect: new Audio('assets/sfx/select.mp3')
}

class DialogueBox {
     constructor(content, options) { // destructured object as options
          this.content = content
          this.options = options
          this.elm = createDiv(content)
          setInterval(() => {
            this.elm.elt.innerHTML = this.content
          })
          this.elm.elt.id = 'dbox'
          this.elm.elt.style.display = 'none'
          this.elm.elt.style.width = canvas.width-43
          this.elm.elt.style.height = window.innerHeight/4
     }
     change(t) {
       this.content = t
     }
     toggleVisible() {
       if(this.elm.elt.style.display === 'none') {
         this.elm.elt.style.display = 'block'
       } else {
         this.elm.elt.style.display = 'none'
       }
     }
}

class MenuElement {
  constructor(content, func, defaultvalue=undefined) {
    this.content = content
    this.func = func
    if(defaultvalue) {
      this.value = defaultvalue
    }
    this.selected = false
    this.div = document.createElement('div')
    this.div.innerHTML = content
    this.div.className = 'menuelement'
    this.disabled = false
  }
  select() {
    this.selected = true
    this.div.style.borderColor = '#039be5'
    this.div.style.boxShadow = '2px 2px 2px grey'
  }
  deselect() {
    this.selected = false
    this.div.style.borderColor = 'black'
    this.div.style.boxShadow = 'none'
  }
  use() {
    this.func.call()
  }
}

class Menu {
  constructor(title, items, containerId) {
    this.title = createDiv(title)
    this.active = false;
    this.title.elt.style.fontSize = '32px'
    this.title.elt.setAttribute('align', 'center')
    this.items = items
    this.itemAmt = this.items.length
    this.currentSelection = 0
    this.container = document.createElement('div')
    this.container.className = containerId
    this.container.appendChild(this.title.elt)
    this.items.forEach(e => {
      this.container.appendChild(e.div)
    })
    id('menu-container').appendChild(this.container)
  }
  show() {
    this.container.style.display = 'block'
    this.active = true
    this.items[0].select()
    this.currentSelection = 0
  }
  hide() {
    this.container.style.display = 'none'
    this.active = false
    this.items.forEach(e => {
      e.deselect()
    })
  }
  increaseSelection() {
    if(this.currentSelection < this.itemAmt-1) {
      this.items.forEach(a => {
        a.deselect()
      })
    }
    if(this.items[this.currentSelection].disabled) {
      this.currentSelection++
    }
    this.items[++this.currentSelection].select()
    sounds.menuNav.play()
  }
  decreaseSelection() {
    if(this.currentSelection > 0) {
      this.items.forEach(a => {
        a.deselect()
      })
    }
    if(this.items[this.currentSelection].disabled) {
      this.currentSelection--
    }
    this.items[--this.currentSelection].select()
    sounds.menuNav.play()
  }
  toggleActive() {
    if(this.active) {
      this.active = false
    } else {
      this.active = true
    }
  }
  useSelected() {
    this.items[this.currentSelection].use()
    window.dispatchEvent(events.resetKeys)
  }
}
