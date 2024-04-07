class GridBox extends HTMLElement {
  wasHoveredCount = 0;
  constructor() {
    super();
    this.init();
  }

  init() {
    this.addEventListener("mouseenter", this.hoverEffect);
  }

  hoverEffect() {
    this.wasHoveredCount++;
    this.style.opacity = this.wasHoveredCount * 0.1;
  }

  reset() {
    this.style.opacity = 0;
  }
}
customElements.define("grid-box", GridBox);

/**
 * Creates the canvas grid
 * @param {number} width
 * @param {number} height
 */
function makeGrid(width, height) {
  let area = width * height;
  let parentEl = document.getElementById("canvas");

  for (let i = 0; i < area; i++) {
    let gridBox = document.createElement("grid-box");
    gridBox.classList.add("GridBox");
    parentEl.append(gridBox);
  }
}

/**
 * Clear the coloring from the grid
 * @param {string} parentId
 */
function eraseGrid(parentId) {
  /**
   * Get all the boxes in the canvas
   * @type {Array<GridBox>}
   */
  let allGridBoxEls = Array.from(document.getElementById(parentId).children);

  for (let box of allGridBoxEls) {
    box.reset();
  }
}

/**
 * Change width and height of grid
 * @param {HTMLInputElement} e
 */
function changeGridSize(e) {
  eraseGrid("canvas");

  let size = e.target.value;
  document.documentElement.style.setProperty("--grid-size", size);
  makeGrid(size, size);
}

/**
 * Change fill color of the boxes
 * @param {HTMLInputElement} e
 */
function changeFillColor(e) {
  let color = e.target.value;
  document.documentElement.style.setProperty("--grid-color", color);
}

document
  .getElementById("color-picker")
  .addEventListener("input", (e) => changeFillColor(e));
document
  .getElementById("size-input")
  .addEventListener("blur", (e) => changeGridSize(e));
document
  .getElementById("erase-button")
  .addEventListener("click", () => eraseGrid("canvas"));

// Make default grid
makeGrid(16, 16);
