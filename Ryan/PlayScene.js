class PlayScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.bombs = [];
    this.level = 1;
    this.score = 0;
    this.cursorScale = 1;
    this.bambooScale = 1; // Initial scale of bamboo
    this.bambooSpeed = 2; // Initial speed
    this.bombSpeed = 1;
    this.setupDifficulty();
    this.createBackground();
    this.createCursor();
    this.Pause();
    this.Resume();
    this.createBamboo();
    this.createNameInput();
    this.createScoreboard();
    this.displayLevel();
    this.createObstacles();
    this.sound.pauseOnBlur = false;
    const Music = this.sound.add("Music", {volume: 0.02});
    Music.play();
  }

  setupDifficulty() {
    switch (difficulty) {
        case 'easy':
            this.bambooSpeed = 2;
            this.cursorScale = 1;
            this.bombSpeed = 1;
            break;
        case 'medium':
            this.bambooSpeed = 5;
            this.cursorScale = 0.8;
            this.bombSpeed = 3;
            break;
        case 'impossible':
            this.bambooSpeed = 10;
            this.cursorScale = 0.4; // Reduce cursor size
            this.bombSpeed = 5;
            break;
    }
    this.updateCursor();
}

  update() {
    this.updateBamboo();
    this.updateBomb();
  }

  Pause(){
    this.pause = this.add.image(900, 30, 'pauseBtn').setOrigin(0,0).setScale(0.2);
}

  Resume(){
  this.resume = this.add.image('resumeBtn').setScale(0.2);
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
    this.bamboo.on("pointerover", () => {
        if (!this.bamboo.isCut) { 
            this.bamboo.setTexture("bambooCut");
            this.bamboo.isCut = true; 
            this.updateScore();
            let cutAudio = this.sound.add("cutAudio", {volume: 0.01});
            cutAudio.play();
          }
    });
  }

  createObstacles() {
    this.bomb = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2,"bomb");
    this.bomb.setInteractive();
    this.bomb.isCut = false; 
    this.bomb.on("pointerdown", this.killBomb, this);
    this.bomb.on("pointerover", () => {
        if (!this.bomb.isCut) { 
            this.bomb.setTexture("smoke");
            this.bomb.isCut = true; 
            this.decreaseScore(); // Decrease score by 10 points
            let explosion = this.sound.add("explosion", {volume: 0.02});
            explosion.play();
          }
    });
  }

  createNameInput() {
    const style = { font: '32px Kanit', fill: 'white' };
    this.add.text(20, 50, "Name:", style);
  
    let element = this.add.dom(150, 100, 'input', {
      'type': 'text',
      'placeholder': 'Enter your name',
      'style': 'width: 200px; height: 24px; font-size: 22px; text-align: center; padding: 10px; border: none; border-radius: 4px; background-color: white; color: black;'
    });
  
    element.node.focus();  
  
    element.addListener('input');
    element.on('input', (event) => {
      this.playerName = event.target.value;
      this.updatePlayerNameDisplay(); 
    });
  }

  updatePlayerNameDisplay() {
    if (!this.playerNameDisplay) {
      this.playerNameDisplay = this.add.text(20, 130, '', { font: '32px Arial', fill: '#fff' });
    }
    this.playerNameDisplay.setText(`Player: ${this.playerName}`);
  }
  

  addGameText() {
    const style = { font: "40px Kanit", fill: "white" };
    this.gameText = this.add.text(20, 20, "", style);
    this.gameText.setText('Playing as: ' + (this.playerName || ''));
  }

  createScoreboard() {
    this.scoreText = this.add.text(480, 16, 'Score', { font: '50px Kanit', fill: 'white' });
  }

  updateScore() {
    this.score += 1; 
    this.scoreText.setText(this.score); 
  
    if (this.score % 5 === 0) {
      this.updateLevel();
    }
  }

  decreaseScore() {
    this.score -= 10; 
    if (this.score < 0) {
      this.score = 0;
    }
    this.scoreText.setText(this.score);
  }

  displayLevel() {
    this.levelText = this.add.text(20, 16, 'Level: 1', { font: '32px Kanit', fill: 'white' });
  }

  updateLevel() {
    this.level++;
    if (this.level >= 2) {
      this.bambooScale = 0.8; 
    }
    if (this.level >= 3) {
      this.bambooSpeed += 1; 
    }
    if (this.level >= 4) {
    }
    if (this.level >= 5) {
      this.manageMultipleBamboos();
    }
    this.bamboo.setScale(this.bambooScale); 
    this.levelText.setText('Level: ' + this.level);
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
    this.bomb.angle += 2;
    this.moveBomb(this.bomb, this.bombSpeed);
  }

  moveBomb(bomb, speed){
    bomb.y += speed;
    if (bomb.y > this.sys.game.config.height){
      this.resetBombPos(bomb);
    }
  }

  updateObstacles() {
    this.bomb.angle += 2;
    this.moveObstacles(this.bomb, this.bombSpeed);
  }

  moveObstacles(bomb, speed) {
    bomb.y += speed;
    if (bomb.y > this.sys.game.config.height) {
      this.resetBombPos(bomb);
    }
  }

  manageMultipleBamboos() {
    if (this.bamboos.length < this.maxBamboos) {
      let newBamboo = this.createBamboo(Phaser.Math.Between(100, this.sys.game.config.width - 100), 0);
      this.bamboos.push(newBamboo);
    }
  
    this.bamboos.forEach(bamboo => {
      bamboo.y += this.bambooSpeed;
      if (bamboo.y > this.sys.game.config.height + 100) { 
        bamboo.y = 0;
        bamboo.x = Phaser.Math.Between(100, this.sys.game.config.width - 100);
        bamboo.isCut = false;
        bamboo.setTexture("bamboo");
      }
    });
  }

  resetBambooPos(bamboo) {
    bamboo.isCut = false;
    bamboo.setTexture("bamboo");
    bamboo.y = 0;
    bamboo.x = Phaser.Math.Between(0, this.sys.game.config.width);
  }

  resetBombPos(bomb){
    bomb.isCut = false;
    bomb.setTexture("bomb");
    bomb.y = 0;
    bomb.x = Phaser.Math.Between(0, this.sys.game.config.width);
  }

  killBamboo(pointer, gameObject) {
    if (!gameObject.isCut) {
        gameObject.setTexture("bambooCut");
        gameObject.disableInteractive();
      }
  }

  killBomb(pointer, gameObject) {
    if (!gameObject.isCut) {
        gameObject.setTexture("smoke");
        gameObject.disableInteractive();
        this.decreaseScore(); // Decrease score by 10 points
        let explosion = this.sound.add("explosion", {volume: 0.1});
        explosion.play();
      }
  }
}
