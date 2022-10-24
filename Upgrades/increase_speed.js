let rectC;
let cardC; //container

let increase_speed_title;
let increase_speed_description;
let increase_speed_btn;

export default class IncreaseSpeed extends Phaser.Scene {
    constructor() {
        super('increase_speed');
    }

    preload() {
        this.load.image('cardbg', './Assets/UI/cardbg.png');
    }

    create() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        rectC = this.add.image(0, 0, 'cardbg');

        increase_speed_title = this.add.text(0, -100, 'Increase\nSpeed', {
            fontFamily: 'dogicaPixel',
            fontSize: '20px',
            align: 'center'
        }).setOrigin(0.5);

        increase_speed_description = this.add.text(0, 0, 'Increases player\nvelocity by 10', {
            fontFamily: 'dogicaPixel',
            fontSize: '15px',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        increase_speed_btn = this.add.text(0, 120, 'UPGRADE', {
            fontFamily: 'dogicaPixel',
            fontSize: '20px',
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        cardC = this.add.container(screenCenterX, screenCenterY, [rectC, increase_speed_title, increase_speed_description, increase_speed_btn]);

        increase_speed_btn.on('pointerdown', () => {
            this.events.emit('upgrade-speed', 10);
            
            console.log('speed-increase');
            // back to the game
            this.scene.stop();
            this.scene.stop('upgradeScene')
            this.scene.remove('increase_firerate')
            this.scene.remove('increase_damage')
            this.scene.resume('game');
            this.scene.remove()
        });
    }

    update() {
        increase_speed_btn.on('pointerover', function (pointer) {
            increase_speed_btn.setScale(1.5);
        })

        increase_speed_btn.on('pointerout', function (pointer) {
            increase_speed_btn.setScale(1);
        })
    }
}    

