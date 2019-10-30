export class Controller {
  constructor(posX, posY, tileSize, canvas, rocks, trees) {
    this.rocks = rocks;
    this.trees = trees;
    this.turn = true;
    this.canvas = canvas;
    this.tileSize = tileSize;
    this.posX = posX;
    this.posY = posY;
    this.newPosX = this.posX;
    this.newPosY = this.posY;
    this.dx = this.tileSize;
    this.dy = this.tileSize;
  }

  move() {
    window.onkeyup = e => {
      let key = e.keyCode ? e.keyCode : e.which;

      switch (key) {
        // Move left
        case 65: {
          this.collideLeft(this.rocks);
          this.collideLeft(this.trees);

          this.posX -= this.dx;
          if (
            this.posX != this.newPosX - this.tileSize * 2 &&
            this.posY == this.newPosY &&
            this.posX != this.newPosX + this.tileSize * 2
          ) {
            this.dx = this.tileSize;
          }
          if (this.posX < this.newPosX) this.dy = 0;
          if (this.posX < this.newPosX - this.tileSize * 2) this.dx = 0;
          if (this.posX > this.newPosX + this.tileSize * 2)
            this.posX += -this.tileSize;
          break;
        }

        // Move Up
        case 87: {
          this.collideBottom(this.rocks);
          this.collideBottom(this.trees);
          this.posY -= this.dy;
          if (
            this.posY != this.newPosY - this.tileSize * 2 &&
            this.posX == this.newPosX
          )
            this.dy = this.tileSize;
          if (this.posY < this.newPosY - this.tileSize * 2) this.dy = 0;
          if (this.posY < this.newPosY) this.dx = 0;
          if (this.posY > this.newPosY + this.tileSize * 2)
            this.posY += -this.tileSize;
          break;
        }

        // Move Right
        case 68: {
          this.collideRight(this.rocks);
          this.collideRight(this.trees);

          this.posX += this.dx;
          if (
            this.posX != this.newPosX + this.tileSize * 2 &&
            this.posY == this.newPosY
          )
            this.dx = this.tileSize;
          if (this.posX > this.newPosX) this.dy = 0;
          if (this.posX == this.newPosX + this.tileSize) this.dy = 0;
          if (this.posX > this.newPosX + this.tileSize * 2) this.dx = 0;
          if (this.posX < this.newPosX - this.tileSize * 2)
            this.posX += this.tileSize;
          break;
        }

        // Move Down
        case 83: {
          this.collideTop(this.rocks);
          this.collideTop(this.trees);

          this.posY += this.dy;
          if (
            this.posY != this.newPosY + this.tileSize * 2 &&
            this.posX == this.newPosX
          )
            this.dy = this.tileSize;
          if (this.posY > this.newPosY + this.tileSize * 2) this.dy = 0;
          if (this.posY > this.newPosY) this.dx = 0;
          if (this.posY < this.newPosY - this.tileSize * 2)
            this.posY += this.tileSize;
          break;
        }
      }
    };

    if (this.posX < 0) this.posX = 0; // Checking for left border

    if (this.posY < 0) this.posY = 0; // Checking for top border

    if (this.posX + this.tileSize > this.canvas.width)
      // Checking for right border
      this.posX = this.canvas.width - this.tileSize;

    if (this.posY + this.tileSize > this.canvas.height)
      //Checking for bottom border
      this.posY = this.canvas.height - this.tileSize;
  }

  collideRight(arrayName) {
    arrayName.forEach(arrayIndex => {
      if (
        arrayIndex.x - this.tileSize == this.posX &&
        arrayIndex.y == this.posY
      ) {
        this.dx = 0;
      }
    });
  }

  collideLeft(arrayName) {
    arrayName.forEach(arrayIndex => {
      if (
        arrayIndex.x + this.tileSize == this.posX &&
        arrayIndex.y == this.posY
      )
        this.dx = 0;
    });
  }

  collideTop(arrayName) {
    arrayName.forEach(arrayIndex => {
      if (
        arrayIndex.y - this.tileSize == this.posY &&
        arrayIndex.x == this.posX
      ) {
        this.dy = 0;
      }
    });
  }
  collideBottom(arrayName) {
    arrayName.forEach(arrayIndex => {
      if (
        arrayIndex.y + this.tileSize == this.posY &&
        arrayIndex.x == this.posX
      ) {
        this.dy = 0;
      }
    });
  }
}

export class CaveController {
  constructor(canvas, playerY) {
    this.canvas = canvas;
    this.left = false;
    this.right = false;
    this.up = false;
    this.jump = false;
    this.down = false;
    this.keyDown = 0;
    this.playerY = playerY;
  }

  move() {
    window.addEventListener("keydown", e => {
      let key = e.keyCode ? e.keyCode : e.which;

      switch (key) {
        case 68: {
          this.right = true;
          break;
        }

        case 65: {
          this.left = true;
          break;
        }

        case 32: {
          this.keyDown++;
          this.jump = true;
          setTimeout(() => {
            this.jump = false;
          }, 150);
          if (this.keyDown == 1) {
            this.jump = true;
          } else {
            this.jump = false;
          }

          break;
        }

        case 83: {
          this.down = true;
          break;
        }
        case 87: {
          this.up = true;
          break;
        }
      }
    });

    window.addEventListener("keyup", e => {
      let key = e.keyCode ? e.keyCode : e.which;

      switch (key) {
        case 68: {
          this.right = false;
          break;
        }

        case 65: {
          this.left = false;
          break;
        }

        case 32: {
          this.jump = false;
          this.keyDown = 0;
          break;
        }

        case 83: {
          this.down = false;
          break;
        }

        case 87: {
          this.up = false;
          break;
        }
      }
    });
  }
}
