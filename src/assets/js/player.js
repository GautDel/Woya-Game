import { Controller } from "../js/controller.js";

export class Player {
  constructor(
    canvas,
    tileSize,
    spawnX,
    spawnY,
    color,
    rocks,
    trees,
    lineColor
  ) {
    this.color = color;
    this.tileSize = tileSize;
    this.spawnX = spawnX * this.tileSize;
    this.spawnY = spawnY;
    this.canvas = canvas;
    this.playerX = this.spawnX;
    this.playerY = this.spawnY;
    this.p1turn = true;
    this.img = new Image();
    this.lineWidth = 2.5;
    this.lineColor = lineColor;
    this.controller = new Controller(
      this.playerX,
      this.playerY,
      this.tileSize,
      this.canvas,
      rocks,
      trees
    );
  }

  drawMoves(c) {
    // Initial Position
    c.beginPath();
    c.rect(this.playerX, this.playerY, this.tileSize, this.tileSize);
    c.strokeStyle = this.lineColor;
    c.lineWidth = this.lineWidth;
    c.stroke();
    c.closePath();

    // Right moves
    c.beginPath();
    c.rect(
      this.playerX + this.tileSize,
      this.playerY,
      this.tileSize,
      this.tileSize
    );
    c.strokeStyle = this.lineColor;
    c.lineWidth = this.lineWidth;
    c.stroke();
    c.closePath();

    c.beginPath();
    c.rect(
      this.playerX + this.tileSize * 2,
      this.playerY,
      this.tileSize,
      this.tileSize
    );
    c.strokeStyle = this.lineColor;
    c.lineWidth = this.lineWidth;
    c.stroke();
    c.closePath();

    c.beginPath();
    c.rect(
      this.playerX + this.tileSize * 3,
      this.playerY,
      this.tileSize,
      this.tileSize
    );
    c.strokeStyle = this.lineColor;
    c.lineWidth = this.lineWidth;
    c.stroke();
    c.closePath();

    // Left moves
    c.beginPath();
    c.rect(
      this.playerX - this.tileSize,
      this.playerY,
      this.tileSize,
      this.tileSize
    );
    c.strokeStyle = this.lineColor;
    c.lineWidth = this.lineWidth;
    c.stroke();
    c.closePath();

    c.beginPath();
    c.rect(
      this.playerX - this.tileSize * 2,
      this.playerY,
      this.tileSize,
      this.tileSize
    );
    c.strokeStyle = this.lineColor;
    c.lineWidth = this.lineWidth;
    c.stroke();
    c.closePath();

    c.beginPath();
    c.rect(
      this.playerX - this.tileSize * 3,
      this.playerY,
      this.tileSize,
      this.tileSize
    );
    c.strokeStyle = this.lineColor;
    c.lineWidth = this.lineWidth;
    c.stroke();
    c.closePath();

    // Up moves //
    c.beginPath();
    c.rect(
      this.playerX,
      this.playerY - this.tileSize,
      this.tileSize,
      this.tileSize
    );
    c.strokeStyle = this.lineColor;
    c.lineWidth = this.lineWidth;
    c.stroke();
    c.closePath();

    c.beginPath();
    c.rect(
      this.playerX,
      this.playerY - this.tileSize * 2,
      this.tileSize,
      this.tileSize
    );
    c.strokeStyle = this.lineColor;
    c.lineWidth = this.lineWidth;
    c.stroke();
    c.closePath();

    c.beginPath();
    c.rect(
      this.playerX,
      this.playerY - this.tileSize * 3,
      this.tileSize,
      this.tileSize
    );
    c.strokeStyle = this.lineColor;
    c.lineWidth = this.lineWidth;
    c.stroke();
    c.closePath();

    // Down Moves //
    c.beginPath();
    c.rect(
      this.playerX,
      this.playerY + this.tileSize,
      this.tileSize,
      this.tileSize
    );
    c.strokeStyle = this.lineColor;
    c.lineWidth = this.lineWidth;
    c.stroke();
    c.closePath();

    c.beginPath();
    c.rect(
      this.playerX,
      this.playerY + this.tileSize * 2,
      this.tileSize,
      this.tileSize
    );
    c.strokeStyle = this.lineColor;
    c.lineWidth = this.lineWidth;
    c.stroke();
    c.closePath();

    c.beginPath();
    c.rect(
      this.playerX,
      this.playerY + this.tileSize * 3,
      this.tileSize,
      this.tileSize
    );
    c.strokeStyle = this.lineColor;
    c.lineWidth = this.lineWidth;
    c.stroke();
    c.closePath();
  }

  draw(c) {
    c.drawImage(
      this.img,
      this.controller.posX,
      this.controller.posY,
      this.tileSize,
      this.tileSize
    );
    this.img.src = this.color;
  }

  move() {
    window.onkeydown = e => {
      let key = e.keyCode ? e.keyCode : e.which;
      switch (key) {
        case 13: {
          this.playerX = this.controller.posX;
          this.playerY = this.controller.posY;
          this.controller.newPosX = this.controller.posX;
          this.controller.newPosY = this.controller.posY;
          this.controller.turn = !this.controller.turn;
          this.controller.dy = this.tileSize;
          this.controller.dx = this.tileSize;
          this.p1turn = !this.p1turn;
          break;
        }
      }
    };

    this.playerPosX = this.controller.posX;
    this.playerPosY = this.controller.posY;
    this.playerDx = this.controller.dx;
    this.playerDy = this.controller.dy;
    this.controller.move();
  }

  turn() {
    return this.controller.turn;
  }
}
