import Phaser from 'phaser';

export default () => {
  var config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: 400,
    height: 700,
    parent: "phaser-game",
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 0
        },
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var player;
  var gohms;
  var pohms;
  var oohms
  var score = 0;
  var scoreText;
  var timedEvent;
  var timeText;
  var gameOver = false;

  new Phaser.Game(config);

  function preload() {
    this.load.image('stage', 'assets/Stage.png');
    this.load.image('gohm', 'assets/DotGreen.png');
    this.load.image('pohm', 'assets/DotPurple.png');
    this.load.image('oohm', 'assets/DotOrange.png');
    this.load.spritesheet('player', 'assets/Player.png', {
      frameWidth: 150,
      frameHeight: 150
    });
  }

  function create() {

    // add background image
    this.add.image(200, 350, 'stage');

    // add timer text to canvas
    timeText = this.add.text(300, 0, '', {
      fontSize: '16px',
      fill: '#000'
    });

    // create timer - set time in ms
    timedEvent = this.time.delayedCall(5000, onEvent, [], this);

    // create player
    player = this.physics.add.sprite(75, 625, 'player').setInteractive();

    // define player movements
    this.input.on('pointermove', function (pointer) {
      player.x = pointer.x;
      player.y = pointer.y
    });

    //  Create 5 GREEN ohms
    gohms = this.physics.add.group({
      key: 'gohm',
      frameQuantity: 5,
      // this scale does not work
      scale: {
        randFloat: [0.5, 1.5]
      }
    });

    //  Create 5 PURPLE ohms
    pohms = this.physics.add.group({
      key: 'pohm',
      frameQuantity: 5,
      // this scale does not work
      scale: {
        randFloat: [0.5, 1.5]
      }
    });

    //  Create 5 ORANGE ohms
    oohms = this.physics.add.group({
      key: 'oohm',
      frameQuantity: 5,
      // this scale does not work
      scale: {
        randFloat: [0.5, 1.5]
      }
    });

    var rect = new Phaser.Geom.Rectangle(0, 0, 400, 700);

    //  Randomly position the ohms within the rectangle
    Phaser.Actions.RandomRectangle(gohms.getChildren(), rect);
    Phaser.Actions.RandomRectangle(pohms.getChildren(), rect);
    Phaser.Actions.RandomRectangle(oohms.getChildren(), rect);

    // add score text
    scoreText = this.add.text(0, 0, 'score: 0', {
      fontSize: '16px',
      fill: '#000'
    });

    // set up overlap to trigger the scoring
    this.physics.add.overlap(player, gohms, collectGohms, null, this);
    this.physics.add.overlap(player, pohms, collectPohms, null, this);
    this.physics.add.overlap(player, oohms, collectOohms, null, this);

    // collect GREEN ohms
    function collectGohms(player, gohms) {

      gohms.disableBody(true, true);

      score += 10;
      scoreText.setText('Score: ' + score);

      // if (ohms.countActive(true) === 0) {
      //   return Phaser.Actions.RandomRectangle(ohms.getChildren(), rect);
      // }
    }
    // collect PURPLE ohms
    function collectPohms(player, pohms) {

      pohms.disableBody(true, true);

      score += 10;
      scoreText.setText('Score: ' + score);

      // if (ohms.countActive(true) === 0) {
      //   return Phaser.Actions.RandomRectangle(ohms.getChildren(), rect);
      // }
    }

    // collect ORANGE ohms
    function collectOohms(player, oohms) {

      oohms.disableBody(true, true);

      score += 10;
      scoreText.setText('Score: ' + score);

      // if (ohms.countActive(true) === 0) {
      //   return Phaser.Actions.RandomRectangle(ohms.getChildren(), rect);
      // }
    }
  }

  function update() {

    // displays the current timer in seconds
    timeText.setText('Time: ' + timedEvent.getElapsedSeconds().toString().substr(0, 3));

  }


  function onEvent() {

    // pauses the game when timer runs out
    this.physics.pause();

    // set gameOver to false, even though this does nothing yet
    gameOver = true

    // pop up text when timer runs out
    let gameOverText = this.add.text(30, 270, 'GOOD JOB!', {
      fontSize: '64px',
      fill: '#000'
    });
  }

}