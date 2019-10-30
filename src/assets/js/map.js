import { Utility, Random } from "../js/utility.js";
import { Tile } from "../js/tile.js";
import { Tree } from "../js/tree.js";
import { Rock } from "../js/rock.js";
import { Flower } from "../js/flower.js";
import { CaveTile } from "../js/caveTile.js";
import { Player } from "../js/player.js";

export class Map {
  constructor(canvas) {
    this.canvas = canvas;
    this.height = this.canvas.height;
    this.width = this.canvas.width;
    this.boardSize = canvas.width / 12;
    this.tileSize = this.boardSize;
    this.tileX = -this.tileSize;
    this.tileY = -this.tileSize;
    this.numRocks = 5;
    this.numTrees = 7;
    this.numFlowers = 6;
    this.numCaves = 4;
    this.tiles = [];
    this.trees = [];
    this.rocks = [];
    this.caves = [];
    this.flowers = [];
    this.playerCombat = false;

    this.random = new Random(
      this.tileSize,
      this.width,
      this.height,
      this.boardSize
    );
    this.player1 = new Player(
      this.canvas,
      this.tileSize,
      0,
      this.random.randomY(),
      "/src/assets/imgs/player1.png",
      this.rocks,
      this.trees,
      "#CBFEFB"
    ); // SpawnY = random
    this.player2 = new Player(
      this.canvas,
      this.tileSize,
      11,
      this.random.randomY(),
      "/src/assets/imgs/player2.png",
      this.rocks,
      this.trees,
      "#F1C6FF"
    );
  }

  // Draw utility?
  drawTile(tileArray, c) {
    tileArray.forEach((tile, i) => {
      tile.draw(c);
      if (
        (tile.x == this.player1.spawnX && tile.y == this.player1.spawnY) ||
        (tile.x == this.player2.spawnX && tile.y == this.player2.spawnY)
      ) {
        tileArray.splice(i, 1);
      }
    });
  }

  draw(c) {
    this.tiles.forEach(tile => {
      tile.draw(c);
    });

    this.drawTile(this.flowers, c);
    this.drawTile(this.caves, c);
    this.drawTile(this.rocks, c);
    this.drawTile(this.trees, c);

    Utility.removeTile(this.flowers, this.rocks, c);
    Utility.removeTile(this.flowers, this.caves, c);
    Utility.removeTile(this.flowers, this.trees, c);

    // Draw / Remove Caves
    Utility.removeTile(this.caves, this.trees, c);
    Utility.removeTile(this.caves, this.rocks, c);
    Utility.removeTile(this.caves, this.flowers, c);

    // Draw / Remove Rocks
    Utility.removeTile(this.rocks, this.trees, c);
    Utility.removeTile(this.rocks, this.caves, c);
    Utility.removeTile(this.rocks, this.flowers, c);

    // Draw / Remove Trees

    Utility.removeTile(this.trees, this.rocks, c);
    Utility.removeTile(this.trees, this.caves, c);
    Utility.removeTile(this.trees, this.flowers, c);
    // Draw Players
    this.player1.draw(c);
    this.player2.draw(c);

    this.drawPlayerMoves(c);
  }

  update() {
    this.playerTurn();
    this.combat();
  }

  playerTurn() {
    if (this.player1.turn() == true && this.player2.turn() == true) {
      this.player1.move();
    } else if (this.player1.turn() == false && this.player2.turn() == true) {
      this.player2.move();
    } else if (this.player1.turn() == false && this.player2.turn() == false) {
      this.player1.move();
    } else if (this.player1.turn() == true && this.player2.turn() == false) {
      this.player2.move();
    }
  }

  drawPlayerMoves(c) {
    if (this.player1.turn() == true && this.player2.turn() == true) {
      this.player1.drawMoves(c);
    } else if (this.player1.turn() == false && this.player2.turn() == true) {
      this.player2.drawMoves(c);
    } else if (this.player1.turn() == false && this.player2.turn() == false) {
      this.player1.drawMoves(c);
    } else if (this.player1.turn() == true && this.player2.turn() == false) {
      this.player2.drawMoves(c);
    }
  }

  genTrees(c) {
    for (let i = 0; i < this.numTrees; i++) {
      this.trees.push(
        new Tree(
          this.random.randomX(),
          this.random.randomY(),
          this.tileSize,
          this.tileSize
        )
      );
    }
  }

  genFlowers(c) {
    for (let i = 0; i < this.numFlowers; i++) {
      this.flowers.push(
        new Flower(
          this.random.randomX(),
          this.random.randomY(),
          this.tileSize,
          this.tileSize,
          "#567d46"
        )
      );
    }
  }

  genRocks(c) {
    for (let i = 0; i < this.numRocks; i++) {
      this.rocks.push(
        new Rock(
          this.random.randomX(),
          this.random.randomY(),
          this.tileSize,
          this.tileSize,
          "#aaa79f"
        )
      );
    }
  }

  genCaves(c) {
    for (let i = 0; i < this.numCaves; i++) {
      this.caves.push(
        new CaveTile(
          this.random.randomX(),
          this.random.randomY(),
          this.tileSize,
          this.tileSize,
          "#372c2c"
        )
      );
    }
  }

  genGrid(c) {
    for (let i = 0; i < this.canvas.width / this.tileSize; i++) {
      this.tileY = -this.tileSize;
      this.tileX += this.tileSize;

      for (let j = 0; j < this.canvas.height / this.tileSize; j++) {
        this.tileY += this.tileSize;
        this.tiles.push(
          new Tile(
            this.tileX,
            this.tileY,
            this.tileSize,
            this.tileSize,
            "#002103"
          )
        );
      }
    }
  }

  combat() {
    if (
      (this.player1.playerX == this.player2.playerX - this.tileSize &&
        this.player1.playerY == this.player2.playerPosY) ||
      (this.player1.playerX == this.player2.playerX + this.tileSize &&
        this.player1.playerY == this.player2.playerY) ||
      (this.player1.playerY == this.player2.playerY - this.tileSize &&
        this.player1.playerX == this.player2.playerX) ||
      (this.player1.playerY == this.player2.playerY + this.tileSize &&
        this.player1.playerX == this.player2.playerX) ||
      (this.player1.playerX == this.player2.playerX &&
        this.player1.playerY == this.player2.playerY)
    ) {
      this.playerCombat = true;
    }
  }
}
