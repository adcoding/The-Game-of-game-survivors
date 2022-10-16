let bg;
let text;
let exit;
let UIsound;

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOver')
    }

    preload() {
        this.load.image('bg', 'Assets/UI/bg.png')
        this.load.audio("UIsound", ["Assets/Sounds/uisound.mp3"]);
    }

    create() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        bg = this.add.image(screenCenterX, screenCenterY, 'bg').setAlpha(0.5);

        text = this.add.text(screenCenterX, screenCenterY, 'GAME OVER', {
            fontFamily: 'dogicaPixel',
            fontSize: '50px',
            align: 'center'
        }).setOrigin(0.5);

        exit = this.add.text(screenCenterX, screenCenterY + 200, 'Main Menu', {
            fontFamily: 'dogicaPixel',
            fontSize: '20px',
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        UIsound = this.sound.add("UIsound", { loop: false , volume: 1});

        exit.on('pointerdown', () => {
            this.scene.start('startScene');
            
            UIsound.play();
        });
    }

    update() {
        exit.on('pointerover', function (pointer) {
            exit.setScale(1.5);
        })

        exit.on('pointerout', function (pointer) {
            exit.setScale(1);
        })
    }

}