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
        if(localStorage.getItem('highscore') != null) {
            let storedTime = parseInt(localStorage.getItem('highscore'));
            if(p1Score > storedTime) {
                localStorage.setItem('highscore', p1Score.toString());
                p1HighScore = p1Score;
                newHighScore = true;
            } else {
                p1HighScore = parseInt(localStorage.getItem('highscore'));
                newHighScore = false;
            }
        } else {
            p1HighScore = p1Score;
            localStorage.setItem('highscore', p1HighScore.toString());
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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding + 64, `Your Score: ${p1Score}s`, endConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding + 96, `High Score: ${p1HighScore}s`, endConfig).setOrigin(0.5);
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
            this.selectSound = this.sound.add('select', {
                mute: false,
                volume: 1,
                rate: 1,
                loop: false 
            });
            this.selectSound.play();
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(cursors.left)) {
            this.sound.stopAll();
            this.selectSound = this.sound.add('select', {
                mute: false,
                volume: 1,
                rate: 1,
                loop: false 
            });
            this.selectSound.play();
            this.scene.start('menuScene');
        }
    }
}