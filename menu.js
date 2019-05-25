function mainMenu() {
  noLoop(); // menus are DOM elements, not on the p5 canvas
  let startGame = new MenuElement('Start Game', () =>{ window.dispatchEvent(events.gamestart) })
}
