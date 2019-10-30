export class Utility {
  static removeTile(primaryArray, secondArray, c) {
    // console.log(primaryArray, secondArray);

    secondArray.forEach((tile, i) => {
      if (tile.x == primaryArray.x && tile.y == primaryArray.y) {
        primaryArray.splice(i, 1);
      }
    });
  }
}

export class Random {
  constructor(tileSize, width, height, boardSize) {
    this.tileSize = tileSize;
    this.height = height;
    this.width = width;
    this.boardSize = boardSize;
  }

  randomX() {
    let randX =
      this.tileSize * Math.floor(Math.random() * (this.width / this.boardSize));
    return randX;
  }

  randomY() {
    let randY =
      this.tileSize *
      Math.floor(Math.random() * (this.height / this.boardSize));
    return randY;
  }
}

export class RandomRock {
  constructor(canvas, height) {
    this.canvas = canvas;
    this.minWidth = 50;
    this.maxWidth = 100;
    this.height = height;
  }

  randomX() {
    let randX = Math.random() * this.canvas.width;
    return randX;
  }

  randomY() {
    let randY = Math.random() * this.canvas.height;
    return randY;
  }

  randomWidth() {
    let randWidth =
      Math.random() * (this.maxWidth - this.minWidth) + this.minWidth;
    return randWidth;
  }
}
