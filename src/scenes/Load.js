class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.load.path = './assets/';
        // this.load.image('', 'img/.png');
        // load audio asset
        // load custom spritesheet
        this.load.spritesheet('player', './assets/Swim_animation.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 7
        });
        this.load.spritesheet('sharks', './assets/SHARK.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 2
        });
        this.load.spritesheet('waves', './assets/Endless_Runner_Waves.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        });
        this.load.audio('bgm', './assets/CMPM120_BGM.wav');
    }

    create() {
        this.seawave = this.add.tileSprite(0, 0, 640, 480, 'waves').setOrigin(0, 0);

        this.anims.create({
            key: 'player',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 7,
                first: 0
            }),
            repeat: -1,
            frameRate: 20
        });
        this.anims.create({
            key: 'sharks',
            frames: this.anims.generateFrameNumbers('sharks', {
                start: 0,
                end: 2,
                first: 0
            }),
            repeat: -1,
            frameRate: 20
        });

        this.scene.start('menuScene');
    }
}