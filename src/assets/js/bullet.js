export class Bullet {
  constructor(
    x,
    y,
    playerSize,
    canvas,
    spawnX,
    spawnY,
    wandColor,
    wandSize,
    wandSpeed
  ) {
    this.canvas = canvas;
    this.wandColor = wandColor;
    this.wandSpeed = wandSpeed;
    this.wandSize = wandSize;
    this.playerSize = playerSize;
    this.spawnX = spawnX;
    this.spawnY = spawnY;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.velocity = {
      x: 10,
      y: 10
    };
  }

  draw(c) {
    c.drawImage(
      this.img,
      this.x + this.playerSize / 2 - this.wandSize / 2,
      this.y + this.playerSize / 2 - this.wandSize / 2,
      this.wandSize,
      this.wandSize
    );
    this.img.src = "/src/assets/imgs/cave-player-bullet.png";
  }

  fire(mouseX, mouseY) {
    this.mouseX = mouseX;
    this.mouseY = mouseY;

    this.vectorX = this.mouseX - this.x;
    this.vectorY = this.mouseY - this.y;
    this.distance = Math.sqrt(
      this.vectorX * this.vectorX + this.vectorY * this.vectorY
    );
    this.dx = this.vectorX / this.distance;
    this.dy = this.vectorY / this.distance;
    this.dx *= this.wandSpeed;
    this.dy *= this.wandSpeed;
  }

  update(dt) {
    this.x += this.dx;
    this.y += this.dy;
  }
}

export class EnemyBullet {
  constructor(x, y, canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.bulletSize = 15;
    this.x = x + this.width / 2 - this.bulletSize / 2;
    this.y = y + this.height / 2 - this.bulletSize / 2;
    this.speed = 2.5;
    this.damage = 3;
    this.img = new Image();
  }

  draw(c) {
    c.drawImage(this.img, this.x, this.y, this.bulletSize, this.bulletSize);
    this.img.src = "/src/assets/imgs/enemy-bullet.png";
  }

  fire(playerX, playerY) {
    this.playerX = playerX;
    this.playerY = playerY;

    this.vectorX = this.playerX - this.x;
    this.vectorY = this.playerY - this.y;

    this.distance = Math.sqrt(
      this.vectorX * this.vectorX + this.vectorY * this.vectorY
    );
    this.dx = this.vectorX / this.distance;
    this.dy = this.vectorY / this.distance;
    this.dx *= this.speed;
    this.dy *= this.speed;
  }

  update(dt) {
    this.x += this.dx;
    this.y += this.dy;
  }
}
