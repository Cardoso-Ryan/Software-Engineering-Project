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
        this.load.image("bomb", "assets/images/bomb.png");
        this.load.audio("Music", [ "assets/audio/Entering_dojo.ogg", "assets/audio/Entering_dojo.mp3"]);
        this.load.audio("cutAudio", [ "assets/audio/sound_effect.ogg", "assets/audio/sound_effect.mp3"]);
        this.load.audio("explosion", [ "assets/audio/explosion.ogg", "assets/audio/explosion.mp3"]);
    }

    create(){
        this.add.text(20, 20, "Loading game...", {font: "25px KleeOne", fill: "red"});
        this.scene.start("playGame");
    }
}