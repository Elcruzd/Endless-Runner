/* 
** Name: Zhendong Jiang
** Porject: Rocket Patrol Mods
** Date: April 16, 2021
** 
*/

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load menu background
        // this.load.image('menu', './assets/menubackground.jpg');
        // load background audio
        this.load.audio('bgm', './assets/CMPM120_BGM.wav');
    }

    create() {
        // // place menu background
        // this.add.image(0, 0, 'menu').setOrigin(0, 0);

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3b141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        // this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        // this.add.text(game.config.width/2, game.config.height/2, 'Use ← → arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        // menuConfig.backgroundColor = '#ffffff';
        // menuConfig.color = '#000';
        // this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        
        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // add bm
        let backgroundMusic = this.sound.add('bm');
        // looping bm
        backgroundMusic.loop = true;
        backgroundMusic.play();
    }

    update() {
        // if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //     // easy mode
        //     game.settings = {
        //         spaceshipSpeed: 3,
        //         gameTimer: 60000
        //     }
        //     this.sound.play('sfx_select');
        //     this.scene.start('playScene');
        // }
        // if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        //     // hard mode
        //     game.settings = {
        //         spaceshipSpeed: 4,
        //         gameTimer: 45000
        //     }
        //     this.sound.play('sfx_select');
        //     this.scene.start('playScene');
        // }
    }
}
