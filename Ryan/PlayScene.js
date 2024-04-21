class PlayScene extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    create(){
        this.background = this.add.image(0, 0, "background").setOrigin(0, 0).setScale(1.6);
        this.background.setOrigin(0,0);
        this.background.setScale(1.6);

        // Customizable cursor
        this.input.setDefaultCursor('url(assets/images/katanaMin.png), pointer');

        this.lives = ['x', 'xx', 'xxx']; // Array to manage lives left
        this.livesSprites = {
            x: this.add.image(880, 35, "x").setScale(1.2),
            xx: this.add.image(920, 30, "xx").setScale(1.4),
            xxx: this.add.image(970, 25, "xxx").setScale(1.6)
        };

        // Affichage du bamboo
        this.bamboo = this.add.image(configScreen.width/2, configScreen.height/2, "bamboo");

        this.add.text(20, 20, "Playing game", {font: "25px KleeOne" , fill: "lime"});

        //Interactivité de la banane et de la bombe
        this.spawnNewBamboo();
        this.bamboo.setInteractive();

        this.bamboo.on('gameobjectdown', this.destroyBamboo, this);

        this.input.on('gameobjectover', (pointer, bamboo) => 
        {
            bamboo.setTexture("bambooCut");
        });

    }

    update(){
        this.updateBamboo();
    }

    updateBamboo(){
        // Rotation de la banane
        this.bamboo.angle += 2.5;
        this.moveBamboo(this.bamboo, 5); 
    }

    spawnNewBamboo() {
        var randomX = Phaser.Math.Between(0, this.sys.game.config.width);
        var bamboo = this.add.image(randomX, 0, "bamboo").setInteractive();
        bamboo.cut = false; // Custom property to track if bamboo is cut
        bamboo.on('pointerdown', () => {
            bamboo.cut = true;
            this.destroyBamboo(bamboo);
        });

        // Moving bamboo down the screen
        this.tweens.add({
            targets: bamboo,
            y: this.sys.game.config.height + bamboo.height,
            ease: 'Linear',
            duration: 5000,
            onComplete: () => {
                this.resetBambooPos(bamboo);
            }
        });
    }

    moveBamboo(bamboo, speed) {
        bamboo.y += speed;
        if(bamboo.y > configScreen.height){
            this.resetBambooPos(bamboo);
            bamboo.setTexture("bamboo"); //reset a bamboo quand sort de la configScreen
        }
    }

    resetBambooPos(bamboo){
        if (!bamboo.cut) {
            this.updateLives();
        }
        bamboo.y = 0;
        var randomX = Phaser.Math.Between(0, configScreen.width);
        bamboo.x = randomX;
    }

    destroyBamboo(pointer, gameObject){
        gameObject.setTexture("bananaCut");
        gameObject.disableInteractive();
        this.playSmokeAnimation(gameObject);
    }

    updateLives() {
        const life = this.lives.pop(); // Remove the last life from the array
        if (life) {
            this.livesSprites[life].setTexture(life + 'f'); // Update texture to show lost life
        }
        if (this.lives.length === 0) {
            this.gameOver(); // Call game over method
        }
    }

    gameOver() {
        console.log("Game Over"); // Replace with actual game over logic
        // You can add a game over screen, restart option, etc.
    }

}