

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload(){

        this.load.image('tileset', 'Assets/World/tileset.png');
        this.load.tilemapTiledJSON('map', 'Assets/World/map.tmj');

    }

    create() {

        const map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 32});
        const tileset = map.addTilesetImage("tileset");
        const layer = map.createLayer("floor", tileset, 0, 0);


    }

    update() {
    
    }
}
