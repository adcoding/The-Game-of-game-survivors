import Game from './game.js';
import StartScene from './startScene.js';
import Credits from './credits.js';
import PauseScene from  './pauseScene.js';
import Upgrade from './upgradeScene.js';
import GameOver from './gameOver.js';

let config = {
    width: 1152,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#1a1d2d',
    scene: [ StartScene, Game , Credits, PauseScene, Upgrade, GameOver]
};

let game = new Phaser.Game(config);

//game.scene.start('startGame');


