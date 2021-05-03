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
        // place menu background
        this.add.image(0, 0, 'menuBackground').setOrigin(0, 0);
        
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2, 'Click to Play', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64 , 'Press UP & DOWN  ARROWS to move', menuConfig).setOrigin(0.5);
        
        // define keys
        // cursors = this.input.keyboard.createCursorKeys();
        this.input.on('pointerdown', () => this.scene.start('playScene'));
    }

    update() {
    //     if(cursors.right.isDown) {
    //         this.scene.start('playScene');
    //     }
    }
}
