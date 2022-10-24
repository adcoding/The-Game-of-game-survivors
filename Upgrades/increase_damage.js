let rectL;
let cardL; //container
let increase_damage_title;
let increase_damage_description;
let increase_damage_btn;


export default class IncreaseDamage extends Phaser.Scene {
    constructor() {
        super('increase_damage');
    }

    preload() {
        this.load.image('cardbg', './Assets/UI/cardbg.png');
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        rectL = this.add.image(0, 0, 'cardbg');

        increase_damage_title = this.add.text(0, -100, 'Increase\nDamage', {
            fontFamily: 'dogicaPixel',
            fontSize: '20px',
            align: 'center'
        }).setOrigin(0.5);

        increase_damage_description = this.add.text(0, 0, 'Increases bullet \ndamage by 1', {
            fontFamily: 'dogicaPixel',
            fontSize: '15px',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        increase_damage_btn = this.add.text(0, 120, 'UPGRADE', {
            fontFamily: 'dogicaPixel',
            fontSize: '20px',
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        cardL = this.add.container(screenCenterX - 350, screenCenterY, [rectL, increase_damage_title, increase_damage_description, increase_damage_btn,]);
 
        increase_damage_btn.on('pointerdown', () => {
            this.events.emit('upgrade-damage', 1);
            
            // back to the game
            this.scene.stop();
            this.scene.stop('upgradeScene')
            this.scene.remove('increase_speed')
            this.scene.remove('increase_firerate')
            this.scene.resume('game');
            this.scene.remove()
        });
    }

    update() {
        increase_damage_btn.on('pointerover', function (pointer) {
            increase_damage_btn.setScale(1.5);
        })

        increase_damage_btn.on('pointerout', function (pointer) {
            increase_damage_btn.setScale(1);
        })
    }
}    