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

    create() {
        this.seawave = this.add.tileSprite(0, 0, 640, 480, 'waves').setOrigin(0, 0);

        // add bgm
        this.bgm = this.sound.add('bgm', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

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

        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        
        p1Swimmer = this.physics.add.sprite(32, borderY, 'player').setOrigin(0.5);
        p1Swimmer.anims.play('player', true);

        // initialize score
        this.p1Score = 0;

        // display score
        // let scoreConfig = {
        //     fontFamily: 'Courier',
        //     fontSize: '28px',
        //     backgroundColor: '#F3b141',
        //     color: '#843605',
        //     align: 'right',
        //     padding: {
        //         top: 5,
        //         bottom: 5,
        //     },
        //     fixedWidth: 100
        // }
        // this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // // display high score
        // let highScoreConfig = {
        //     fontFamily: 'Courier',
        //     fontSize: '28px',
        //     backgroundColor: '#F3b141',
        //     color: '#843605',
        //     align: 'right',
        //     padding: {
        //         top: 5,
        //         bottom: 5,
        //     },
        //     fixedWidth: 0
        // }
        // this.highScoreLeft = this.add.text(borderUISize + borderPadding*45.5, borderUISize + borderPadding*2, p1HighScore, highScoreConfig);

        // // display time remain
        // let timeConfig = {
        //     fontFamily: 'Courier',
        //     fontSize: '28px',
        //     backgroundColor: '#F3b141',
        //     color: '#843605',
        //     align: 'right',
        //     padding: {
        //         top: 5,
        //         bottom: 5,
        //     },
        //     fixedWidth: 0
        // }
        // this.timeRemain = game.settings.gameTimer;
        // this.timeLeft = this.add.text(borderUISize + borderPadding*65.5, borderUISize + borderPadding*2, '', timeConfig);

        // // GAME OVER flag
        // this.gameOver = false;

        // // 60-second play clock
        // scoreConfig.fixedWidth = 0;
        // this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        //     this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        //     this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        //     this.gameOver = true;
        // }, null, this);
        this.sharkGroup = this.add.group({
            runChildUpdate: true
        });

        this.time.delayedCall(2500, () => {
            this.addSharks();
        });
    }

    addSharks() {
        let movementSpeed = Phaser.Math.Between(0, 50);
        let sharks = new Sharks(this, this.sharkSpeed - movementSpeed);
        this.sharkGroup.add(sharks);
    }

    update() {
        if(!p1Swimmer.destroyed) {
            if(Phaser.Input.Keyboard.JustDown(keyUP)) {
                p1Swimmer.body.velocity.y -= p1SwimmerVelocity;
            } else if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                p1Swimmer.body.velocity.y += p1SwimmerVelocity;
            }
            this.physics.world.collide(p1Swimmer, this.sharkGroup, this.p1SwimmerCollision, null, this);
        }
    //     // check key input for restart
    //     if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
    //         this.scene.restart();
    //     }

    //     if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
    //         this.scene.start("menuScene");
    //     }
        
    //     this.starfield.tilePositionX -= starSpeed;

    //     if(!this.gameOver) {
    //         this.p1Rocket.update();         // update rocket sprite
    //         this.ship01.update();           // update spaceships (x3)
    //         this.ship02.update();
    //         this.ship03.update();
    //         this.ship04.update();

    //         // check time elapsed of the clock
    //         this.timeRemain = ((game.settings.gameTimer - this.clock.getElapsed()) / 1000).toFixed(0);
    //         this.timeLeft.text = this.timeRemain;
    //     }

    //     // check collisions
    //     if(this.checkCollision(this.p1Rocket, this.ship03)) {
    //         this.p1Rocket.reset();
    //         this.shipExplode(this.ship03);
    //     }
    //     if(this.checkCollision(this.p1Rocket, this.ship02)) {
    //         this.p1Rocket.reset();
    //         this.shipExplode(this.ship02);
    //     }
    //     if(this.checkCollision(this.p1Rocket, this.ship01)) {
    //         this.p1Rocket.reset();
    //         this.shipExplode(this.ship01);
    //     }
    //     if(this.checkCollision(this.p1Rocket, this.ship04)) {
    //         this.p1Rocket.reset();
    //         this.shipExplode(this.ship04);
    //     }

        // check high score and update it
        // if(this.p1Score > p1HighScore) {
        //     p1HighScore = this.p1Score;
        // }
        // this.highScoreLeft.text = p1HighScore;

    // checkCollision(rocket, ship) {
    //     // simple AABB checking
    //     if(rocket.x < ship.x + ship.width && 
    //        rocket.x + rocket.width > ship.x &&
    //        rocket.y < ship.y + ship.height &&
    //        rocket.height + rocket.y > ship.y) {
    //            return true;
    //        } else {
    //            return false;
    //        }
    // }
    
    // shipExplode(ship) {
    //     // temporarily hide ship
    //     ship.alpha = 0;
    //     // create explosion sprite at ship's position
    //     let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    //     boom.anims.play('explode');
    //     boom.on('animationcomplete', () => {
    //         ship.reset();
    //         ship.alpha = 1;
    //         boom.destroy();
    //     });
    //     // score add and repaint
    //     this.p1Score += ship.points;
    //     this.scoreLeft.text = this.p1Score;

    //     this.sound.play('sfx_explosion');
    }
}