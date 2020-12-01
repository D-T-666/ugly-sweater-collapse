/**
 * Tile(states, total amount of states, x location, y location, width that will be display)
*/

class Tile {
  constructor(states, total_states, x, y) {
    this.states = states;
    this.pLen = this.states.length;
    this.total_states = total_states;
    this.pos = createVector(x || 0, y || 0);
    this.highlight = false;
  }

  collapse() {
    this._hasCollapsed = true;
    // Picks a random state and makes it the only state in the list
    this.states = [random(this.states)];
  }

  checkCollapsed() {
    if (!this._hasCollapsed) this._hasCollapsed = this.states.length == 1;
  }

  hasCollapsed() {
    // Checks if the length of the possible states is 1 
    // which would mean that the tile has collapsed
    return this._hasCollapsed;
  }

  getEntropy() {
    // Returns infinity if the tile has collapsed and returns the 
    // length of the states if the tile hasn't collapsed
    return (this.pLen > 1) ? this.pLen : Infinity;
  }

  slowReveal(dir = 0) {
    // initiallizes some varialbes for animation
    this.reveal_direction = dir;
    this.reveal_timer_max = 10;
    this.reveal_timer = this.reveal_timer_max;
  }

  display() {
    // set x coordinate to be the x index of the tile * the size of the tile 
    let x = (this.pos.x * tileW);
    // set y coordinate to be the y index of the tile * the size of the tile 
    let y = (this.pos.y * tileH);
    // Set w, h to size
    let w = tileW;
    let h = tileH;

    if (this.hasCollapsed()) {
      if (this.reveal_timer > 0.02) {
        fill('#0f0f25');
        noStroke();
        rect(x, y, w, h);
        fill(this.color || color(255, 0, 0));
        noStroke();

        if (this.reveal_timer > 0) {
          if (this.reveal_direction == 0) {
            w = w * (1 - this.reveal_timer / this.reveal_timer_max);
            x += (tileW - w) / 2;
          }
          if (this.reveal_direction == 1) {
            h = h * (1 - this.reveal_timer / this.reveal_timer_max);
            y += (tileH - h) / 2;
          }
          if (this.reveal_direction == 2) {
            w = w * (1 - this.reveal_timer / this.reveal_timer_max);
            x += (tileW - w) / 2;
            h = h * (1 - this.reveal_timer / this.reveal_timer_max);
            y += (tileH - h) / 2;
          }
        }

        this.reveal_timer = lerp(this.reveal_timer, 0, 0.3);

        rect(
          x + tileSpacing / 2,
          y + tileSpacing / 2,
          w - tileSpacing,
          h - tileSpacing,
          tileBorderRadius
        );
      }
      this.pLen = 1;

    } else {
      if (this.pLen < 50 && this.states.length - this.pLen != 0) {

        noStroke();
        fill('#0f0f25');
        rect(x, y, w, h);

        fill(this.color || color(255, 0, 0));
        noStroke();
        ellipse(
          x + w / 2,
          y + h / 2,
          w * map(this.pLen, 0, 100, 0.9, 0),
          h * map(this.pLen, 0, 100, 0.9, 0)
        );
      }
    }
    const sLen = this.states.length;
    this.pLen = sLen;
  }

  Highlight() {
    // set x coordinate to be the x index of the tile * the size of the tile 
    let x = (this.pos.x * tileW);
    // set y coordinate to be the y index of the tile * the size of the tile 
    let y = (this.pos.y * tileH);
    // Set w, h to size
    let w = tileW;
    let h = tileH;
    noFill();
    stroke(124, 74, 232, 30);
    strokeWeight(2);
    rect(
      x + tileSpacing / 2 + 1,
      y + tileSpacing / 2 + 1,
      w - tileSpacing - 2,
      h - tileSpacing - 2,
      tileBorderRadius
    );
  }
}