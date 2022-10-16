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

let current_level_text;

let damage;
let the;
let total;
let test;

let blood;
let bloodPlayer;
let bloodTwo;
let bloodBoss;

let playerDirectionY = 0;
let playerDirectionX = 0;
let playerSpeed = 250;
let tick = 0;
let something = 10;
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
let collectHeartSound;
let levelUpSound;
let gameoverSound;

let enemy;
let enemy_group;
let enemy_health;
let enemy_wave;

let enemyTwo;
let enemyTwo_group;
let enemyTwo_health;
let enemyTwo_wave;
let enemyTwo_damage;
let enemyTwo_timer;

let boss;
let boss_group;
let rect;
let boss_timer;
let boss_speed;
let boss_health;
let boss_damage;

let heartPoints;
let heartPoints_value;

let customCursor;
let graphics;

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
			frameWidth: 72,
			frameHeight: 72
		});

		this.load.spritesheet('enemyTwo', 'Assets/Enemy/enemyTwo.png', {
			frameWidth: 72,
			frameHeight: 72
		});

		this.load.spritesheet('blood', 'Assets/Particles/blood.png', {
			frameWidth: 100,
			frameHeight: 100
		});

		this.load.spritesheet('bloodTwo', 'Assets/Particles/bloodTwo.png', {
			frameWidth: 100,
			frameHeight: 100
		});

		this.load.spritesheet('bloodPlayer', 'Assets/Particles/bloodPlayer.png', {
			frameWidth: 100,
			frameHeight: 100
		});

		this.load.spritesheet('bloodBoss', 'Assets/Particles/bloodBoss.png', {
			frameWidth: 100,
			frameHeight: 100
		});

		this.load.image('bgHealthBar', 'Assets/UI/bgHealthBar.png');
		this.load.image('healthBar', 'Assets/UI/healthBar.png');

		this.load.image('bgXpBar', 'Assets/UI/bgXpBar.png');
		this.load.image('xpBar', 'Assets/UI/xpBar.png');

		this.load.image('xpPoint', 'Assets/Enemy/xpPoint.png');
		this.load.image('heartPoints', 'Assets/Enemy/heart.png'); //cuori

		// audio !!
		this.load.audio("gunShot", ["Assets/Sounds/gunShot.mp3"]);
		this.load.audio("mainMusic", ["Assets/Sounds/mainMusic.mp3"]);
		this.load.audio("collectOrbs", ["Assets/Sounds/collectOrbs.mp3"]);
		this.load.audio("levelUpSound", ["Assets/Sounds/levelUp.mp3"]);
		this.load.audio('collectHeart', ['Assets/Sounds/collectHeart.mp3']);
		this.load.audio('gameover', ['Assets/Sounds/gameover.mp3']);

		// boos
		this.load.spritesheet('boss', 'Assets/Enemy/boss.png', {
			frameWidth: 144,
			frameHeight: 144
		});

		//decorations
		this.load.image('decoration1', 'Assets/World/decoration1.png');
		this.load.image('decoration2', 'Assets/World/decoration2.png');
		this.load.image('rock1', 'Assets/World/rock1.png');
		this.load.image('rock2', 'Assets/World/rock2.png');
		this.load.image('rock3', 'Assets/World/rock3.png');

		this.load.image('grass1', 'Assets/World/grass1.png');
		this.load.image('grass2', 'Assets/World/grass2.png');

	}

	create() {

		width = this.game.canvas.width;
		height = this.game.canvas.height;

		customCursor = this.input.setDefaultCursor('url(Assets/UI/cursor.cur), pointer');
		this.input.manager.canvas.style.cursor = customCursor;

		let map = this.make.tilemap({
			key: "map",
			tileWidth: 32,
			tileHeight: 32
		});
		let tileset = map.addTilesetImage("tileset");
		let layer = map.createLayer("floor", tileset, 0, 0);

		shadow = this.add.ellipse(35, 63, 50, 10, 0x000).setDepth(1);
		player = this.physics.add.sprite(0, 0, 'player').setScale(0.6).setOrigin(0, 0).setSize(126, 126);
		//player stats
		player.health = 200;
		player.maxHealth = 200;
		player.immortal = false;
		player.xp = 0;
		player.maxXp = get_necessary_xp(player_level);

		//gun
		gun = this.physics.add.sprite(45, 50, 'gun').setScale(0.25);
		bullet = this.physics.add.sprite(width / 2, height / 2, 'bullet').setScale(0.3).setVisible(false);

		enemy_group = this.physics.add.group();
		this.physics.add.collider(enemy_group);
		spawnEnemies(this, 20);

		enemyTwo_group = this.physics.add.group();
		this.physics.add.collider(enemyTwo_group);
		//spawnEnemiesTwo(this, 30);

		boss_group = this.physics.add.group();
		this.physics.add.collider(boss_group);

		enemy_wave = this.time.addEvent({
			delay: 10000,
			callback: enemyWave,
			callbackScope: this,
			loop: true
		});

		test = this.time.now;
		the = this;

		playerWithGun = this.add.container(width / 2, height / 2, [shadow, player, gun, bullet]).setDepth(3).setSize(56, 56);
		this.physics.world.enable(playerWithGun);
		playerWithGun.body.setOffset(35, 40)
		
			
		playerWithGun.body.setCollideWorldBounds(true);
		mouse = this.input.mousePointer;

		//boss
		boss_timer = this.time.addEvent({
			delay: 40000,
			callback: spawnBoss,
			callbackScope: this,
			loop: false
		});

		enemyTwo_timer = this.time.addEvent({
			delay: 40000,
			callback: spawnEnemiesTwoTesting,
			callbackScope: this,
			loop: true
		});



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
			key: 'enemyTwoIdle',
			frames: this.anims.generateFrameNumbers('enemyTwo', {
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
			key: 'bloodThingTwo',
			frames: this.anims.generateFrameNumbers('bloodTwo', {
				start: 0,
				end: 12
			}),
			frameRate: 40,
			repeat: 0
		});

		this.anims.create({
			key: 'bloodBoss',
			frames: this.anims.generateFrameNumbers('bloodBoss', {
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

		this.anims.create({
			key: 'bossWalk',
			frames: this.anims.generateFrameNumbers('boss', {
				start: 0,
				end: 3
			}),
			frameRate: 10,
			repeat: -1
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

		//current level text
		current_level_text = this.add.text(950, 755, 'level: ' + player_level, {
			fontFamily: 'dogicaPixel',
			fontSize: '20px',
			align: 'right'
		}).setOrigin(0.0).setDepth(7);

		// custom keys
		keys = this.input.keyboard.addKeys("W,A,S,D,SPACE");
		input = this.input;

		worldBounds = this.physics.world.bounds;

		this.physics.add.collider(playerWithGun, enemy_group, (playerWithGun, enemy_group) => {}, null, this);
		this.physics.add.collider(playerWithGun, enemyTwo_group, (playerWithGun, enemyTwo_group) => {}, null, this);

		this.physics.add.collider(enemy_group, enemyTwo_group, (enemy_group, enemyTwo_group) => {}, null, this);
		this.physics.add.collider(enemy_group, boss_group, (enemy_group, boss_group) => {}, null, this);
		this.physics.add.collider(enemyTwo_group, boss_group, (enemyTwo_group, boss_group) => {}, null, this);

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
		collectHeartSound = this.sound.add('collectHeart', {
			loop: false,
			volume: 0.3
		})
		gameoverSound = this.sound.add('gameover', {
			loop: false,
			volume: 0.3
		})
		mainMusic.play();

		//this.scene.add(this, IncreaseSpeed, false);
		//this.scene.get('increase_speed').events.on('upgrade-action', speed => playerSpeed = speed);
		this.scene.get('upgradeScene').events.on('upgrade-action-speed', speed => playerSpeed += speed = speed);
		this.scene.get('upgradeScene').events.on('upgrade-action-firerate', firerate => something -= firerate = firerate);
		this.scene.get('upgradeScene').events.on('upgrade-action-damage', damage => bullet_damage += damage = damage);

		let decoration1 = this.add.image(200, 200, 'decoration1').setScale(0.5).setDepth(7);
		let decoration2 = this.add.image(900, 400, 'decoration2').setScale(0.6).setDepth(7);
		let rock1 = this.add.image(150, 500, 'rock1').setScale(0.7).setDepth(7);
		let rock2 = this.add.image(300, 600, 'rock2').setScale(0.6).setDepth(7);
		let rock3 = this.add.image(700, 80, 'rock3').setScale(0.5).setDepth(7);

		let grass1 = this.add.image(930, 600, 'grass1').setScale(1);
		let grass2 = this.add.image(900, 300, 'grass2').setScale(1);

		let decoration_group = this.physics.add.staticGroup([decoration1, decoration2, rock1, rock2, rock3, rectangle]);
		this.physics.add.collider(playerWithGun, decoration_group);
		this.physics.add.collider(enemy_group, decoration_group);
		this.physics.add.collider(enemyTwo_group, decoration_group);
		this.physics.add.collider(boss_group, decoration_group);

		this.physics.add.collider(playerWithGun, rectangle);
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
		if (tick > something) {
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
			this.physics.add.overlap(bullet, enemyTwo_group, destroyEnemy2, null, this);
			this.physics.add.overlap(bullet, boss_group, destroyBoss, null, this);
		}

		if (!mouse.isDown) {
			control = false;
		}

		enemy_group.getChildren().forEach(enemy => {
			this.physics.moveTo(enemy, player.body.position.x, player.body.position.y, 50)
		});

		enemyTwo_group.getChildren().forEach(enemyTwo => {
			this.physics.moveTo(enemyTwo, player.body.position.x, player.body.position.y, 70)
		});

		boss_group.getChildren().forEach(boss => {
			this.physics.moveTo(boss, playerWithGun.body.position.x, playerWithGun.body.position.y, boss_speed)
		});



	}
}

function spawnBoss() {
	boss = this.physics.add.sprite(0, 300, 'boss').setScale(0.8)
	this.physics.add.collider(playerWithGun, boss, (playerWithGun, boss) => {}, null, this);
	boss_group.add(boss);
	boss_group.playAnimation('bossWalk');
	boss.boss_health = 100;
	boss.boss_speed = 50,
		boss.boss_damage = 10;
	the.physics.add.overlap(boss, player, bossAttack, null, the);
}

function spawnEnemies(the, count) {
	for (let i = 0; i < count; i++) {
		let new_enemy_pos = getRandomSpawnPosition();
		enemy = the.physics.add.sprite(new_enemy_pos[0], new_enemy_pos[1], 'enemy').setDepth(5).setScale(0.8);
		enemy.setBounce(1);
		enemy_group.add(enemy);
		enemy.damage = 1;
		enemy.enemy_health = 3;
		the.physics.add.overlap(enemy, player, enemyAttack, null, the);
		total++;
	}

}

function spawnEnemiesTwo(the, count) {
	for (let i = 0; i < count; i++) {
		let new_enemy_pos = getRandomSpawnPosition();
		enemyTwo = the.physics.add.sprite(new_enemy_pos[0], new_enemy_pos[1], 'enemyTwo').setDepth(5).setScale(0.8);
		enemyTwo.setBounce(1);
		enemyTwo_group.add(enemyTwo);
		enemyTwo.enemyTwo_damage = 1;
		enemyTwo.enemyTwo_health = 1;
		the.physics.add.overlap(enemyTwo, player, enemyTwoAttack, null, the);
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
	enemyFlash(enemy);
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
		dropHearts();
	}
}

function enemyFlash(enemy) {
	enemy.setTint(0xffffff);
	enemy.tintFill= true;
	the.tweens.add({
		targets: enemy,
	  ease: 'Cubic.easeOut',  
	  duration: 200,
	  onComplete: function () { enemy.clearTint(); }
	  })
}

function playerFlash(player) {
	player.setTint(0xff0000);
	player.tintFill= true;
	the.tweens.add({
		targets: player,
	  ease: 'Cubic.easeOut',  
	  duration: 200,
	  onComplete: function () { player.clearTint(); }
	  })
}

function setPlayerImmortal(player) {
	player.immortal = true;
	the.tweens.add({
		targets: player,
		ease: 'Cubic.easeOut',  
		duration: 200,
		onComplete: function () { player.immortal = false; }
	})
}

function destroyEnemy2(bullet, enemyTwo) {
	bullet.destroy();
	enemyTwo.enemyTwo_health -= bullet.bullet_damage;
	if (enemyTwo.enemyTwo_health <= 0) {
		bullet.destroy();
		enemyTwo.disableBody(true, true);
		bloodTwo = this.add.sprite(enemyTwo.body.position.x, enemyTwo.body.position.y, 'bloodTwo').setScale(1.5).setDepth(1);
		bloodTwo.play('bloodThingTwo');
		xpPoint = this.physics.add.sprite(enemyTwo.body.position.x, enemyTwo.body.position.y + 50, 'xpPoint').setScale(1.3);
		this.physics.add.collider(xpPoint);
		xpPoint.value = 6;
		this.physics.add.overlap(xpPoint, player, collectXp, null, this);
		timedEvent = this.time.delayedCall(3000, removeBloodTwo, [bloodTwo], this);
	}
}

function destroyBoss(bullet, boss) {
	bullet.destroy();
	boss.boss_health -= bullet.bullet_damage;
	if (boss.boss_health <= 0) {
		bullet.destroy();
		boss.disableBody(true, true);
		bloodBoss = this.add.sprite(boss.body.position.x, boss.body.position.y, 'bloodBoss').setScale(2).setDepth(1);
		bloodBoss.play('bloodBoss');
		xpPoint = this.physics.add.sprite(boss.body.position.x, boss.body.position.y + 50, 'xpPoint').setScale(1.3);
		this.physics.add.collider(xpPoint);
		xpPoint.value = 10;
		this.physics.add.overlap(xpPoint, player, collectXp, null, this);
		timedEvent = this.time.delayedCall(5000, removeBloodBoss, [bloodBoss], this);
	}
}

function enemyAttack(enemy, player) {
	dealDamageToPlayer(enemy.damage, player);
}

function enemyTwoAttack(enemyTwo, player) {
	dealDamageToPlayer(enemyTwo.enemyTwo_damage, player);
}

function bossAttack(boss, player) {
	dealDamageToPlayer(boss.boss_damage, player);
}

function dealDamageToPlayer(damage, player) {
	if (player.immortal == true){
		return;
	}
	player.health -= damage;
	healthBar.setScale((player.health / player.maxHealth) * 1.5, 1.5);
	if (player.health <= 0) {
		die(player);
	}
	else {
		playerFlash(player);
		setPlayerImmortal(player);
	}
}

function enemyWave() {
	spawnEnemies(this, 10);
	enemy_group.playAnimation('enemyIdle');
}

function spawnEnemiesTwoTesting() {
	spawnEnemiesTwo(this, 10);
	enemyTwo_group.playAnimation('enemyTwoIdle');
}

function die(player) {
	playerWithGun.removeAll();
	player.disableBody(true);
	player.setVisible(false);
	gun.setVisible(false);
	shadow.setVisible(false);
	bloodPlayer = the.add.sprite(playerWithGun.body.position.x + 50, playerWithGun.body.position.y + 50, 'bloodPlayer').setScale(2.5).setDepth(1);
	bloodPlayer.play('bloodPlayer');
	mainMusic.stop();
	gameoverSound.play();
	the.time.addEvent({
		delay: 600,
		callback: () => {
			the.scene.stop('game');
			the.scene.start('gameOver');

			// reset initial values
			player_level = 1;
			playerSpeed = 250;
			bullet_damage = 1;
		},
		loop: true
	})
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
	//player.health = player.maxHealth
	current_level_text.setText("level: " + player_level);
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

function removeBloodTwo(bloodTwo) {
	this.tweens.add({
		targets: bloodTwo,
		duration: 1000,
		delay: 0,
		alpha: 0,
		repeat: 0,
		yoyo: false,
		onComplete: () => {
			bloodTwo.setAlpha(0);
			bloodTwo.destroy();
		}
	});
}

function removeBloodBoss(bloodBoss) {
	this.tweens.add({
		targets: bloodBoss,
		duration: 1000,
		delay: 0,
		alpha: 0,
		repeat: 0,
		yoyo: false,
		onComplete: () => {
			bloodBoss.setAlpha(0);
			bloodBoss.destroy();
		}
	});

}

function dropHearts() {
	if(Phaser.Math.Between(1, 5) === 5){
		heartPoints = the.physics.add.sprite(enemy.body.position.x, enemy.body.position.y, 'heartPoints').setScale(0.8);
		the.physics.add.collider(heartPoints);
		heartPoints.heartPoints_value = 5;
		the.physics.add.overlap(heartPoints, player, collectHearts, null, the);
	}
}

function collectHearts(heartPoints, player) {
	heartPoints.destroy();
	player.health += heartPoints.heartPoints_value;
	healthBar.setScale((player.health / player.maxHealth) * 1.5, 1.5);
	collectHeartSound.play();

}

