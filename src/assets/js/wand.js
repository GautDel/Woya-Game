// Power of wand destroyed when entering new cave containing wand. Magical forcefield

export class Wand {
  constructor(spawnX, spawnY) {
    this.spawnX = spawnX;
    this.spawnY = spawnY;
    this.name = "Common Crystal";
    this.wandImg = "/src/assets/imgs/common-crystal.png";
    this.speed = 20;
    this.attack = 10;
    this.lifeSteal = 0;
    this.size = 20;
    this.slow = 0;
    this.burn = 0;
    this.curse = 0;
    this.defense = 5;
    this.health = 500;
    this.img = new Image();
    this.spells = {
      first: {
        name: "Swift Attack",
        img: "/src/assets/imgs/common-1.png",
        desc:
          "Channel your inner speed and deal 50 DMG to your opponent in a swift blow",
        dmg: 50
      },
      second: {
        name: "Fury",
        img: "/src/assets/imgs/common-2.png",
        desc: "Become enraged and deal 100 DMG in a furious assault",
        dmg: 100
      },
      third: {
        name: "Damacia",
        img: "/src/assets/imgs/common-3.png",
        desc: "Channel Garen's wrath, god of Runeterra, gaining 10 armor",
        dmg: 10
      },
      fourth: {
        name: "Ambush",
        img: "/src/assets/imgs/common-4.png",
        desc: "Strike your enemy from the shadows stealing 100 HP",
        dmg: 100
      }
    };
  }

  randWand() {
    this.randNum = Math.floor(Math.random() * 5 + 1);
    switch (this.randNum) {
      // Ice
      // Slows enemy
      case 1: {
        this.name = "Firn Shard";
        this.wandImg = "/src/assets/imgs/ice-wand.png";
        this.attack = 15;
        this.size = 20;
        this.defense = 10;
        this.spells = {
          first: {
            name: "Frost Breath",
            img: "/src/assets/imgs/ice-1.png",
            desc:
              "Channel the ice coarsing through your veins and exhale a freezing breath, dealing 75 DMG",
            dmg: 75
          },
          second: {
            name: "Avalanche",
            img: "/src/assets/imgs/ice-2.png",
            desc: "Summon an avalanche upon your enemy, dealing 150 DMG",
            dmg: 150
          },
          third: {
            name: "Ice Armor",
            img: "/src/assets/imgs/ice-3.png",
            desc:
              "The air around you freezes into rock hard ice crystals, granting you 20 ARMOR",
            dmg: 20
          },
          fourth: {
            name: "Frost Eater",
            img: "/src/assets/imgs/ice-4.png",
            desc: "strike your opponent with frostbite, stealing 75 HP",
            dmg: 75
          }
        };
        break;
      }

      // Fire
      // Applies burn... 1 dps
      case 2: {
        this.name = "Pyros Ember";
        this.wandImg = "/src/assets/imgs/fire-wand.png";
        this.speed = 20;
        this.size = 20;
        this.attack = 30;
        this.spells = {
          first: {
            name: "Magma Storm",
            img: "/src/assets/imgs/fire-1.png",
            desc:
              "Staring deep within the Pyros Orb, you summon a blazing whirlwind of magma, dealing 120 DMG",
            dmg: 120
          },
          second: {
            name: "Solar Flare",
            img: "/src/assets/imgs/fire-2.png",
            desc:
              "Tap into the arcane power of the Sun, dealing 175 DMG to your enemy",
            dmg: 175
          },
          third: {
            name: "Lava Plumage",
            img: "/src/assets/imgs/fire-3.png",
            desc:
              "Blinding plumes of flame begin to envelope you, burning anything that comes near. Gain 25 ARMOR",
            dmg: 25
          },
          fourth: {
            name: "Fire Tendrils",
            img: "/src/assets/imgs/fire-4.png",
            desc:
              "Summon deadly fire tendrils that suck the life out of your enemy, allowing you to recover 50 HP",
            dmg: 50
          }
        };
        break;
      }

      // Voodoo
      // Steal life
      case 3: {
        this.name = "Vudos Eye";
        this.wandImg = "/src/assets/imgs/vudu-eye.png";
        this.size = 30;
        this.attack = 20;
        this.health = 750;
        this.spells = {
          first: {
            name: "Death Curse",
            img: "/src/assets/imgs/vudu-1.png",
            desc:
              "If your enemy is below 100 HP, cast the curse of the dead, executing him",
            dmg: 100
          },
          second: {
            name: "Soul Eater",
            img: "/src/assets/imgs/vudu-2.png",
            desc:
              "Feast upon the tormented soul of your opponent, dealing 120 DMG",
            dmg: 120
          },
          third: {
            name: "Armor of Loa",
            img: "/src/assets/imgs/vudu-3.png",
            desc:
              "The Loa or spirits, come to your aid, surrounding you and granting you 40 ARMOR.",
            dmg: 40
          },
          fourth: {
            name: "Juju",
            img: "/src/assets/imgs/vudu-4.png",
            desc: "The mystical power of Juju...",
            dmg: 300
          }
        };
        break;
      }

      // Earth
      case 4: {
        this.name = "Terra Stone";
        this.wandImg = "/src/assets/imgs/terra-stone.png";
        this.size = 25;
        this.attack = 20;
        this.health = 1000;
        this.spells = {
          first: {
            name: "Quake",
            img: "/src/assets/imgs/terra-1.png",
            desc:
              "Stomp the ground with your mighty feet, causing an earthquake to deal 50 DMG to your enemy",
            dmg: 50
          },
          second: {
            name: "Fissure",
            img: "/src/assets/imgs/terra-2.png",
            desc:
              "Split the earth between your opponents feet in two, swallowing them whole and dealing 100 DMG",
            dmg: 100
          },
          third: {
            name: "Stone Shield",
            img: "/src/assets/imgs/terra-3.png",
            desc:
              "The earth around you begins to tremble as stones assemble to create a powerful shield, giving you 30 ARMOR",
            dmg: 30
          },
          fourth: {
            name: "Overgrowth",
            img: "/src/assets/imgs/terra-4.png",
            desc: "Cause roots to take hold of your enemy, draining 250 HP",
            dmg: 250
          }
        };
        break;
      }

      // Darkness
      case 5: {
        this.name = "Disaris Orb";
        this.wandImg = "/src/assets/imgs/dark-orb.png";
        this.size = 20;
        this.attack = 50;
        this.health = 300;
        this.defense = 0;
        this.spells = {
          first: {
            name: "Dream Eater",
            img: "/src/assets/imgs/dark-1.png",
            desc:
              "Put your enemy into a deep sleep, feeding on their nightmares and dealing 150 DMG",
            dmg: 150
          },
          second: {
            name: "Soul Rip",
            img: "/src/assets/imgs/dark-2.png",
            desc: "Tear a fragment of your enemy's soul, dealing 250 DMG",
            dmg: 250
          },
          third: {
            name: "Ombre Vest",
            img: "/src/assets/imgs/dark-3.png",
            desc:
              "Channel the Shadow Realm, creating a vest of shadow energy and ganing 15 ARMOR",
            dmg: 15
          },
          fourth: {
            name: "Shadow Man",
            img: "/src/assets/imgs/dark-4.png",
            desc:
              "Enter the shadow realm, feasting on your opponent's shadow, recovering 50 HP",
            dmg: 50
          }
        };
        break;
      }
    }

    return this.randNum;
  }

  draw(c) {
    c.drawImage(this.img, this.spawnX, this.spawnY, this.size, this.size);
    this.img.src = this.wandImg;
  }
}
