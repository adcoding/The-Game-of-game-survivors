let bg;
let player;
let title;
let playText;
let creditsText;

let UIsound;

export default class StartScene extends Phaser.Scene {
    constructor() {
        super('startScene');
    }

    preload() {

        this.load.image('bg', 'Assets/UI/bg.png');
        this.load.spritesheet('player', 'Assets/Player/Idle.png', {
            frameWidth: 126,
            frameHeight: 126
        });

        this.load.audio("UIsound", ["Assets/Sounds/uisound.mp3"]);
    }

    create() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        bg = this.add.image(screenCenterX, screenCenterY, 'bg');

        this.add.ellipse(screenCenterX, screenCenterY - 65, 50, 10, 0x000);

        player = this.physics.add.sprite(screenCenterX, screenCenterY - 90, 'player').setScale(0.6);

        title = this.add.text(screenCenterX, screenCenterY, 'THE\nGAME', {
            fontFamily: 'dogicaPixel',
            fontSize: '40px',
            align: 'center'
        }).setOrigin(0.5);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 11
            }),
            frameRate: 10,
            repeat: -1
        });

        player.play('idle');

        playText = this.add.text(screenCenterX, screenCenterY + 200, 'Play', {
            fontFamily: 'dogicaPixel',
            fontSize: '20px',
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        creditsText = this.add.text(screenCenterX, screenCenterY + 250, 'Credits', {
            fontFamily: 'dogicaPixel',
            fontSize: '20px',
            align: 'center',
        }).setOrigin(0.5).setInteractive();

        playText.on('pointerdown', () => {
            this.scene.start('game');
            UIsound.play();
        });

        creditsText.on('pointerdown', () => {
            UIsound.play();
            this.scene.start('credits');
        });

        UIsound = this.sound.add("UIsound", { loop: false , volume: 1});
    }

    update() {

        playText.on('pointerover', function (pointer) {
            playText.setScale(1.5);
        })

        playText.on('pointerout', function (pointer) {
            playText.setScale(1);
        })

        creditsText.on('pointerover', function (pointer) {
            creditsText.setScale(1.5);
        })

        creditsText.on('pointerout', function (pointer) {
            creditsText.setScale(1);
        })
    }


}