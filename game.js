let player;
let width;
let height;
let keys;
let gun;
let playerWithGun;
let input;
let bullet;
let mouse;
let control = false;
let worldBounds;
let emitter;
let emitterBlood;
let particles;
let rectangle;
let enemy;
let enemy_group;
let the;
let total;
let test;

let blood;
let playerDirectionY = 0;
let playerDirectionX = 0;
let playerSpeed = 300;
let tick = 0;
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
        this.load.spritesheet('enemy', 'Assets/Enemy/enemy.png' , {
            frameWidth: 48,
            frameHeight: 48
        });
        this.load.spritesheet('blood', 'Assets/Particles/blood.png' , {
            frameWidth: 100,
            frameHeight: 100
        });

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

        rectangle = this.add.rectangle(100, 800, width * 2, 150, 0x1a1d2d);

        player = this.physics.add.sprite(0, 0, 'player').setScale(0.6).setOrigin(0, 0);
        gun = this.physics.add.sprite(45, 50, 'gun').setScale(0.25);
        bullet = this.physics.add.sprite(width / 2, height / 2, 'bullet').setScale(0.3).setVisible(false);

        enemy_group = this.physics.add.group();
        this.physics.add.collider(enemy_group);
        spawnEnemies(this, 20);


        test = this.time.now;
        the = this;

        playerWithGun = this.add.container(width / 2, height / 2, [player, gun, bullet]);
        this.physics.world.enable(playerWithGun);

        mouse = this.input.mousePointer;

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



        keys = this.input.keyboard.addKeys("W,A,S,D");
        input = this.input;

        worldBounds = this.physics.world.bounds;

        this.physics.add.collider(playerWithGun, enemy_group, (playerWithGun, enemy_group) => {
            //console.log('collision');
        }, null, this);

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
        if (playerWithGun.body.velocity.x == 0 && playerWithGun.body.velocity.y == 0){
            player.play('idle', true)
        }

        let angle = Phaser.Math.Angle.Between(playerWithGun.x + ((126 * 0.6) /2), playerWithGun.y + ((126 * 0.6) /2), input.x, input.y);
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

        // if (!mouse.isDown) {
        //     control = false;
        // }
        tick += 1;
        if (tick > 8) {
            tick = 0;
            //for fire again
            bullet = this.physics.add.sprite(playerWithGun.x + 45 , playerWithGun.y + 50 , 'bullet').setScale(0.15);
            //move to mouse position 
            this.physics.moveTo(bullet, input.x, input.y, 500);
            bullet.setRotation(angle + Math.PI / 2);
            control = true;
            emitter.setPosition(playerWithGun.x + 50, playerWithGun.y + 60);
            emitter.explode(1);
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
        enemy = the.physics.add.sprite(new_enemy_pos[0], new_enemy_pos[1], 'enemy');
        enemy.setBounce(1);
        //enemy.damage = 1;
        enemy_group.add(enemy);
        //the.physics.add.overlap(enemy, player, enemyAttack, null, the);
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
    enemy.disableBody(true, true);
    blood = this.add.sprite(enemy.body.position.x, enemy.body.position.y, 'blood').setScale(1.5);
    blood.play('bloodThing');
}
