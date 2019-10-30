import { Map } from "../js/map.js";
import { Cave } from "../js/cave.js";

export class Game {
  constructor(canvas, caveCanvas) {
    this.canvas = canvas;
    this.caveCanvas = caveCanvas;
    this.caveC = caveCanvas.getContext("2d");
    this.c = canvas.getContext("2d");
    this.map = new Map(this.canvas);
    this.caves = [];
    this.playerImage;
    this.ticker = 0;
    this.imgTicker = 0;
    this.caveInitiated = false;
    this.delCave = false;
    this.battleInit = false;
    this.mainAudio = new Audio(
      "/src/assets/audio/oppressive-gloom-by-kevin-macleod.mp3"
    );
    this.caveAudio = new Audio(
      "/src/assets/audio/darkling-by-kevin-macleod.mp3"
    );

    this.combatAudio = new Audio(
      "/src/assets/audio/showdown-by-kevin-macleod.mp3"
    );
    this.player1Entered = false;
    this.player2Entered = false;

    // Loops
    let lastTime;
    const callback = timeStamp => {
      let dt = timeStamp - lastTime;
      lastTime = timeStamp;
      if (lastTime) {
        this.update(dt);
      }
      requestAnimationFrame(callback);
    };
    callback();
  }

  update(dt) {
    // Update Map
    this.map.update();

    // Draw Game
    this.draw();

    // Update Cave
    this.genCave();

    this.updateCave(dt);
    this.exitCave(this.c);

    this.playerCombat();

    if (this.ticker == 0) {
      if (this.ticker == 0 && this.battleInit == false) {
        this.mainAudio.play();
        this.mainAudio.volume = 0;
        $(this.mainAudio).animate({ volume: 1 }, 2000);
        $(this.mainAudio).finish();
      } else if (this.battleInit == true) {
        $(this.mainAudio).animate({ volume: 0 }, 2000);
        setTimeout(() => {
          this.mainAudio.pause();
        }, 3000);
      }

      this.caveAudio.pause();
    }
  }

  draw() {
    // Draw Map
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.map.draw(this.c);

    // Draw Cave
    this.caveC.clearRect(0, 0, this.caveCanvas.width, this.caveCanvas.height);

    this.drawCave(this.caveC);
  }

  init() {
    // Generate Map
    this.map.genTrees(this.c);
    this.map.genRocks(this.c);
    this.map.genGrid(this.c);

    this.map.genCaves(this.c);
    this.map.genFlowers(this.c);

    // Game Update
    this.update();
  }

  genCave() {
    this.genCavePlayer();
    // Loop over map tiles, check if player has stepped on a tile,
    // remove that tile and create a new Cave object
    this.map.caves.forEach((mapCave, i) => {
      // Checking if player has walked on tile.
      if (
        (this.map.player1.playerX >= mapCave.x &&
          this.map.player1.playerX + this.map.player1.tileSize <=
            mapCave.x + mapCave.tileWidth &&
          this.map.player1.playerY == mapCave.y) ||
        (this.map.player2.playerX >= mapCave.x &&
          this.map.player2.playerX + this.map.player2.tileSize <=
            mapCave.x + mapCave.tileWidth &&
          this.map.player2.playerY == mapCave.y)
      ) {
        // Setting canvas container visibility

        // Adding one to ticker
        this.ticker++;

        // Setting which cave to be deleted by finding its index in the array
        this.delCave = i;

        // Creating if statement so code only runs once within game loop.
        if (this.ticker == 1) {
          setTimeout(() => {
            this.mainAudio.pause();
          }, 1000);
          this.caveAudio.play();
          this.caveAudio.volume = 0;
          $(this.caveAudio).animate({ volume: 1 }, 2000);

          // Creating Audio Element

          // splicing selected element from array
          this.map.caves.splice(this.delCave, 1);

          // Creating the Cave object
          this.caves.push(
            new Cave(
              this.map.player1,
              this.map.player2,
              this.caveCanvas,
              this.playerImage
            )
          );

          // Looping through our array and initiating the cave
          this.caves.forEach(cave => {
            cave.init();

            // Setting this variable to true, to trigger draw function,
            // so that cave is only drawn when object is instantiated
            this.caveInitiated = true;
          });
        }
      }
    });
  }

