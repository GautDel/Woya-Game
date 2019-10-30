import { CavePlayer } from "../js/cavePlayer.js";
import { caveEnemy } from "../js/caveEnemy.js";
import { CaveGround } from "../js/caveGround.js";
import { CaveRock } from "../js/caveRock.js";
import { RandomRock } from "../js/utility.js";
import { Wand } from "../js/wand.js";
import { HealthBar } from "../js/health.js";
import { CaveDoor } from "../js/caveDoor.js";
import { CaveGroundOver } from "../js/caveGroundOver.js";
import { HealthOver } from "../js/healthOver.js";
import { HealthBg } from "../js/healthBg.js";

export class Cave {
  constructor(player1, player2, canvas, playerImage) {
    this.playerImage = playerImage;
    this.canvas = canvas;
    this.mapPlayer1 = player1;
    this.mapPlayer2 = player2;
    this.randomRock = new RandomRock(this.canvas, 30);
    this.caveGround = new CaveGround(this.canvas);
    this.caveGroundOver = new CaveGroundOver(this.canvas);
    this.caveRocks = [];
    this.caveEnemies = [];
    this.wand = new Wand(this.canvas.width - 80, this.canvas.height - 80);
    this.newWand;
    this.spawnedWand;
    this.cavePlayer1 = new CavePlayer(
      this.canvas,
      this.caveGround,
      this.caveRocks,
      this.wand,
      this.playerImage
    );
    this.numRocks = 15;
    this.spawnWand = false;
    this.pickedWand = false;
    this.enemyDead = false;
    this.healthBar = new HealthBar(
      (this.canvas.width - 500) / 2,
      20,
      "#EAD9FF",
      500,
      30
    );

    this.healthBg = new HealthBg((this.canvas.width - 500) / 2, 20, 500, 30);
    this.healthOver = new HealthOver(
      (this.canvas.width - 540) / 2,
      20,
      540,
      30
    );
    this.playerHealthBar = new HealthBar(
      (this.canvas.width - this.cavePlayer1.health) / 2,
      this.caveGround.height + this.caveGround.thickness / 2 - 10 / 2,
      "#ffffff",
      500,
      20
    );

    this.playerHealthBg = new HealthBg(
      (this.canvas.width - this.cavePlayer1.health) / 2,
      this.caveGround.height + this.caveGround.thickness / 2 - 10 / 2,
      500,
      20
    );
    this.playerHealthOver = new HealthOver(
      (this.canvas.width - (this.cavePlayer1.health + 40)) / 2,
      this.caveGround.height + this.caveGround.thickness / 2 - 10 / 2,
      540,
      20
    );

    this.quit = false;
  }

  removeRocks() {
    this.caveRocks.forEach((rock, i) => {
      if (
        rock.randX + rock.width > this.canvas.width ||
        rock.randY + rock.height < 0 + rock.height * 3 ||
        rock.randY > this.canvas.height - rock.height * 4
      ) {
        this.caveRocks.splice(i, 1);
      }
    });
  }

  init() {
    $(".container").fadeTo(2000, 0);
    $("#cave").css("opacity", 1);
    $(".cave-container").css("opacity", 1);

    // Creating Player Movement
    this.cavePlayer1.move();
    // Generating Rocks
    this.genRocks();

    this.caveEnemies.push(
      new caveEnemy(this.caveGround, this.cavePlayer1, this.canvas)
    );
  }

  draw(c) {
    this.canvas.style.backgroundImage =
      "url('/src/assets/imgs/cave-background.png')";

    this.removeRocks();

    if (this.pickedWand == true) {
      this.wand.draw(c);
    }

    this.caveRocks.forEach(rock => {
      rock.draw(c);
    });

    this.caveEnemies.forEach(enemy => {
      enemy.draw(c);
    });

    this.healthBg.draw(c);
    this.healthBar.draw(c);
    this.healthOver.draw(c);

    this.caveGround.draw(c);
    if (this.caveEnemies.length == 0) {
      this.newWand.draw(c);
      this.spawnedWand.draw(c);
      this.caveDoor.draw(c);
    }
    this.caveDoor.draw(c);
    this.cavePlayer1.draw(c);
    this.caveGroundOver.draw(c);

    this.playerHealthBg.draw(c);

    this.playerHealthBar.draw(c);
    this.playerHealthOver.draw(c);
  }

