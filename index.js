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
}
customElements.define("grid-box", GridBox);

/**
 * Creates the canvas grid
 * @param {number} width
 * @param {number} height
 * @param {HTMLElement} parentEl
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

makeGrid(16, 16);
