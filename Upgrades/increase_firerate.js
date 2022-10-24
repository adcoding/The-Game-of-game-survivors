let rectR;
let cardR; //container
let increase_firerate_title;
let increase_firerate_description;
let increase_firerate_btn;

export default class IncreaseFireRate extends Phaser.Scene {
    constructor() {
        super('increase_firerate');
    }

    preload() {
        this.load.image('cardbg', './Assets/UI/cardbg.png');

    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        rectR = this.add.image(0, 0, 'cardbg');

        increase_firerate_title = this.add.text(0, -100, 'Increase\nFire Rate', {
            fontFamily: 'dogicaPixel',
            fontSize: '20px',
            align: 'center'
        }).setOrigin(0.5);

        increase_firerate_description = this.add.text(0, 0, 'Increases fireate\nby 0.5', {
            fontFamily: 'dogicaPixel',
            fontSize: '15px',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        increase_firerate_btn = this.add.text(0, 120, 'UPGRADE', {
            fontFamily: 'dogicaPixel',
            fontSize: '20px',
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        cardR = this.add.container(screenCenterX + 350, screenCenterY, [rectR, increase_firerate_title, increase_firerate_description, increase_firerate_btn]);

        increase_firerate_btn.on('pointerdown', () => {
            this.events.emit('upgrade-firerate', 0.5); // set to 0.5 after debug
            // back to the game
            this.scene.stop();
            this.scene.stop('upgradeScene');
            this.scene.remove('increase_speed');
            this.scene.remove('increase_damage');
            this.scene.resume('game');
            this.scene.remove();
        });
    }

    update() {
        increase_firerate_btn.on('pointerover', function (pointer) {
            increase_firerate_btn.setScale(1.5);
        })

        increase_firerate_btn.on('pointerout', function (pointer) {
            increase_firerate_btn.setScale(1);
        })
    }
}    