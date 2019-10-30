export class HealthOver {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.img = new Image();
  }

  draw(c) {
    c.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.img.src = "/src/assets/imgs/health-overlay.png";
  }
}
