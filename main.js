const gamedatauri = 'https://cdn.jsdelivr.net/gh/PixelXII/raisinman/assets/Gamedata.json'
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
          throw new Error("Could not load game data file")
          throw err
     })
}

function setup() {
     createCanvas(window.innerWidth-10, window.innerHeight-10)
     loadGameData()
     Dbox = new DialogueBox('raisin man')
     canvas.style.position = 'absolute'
}

let player = {
  topView: true,
  top: {
    sprite: undefined,
    movespeed:8
  },
  side: {
    movespeed:10
  },
  x:100,
  y:100
}

window.addEventListener('keydown', key => {
  if(player.topView) {
    if(key.keyCode === Gamedata.controls.moveUp) {
      player.y -= player.top.movespeed
    }
    if(key.keyCode === Gamedata.controls.moveDown) {
      player.y += player.top.movespeed
    }
    if(key.keyCode === Gamedata.controls.moveRight) {
      player.x += player.top.movespeed
    }
    if(key.keyCode === Gamedata.controls.moveLeft) {
      player.x -= player.top.movespeed
    }
  }
  console.log(key)
})

function draw() {
  background(51)
  fill('#ffffff')
  rect(player.x, player.y, 100, 100)
}
