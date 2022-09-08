let bg;
let title;
let p;
let button;
let rectL;
let rectR;
let rectC;

export default class Upgrade extends Phaser.Scene {
    constructor() {
        super('upgradeScene');
    }

    preload() {

        this.load.image('bg', 'Assets/UI/bg.png');
        this.load.image('cardbg', 'Assets/UI/cardbg.png');

    }

    create() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        bg = this.add.image(screenCenterX, screenCenterY, 'bg').setAlpha(0.5);

        title = this.add.text(screenCenterX, screenCenterY - 300, 'UPGRADES', {
            fontFamily: 'dogicaPixel',
            fontSize: '40px',
            align: 'center'
        }).setOrigin(0.5);

        p = this.add.text(screenCenterX, screenCenterY - 260, 'lorem ipsum dolor sit amet', {
            fontFamily: 'dogicaPixel',
            fontSize: '15px',
            align: 'center'
        }).setOrigin(0.5);

        rectL = this.add.image(screenCenterX - 350, screenCenterY, 'cardbg');
        rectC = this.add.image(screenCenterX, screenCenterY, 'cardbg');
        rectR = this.add.image(screenCenterX + 350, screenCenterY, 'cardbg');

        button = this.add.text(screenCenterX, screenCenterY + 260, 'Continue', {
            fontFamily: 'dogicaPixel',
            fontSize: '20px',
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        button.on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume('game');
        });
    }

    update() {

        button.on('pointerover', function (pointer) {
            button.setScale(1.5);
        })

        button.on('pointerout', function (pointer) {
            button.setScale(1);
        })

    }
}