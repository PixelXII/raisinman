const gamedatauri = 'https://cdn.jsdelivr.net/gh/PixelXII/topdownRPG@master/assets/Gamedata.json'
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
    // Dbox = new DialogueBox('Save the princess please')
     canvas.style.position = 'absolute'
}

function draw() {
     background(51)
}
