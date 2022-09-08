let bg;
let title;
let tip;

export default class PauseScene extends Phaser.Scene {
    constructor() {
        super('pauseScene');
    }

    preload() {

        this.load.image('bg', 'Assets/UI/bg.png');

    }

    create() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        bg = this.add.image(screenCenterX, screenCenterY, 'bg').setAlpha(0.5);

        title = this.add.text(screenCenterX, screenCenterY, 'GAME PAUSED', {
            fontFamily: 'dogicaPixel',
            fontSize: '40px',
            align: 'center'
        }).setOrigin(0.5);

        tip = this.add.text(screenCenterX, screenCenterY + 200, 'PRESS SPACE TO CONTINUE', {
            fontFamily: 'dogicaPixel',
            fontSize: '20px',
            align: 'center'
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown-SPACE', function (event) {
            this.scene.resume('game');
            this.scene.stop();
        }, this);

    }

    update() {

    }

}