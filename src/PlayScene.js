class PlayScene extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    create(){
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);
        this.background.setScale(1.8);

        // Customizable cursor
        this.input.setDefaultCursor('url(assets/images/katanaMin.png), pointer');
       // this.input.setDefaultCursor('url(assets/images/sword.png), pointer');

        // Affichage de la vie du joueur
        this.x = this.add.image(880, 35, "x");
        this.x.setScale(1.2);
        //this.x = this.add.image(890, 35, "xf");
        //this.x.setScale(1.2);
        this.x = this.add.image(920, 30, "xx");
        this.x.setScale(1.4);
        //this.x = this.add.image(920, 30, "xxf");
        //this.x.setScale(1.4);
        this.x = this.add.image(970, 25, "xxx");
        this.x.setScale(1.6);
        //this.x = this.add.image(970, 25, "xxxf");
        //this.x.setScale(1.6);

        // Affichage du bamboo
        this.bamboo = this.add.image(configScreen.width/2, configScreen.height/2, "bamboo");

        // Affichage de la bombe
        this.bomb = this.add.image(configScreen.width/2, configScreen.height/2, "bomb");
        this.add.text(20, 20, "Version 0.1.0", {font: "25px KleeOne" , fill: "lime"});
    
        // Creation de l'animation de fumé en cliquant sur la bombe
        this.anims.create({
            key: "smoke",
            frames: this.anims.generateFrameNumbers("smoke"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });

        //Interactivité de la banane et de la bombe
        this.bamboo.setInteractive();
        this.bomb.setInteractive();

        this.bamboo.on('gameobjectdown', this.destroyBamboo, this);
        this.bomb.on('gameobjectdown', this.destroyBomb, this);

        this.input.on('gameobjectover', (pointer, bamboo) => 
        {
            bamboo.setTexture("bamboo1");

        });

    }

    update(){
        this.updateBamboo();
        this.updateBomb();
    }

    updateBamboo(){
        // Rotation de la banane
        this.bamboo.angle += 2.5;
        this.moveBamboo(this.bamboo, 5); 
    }

    updateBomb(){
        // Rotation de la banane
        this.bomb.angle += 1;
        this.moveBomb(this.bomb, 4); 
    }

    moveBamboo(bamboo, speed) {
        bamboo.y += speed;
        if(bamboo.y > configScreen.height){
            this.resetBambooPos(bamboo);
            bamboo.setTexture("bamboo"); //reset a bamboo quand sort de la configScreen
        }
    }

    moveBomb(bomb, speed) {
        bomb.y += speed;
        if(bomb.y > configScreen.height){
            this.resetBombPos(bomb);
        }
    }

    resetBambooPos(bamboo){
        bamboo.y = 0;
        var randomX = Phaser.Math.Between(0, configScreen.width);
        bamboo.x = randomX;
    }

    resetBombPos(bomb){
        bomb.y = 0;
        var randomX = Phaser.Math.Between(0, configScreen.width);
        bomb.x = randomX;
    }

    destroyBamboo(pointer, gameObject){
        gameObject.setTexture("banana-1");
        gameObject.disableInteractive();
        this.playSmokeAnimation(gameObject);
    }

    destroyBomb(pointer, gameObject){
        gameObject.disableInteractive();
        this.playSmokeAnimation(gameObject);
    }

    playSmokeAnimation(gameObject) {
        gameObject.play("smoke"); // Play smoke animation
        gameObject.on('animationcomplete', function () {
            gameObject.destroy(); // Destroy object after animation completes
        }, this);
    }
}