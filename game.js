let player;
let shadow;
let width;
let height;
let keys;
let gun;
let playerWithGun;
let input;
let bullet;
let bullet_damage;
let mouse;
let control = false;
let worldBounds;
let emitter;
let emitterBlood;
let particles;
let rectangle;
let enemy;
let enemy_group;
let enemy_health;
let damage;
let the;
let total;
let test;

let blood;
let bloodPlayer;

let playerDirectionY = 0;
let playerDirectionX = 0;
let playerSpeed = 300;
let tick = 0;

let health;
let maxHealth;
let healthBar;
let bgHealthBar;

let bgXpBar; //bar
let xpBar; //bar
let xp;
let maxXp;
let xpPoint; //sprite
let value; // single sprite value
let player_level = 1; // player level
let xp_modifier = 0.5;

let timedEvent;
// sounds effects
let gunSound;
let mainMusic;
let collectOrbs;
let levelUpSound;

import IncreaseSpeed from './Upgrades/increase_speed.js'
export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {

        this.load.image('tileset', 'Assets/World/tileset.png');
        this.load.tilemapTiledJSON('map', 'Assets/World/map.tmj');
        this.load.spritesheet('player', 'Assets/Player/Idle.png', {
            frameWidth: 126,
            frameHeight: 126
        });
        this.load.spritesheet('run', 'Assets/Player/Run.png', {
            frameWidth: 126,
            frameHeight: 126
        });
        this.load.image('gun', 'Assets/Player/Weapons/gun.png');
        this.load.image('bullet', 'Assets/Player/Weapons/bullet.png');
        this.load.spritesheet('enemy', 'Assets/Enemy/enemy.png', {
            frameWidth: 48,
            frameHeight: 48
        });
        this.load.spritesheet('blood', 'Assets/Particles/blood.png', {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.spritesheet('bloodPlayer', 'Assets/Particles/bloodPlayer.png', {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.image('bgHealthBar', 'Assets/UI/bgHealthBar.png');
        this.load.image('healthBar', 'Assets/UI/healthBar.png');

        this.load.image('bgXpBar', 'Assets/UI/bgXpBar.png');
        this.load.image('xpBar', 'Assets/UI/xpBar.png');

        this.load.image('xpPoint', 'Assets/Enemy/xpPoint.png');

        // audio !!
        this.load.audio("gunShot", ["Assets/Sounds/gunShot.mp3"]);
        this.load.audio("mainMusic", ["Assets/Sounds/mainMusic.mp3"]);
        this.load.audio("collectOrbs", ["Assets/Sounds/collectOrbs.mp3"]);
        this.load.audio("levelUpSound", ["Assets/Sounds/levelUp.mp3"]);

    }

    create() {

        width = this.game.canvas.width;
        height = this.game.canvas.height;

        let map = this.make.tilemap({
            key: "map",
            tileWidth: 32,
            tileHeight: 32
        });
        let tileset = map.addTilesetImage("tileset");
        let layer = map.createLayer("floor", tileset, 0, 0);

        shadow = this.add.ellipse(35, 63, 50, 10, 0x000).setDepth(1);
        player = this.physics.add.sprite(0, 0, 'player').setScale(0.6).setOrigin(0, 0);
        //player stats
        player.health = 150;
        player.maxHealth = 150;
        player.xp = 0;
        player.maxXp = get_necessary_xp(player_level);

        //gun
        gun = this.physics.add.sprite(45, 50, 'gun').setScale(0.25);
        bullet = this.physics.add.sprite(width / 2, height / 2, 'bullet').setScale(0.3).setVisible(false);

        enemy_group = this.physics.add.group();
        this.physics.add.collider(enemy_group);
        spawnEnemies(this, 70);

        test = this.time.now;
        the = this;

        playerWithGun = this.add.container(width / 2, height / 2, [shadow, player, gun, bullet]).setDepth(3);
        this.physics.world.enable(playerWithGun);

        //playerWithGun.setCollideWorldBounds(true);
        mouse = this.input.mousePointer;

        // animations

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 11
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('run', {
                start: 0,
                end: 12
            }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'enemyIdle',
            frames: this.anims.generateFrameNumbers('enemy', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'bloodThing',
            frames: this.anims.generateFrameNumbers('blood', {
                start: 0,
                end: 12
            }),
            frameRate: 40,
            repeat: 0
        });

        this.anims.create({
            key: 'bloodPlayer',
            frames: this.anims.generateFrameNumbers('bloodPlayer', {
                start: 0,
                end: 12
            }),
            frameRate: 40,
            repeat: 0
        });

        enemy_group.playAnimation('enemyIdle');

        emitter = this.add.particles('bullet').createEmitter({
            speed: 120,
            scale: {
                start: 0.1,
                end: 0
            },
            blendMode: 'ADD',
            frequency: -1
        });

        rectangle = this.add.rectangle(100, 800, width * 2, 150, 0x1a1d2d).setDepth(6);

        // health bar
        bgHealthBar = this.add.image(40, 755, 'bgHealthBar').setScale(1.5).setOrigin(0, 0).setDepth(7);
        healthBar = this.add.image(55, 761, 'healthBar').setScale(1.5).setOrigin(0, 0).setDepth(7);

        //XP bar
        bgXpBar = this.add.image(140, 755, 'bgXpBar').setScale(1.5).setOrigin(0, 0).setDepth(7);
        xpBar = this.add.image(155, 761, 'xpBar').setScale(1.5).setOrigin(0, 0).setDepth(7);
        xpBar.setScale(player.xp, 1.5);

        // custom keys
        keys = this.input.keyboard.addKeys("W,A,S,D,SPACE");
        input = this.input;

        worldBounds = this.physics.world.bounds;

        this.physics.add.collider(playerWithGun, enemy_group, (playerWithGun, enemy_group) => {}, null, this);

        this.input.keyboard.on('keydown-SPACE', function (event) {
            this.scene.pause();
            this.scene.launch('pauseScene')
        }, this);

        // add sound effects
        gunSound = this.sound.add("gunShot", {
            loop: false,
            volume: 0.2
        });
        mainMusic = this.sound.add("mainMusic", {
            loop: true,
            volume: 0.3
        });
        collectOrbs = this.sound.add("collectOrbs", {
            loop: false,
            volume: 0.3
        });
        levelUpSound = this.sound.add("levelUpSound", {
            loop: false,
            volume: 0.4
        });
        mainMusic.play();

        //this.scene.add(this, IncreaseSpeed, false);
        //this.scene.get('increase_speed').events.on('upgrade-action', speed => playerSpeed = speed);
        this.scene.get('upgradeScene').events.on('upgrade-action-speed', speed => playerSpeed += speed = speed);
        this.scene.get('upgradeScene').events.on('upgrade-action-firerate', firerate => tick += firerate = firerate);
        this.scene.get('upgradeScene').events.on('upgrade-action-damage', damage => bullet_damage += damage = damage);
    }

    update() {

        if (keys.A.isDown) {
            playerDirectionX -= 1;
            player.flipX = true;
            player.play('run', true);
        }
        if (keys.D.isDown) {
            playerDirectionX += 1;
            player.flipX = false;
            player.play('run', true);
        }
        if (keys.W.isDown) {
            playerDirectionY -= 1;
            player.play('run', true);
        }
        if (keys.S.isDown) {
            playerDirectionY += 1;
            player.play('run', true);
        }

        // clamp velocity and multiply by speed
        playerDirectionY = Math.min(Math.max(playerDirectionY, -1), 1);
        playerDirectionX = Math.min(Math.max(playerDirectionX, -1), 1);
        // set player velocity
        playerWithGun.body.setVelocityX(playerDirectionX * playerSpeed);
        playerWithGun.body.setVelocityY(playerDirectionY * playerSpeed);
        // reset velocity values
        playerDirectionX = 0;
        playerDirectionY = 0;

        // set idle animation when standing in one spot
        if (playerWithGun.body.velocity.x == 0 && playerWithGun.body.velocity.y == 0) {
            player.play('idle', true)
        }

        let angle = Phaser.Math.Angle.Between(playerWithGun.x + ((126 * 0.6) / 2), playerWithGun.y + ((126 * 0.6) / 2), input.x, input.y);
        gun.setRotation(angle);

        // if (mouse.isDown && control == false) {
        //     //for fire again
        //     bullet = this.physics.add.sprite(playerWithGun.x + 45 , playerWithGun.y + 50 , 'bullet').setScale(0.15);
        //     //move to mouse position 
        //     this.physics.moveTo(bullet, input.x, input.y, 500);
        //     bullet.setRotation(angle + Math.PI / 2);
        //     control = true;
        //     emitter.setPosition(playerWithGun.x + 50, playerWithGun.y + 60);
        //     emitter.explode(1);
        //     player.anims.pause(player.anims.currentAnim.frames[0]);
        //     this.physics.add.overlap(bullet, enemy_group, destroy, null, this);
        // }

        if (!mouse.isDown) {
            control = false;
        }

        tick += 1;
        if (tick > 8) {
            tick = 0;
            //for fire again
            bullet = this.physics.add.sprite(playerWithGun.x + 45, playerWithGun.y + 50, 'bullet').setScale(0.15);
            bullet.bullet_damage = 1;
            //move to mouse position 
            this.physics.moveTo(bullet, input.x, input.y, 500);
            bullet.setRotation(angle + Math.PI / 2);
            control = true;
            emitter.setPosition(playerWithGun.x + 50, playerWithGun.y + 60);
            emitter.explode(1);
            gunSound.play();
            player.anims.pause(player.anims.currentAnim.frames[0]);
            this.physics.add.overlap(bullet, enemy_group, destroy, null, this);
        }

        if (!mouse.isDown) {
            control = false;
        }

        enemy_group.getChildren().forEach(enemy => {
            this.physics.moveTo(enemy, player.body.position.x, player.body.position.y, 50)
        });

    }
}

function spawnEnemies(the, count) {
    for (let i = 0; i < count; i++) {
        let new_enemy_pos = getRandomSpawnPosition();
        enemy = the.physics.add.sprite(new_enemy_pos[0], new_enemy_pos[1], 'enemy').setDepth(5);
        enemy.setBounce(1);
        enemy_group.add(enemy);
        enemy.damage = 1;
        enemy.enemy_health = 3;
        the.physics.add.overlap(enemy, player, enemyAttack, null, the);
        total++;

    }

}

function getRandomSpawnPosition() {
    const dist = (Math.random() * (10 - 5) + 5) | 0;
    let x = 0;
    let y = 0;
    let w = width;
    let h = height;
    x += dist;
    y += dist;
    w -= dist * 2
    h -= dist * 2
    if (Math.random() < w / (w + h)) { // top bottom
        x = Math.random() * w + x;
        y = Math.random() < 0.5 ? y : y + h - 1;
    } else {
        y = Math.random() * h + y;
        x = Math.random() < 0.5 ? x : x + w - 1;
    }
    return [x | 0, y | 0];
}

function destroy(bullet, enemy) {
    bullet.destroy();
    enemy.enemy_health -= bullet.bullet_damage;
    if (enemy.enemy_health <= 0) {
        bullet.destroy();
        enemy.disableBody(true, true);
        blood = this.add.sprite(enemy.body.position.x, enemy.body.position.y, 'blood').setScale(1.5).setDepth(1);
        blood.play('bloodThing');
        xpPoint = this.physics.add.sprite(enemy.body.position.x, enemy.body.position.y + 50, 'xpPoint').setScale(1.3);
        this.physics.add.collider(xpPoint);
        xpPoint.value = 5;
        this.physics.add.overlap(xpPoint, player, collectXp, null, this);
        timedEvent = this.time.delayedCall(3000, removeBlood, [blood], this);
    }


}

function enemyAttack(enemy, player) {
    player.health -= enemy.damage;
    healthBar.setScale((player.health / player.maxHealth) * 1.5, 1.5);
    if (player.health <= 0) {
        die(player);
        
    }
}

function die(player) {
    playerWithGun.removeAll();
    player.disableBody(true);
    player.setVisible(false);
    gun.setVisible(false);
    shadow.setVisible(false);
    bloodPlayer = the.add.sprite(playerWithGun.body.position.x + 50, playerWithGun.body.position.y + 50 , 'bloodPlayer').setScale(2.5).setDepth(1);
    bloodPlayer.play('bloodPlayer');
    mainMusic.stop();
    the.time.addEvent({
        delay: 1000,
        callback: ()=>{
            the.scene.pause();
        },
        loop: true
    })
    //the.scene.pause();

    
    //the.scene.start('startScene');
}

function collectXp(xpPoint, player) {
    player.xp += xpPoint.value;
    xpPoint.destroy();
    collectOrbs.play();
    let level_progress = (player.xp / get_necessary_xp(player_level)) * 1.5;
    xpBar.setScale(level_progress, 1.5);
    // check for level up
    if (level_progress >= 1.5) {
        level_up();
    }

}

function get_necessary_xp(lvl) {
    return 100 + lvl * lvl * xp_modifier;
}

function level_up() {
    player_level += 1;
    player.xp = 0;
    xpBar.setScale(0.0, 1.5);
    console.log('level up');
    levelUpSound.play();
    the.scene.pause();
    the.scene.launch('upgradeScene');
}

function removeBlood(blood) {
    this.tweens.add({
        targets: blood,
        duration: 1000,
        delay: 0,
        alpha: 0,
        repeat: 0,
        yoyo: false,
        onComplete: () => {
            blood.setAlpha(0);
            blood.destroy();
        }
    });

}

// time_event = this.time.addEvent({ delay: 3000, callback: onEvent, callbackScope: this, loop: true });