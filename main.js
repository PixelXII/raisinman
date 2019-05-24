const gamedatauri = 'https://cdn.jsdelivr.net/gh/PixelXII/raisinman@master/assets/Gamedata.json'
var Gamedata;
var Dbox;
document.body.style.margin = "5px"

var events = {
  dialoguechange: new Event('dchange')
}

async function loadGameData() {
     const response = await fetch(gamedatauri)
     let d = await response.json().then(res => {
          console.log("Gamedata.json loaded")
          Gamedata = res
     }).catch(err => {
          console.warn("Could not load game data file")
     })
}

function setup() {
     createCanvas(window.innerWidth-10, window.innerHeight-10)
     loadGameData()
     Dbox = new DialogueBox('Save the princess please')
     canvas.style.position = 'absolute'
}

let player = {
  topView: true,
  top: {
    sprite: undefined,
    movespeed:8,
    x:100,
    y:100,
  }
}

window.addEventListener('keydown', key => {
  if(player.topView) {
    if(key.keyCode === Gamedata.controls.moveUp) {
      player.top.y += movespeed
    }
    if(key.keyCode === Gamedata.controls.moveDown) {
      player.top.y -= movespeed
    }
    if(key.keyCode === Gamedata.controls.moveLeft) {
      player.top.x += movespeed
    }
    if(key.keycode === Gamedata.controls.moveRight) {
      player.top.x -= movespeed
    }
  }
})

function draw() {
     background(51)
     player.sprite = rect(player.x, player.y, 100, 100)
}
