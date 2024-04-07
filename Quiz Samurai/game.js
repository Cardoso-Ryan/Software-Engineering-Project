var configScreen = {
    width: 1000,
    height: 600,
    backgroundColor: 0x000000,
    scene: [HomeScene, PlayScene]
}

window.onload = function() {
    var game = new Phaser.Game(configScreen);
    
}
