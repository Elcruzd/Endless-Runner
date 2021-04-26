/* 
** Name: Zhendong Jiang
** Porject: Endless Runner
** Date: April 22, 2021
*/

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.seawave = this.add.tileSprite(0, 0, 640, 480, 'sea').setOrigin(0, 0);

        this.sharkSpeed = -450;
        this.sharkMaxSpeed = -1000;
        level = 0;
        this.extremeMode = false;
        this.shadowLock = false;

        // add bgm
        this.bgm = this.sound.add('bgm', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        
        p1Swimmer = this.physics.add.sprite(32, game.config.height/2, 'player').setOrigin(0.5);
        p1Swimmer.setImmovable();
        p1Swimmer.setMaxVelocity(0, 600);
        p1Swimmer.setDragY(200);
        p1Swimmer.setDepth(1);
        p1Swimmer.destroyed = false;
        p1Swimmer.anims.play('swim', true);

        this.sharkGroup = this.add.group({
            runChildUpdate: true
        });

        this.time.delayedCall(2500, () => {
            this.addSharks();
        });

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
        this.seawave.tilePositionX -= waveSpeed;
    }

    p1SwimmerCollision() {
        p1Swimmer.destroyed = true;
        p1Swimmer.destory();
    }
}