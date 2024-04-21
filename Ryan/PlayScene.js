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
        this.bamboo = this.add.image(this.scale.width / 2, 100, "bamboo").setInteractive();
        this.add.text(20, 20, "Playing game", {font: "25px KleeOne" , fill: "lime"});
    
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

        this.bamboo.on('pointerdown', () => this.destroyFruit(this.bamboo));
    }

    update(){
        this.updatebamboo();
    }

    updatebamboo(){
        // Rotation de la banane
        this.bamboo.angle += 2.5;
        this.movebamboo(this.bamboo, 5); 
    }

    movebamboo(bamboo, speed) {
        bamboo.y += speed;
        if(bamboo.y > configScreen.height){
            this.resetbambooPos(bamboo);
        }
    }

    resetbambooPos(bamboo){
        bamboo.y = 0;
        var randomX = Phaser.Math.Between(0, configScreen.width);
        bamboo.x = randomX;
    }

    destroyFruit(fruit) {
        fruit.setTexture("bambooCut");
        fruit.disableInteractive();
        this.playSmokeAnimation(fruit);
    }

    playSmokeAnimation(gameObject) {
        gameObject.play("smoke"); // Play smoke animation
        gameObject.on('animationcomplete', function () {
            gameObject.destroy(); // Destroy object after animation completes
        }, this);
    }
}