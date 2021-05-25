/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: 
** Date: 
*/

class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }

    create() {
        let creditConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // add back button
        this.backButton = this.add.text(game.config.width/16, game.config.height/4 + borderUISize + borderPadding + 300, 'BACK', creditConfig).setOrigin(0.5);
        // set interactive that can go back to the menu scene
        this.backButton.setInteractive();
        this.backButton.on('pointerdown', () => {
            this.selectSound = this.sound.add('select', {
                mute: false,
                volume: 1,
                rate: 1,
                loop: false 
            });
            this.selectSound.play();
            this.scene.start('menuScene');
        })

        // add credits
        this.person01 = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding + 8, "Gameplay Programming by Zhendong Jiang", creditConfig).setOrigin(0.5);
        this.person02 = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding + 64, "Artwork and Sound Design by Jiahui Li & Nathan Pon", creditConfig).setOrigin(0.5);
    }
}