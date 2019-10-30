import { Tile } from "../js/tile.js";

export class CaveTile extends Tile {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
    this.img = new Image();
  }

  draw(c) {
    c.drawImage(this.img, this.x, this.y, this.tileHeight, this.tileWidth);

    this.img.src = "/src/assets/imgs/cave.png";
  }
}
