import { CaveController } from "../js/controller.js";
import { Bullet } from "../js/bullet.js";

export class CavePlayer {
  constructor(canvas, caveGround, caveRocks, wand, playerImage) {
    this.caveRocks = caveRocks;
    this.caveGround = caveGround;
    this.canvas = canvas;
    this.width = 30;
    this.height = 30;
    this.x = 50;
    this.y = -100;
    this.gravity = 1.5;
    this.friction = 0.8;
    this.velocity = {
      x: 7,
      y: 3
    };
    this.bullets = [];
    this.controller = new CaveController(this.canvas, this.newPosY);

    this.rect = canvas.getBoundingClientRect();
    this.explode = 500;
    this.ticker = 0;
    this.health = 500;
    this.dead = false;
    this.gotWand = false;

    this.wand = wand;
    this.playerAttack = this.wand.attack;
    this.playerImage = playerImage;
    this.img = new Image();
  }

  draw(c) {
    c.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.img.src = this.playerImage;

    this.bullets.forEach(bullet => {
      bullet.draw(c);
    });
  }

  move() {
    if (this.dead == false) {
      this.controller.move();
    }
  }

  update(dt) {
    this.bounds(dt);
    this.collide(dt);
    this.attack(dt);
    this.bullets.forEach(bullet => {
      bullet.update(dt);
    });

    if (this.dead == false) {
      // Right Movement
      if (this.controller.right == true) this.x += this.velocity.x;

      // Left Movement
      if (this.controller.left == true) this.x += -this.velocity.x;

      // Jumping
      // when jumping set inital position, then compare initial position to current. if current is greater than threshold, then drop.
      if (this.controller.jump == true && this.y > 0) {
        this.velocity.y = -10 * this.friction;
        this.y += this.velocity.y;
      }

      this.y += this.velocity.y;
    }
  }

  collide(dt) {
    this.caveRocks.forEach(rock => {
      // Top collision
      if (
        this.y + this.height + this.velocity.y >= rock.randY &&
        this.y + this.height + this.velocity.y <=
          rock.randY + this.velocity.y &&
        this.x + this.height >= rock.randX &&
        this.x <= rock.randX + rock.width
      ) {
        this.velocity.y = 0;
      }

      if (
        this.controller.jump == true &&
        this.y + this.velocity.y <= rock.randY + rock.height &&
        this.y + this.velocity.y >= rock.randY &&
        this.x + this.height >= rock.randX &&
        this.x <= rock.randX + rock.width
      ) {
        this.velocity.y = 27 * this.friction;
        this.y += this.velocity.y;
      }
    });
  }

  bounds(dt) {
    if (
      (this.x + this.width >= this.canvas.width &&
        this.controller.right == true) ||
      (this.x <= 0 && this.controller.left == true)
    ) {
      this.velocity.x = 0;
    } else {
      this.velocity.x = 7;
    }
    if (this.y + this.height + this.velocity.y >= this.caveGround.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += this.gravity;
    }
  }

  attack(dt) {
    window.addEventListener("mousedown", e => {
      this.ticker++;
      if (this.ticker == 1 && this.dead == false) {
        this.spawnBullet(e);
      }
    });
  }

  spawnBullet(e) {
    this.bullets.push(
      new Bullet(
        this.x,
        this.y,
        this.height,
        this.canvas,
        this.x,
        this.y,
        this.wand.color,
        this.wand.size,
        this.wand.speed
      )
    );
    this.bullets.forEach(bullet => {
      this.mouseX = e.pageX - this.rect.left;
      this.mouseY = e.pageY - this.rect.top;
      bullet.spawnX = this.x;
      bullet.spawnY = this.y;
      bullet.fire(this.mouseX, this.mouseY);
    });

    setTimeout(() => {
      this.ticker = 0;
      this.bullets.forEach(bullet => {
        this.bullets.splice(bullet, 1);
      });
    }, this.explode);
  }
}
