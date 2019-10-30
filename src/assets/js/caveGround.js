export class CaveGround {
  constructor(canvas) {
    this.canvas = canvas;
    this.height = this.canvas.height - 50;
    this.thickness = 50;
    this.img = new Image();
  }

  draw(c) {
    c.drawImage(this.img, 0, this.height, this.canvas.width, this.thickness);
    this.img.src = "/src/assets/imgs/cave-ground.png";
  }
}
