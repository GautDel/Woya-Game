export class HealthBar {
  constructor(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
  }

  draw(c) {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
    c.fill();
    c.closePath();
  }
}
