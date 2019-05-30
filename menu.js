var menuMusic = new Audio('assets/music/raisinintro.wav')

function preload() {
  soundFormats('mp3', 'wav')
}

function mainMenu() {
  noLoop(); // menus are DOM elements, not on the p5 canvas
  let startGame = new MenuElement('Start Game', () => { window.dispatchEvent(events.gamestart) })
  let options = new MenuElement('Options', () => {
    window.dispatchEvent(events.showOptions);
    resetGameKeys()
    setMenuNavKeys(optionsmenu)
  })
  if(Game.music) {
    menuMusic.play()
  }
  let loadGame;
  if(localStorage.savedGame) {
    loadGame = new MenuElement('Load game', () => {
      if(localStorage.savedGame) {
        Game = localStorage.savedGame
      }
    })
    titlemenu = new Menu("Raisin Man", [startGame, loadGame, options], 'titlemenu')
  } else {
    titlemenu = new Menu("Raisin Man", [startGame, options], 'titlemenu')
  }
  titlemenu.show()
  titlemenu.active = true
  titlemenu.toggleActive()
  setMenuNavKeys(titlemenu)

  let sound = new MenuElement('Sound On', () => {
    if(sound.value) {
      sound.div.innerHTML = 'Sound Off'
      sound.value = false
      Game.sound = false
    } else {
      sound.div.innerHTML = 'Sound On'
      sound.value = true
      Game.sound = true
    }
  }, true)
  let music = new MenuElement('Music On', () => {
    if(music.value) {
      music.div.innerHTML = 'Music Off'
      music.value = false
      Game.music = false
    } else {
      music.div.innerHTML = 'Music On'
      music.value = true
      Game.sound = true
    }
  }, true)
  optionsmenu = new Menu("Options", [sound, music], 'optionsmenu')
  optionsmenu.hide()
}
