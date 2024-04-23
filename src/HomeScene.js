class HomeScene extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background", "assets/images/background_trees.jpg");

        // Chargement de la vie des joueur en haut a droite
        this.load.image("x", "assets/images/x.png");
        this.load.image("xf", "assets/images/xf.png");
        this.load.image("xx", "assets/images/xx.png");
        this.load.image("xxf", "assets/images/xxf.png");
        this.load.image("xxx", "assets/images/xxx.png");
        this.load.image("xxxf", "assets/images/xxxf.png");

        //Chargement de la banane (a changer pour du bamboo)
        this.load.image("bamboo", "assets/images/bamboo.png");

        this.load.image("bamboo1", "assets/images/bamboo-1.png");
        
        this.load.spritesheet("smoke", "assets/smoke/smokes.png",{
            frameWidth: 64,
            frameHeight: 64
        } )

           //Chargement de la bombe
        this.load.image("bomb", "assets/images/bomb.png");
    }

    create(){
        this.add.text(20, 20, "Loading game...", {font: "25px KleeOne", fill: "red"});
        this.scene.start("playGame");
    }
}