var configScreen = {
    type: Phaser.AUTO,
    parent: 'gameContainer',
    width: 1000,
    height: 600,
    backgroundColor: 0x000000,
    scene: [HomeScene, PlayScene],
    //fps regulator
    fps: {
        target: 120,
        forceSetTimeOut: true
    },
}

window.onload = function() {
    var game = new Phaser.Game(configScreen);
    
}