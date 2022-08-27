import Game from './game.js';

let config = {
    width: 1152,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#fff',
    scene: [ Game ]
};

let game = new Phaser.Game(config);

//game.scene.start('startGame');