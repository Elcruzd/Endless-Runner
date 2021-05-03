/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Endless Runner
** Game Title: Sharkbu-Sharkbu
** Date: May 3, 2021
*/

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.seawave = this.add.tileSprite(0, 0, 640, 480, 'sea').setOrigin(0, 0);

        this.sharkSpeed = -500;
        this.sharkMaxSpeed = -1500;
        p1Score = 0;

        // add bgm
        this.bgm = this.sound.add('bgm', {
            mute: false,
            volume: 3,
            rate: 1.5,
            loop: true 
        });
        this.bgm.play();

        p1Swimmer = this.physics.add.sprite(64, game.config.height/2, 'player').setOrigin(0.5, 0.5);
        p1Swimmer.setSize(105, 50);
        p1Swimmer.setOffset(0, 20);
        p1Swimmer.body.setCollideWorldBounds(true);
        p1Swimmer.setBounce(0.5);
        p1Swimmer.setImmovable();
        p1Swimmer.setMaxVelocity(0, 300);
        p1Swimmer.setDragY(500);
        p1Swimmer.destroyed = false;
        p1Swimmer.anims.play('player', true);

        this.sharkGroup = this.add.group({
            runChildUpdate: true
        });

        this.time.delayedCall(2500, () => {
            this.addSharks();
        });

        this.whaleGroup = this.add.group({
            runChildUpdate: true
        });
        this.time.delayedCall(1500, () => {
            this.addWhale();
        });
        // this.itemGroup = this.add.group({
        //     runChildUpdate: true
        // })

        // display time
        this.passTimer = this.time.addEvent({
            delay: 1000,
            callback: this.timeIncrease,
            callbackScope: this,
            loop: true
        })
        let timeConfig = {
            fontFamily: 'Chuck',
            fontSize: '28px',
            color: '#black',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.timeDisplay = this.add.text(game.config.width/2, game.config.height/2 - 240, `Time: ${p1Score}s`, timeConfig).setOrigin(0.5, 0);
        cursors = this.input.keyboard.createCursorKeys();
    }

    addSharks() {
        let movementSpeed = Phaser.Math.Between(0, 50);
        let sharks = new Sharks(this, this.sharkSpeed - movementSpeed);
        this.sharkGroup.add(sharks);
    }

    addWhale() {
        let whaleMoveSpeed = Phaser.Math.Between(25, 25);
        let whales = new Whale(this, this.whaleSpeed - whaleMoveSpeed);
        this.whaleGroup.add(whales);
    }

    update(time, delta) {
        let deltaMultiplier = (delta/16.6666667);
        this.seawave.tilePositionX += (waveSpeed) * deltaMultiplier;
        if(!p1Swimmer.destroyed) {
            if(cursors.up.isDown) {
                p1Swimmer.body.velocity.y -= p1SwimmerVelocity;
            } else if(cursors.down.isDown) {
                p1Swimmer.body.velocity.y += p1SwimmerVelocity;
            }
            this.physics.world.collide(p1Swimmer, this.sharkGroup, this.p1SwimmerCollision, null, this);
        }
        // this.increaseTime(delta);
    }

    timeIncrease() {
        p1Score += 1;
        this.timeDisplay.text = `Time: ${p1Score}s`;
        if(p1Score % 5 == 0) {
            console.log(`level: ${p1Score}, speed: ${this.sharkSpeed}`);
            if(this.sharkSpeed >= this.sharkMaxSpeed) {
                this.sharkSpeed -= 50;
            }
        }
    }
    // increaseTime(delta) {
    //     gameTime += delta;
    //     this.timeDisplay.text = Math.round(gameTime/100) / 10;
    // }

    p1SwimmerCollision() {
        p1Swimmer.destroyed = true;
        let p1Death = this.add.sprite(p1Swimmer.x, p1Swimmer.y, 'bloodExplode').setOrigin(0, 0);
        p1Death.anims.play('bloods');
        this.sound.play('death', { 
            volume: 1 
        });
        p1Death.on('animationcomplete', () => {
            p1Death.destroy();
        });
        this.time.delayedCall(10, () => {
            p1Swimmer.destroy();
        });
        this.time.delayedCall(1000, () => {
            this.scene.start('endScene');
        });
    }
}