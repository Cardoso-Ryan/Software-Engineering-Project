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

var difficulty = 'easy'; // Default difficulty

function setDifficulty(level) {
    difficulty = level;
    document.querySelector('.difficulty-menu').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    var game = new Phaser.Game(configScreen);
}

window.onload = function() {
    var game = new Phaser.Game(configScreen);
    
}