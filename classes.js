function id(e) {
  return document.getElementById(e)
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
  constructor(content, func) {
    this.content = content
    this.func = func
    this.div = document.createElement('div')
    this.div.innerHTML = content
    this.div.className = 'menuelement'
    this.div.addEventListener('click', () => {
      if(typeof this.func === "function") {
        this.func()
      }
    })
    id('menu-container').appendChild(this.div)
  }
}

class Menu {
  constructor(title, elements, items) {
    this.title = title
    this.titleElt = createDiv(this.title)
    this.elts = elements
    items.length = items.length.splice(4)
    this.itemAmt = items.length
  }
}
