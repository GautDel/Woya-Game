import "../css/main.scss";
import { Game } from "../js/game.js";
import { Battle } from "../js/battle.js";

const pathToImgs = require.context("../imgs/", true);
// true here is for use subdirectories, you can also specify regex as third param

const imgs = [
  "cave-door.png",
  "cave-enemy.png",
  "cave-ground-overlay.png",
  "cave-ground.png",
  "cave-over.png",
  "cave-player-1.png",
  "cave-player-2.png",
  "imgs/cave-player-bullet.png",
  "imgs/cave-rock.png",
  "imgs/cave.png",
  "imgs/common-1.png",
  "imgs/common-2.png",
  "imgs/common-3.png",
  "imgs/common-4.png",
  "imgs/ice-1.png",
  "imgs/ice-2.png",
  "imgs/ice-3.png",
  "imgs/ice-4.png",
  "imgs/fire-1.png",
  "imgs/fire-2.png",
  "imgs/fire-3.png",
  "imgs/fire-4.png",
  "imgs/vudu-1.png",
  "imgs/vudu-2.png",
  "imgs/vudu-3.png",
  "imgs/vudu-4.png",
  "imgs/terra-1.png",
  "imgs/terra-2.png",
  "imgs/terra-3.png",
  "imgs/terra-4.png",
  "imgs/dark-1.png",
  "imgs/dark-2.png",
  "imgs/dark-3.png",
  "imgs/dark-4.png",
  "imgs/fire-crystal.png",
  "imgs/dark-orb.png",
  "imgs/deep-background.png",
  "imgs/enemy-bullet.png",
  "imgs/favorite-heart-button.svg",
  "imgs/fire-wand.png",
  "imgs/flowers.png",
  "imgs/health-bg.png",
  "imgs/health-overlay.png",
  "imgs/helmet.svg",
  "imgs/ice-wand.png",
  "imgs/player-1-portrait.png",
  "imgs/player-2-portrait.png",
  "imgs/player1.png",
  "imgs/player2.png",
  "imgs/rock.png",
  "imgs/shield.svg",
  "imgs/swords.svg",
  "imgs/terra-stone.png",
  "imgs/vudu-eye.png"
];

const getImgs = () =>
  imgs.map(name => `<img src='${pathToImgs(name, true)}' alt='${name}' />`);

const pathToAudio = require.context("../audio/", true);

const audio = [
  "lost-frontier-by-kevin-macleod.mp3",
  "showdown-by-kevin-macleod.mp3",
  "darkling-by-kevin-macleod.mp3",
  "oppressive-gloom-by-kevin-macleod.mp3"
];
const getAudio = () =>
  audio.map(name => `<audio src='${pathToAudio(name, true)}' alt='${name}' />`);

const canvas = document.querySelector("#canvas");
const caveCanvas = document.querySelector("#cave");

let battle;
let initiated = false;
let game = new Game(canvas, caveCanvas);

game.init();

let check = setInterval(() => {
  if (game.battleInit == true) {
    battle = new Battle();
    initiated = true;
  }
}, 1);

setInterval(() => {
  if (initiated == true) {
    clearInterval(check);
    if (battle.player1.hp <= 0 || battle.player2.hp <= 0) {
      setTimeout(() => {
        $(game.combatAudio).animate({ volume: 0 }, 2000);
      }, 1000);
    }
  }
}, 1);

// Event Listeners
$(".attack-1").click(() => {
  battle.player1Attack();
  battle.player1Defend = false;
  battle.turn1();
});

$(".attack-2").click(() => {
  battle.player2Attack();
  battle.player2Defend = false;
  battle.turn2();
});

$(".defend-1").click(() => {
  battle.player1Defend = true;
  battle.turn1();
});

$(".defend-2").click(() => {
  battle.player2Defend = true;
  battle.turn2();
});

$(".player-1-spell-1").click(() => {
  $(".player-1-spell-1").addClass("disabled");
  battle.player1Spell1();
  battle.turn1();
});

$(".player-1-spell-2").click(() => {
  $(".player-1-spell-2").addClass("disabled");
  battle.player1Spell2();
  battle.turn1();
});

$(".player-1-spell-3").click(() => {
  $(".player-1-spell-3").addClass("disabled");
  battle.player1Spell3();
  battle.turn1();
});

$(".player-1-spell-4").click(() => {
  $(".player-1-spell-4").addClass("disabled");
  battle.player1Spell4();
  battle.turn1();
});

$(".player-2-spell-1").click(() => {
  $(".player-2-spell-1").addClass("disabled");
  battle.player2Spell1();
  battle.turn2();
});

$(".player-2-spell-2").click(() => {
  $(".player-2-spell-2").addClass("disabled");
  battle.player2Spell2();
  battle.turn2();
});

$(".player-2-spell-3").click(() => {
  $(".player-2-spell-3").addClass("disabled");
  battle.player2Spell3();
  battle.turn2();
});

$(".player-2-spell-4").click(() => {
  $(".player-2-spell-4").addClass("disabled");
  battle.player2Spell4();
  battle.turn2();
});

$("#reset").click(() => {
  document.location.reload(true);
});

$(".start").click(() => {
  $(".menu").addClass("slide-up");
});

// Main Audio
setTimeout(() => {
  game.mainAudio.addEventListener("ended", function() {
    game.mainAudio.play();
  });
}, 192000);

setTimeout(() => {
  game.caveAudio.addEventListener("ended", function() {
    game.caveAudio.play();
  });
}, 150000);

setTimeout(() => {
  game.combatAudio.addEventListener("ended", function() {
    game.combatAudio.play();
  });
}, 67800);
