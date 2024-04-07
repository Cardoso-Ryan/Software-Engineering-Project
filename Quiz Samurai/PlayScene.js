class PlayScene extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    create(){
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);
        this.background.setScale(1.6);

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

        // Affichage de la banane
        this.banana = this.add.image(configScreen.width/2, configScreen.height/2, "banana");

        // Affichage de la bombe
        this.bomb = this.add.image(configScreen.width/2, configScreen.height/2, "bomb");
        this.add.text(20, 20, "Playing game", {font: "25px KleeOne" , fill: "lime"});
    }

    update(){
        this.updateBanana();
        this.updateBomb();
    }

    updateBanana(){
        // Rotation de la banane
        this.banana.angle += 2.5;
        this.moveBanana(this.banana, 5); 
    }

    updateBomb(){
        // Rotation de la banane
        this.bomb.angle += 1;
        this.moveBomb(this.bomb, 4); 
    }

    moveBanana(banana, speed) {
        banana.y += speed;
        if(banana.y > configScreen.height){
            this.resetBananaPos(banana);
        }
    }

    moveBomb(bomb, speed) {
        bomb.y += speed;
        if(bomb.y > configScreen.height){
            this.resetBombPos(bomb);
        }
    }

    resetBananaPos(banana){
        banana.y = 0;
        var randomX = Phaser.Math.Between(0, configScreen.width);
        banana.x = randomX;
    }

    resetBombPos(bomb){
        bomb.y = 0;
        var randomX = Phaser.Math.Between(0, configScreen.width);
        bomb.x = randomX;
    }
}