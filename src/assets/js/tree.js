import { Tile } from "../js/tile.js";

export class Tree extends Tile {
  constructor(x, y, tileWidth, tileHeight) {
    super(x, y, tileWidth, tileHeight);
    this.img = new Image();
  }

  draw(c) {
    c.drawImage(this.img, this.x, this.y, this.tileHeight, this.tileWidth);
    this.img.src = "/src/assets/imgs/jellyfish.png";
  }
}
