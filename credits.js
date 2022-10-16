let bg;
let player;
let title;
let goBackText;
let link;
let thanks;

let UIsound2;

export default class Credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }

    preload() {

        this.load.image('bg', 'Assets/UI/bg.png');
        this.load.spritesheet('run', 'Assets/Player/Run.png', {
            frameWidth: 126,
            frameHeight: 126
        });

        this.load.audio("UIsound2", ["Assets/Sounds/uisound.mp3"]);

    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        bg = this.add.image(screenCenterX, screenCenterY, 'bg');

        this.add.ellipse(screenCenterX, screenCenterY - 65, 50, 10, 0x000);

        player = this.physics.add.sprite(screenCenterX, screenCenterY - 90, 'player').setScale(0.6);

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('run', {
                start: 0,
                end: 12
            }),
            frameRate: 30,
            repeat: -1
        });

        player.play('run');

        title = this.add.text(screenCenterX, screenCenterY, 'CREDITS', {
            fontFamily: 'dogicaPixel',
            fontSize: '40px',
            align: 'center'
        }).setOrigin(0.5);

        thanks = this.add.text(screenCenterX, screenCenterY + 100, 'Special thanks to:\nJosé Pablo PS, Peppe, Rafael Souza', {
            fontFamily: 'dogicaPixel',
            fontSize: '20px',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        link = this.add.text(screenCenterX, screenCenterY + 200, 'Support', {
            fontFamily: 'dogicaPixel',
            fontSize: '20px',
            align: 'center'
        }).setOrigin(0.5).setInteractive();


        goBackText = this.add.text(screenCenterX, screenCenterY + 300, 'Back', {
            fontFamily: 'dogicaPixel',
            fontSize: '20px',
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        goBackText.on('pointerdown', () => {
            UIsound2.play();
            this.scene.start('startScene');
        });

        UIsound2 = this.sound.add("UIsound", {
            loop: false,
            volume: 1
        });

    }

    update() {

        goBackText.on('pointerover', function (pointer) {
            goBackText.setScale(1.5);
        })

        goBackText.on('pointerout', function (pointer) {
            goBackText.setScale(1);
        })

        link.on('pointerover', function (pointer) {
            link.setScale(1.5);
        })

        link.on('pointerout', function (pointer) {
            link.setScale(1);
        })

        link.on('pointerup', () => { window.open('https://www.patreon.com/adcoding'); });

    }
}
