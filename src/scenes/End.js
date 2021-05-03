class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    create() {
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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'GAME OVER', endConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press SPACE to Restart', endConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press LEFT Arrow for Menu', endConfig).setOrigin(0.5);
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(cursors.left)) {
            this.scene.start('menuScene');
        }
    }
}