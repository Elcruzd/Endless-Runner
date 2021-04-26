/* 
** Name: Zhendong Jiang
** Porject: Rocket Patrol Mods
** Date: April 16, 2021
** 
*/

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        // this.load.image('rocket', './assets/rocket2.png');
        this.load.image('smallship', './assets/spaceship4.png');
        this.load.image('starfield', './assets/starfield.png');
        
        // load custom spritesheet
        this.load.spritesheet('rocket', './assets/rocket1.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        });
        this.load.spritesheet('spaceship', './assets/spaceship1.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        });
        this.load.spritesheet('explosion', './assets/explosion1.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 7
        });
    }

    create() {
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00ff00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xF0B774).setOrigin(0, 0);
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x21130D).setOrigin(0, 0);
        // this.add.rectangle(0, 0, borderUISize, game.config.height, 0x21130D).setOrigin(0, 0);
        // this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x21130D).setOrigin(0, 0);

        // add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0, 0);
        this.ship04 = new Smallship(this, game.config.width + borderUISize*6, borderPadding*8, 'smallship', 0, 60).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // define mouse control
        // credit below:
        // https://stackoverflow.com/questions/57937300/how-to-check-if-the-mouse-is-over-a-gameobject-in-phaser-3
        // https://phaser.discourse.group/t/how-do-i-make-camera-follow-sprite-and-sprite-follow-mouse-at-the-same-time-solved/520
        this.input.on('pointermove', function (pointer) {
            this.p1Rocket.x = pointer.x
        }, this);
        mouse = this.input.mousePointer;

        // animation config
        this.anims.create({
            key: 'rFire',
            frames: this.anims.generateFrameNumbers('rocket', {
                start: 0,
                end: 3,
                first: 0
            }),
            repeat: -1,
            frameRate: 20
        });
        this.anims.create({
            key: 'sFire',
            frames: this.anims.generateFrameNumbers('spaceship', {
                start: 0,
                end: 3,
                first: 0
            }),
            repeat: -1,
            frameRate: 20
        });
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 7,
                first: 0
            }),
            frameRate: 30
        });
        // play engine fire animation
        this.p1Rocket.play('rFire');
        this.ship01.play('sFire');
        this.ship02.play('sFire');
        this.ship03.play('sFire');

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3b141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // display FIRE UI
        let fireConfig = {
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
        this.fire = this.add.text(borderUISize + borderPadding*30, borderUISize + borderPadding*2, 'FIRE', fireConfig);

        // display high score
        let highScoreConfig = {
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
        this.highScoreLeft = this.add.text(borderUISize + borderPadding*45.5, borderUISize + borderPadding*2, p1HighScore, highScoreConfig);

        // display time remain
        let timeConfig = {
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
        this.timeRemain = game.settings.gameTimer;
        this.timeLeft = this.add.text(borderUISize + borderPadding*65.5, borderUISize + borderPadding*2, '', timeConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        this.starfield.tilePositionX -= starSpeed;

        // // update rocket
        // this.p1Rocket.update();
        // // update spaceships (x3)
        // this.ship01.update();
        // this.ship02.update();
        // this.ship03.update();

        if(!this.gameOver) {
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();

            // check time elapsed of the clock
            this.timeRemain = ((game.settings.gameTimer - this.clock.getElapsed()) / 1000).toFixed(0);
            this.timeLeft.text = this.timeRemain;
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }

        // check high score and update it
        if(this.p1Score > p1HighScore) {
            p1HighScore = this.p1Score;
        }
        this.highScoreLeft.text = p1HighScore;
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if(rocket.x < ship.x + ship.width && 
           rocket.x + rocket.width > ship.x &&
           rocket.y < ship.y + ship.height &&
           rocket.height + rocket.y > ship.y) {
               return true;
           } else {
               return false;
           }
    }
    
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }
}