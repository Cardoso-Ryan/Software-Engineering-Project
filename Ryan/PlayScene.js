class PlayScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.level = 1;
    this.score = 0;
    this.createBackground();
    this.createCursor();
    this.createBamboo();
    this.createNameInput();
    this.createScoreboard();
    this.displayLevel();

    const fx = this.bamboo.postFX.addGlow(0xffffff, 2, 0, false, 0.1, 32);
  }

  update() {
    this.updateBamboo();
  }

  createBackground() {
    this.background = this.add.image(0, 0, "background").setOrigin(0, 0).setScale(1.8);
  }

  createCursor() {
    this.input.setDefaultCursor("url(assets/images/katana.png), pointer");
  }

  createBamboo() {
    this.bamboo = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2,"bamboo");
    this.bamboo.setInteractive();
    this.bamboo.isCut = false; 
    this.bamboo.on("pointerdown", this.destroyBamboo, this);
    // Add pointerover event to cut the bamboo when mouse hovers over it
    this.bamboo.on("pointerover", () => {
        if (!this.bamboo.isCut) { // Check if the bamboo has been cut
            this.bamboo.setTexture("bambooCut");
            this.bamboo.isCut = true; // Set the bamboo as cut
            this.updateScore();
          }
    });
  }

  createNameInput() {
    const style = { font: '32px Kanit', fill: 'white' };
    this.add.text(20, 50, "Name:", style);
  
    // Create an input field using DOM element
    let element = this.add.dom(150, 100, 'input', {
      'type': 'text',
      'placeholder': 'Enter your name',
      'style': 'width: 200px; height: 24px; font-size: 22px; text-align: center; padding: 10px; border: none; border-radius: 4px; background-color: white; color: black;'
    });
  
    element.node.focus();  // Automatically focus on the input field
  
    element.addListener('input');
    element.on('input', (event) => {
      this.playerName = event.target.value;
      this.updatePlayerNameDisplay(); // Update display if needed
    });
  }
  
  updatePlayerNameDisplay() {
    if (!this.playerNameDisplay) {
      this.playerNameDisplay = this.add.text(20, 130, '', { font: '32px Arial', fill: '#fff' });
    }
    this.playerNameDisplay.setText(`Player: ${this.playerName}`);
  }
  

  addGameText() {
    const style = { font: "25px Kanit", fill: "white" };
    this.gameText = this.add.text(20, 20, "", style);
    this.gameText.setText('Playing as: ' + (this.playerName || ''));
  }

  createScoreboard() {
    this.scoreText = this.add.text(16, 16, 'Score: 0', { font: '25px Kanit', fill: 'white' });
  }

  updateScore() {
    this.score += 1; // Increase score
    this.scoreText.setText('Score: ' + this.score); // Update score text
  }

  displayLevel() {
    this.levelText = this.add.text(880, 20, 'Level: 1', { font: '25px Kanit', fill: 'white' });
  }

  updateLevel() {
    this.level++;
    this.levelText.setText('Level: ' + this.level);
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
    bamboo.isCut = false; // Reset the cut status when bamboo is reset
    bamboo.setTexture("bamboo");
    bamboo.y = 0;
    bamboo.x = Phaser.Math.Between(0, this.sys.game.config.width);
  }

  destroyBamboo(pointer, gameObject) {
    if (!gameObject.isCut) {
        gameObject.setTexture("bambooCut");
        gameObject.disableInteractive();
        this.playSmokeAnimation(gameObject);
      }
  }

  playSmokeAnimation(gameObject) {
    this.anims.create({
      key: "smoke",
      url: "assets/images/smoke.png",
      frames: this.anims.generateFrameNumbers("smoke"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });

    gameObject.play("smoke");
    gameObject.on("animationcomplete", () => {
      gameObject.destroy();
    });
  }
}
