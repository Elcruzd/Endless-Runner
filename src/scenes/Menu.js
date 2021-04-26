/* 
** Name: Zhendong Jiang
** Porject: Endless Runner
** Date: April 22, 2021
*/

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
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
        this.add.text(game.config.width/2, game.config.height/2, 'Use RIGHT ARROWS to start', menuConfig).setOrigin(0.5);
        // menuConfig.backgroundColor = '#ffffff';
        // menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + 64*3 , 'Press UP & DOWN  ARROWS to move', menuConfig).setOrigin(0.5);
        
        // define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('playScene');
        }
    }
}
