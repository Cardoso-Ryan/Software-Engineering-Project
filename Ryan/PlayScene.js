class PlayScene extends Phaser.Scene {
    constructor() {
      super("playGame");
    }
  
    create() {
      this.createBackground();
      this.createCursor();
      this.createLives();
      this.createBamboo();
      this.addGameText();
    }
  
    update() {
      this.updateBamboo();
    }
  
    createBackground() {
      this.background = this.add.image(0, 0, "background").setOrigin(0, 0).setScale(1.6);
    }
  
    createCursor() {
      this.input.setDefaultCursor('url(assets/images/katanaMin.png), pointer');
    }
  
    createLives() {
      this.livesImages = {
        x: this.add.image(880, 35, "x").setScale(1.2),
        xx: this.add.image(920, 30, "xx").setScale(1.4),
        xxx: this.add.image(970, 25, "xxx").setScale(1.6)
      };
    }
  
    createBamboo() {
      this.bamboo = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "bamboo");
      this.bamboo.setInteractive();
      this.bamboo.on('pointerdown', this.destroyBamboo, this);
      // Add pointerover event to cut the bamboo when mouse hovers over it
      this.bamboo.on('pointerover', () => {
        this.bamboo.setTexture("bambooCut");
      });
    }
  
    addGameText() {
      this.add.text(20, 20, "Playing game", { font: "25px Kanit", fill: "lime" });
    }
  
    updateBamboo() {
      this.bamboo.angle += 2.5;
      this.moveBamboo(this.bamboo, 5);
    }
  
    moveBamboo(bamboo, speed) {
      bamboo.y += speed;
      if (bamboo.y > this.sys.game.config.height) {
        this.resetBambooPos(bamboo);
      }
    }
  
    resetBambooPos(bamboo) {
      bamboo.y = 0;
      bamboo.x = Phaser.Math.Between(0, this.sys.game.config.width);
      bamboo.setTexture("bamboo");
    }
  
    destroyBamboo(pointer, gameObject) {
      gameObject.setTexture("bambooCut");
      gameObject.disableInteractive();
      this.playSmokeAnimation(gameObject);
    }
  
    playSmokeAnimation(gameObject) {
      this.anims.create({
        key: "smoke",
        frames: this.anims.generateFrameNumbers("smoke"),
        frameRate: 20,
        repeat: 0,
        hideOnComplete: true
      });
  
      gameObject.play("smoke");
      gameObject.on('animationcomplete', () => {
        gameObject.destroy();
      });
    }
  }
  