  genCavePlayer() {
    this.map.caves.forEach(mapCave => {
      if (
        this.map.player1.playerX >= mapCave.x &&
        this.map.player1.playerX + this.map.player1.tileSize <=
          mapCave.x + mapCave.tileWidth &&
        this.map.player1.playerY == mapCave.y
      ) {
        this.playerImage = "/src/assets/imgs/cave-player-1.png";
        this.player1Entered = true;
        console.log(this.player2Entered);
      }

      if (
        this.map.player2.playerX >= mapCave.x &&
        this.map.player2.playerX + this.map.player2.tileSize <=
          mapCave.x + mapCave.tileWidth &&
        this.map.player2.playerY == mapCave.y
      ) {
        this.playerImage = "/src/assets/imgs/cave-player-2.png";
        this.player2Entered = true;
        console.log(this.player2Entered);
      }
    });
  }

  drawCave(c) {
    // When cave is instantiated, draw.
    if (this.caveInitiated == true) {
      this.caves.forEach(cave => {
        cave.draw(c);
      });
    }
  }

  updateCave() {
    // When cave is instantiated, update
    if (this.caveInitiated == true) {
      this.caves.forEach(cave => {
        cave.update();
      });
    }
  }

  exitCave(c) {
    // Removing cave object so player can instantiate another cave.
    // Resetting all variables.
    this.caves.forEach(cave => {
      if (cave.quit == true) {
        // Setting animations
        $(".container")
          .delay(4000)
          .fadeTo(2000, 1);
        $(".death").fadeTo(1000, 1);
        $(".cave-container")
          .delay(3000)
          .fadeTo(2000, 0);
        $(".death")
          .delay(3000)
          .fadeTo(2000, 0);
        this.caves.splice(cave, 1);
        this.ticker = 0;
        this.caveInitiated = false;
        this.delCave = false;
      }
    });
    this.setPlayer();
  }

  setPlayer() {
    if (this.map.player1.turn() == true && this.map.player2.turn() == true) {
      this.getPlayer2Stats();
    } else if (
      this.map.player1.turn() == false &&
      this.map.player2.turn() == true
    ) {
      this.getPlayer1Stats();
    } else if (
      this.map.player1.turn() == false &&
      this.map.player2.turn() == false
    ) {
      this.getPlayer2Stats();
    } else if (
      this.map.player1.turn() == true &&
      this.map.player2.turn() == false
    ) {
      this.getPlayer1Stats();
    }
  }

  getPlayer1Stats() {
    this.caves.forEach(cave => {
      if (cave.cavePlayer1.gotWand == true) {
        this.imgTicker = 0;
        $(".player-spell-1").remove();
        $(".init-spell-1").remove();
      }

      this.imgTicker++;
      // Remove initial values

      $("#player-1-attack").text(cave.cavePlayer1.wand.attack);
      $("#player-1-wand").text(cave.cavePlayer1.wand.name);
      $("#player-1-health").text(cave.cavePlayer1.wand.health);
      $("#player-1-armor").text(cave.cavePlayer1.wand.defense);
      if (this.imgTicker == 1) {
        console.log(this.player2Entered);
        console.log("yoyoyo");

        if (this.player1Entered == true) {
          this.setWand1();
        }
      }
    });
  }

  getPlayer2Stats() {
    this.caves.forEach(cave => {
      if (cave.cavePlayer1.gotWand == true) {
        this.imgTicker = 0;
        $(".player-spell-2").remove();
        $(".init-spell-2").remove();
      }

      this.imgTicker++;
      // Remove initial values

      $("#player-2-attack").text(cave.cavePlayer1.wand.attack);
      $("#player-2-wand").text(cave.cavePlayer1.wand.name);
      $("#player-2-health").text(cave.cavePlayer1.wand.health);
      $("#player-2-armor").text(cave.cavePlayer1.wand.defense);
      if (this.imgTicker == 1) {
        if (this.player2Entered == true) {
          this.setWand2();
        }
      }
    });
  }

  playerCombat() {
    if (this.map.playerCombat == true) {
      this.combatAudio.play();
      this.playerCombatAnim();
      this.battleInit = true;
    }
  }

  playerCombatAnim() {
    $(".player-fight").addClass("fight");
    $(".container")
      .delay(1500)
      .animate({ top: "1000" });
    $(".player-1")
      .delay(1500)
      .animate({ left: "530px" });
    $(".player-2")
      .delay(1500)
      .animate({ right: "530px" });

    $(".player-1").addClass("rotate-right");
    $(".player-2").addClass("rotate-left");

    $(".player-1")
      .delay(1500)
      .animate({ top: "-170px" }, "fast");
    $(".player-2")
      .delay(1500)
      .animate({ bottom: "-170px" }, "fast");
    // ------------------------ Good to this point
    $(".player-info-1").addClass("scale-left");
    $(".player-info-2").addClass("scale-right");

    $(".player-secondary-1").addClass("secondary-1");
    $(".player-secondary-2").addClass("secondary-2");

    $(".actions-1").show();
    $(".actions-2").show();
    $(".actions-1")
      .delay(4500)
      .animate({ opacity: "1" });
    $(".actions-2")
      .delay(4500)
      .animate({ opacity: "1" });
  }

