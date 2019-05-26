// copyright kai wildberger may 24 2019
// passion project
// called "Raisin Man", its a cuphead-esque type RPG

var Game = {
  currentMap: undefined,
  currentNPC: undefined,
  currentShop: undefined,
  battle: {
    opponent: undefined,
    type: undefined
  },
  sound: null,
  music: null,
  titleMenuActive: true,
  pauseMenuActive: false
}

function id(e) {
  return document.getElementById(e)
}

function setGameMovementKeys() {
  var keyMap = {};
  onkeydown = onkeyup = function(e){
    e = e || event;
    keyMap[e.keyCode] = e.type == 'keydown';
    if(keyMap[Gamedata.controls.moveLeft]) {
      player.x -= player.movespeed
    }
    if(keyMap[Gamedata.controls.moveRight]) {
      player.x += player.movespeed
    }
    if(keyMap[Gamedata.controls.moveUp]) {
      player.y -= player.movespeed
    }
    if(keyMap[Gamedata.controls.moveDown]) {
      player.y += player.movespeed
    }
  }
}

function resetGameKeys() {
  onkeydown = onkeyup = function() {} // supposed to be empty
}

function setMenuNavKeys(menu) {
  onkeydown = function(e) {
    e = e || event;
    if(e.keyCode === Gamedata.controls.moveDown) {
      menu.increaseSelection()
    }
    if(e.keyCode === Gamedata.controls.moveUp) {
      menu.decreaseSelection()
    }
    if(e.keyCode === Gamedata.controls.action1) {
      menu.useSelected()
    }
    if(e.keyCode === Gamedata.controls.action3) {
      if(optionsmenu.active) {
        optionsmenu.active = false
        optionsmenu.hide()
        titlemenu.active = true
        titlemenu.show()
        setMenuNavKeys(titlemenu)
      }
    }
  }
}

const areaNames = ['starting', 'second']

var gdu = 'https://cdn.jsdelivr.net/gh/PixelXII/raisinman/assets/Gamedata.json'
var Gamedata;
var Dbox;
document.body.style.margin = "5px"

async function loadGameData() {
     const response = await fetch('https://cdn.jsdelivr.net/gh/PixelXII/raisinman/assets/Gamedata.json')
     let d = await response.json().then(res => {
          console.log("Gamedata.json loaded")
          if(!res) {
            throw new Error("Could not load game data file")
          } else {
            Gamedata = res
            window.dispatchEvent(events.dataLoaded)
          }
     }).catch(err => {
          throw new Error("Could not load game data file")
          throw err
     })
}

async function loadArea(area) {
  const response = await fetch(`https://cdn.jsdelivr.net/gh/PixelXII/raisinman/assets/areas/${area}.json`)
  let d = await response.json().then(res => {
    console.log("area loaded from "+areaurl)
    return res
  }).catch(err => {
    throw new Error("Could not load area JSON from "+areaurl)
    throw err
  })
}

window.addEventListener('gamestart', () => {
  loop()
  canvas.style.display = 'block'
  id('menu-container').style.display = 'none'
  Game.titleMenuActive = false
  setGameMovementKeys()
  loadArea('starting')
})

window.addEventListener('showoptions', () => {
  titlemenu.hide()
  optionsmenu.show()
  optionsmenu.items[0].select()
})

// MENUS ARE DOM ELEMENTS

window.addEventListener('gamedataloaded', () => {
  Game.sound = Gamedata.defaultOptions.sound
  Game.music = Gamedata.defaultOptions.music
})

function setup() {
     createCanvas(window.innerWidth-10, window.innerHeight-10) // 100% responsive
     loadGameData()
     Dbox = new DialogueBox('raisin man') // it works
     canvas.style.position = 'absolute'
     canvas.style.display = 'none'
     id('menu-container').style.marginLeft = window.innerWidth/2.5
     frameRate(500) // looks better with higher fps
     mainMenu()
}

let player = {
  topView: true,
  top: {
    sprite: undefined,
    movespeed:10
  },
  side: {
    movespeed:10
  },
  movespeed:8,
  x:100,
  y:100,
  w:100,
  h:100
}

window.addEventListener('keypress', key => {
  if(key.keyCode === Gamedata.controls.menu && Gamedata.info.active) {
    pauseMenu()
  }
})

// MOVING DIAGONALLY IS FASTER THAN MOVING NORMALLY
// IS IT A PROBLEM? PROBABLY
// FIX IT? PROBABLY NOT

function draw() { // main game loop, not active when a menu is
  background(51)
  fill('#ffffff')
  rect(player.x, player.y, player.w, player.h)

  if(player.top) {
    player.movespeed = player.top.movespeed
  } else {
    player.movespeed = player.side.movespeed
  }
}
