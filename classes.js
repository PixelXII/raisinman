class DialogueBox {
     constructor(content, options) {
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
