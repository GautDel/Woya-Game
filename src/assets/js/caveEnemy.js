import { EnemyBullet } from "./bullet";

export class caveEnemy {
  constructor(caveGround, player, canvas) {
    this.canvas = canvas;
    this.caveGround = caveGround;
    this.player = player;
    this.health = 500;
    this.attack = 50;
    this.speed = 5;
    this.height = 100;
    this.width = 120;
    this.x = this.canvas.width - 200;
    this.y = this.caveGround.height - this.height;
    this.initX = 2;
    this.initY = 2;
    this.enemyBullets = [];
    this.explode = 5000;
    this.img = new Image();
    this.dead = false;
    this.velocity = {
      x: this.initX,
      y: this.initY
    };
    setInterval(() => {
      this.randNum = Math.floor(Math.random() * 3 + 1);
    }, 1000);

    setInterval(() => {
      this.enemyBullets.push(
        new EnemyBullet(this.x, this.y, this.canvas, this.width, this.height)
      );
    }, 3000);
  }

  draw(c) {
    c.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.img.src = "/src/assets/imgs/cave-enemy.png";

    this.enemyBullets.forEach(bullet => {
      bullet.draw(c);
    });
  }

  update(dt) {
    this.move();
    this.enemyBullets.forEach(bullet => {
      bullet.update();
    });
  }

  moveLeft() {
    this.collide();
    this.x += -this.velocity.x;
  }

  moveRight() {
    this.collide();
    this.x += this.velocity.x;
  }

  moveStop() {
    this.collide();
    this.velocity.x = 0;
  }

  move() {
    this.randMove = this.randNum;

    switch (this.randMove) {
      case 1: {
        this.moveLeft();

        break;
      }

      case 2: {
        this.moveRight();

        break;
      }

      case 3: {
        this.moveStop();
        break;
      }
    }
  }

  collide() {
    // Edge Collision
    if (this.x + this.width >= this.canvas.width || this.x <= 0) {
      this.velocity.x = 0;
    } else {
      this.velocity.x = this.speed;
    }

    if (this.x <= 0 && this.randNum == 2) {
      this.velocity.x = this.speed;
    } else if (this.x <= 0 && this.randNum == 2) {
    }

    if (this.x + this.width >= this.canvas.width && this.randNum == 1) {
      this.velocity.x = this.speed;
    } else if (this.x + this.width >= this.canvas.width && this.randNum == 4) {
      this.velocity.x = 5;
    }

    // Top player collision
    if (
      this.player.y + this.player.height >= this.y &&
      this.player.x >= this.x &&
      this.player.x + this.player.width / 2 <= this.x + this.width
    ) {
      this.player.velocity.y = -20;
      this.player.health -= 50;
    }

    // left side player collision
    if (
      this.player.x + this.player.width / 2 >= this.x &&
      this.player.x + this.player.width / 2 <= this.x + this.width &&
      this.player.y >= this.y
    ) {
      this.player.x += -this.player.velocity.x + -this.velocity.x * 2;
      this.player.health -= 10;
    }

    //Right side player collision
    if (
      this.player.x + this.player.width >= this.x + this.width &&
      this.player.x + 2 <= this.x + this.width &&
      this.player.y >= this.y
    ) {
      this.player.x += this.player.velocity.x + this.velocity.x * 2;
      this.player.health -= 10;
    }
  }

  spawnBullet(dt) {
    this.enemyBullets.forEach(bullet => {
      bullet.fire(this.player.x, this.player.y);

      if (this.enemyBullets.length > 3) {
        bullet.bulletSize += -0.1;

        if (bullet.bulletSize <= 1) {
          this.enemyBullets.splice(bullet, 4);
        }
      }
    });
  }
}
