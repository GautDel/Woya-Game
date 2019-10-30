export class CaveDoor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 70;
    this.img = new Image();
  }

  draw(c) {
    c.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.img.src = "/src/assets/imgs/cave-door.png";
  }
}
