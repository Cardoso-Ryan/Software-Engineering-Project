class HomeScene extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        // load assets of the background and the bamboos into the game
        this.load.image("background", "assets/images/background_trees.jpg");
        this.load.image("bamboo", "assets/images/bamboo.png");
        this.load.image("bambooCut", "assets/images/bambooCut.png");
        this.load.image("smoke", "assets/images/smoke.png");
    }

    create(){
        this.add.text(20, 20, "Loading game...", {font: "25px KleeOne", fill: "red"});
        this.scene.start("playGame");
    }
}