  setWand1() {
    this.caves.forEach(cave => {
      if (cave.cavePlayer1.gotWand == true) {
        $(".player-1-spell-1").prepend(
          `<img src='${
            cave.cavePlayer1.wand.spells.first.img
          }' class='player-spell-1'/>`
        );
        $(".player-1-spell-2").prepend(
          `<img src='${
            cave.cavePlayer1.wand.spells.second.img
          }' class='player-spell-1'/>`
        );
        $(".player-1-spell-3").prepend(
          `<img src='${
            cave.cavePlayer1.wand.spells.third.img
          }' class='player-spell-1'/>`
        );
        $(".player-1-spell-4").prepend(
          `<img src='${
            cave.cavePlayer1.wand.spells.fourth.img
          }' class='player-spell-1'/>`
        );

        // Player 1 Tooltips
        $(".name-1-1").text(cave.cavePlayer1.wand.spells.first.name);
        $(".name-1-2").text(cave.cavePlayer1.wand.spells.second.name);
        $(".name-1-3").text(cave.cavePlayer1.wand.spells.third.name);
        $(".name-1-4").text(cave.cavePlayer1.wand.spells.fourth.name);
        $(".tooltip-1-1").text(cave.cavePlayer1.wand.spells.first.desc);
        $(".tooltip-1-2").text(cave.cavePlayer1.wand.spells.second.desc);
        $(".tooltip-1-3").text(cave.cavePlayer1.wand.spells.third.desc);
        $(".tooltip-1-4").text(cave.cavePlayer1.wand.spells.fourth.desc);

        // Player 1 Wand Stats
        $(".stat-1-1").text(cave.cavePlayer1.wand.spells.first.dmg);
        $(".stat-1-2").text(cave.cavePlayer1.wand.spells.second.dmg);
        $(".stat-1-3").text(cave.cavePlayer1.wand.spells.third.dmg);
        $(".stat-1-4").text(cave.cavePlayer1.wand.spells.fourth.dmg);
      }
    });
  }

  setWand2() {
    console.log("fired");

    this.caves.forEach(cave => {
      if (cave.cavePlayer1.gotWand == true) {
        $(".player-2-spell-1").prepend(
          `<img src='${
            cave.cavePlayer1.wand.spells.first.img
          }' class='player-spell-2'/>`
        );
        $(".player-2-spell-2").prepend(
          `<img src='${
            cave.cavePlayer1.wand.spells.second.img
          }' class='player-spell-2'/>`
        );
        $(".player-2-spell-3").prepend(
          `<img src='${
            cave.cavePlayer1.wand.spells.third.img
          }' class='player-spell-2'/>`
        );
        $(".player-2-spell-4").prepend(
          `<img src='${
            cave.cavePlayer1.wand.spells.fourth.img
          }' class='player-spell-2'/>`
        );

        // Player 2 Tooltips
        $(".name-2-1").text(cave.cavePlayer1.wand.spells.first.name);
        $(".name-2-2").text(cave.cavePlayer1.wand.spells.second.name);
        $(".name-2-3").text(cave.cavePlayer1.wand.spells.third.name);
        $(".name-2-4").text(cave.cavePlayer1.wand.spells.fourth.name);
        $(".tooltip-2-1").text(cave.cavePlayer1.wand.spells.first.desc);
        $(".tooltip-2-2").text(cave.cavePlayer1.wand.spells.second.desc);
        $(".tooltip-2-3").text(cave.cavePlayer1.wand.spells.third.desc);
        $(".tooltip-2-4").text(cave.cavePlayer1.wand.spells.fourth.desc);

        // Player 2 Wand Stats
        $(".stat-2-1").text(cave.cavePlayer1.wand.spells.first.dmg);
        $(".stat-2-2").text(cave.cavePlayer1.wand.spells.second.dmg);
        $(".stat-2-3").text(cave.cavePlayer1.wand.spells.third.dmg);
        $(".stat-2-4").text(cave.cavePlayer1.wand.spells.fourth.dmg);
      }
    });
  }
}
