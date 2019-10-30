export class Tile {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.tileWidth = width;
    this.tileHeight = height;
    this.color = color;
    this.lineWidth = 1.5;
  }

  draw(c) {
    c.beginPath();
    c.lineWidth = this.lineWidth;
    c.strokeStyle = this.color;
    c.rect(this.x, this.y, this.tileWidth, this.tileHeight);
    c.closePath();
    c.stroke();
  }
}
