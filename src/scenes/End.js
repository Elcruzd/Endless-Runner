/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Endless Runner
** Game Title: Sharkbu-Sharkbu
** Date: May 3, 2021
*/

class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    create() {
        if(localStorage.getItem('timeData') != null) {
            let storedTime = parseInt(localStorage.getItem('timeData'));
            if(gameTime > storedTime) {
                localStorage.setItem('timeData', gameTime.toString());
                p1HighScore = gameTime;
                newHighScore = true;
            } else {
                p1HighScore = parseInt(localStorage.getItem('timeData'));
                newHighScore = false;
            }
        } else {
            p1HighScore = gameTime;
            localStorage.setItem('timeData', p1HighScore.toString());
            newHighScore = true;
        }
        let endConfig = {
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
        if(newHighScore) {
            this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding + 64, 'Your Score: ' + gameTime, endConfig).setOrigin(0.5);
        }
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding + 96, 'High Score: ', + p1HighScore, endConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'GAME OVER', endConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press SPACE to Restart', endConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 160, 'Press LEFT Arrow for Menu', endConfig).setOrigin(0.5);
        this.sound.stopAll();
        this.sound.play('over');
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.sound.stopAll();
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(cursors.left)) {
            this.sound.stopAll();
            this.scene.start('menuScene');
        }
    }
}