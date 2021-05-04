/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Endless Runner
** Game Title: Sharkbu-Sharkbu
** Date: May 3, 2021
*/

class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.load.path = './assets/';
        // load images asset
        this.load.image('menuBackground', 'menu1.png');
        this.load.image('logo', 'Game_Logo_2.png');
        this.load.image('sea', 'background2.png');
        this.load.image('sea2', 'background3.png');
        this.load.image('sharks', 'SHARK_new.png');
        this.load.image('whales', 'Orca.png');
        this.load.image('items', 'Surfboard.png');
        // load audio asset
        this.load.audio('select', 'select.wav');
        this.load.audio('bgm', 'CMPM120_BGM.wav');
        this.load.audio('death', 'dead.wav');
        this.load.audio('over', 'Game_Over_1.wav');
        // load custom spritesheet
        this.load.spritesheet('swim', 'Swim_animation_2_320_x_320.png', {
            frameWidth: 105,
            frameHeight: 105,
            startFrame: 0,
            endFrame: 7
        });
        this.load.spritesheet('bloodExplode', 'blood.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() {
        // animation config
        this.anims.create({
            key: 'player',
            frames: this.anims.generateFrameNumbers('swim', {
                start: 0,
                end: 7,
                first: 0
            }),
            repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'bloods',
            frames: this.anims.generateFrameNumbers('bloodExplode', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        this.scene.start('menuScene');
    }
}