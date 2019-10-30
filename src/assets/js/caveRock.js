export class CaveRock {
  constructor(randX, randY, width) {
    this.randX = randX;
    this.randY = randY;
    this.width = 70;
    this.height = 30;
    this.img = new Image();
  }

  draw(c) {
    c.drawImage(this.img, this.randX, this.randY, this.width, this.height);
    this.img.src = "/src/assets/imgs/cave-rock.png";
  }
}
