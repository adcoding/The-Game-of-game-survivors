let bg;
let title;
let p;
let button;

import IncreaseSpeed from './Upgrades/increase_speed.js';
import IncreaseDamage from './Upgrades/increase_damage.js';
import IncreaseFireRate from './Upgrades/increase_firerate.js';
export default class Upgrade extends Phaser.Scene {
    constructor() {
        super('upgradeScene');
    }

    preload() {

        this.load.image('bg', 'Assets/UI/bg.png');

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
        

        this.scene.add(this, IncreaseSpeed, true);
        this.scene.get('increase_speed').events.on('upgrade-speed', speed => this.events.emit('upgrade-action-speed', speed));

        this.scene.add(this, IncreaseDamage, true);
        this.scene.get('increase_damage').events.on('upgrade-damage', damage => this.events.emit('upgrade-action-damage', damage));

        this.scene.add(this, IncreaseFireRate, true);
        this.scene.get('increase_firerate').events.on('upgrade-firerate', firerate => this.events.emit('upgrade-action-firerate', firerate));

        // button = this.add.text(screenCenterX, screenCenterY + 260, 'Continue', {
        //     fontFamily: 'dogicaPixel',
        //     fontSize: '20px',
        //     align: 'center'
        // }).setOrigin(0.5).setInteractive();


        
    }

    update() {

        // button.on('pointerdown', () => {
        //     this.scene.remove('increase_speed');
        //     this.scene.remove('increase_damage');
        //     this.scene.remove('increase_firerate');
        //     this.scene.stop();
        //     this.scene.resume('game');
        // });

        // button.on('pointerover', function (pointer) {
        //     button.setScale(1.5);
        // })

        // button.on('pointerout', function (pointer) {
        //     button.setScale(1);
        // })

    }
}