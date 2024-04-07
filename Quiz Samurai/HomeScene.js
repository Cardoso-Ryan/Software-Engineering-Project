class HomeScene extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background", "assets/images/background.jpg");

        // Chargement de la vie des joueur en haut a droite
        this.load.image("x", "assets/images/x.png");
        this.load.image("xf", "assets/images/xf.png");
        this.load.image("xx", "assets/images/xx.png");
        this.load.image("xxf", "assets/images/xxf.png");
        this.load.image("xxx", "assets/images/xxx.png");
        this.load.image("xxxf", "assets/images/xxxf.png");

        //Chargement de la banane (a changer pour du bamboo)
        this.load.image("banana", "assets/images/banana.png");
        this.load.image("banana-1", "assets/images/banana-1.png");
        this.load.image("banana-2", "assets/images/banana-2.png");
    }

    create(){
        this.add.text(20, 20, "Loading game...", {font: "25px KleeOne", fill: "red"});
        this.scene.start("playGame");
    }
}