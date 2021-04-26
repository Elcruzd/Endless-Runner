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
        this.load.spritesheet('player', 'Swim_animation.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 7
        });
        this.load.spritesheet('sharks', 'SHARK.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 2
        });
    }

    create() {
        this.scene.start('menuScene');
    }
}