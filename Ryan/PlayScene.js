class PlayScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.bombs = [];
    this.level = 1;
    this.score = 0;
    this.cursorScale = 1;
    this.setupDifficulty();
    this.createBackground();
    this.createCursor();
    this.createBamboo();
    this.createNameInput();
    this.createScoreboard();
    this.displayLevel();

  //  const fx = this.bamboo.postFX.addGlow(0xffffff, 2, 0, false, 0.1, 32);
  }

  setupDifficulty() {
    switch (difficulty) {
        case 'easy':
            this.bambooSpeed = 2;
            this.cursorScale = 1;
            break;
        case 'medium':
            this.bambooSpeed = 5;
            this.cursorScale = 0.8;
            break;
        case 'impossible':
            this.bambooSpeed = 10;
            this.cursorScale = 0.4; // Reduce cursor size
            break;
    }
    this.updateCursor();
}

  update() {
    this.updateBamboo();
    //this.updateLevel();
  }

  createBackground() {
    this.background = this.add.image(0, 0, "background").setOrigin(0, 0).setScale(1.8);
  }

  createCursor() {
    this.input.setDefaultCursor(`url(assets/images/katana.png), pointer`);
    const cursorElement = document.querySelector('canvas');
    cursorElement.style.cursor = `url(assets/images/katana.png) ${16 * this.cursorScale} ${16 * this.cursorScale}, pointer`;
  }

  createBamboo() {
    this.bamboo = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2,"bamboo");
    this.bamboo.setInteractive();
    this.bamboo.isCut = false; 
    this.bamboo.on("pointerdown", this.killBamboo, this);
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
  
    // Check if the score is a multiple of 20 to increase the level
    if (this.score % 5 === 0) {
      this.updateLevel();
    }
  }

  displayLevel() {
    this.levelText = this.add.text(880, 20, 'Level: 1', { font: '25px Kanit', fill: 'white' });
  }

  updateLevel() {
    this.level++;
    if (this.level >= 2) {
      this.bambooScale = 0.8; // Scale up bamboo at level 2
    }
    if (this.level >= 3) {
      this.bambooSpeed += 1; // Increase speed at level 3
    }
    if (this.level >= 4) {
      this.createObstacles(); // Introduce bombs at level 4
    }
    if (this.level >= 5) {
      this.allowMultipleBamboos = true;
    }
    this.bamboo.setScale(this.bambooScale); // Apply scale changes
    this.levelText.setText('Level: ' + this.level);
  }

createObstacles() {
  this.bomb = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2,"bomb");
  this.bomb.setInteractive();
  this.bomb.isCut = false; 
  this.bomb.on("pointerdown", this.killBomb, this);
  // Add pointerover event to cut the bomb when mouse hovers over it
  this.bomb.on("pointerover", () => {
      if (!this.bomb.isCut) { // Check if the bomb has been cut
          this.bomb.setTexture("smoke");
          this.bomb.isCut = true; // Set the bomb as cut
          this.updateScore();
        }
  });
}

updateObstacles() {
  this.bombs.forEach(bomb => {
    if (bomb.y > this.sys.game.config.height) {
      // Reset bomb position to top with a new random x position
      bomb.y = -50;
      bomb.x = Phaser.Math.Between(100, this.sys.game.config.width - 100);
    }
  });
}

updateCursor() {
  const cursorElement = document.querySelector('canvas');
  cursorElement.style.cursor = `url(assets/images/katana.png) ${16 * this.cursorScale} ${16 * this.cursorScale}, pointer`;
}

  updateBamboo() {
    this.bamboo.angle += 2.5;
    this.moveBamboo(this.bamboo, this.bambooSpeed);
  }

  moveBamboo(bamboo, speed) {
    bamboo.y += speed;
    if (bamboo.y > this.sys.game.config.height) {
      this.resetBambooPos(bamboo);
    }
  }

  updateBomb(){
    this.bomb.angle += 2.5;
    this.moveBomb(this.bomb, this.bambooSpeed);
  }

  moveBomb(bomb, speed){
    bomb.y += speed;
    if (bomb.y > this.sys.game.config.height){
      this.resetBombPos(bomb);
    }
  }

  resetBombPos(bomb){
    bomb.isCut = false; // Reset the cut status when bomb is reset
    bomb.setTexture("smoke");
    bomb.y = 0;
    bomb.x = Phaser.Math.Between(0, this.sys.game.config.width);
  }

  manageMultipleBamboos() {
    // Check if there are fewer bamboos than the maximum allowed and add new ones
    if (this.bamboos.length < this.maxBamboos) {
      let newBamboo = this.createBamboo(Phaser.Math.Between(100, this.sys.game.config.width - 100), 0);
      this.bamboos.push(newBamboo);
    }
  
    // Update position of each bamboo, reset if it goes off-screen
    this.bamboos.forEach(bamboo => {
      bamboo.y += this.bambooSpeed;
      if (bamboo.y > this.sys.game.config.height + 100) { // Reset bamboo position if it moves off the bottom
        bamboo.y = 0;
        bamboo.x = Phaser.Math.Between(100, this.sys.game.config.width - 100);
        bamboo.isCut = false;
        bamboo.setTexture("bamboo");
      }
    });
  }

  resetBambooPos(bamboo) {
    bamboo.isCut = false; // Reset the cut status when bamboo is reset
    bamboo.setTexture("bamboo");
    bamboo.y = 0;
    bamboo.x = Phaser.Math.Between(0, this.sys.game.config.width);
  }

  killBamboo(pointer, gameObject) {
    if (!gameObject.isCut) {
        gameObject.setTexture("bambooCut");
        gameObject.disableInteractive();
       // this.playSmokeAnimation(gameObject);
      }
  }

  killBomb(pointer, gameObject) {
    if (!gameObject.isCut) {
        gameObject.setTexture("smoke");
        gameObject.disableInteractive();
       // this.playSmokeAnimation(gameObject);
      }
  }

 /* playSmokeAnimation(gameObject) {
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
      gameObject.kill();
    });
  }*/
}
