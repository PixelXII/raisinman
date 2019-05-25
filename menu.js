function mainMenu() {
  noLoop(); // menus are DOM elements, not on the p5 canvas
  let startGame = new MenuElement('Start Game', () => { window.dispatchEvent(events.gamestart) })
  let options = new MenuElement('Options', () => { window.dispatchEvent(events.showOptions) })
  startGame.select()

  titlemenu = new Menu("Raisin Man", [startGame, options]) // main menu
  titlemenu.show()
  titlemenu.toggleActive()
  setMenuNavKeys()
}
