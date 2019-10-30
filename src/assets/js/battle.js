export class Battle {
  constructor() {
    this.player1 = {
      hp: parseInt($("#player-1-health").text()),
      attack: parseInt($("#player-1-attack").text()),
      armor: parseInt($("#player-1-armor").text()),
      spell1: parseInt($(".stat-1-1").text()),
      spell2: parseInt($(".stat-1-2").text()),
      spell3: parseInt($(".stat-1-3").text()),
      spell4: parseInt($(".stat-1-4").text())
    };
    this.player2 = {
      hp: parseInt($("#player-2-health").text()),
      attack: parseInt($("#player-2-attack").text()),
      armor: parseInt($("#player-2-armor").text()),
      spell1: parseInt($(".stat-2-1").text()),
      spell2: parseInt($(".stat-2-2").text()),
      spell3: parseInt($(".stat-2-3").text()),
      spell4: parseInt($(".stat-2-4").text())
    };
    this.player1Defend = false;
    this.player2Defend = false;
    this.player1Turn = true;
    this.player2Turn = false;
    this.deathAudio = new Audio(
      "/src/assets/audio/lost-frontier-by-kevin-macleod.mp3"
    );
    $(".player-2").addClass("disabled");
  }

  player1Attack() {
    if (this.player2Defend == true) {
      this.player2.hp -= this.player1.attack / 2;
      $("#player-2-health").text(this.player2.hp);
    } else {
      this.player2.hp -= this.player1.attack;
      $("#player-2-health").text(this.player2.hp);
    }
  }

  player2Attack() {
    if (this.player1Defend == true) {
      this.player1.hp -= this.player2.attack / 2;
      $("#player-1-health").text(this.player1.hp);
    } else {
      this.player1.hp -= this.player2.attack;
      $("#player-1-health").text(this.player1.hp);
    }
  }

  dead() {
    if (this.player1.hp <= 0) {
      $(".winner-name").text("Farya:");
      $(".loser-name").text("Wolyo...'");

      $(".winner-name")
        .delay(1800)
        .fadeTo(2000, 1);
      $(".winner-quote")
        .delay(2800)
        .fadeTo(2000, 1);
      $(".loser-name")
        .delay(3800)
        .fadeTo(2000, 1);

      $(".reset")
        .delay(5000)
        .fadeTo(1000, 1);
      setTimeout(() => {
        $(".winner").addClass("drop");
      }, 1000);
    }

    if (this.player2.hp <= 0) {
      $(".winner-name").text("Wolyo:");
      $(".loser-name").text("Farya...'");
      $(".winner-name")
        .delay(1800)
        .fadeTo(2000, 1);
      $(".winner-quote")
        .delay(2800)
        .fadeTo(2000, 1);
      $(".loser-name")
        .delay(3800)
        .fadeTo(2000, 1);
      $(".reset")
        .delay(5000)
        .fadeTo(1000, 1);
      setTimeout(() => {
        $(".winner").addClass("drop");
      }, 1000);
    }

    if (this.player1.hp <= 0 || this.player2.hp <= 0) {
      this.deathAudio.play();
    }
  }

  turn1() {
    // Check If Dead
    this.dead();

    // Disable Player 1 Attack / Defend
    $(".attack-1").prop("disabled", true);
    $(".defend-1").prop("disabled", true);

    // Enable Player 2 Attack / Defend
    $(".attack-2").prop("disabled", false);
    $(".defend-2").prop("disabled", false);

    // Add Disabled Styling To Players
    $(".player-1").addClass("disabled");
    $(".player-2").removeClass("disabled");
  }

  turn2() {
    // Check If Dead
    this.dead();

    // Disable Player 2 Attack / Defend
    $(".attack-2").prop("disabled", true);
    $(".defend-2").prop("disabled", true);

    // Enable Player 1  Attack / Defend
    $(".attack-1").prop("disabled", false);
    $(".defend-1").prop("disabled", false);

    // Add Disabled Styling To Players
    $(".player-2").addClass("disabled");
    $(".player-1").removeClass("disabled");
  }

  player1Spell1() {
    this.player2.hp -= this.player1.spell1 - this.player2.armor;
    if (this.player2Defend == true) {
      this.player2.hp -= this.player1.spell1 / 2 - this.player2.armor / 2;
    }
    $("#player-2-health").text(this.player2.hp);
  }

  player1Spell2() {
    this.player2.hp -= this.player1.spell2 - this.player2.armor;
    if (this.player2Defend == true) {
      this.player2.hp -= this.player1.spell2 / 2 - this.player2.armor / 2;
    }
    $("#player-2-health").text(this.player2.hp);
  }

  player1Spell3() {
    this.player1.armor += this.player1.spell3;
    $("#player-1-armor").text(this.player1.armor);
  }

  player1Spell4() {
    this.player1.hp += this.player1.spell4;
    $("#player-1-health").text(this.player1.hp);

    this.player2.hp -= this.player1.spell4;
    $("#player-2-health").text(this.player2.hp);
  }

  player2Spell1() {
    this.player1.hp -= this.player2.spell1 - this.player1.armor;
    if (this.player1Defend == true) {
      this.player1.hp -= this.player2.spell1 / 2 - this.player1.armor / 2;
    }
    $("#player-1-health").text(this.player1.hp);
  }

  player2Spell2() {
    this.player1.hp -= this.player2.spell2 - this.player1.armor;
    if (this.player1Defend == true) {
      this.player1.hp -= this.player2.spell2 / 2 - this.player1.armor / 2;
    }
    $("#player-1-health").text(this.player1.hp);
  }

  player2Spell3() {
    this.player2.armor += this.player2.spell3;
    $("#player-2-armor").text(this.player2.armor);
  }

  player2Spell4() {
    this.player2.hp += this.player2.spell4;
    $("#player-2-health").text(this.player2.hp);

    this.player1.hp -= this.player2.spell4;
    $("#player-1-health").text(this.player1.hp);
  }
}