  update(dt) {
    // Setting Map movement to 0
    this.mapPlayer1.controller.dx = 0;
    this.mapPlayer1.controller.dy = 0;
    this.mapPlayer2.controller.dx = 0;
    this.mapPlayer2.controller.dy = 0;
    // Updating Player model based on movement
    this.cavePlayer1.update(dt);

    this.caveEnemies.forEach(enemy => {
      enemy.spawnBullet(dt);
      enemy.update(dt);
    });

    this.killEnemy(dt);
    this.killPlayer(dt);
    if (this.caveEnemies.length == 0) {
      this.exitCave(dt);
    }

    this.playerHealthBar.width = this.cavePlayer1.health;
  }

  genRocks() {
    for (let i = 0; i < this.numRocks; i++) {
      this.caveRocks.push(
        new CaveRock(
          this.randomRock.randomX(),
          this.randomRock.randomY(),
          this.randomRock.randomWidth()
        )
      );
    }
  }

  killEnemy() {
    this.cavePlayer1.bullets.forEach(bullet => {
      this.caveEnemies.forEach(enemy => {
        if (
          bullet.x >= enemy.x &&
          bullet.x <= enemy.x + enemy.width - bullet.wandSize &&
          bullet.y >= enemy.y
        ) {
          enemy.health -= 300;
          this.cavePlayer1.bullets.splice(bullet, 1);
          this.healthBar.width -= this.cavePlayer1.playerAttack;

          if (enemy.health <= 0) {
            this.enemyDead = true;
            this.caveEnemies.splice(enemy, 1);
          }
        }
      });
    });
    this.genWand();
    this.caveDoor = new CaveDoor(
      30,
      this.canvas.height - this.caveGround.thickness - 70
    );
  }

  killPlayer() {
    this.caveEnemies.forEach(enemy => {
      enemy.enemyBullets.forEach(bullet => {
        if (
          bullet.y <= this.cavePlayer1.y + this.cavePlayer1.height &&
          bullet.y + bullet.bulletSize >= this.cavePlayer1.y &&
          bullet.x + bullet.bulletSize >= this.cavePlayer1.x &&
          bullet.x <= this.cavePlayer1.x + this.cavePlayer1.width
        ) {
          this.cavePlayer1.health -= bullet.damage;
        }
      });
    });
    if (this.cavePlayer1.health <= 0) {
      setTimeout(() => {
        $("#message").text("YOU HAVE MET YOUR DEMISE...");
        this.quit = true;
      }, 1000);

      this.cavePlayer1.health = 0;
      this.cavePlayer1.dead = true;
    }
  }

  genWand() {
    if (this.caveEnemies.length <= 0 && this.spawnWand == false) {
      this.newWand = new Wand();
      this.newWand.randWand();
      this.spawnedWand = new Wand();
      Object.assign(this.spawnedWand, this.newWand);
      this.spawnedWand.spawnX = this.canvas.width - 100;
      this.spawnedWand.spawnY =
        this.canvas.width - 80 - this.spawnedWand.size / 2;
      this.spawnWand = true;
    }

    if (this.caveEnemies.length <= 0 && this.spawnWand == true) {
      this.acquireWand();
    }
  }

  acquireWand(c) {
    if (
      (this.cavePlayer1.x + this.cavePlayer1.width >= this.spawnedWand.spawnX &&
        this.cavePlayer1.x <= this.spawnedWand.spawnX + this.spawnedWand.size &&
        this.cavePlayer1.y >= this.spawnedWand.spawnY &&
        this.cavePlayer1.y <=
          this.spawnedWand.spawnY + this.spawnedWand.size) ||
      (this.cavePlayer1.x + this.cavePlayer1.width >=
        this.spawnedWand.spawnX + this.spawnedWand.size &&
        this.cavePlayer1.x <= this.spawnedWand.spawnX + this.spawnedWand.size &&
        this.cavePlayer1.y >= this.spawnedWand.spawnY &&
        this.cavePlayer1.y <= this.spawnedWand.spawnY + this.spawnedWand.size)
    ) {
      this.cavePlayer1.gotWand = true;
      this.cavePlayer1.wand = this.newWand;
      this.spawnedWand.size = 0;
      this.wand.spawnX = this.canvas.width - 100;
      this.wand.spawnY = this.canvas.width - 80 - this.wand.size / 2;
      this.pickedWand = true;
    } else {
      this.cavePlayer1.gotWand = false;
    }
  }

  exitCave() {
    if (
      this.cavePlayer1.x + this.cavePlayer1.width <=
        this.caveDoor.x + this.caveDoor.width &&
      this.cavePlayer1.controller.up == true &&
      this.cavePlayer1.y >= this.caveDoor.y
    ) {
      setTimeout(() => {
        $("#message").text("YOU'VE SLAIN THE BEAST");
        this.quit = true;
      }, 1000);
    }
  }
}
