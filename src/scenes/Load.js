/* 
** Name: Zhendong Jiang
** Porject: Endless Runner
** Date: April 22, 2021
*/

class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('sea', 'Endless_Runner_Waves3.png');
        // load audio asset
        this.load.audio('bgm', 'CMPM120_BGM.wav');
        // load custom spritesheet
        this.load.spritesheet('player', 'rocket1.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        });
        this.load.spritesheet('sharks', 'spaceship1.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        });
    }

    create() {
        // animation config
        this.anims.create({
            key: 'swim',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 3,
                first: 0
            }),
            repeat: -1,
            frameRate: 20
        });
        this.anims.create({
            key: 'swimShark',
            frames: this.anims.generateFrameNumbers('sharks', {
                start: 0,
                end: 3,
                first: 0
            }),
            repeat: -1,
            frameRate: 20
        });

        this.scene.start('menuScene');
    }
}