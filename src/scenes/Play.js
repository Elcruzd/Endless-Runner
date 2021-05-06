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
        // this.seawave02 = this.add.tileSprite(0, 0, 640, 480, 'sea1').setOrigin(0, 0);
        this.seawave03 = this.add.tileSprite(0, 0, 640, 480, 'sea2').setOrigin(0, 0);

        this.sharkSpeed = -500;
        this.sharkMaxSpeed = -1500;
        this.whaleSpeed = -300;
        this.whaleMaxSpeed = -600;
        p1Time = 0;
        p1Score = 0;

        // add bgm
        this.bgm = this.sound.add('bgm', {
            mute: false,
            volume: 5,
            rate: 1.5,
            loop: true 
        });
        this.bgm.play();

        // set up swimmer
        p1Swimmer = this.physics.add.sprite(64, game.config.height/2, 'player').setOrigin(0.5, 0.5);
        p1Swimmer.setSize(128, 32);
        p1Swimmer.setOffset(-8, 16);
        p1Swimmer.body.setCollideWorldBounds(true);
        p1Swimmer.setBounce(0.5);
        p1Swimmer.setImmovable();
        p1Swimmer.setMaxVelocity(0, 300);
        p1Swimmer.setDragY(500);
        p1Swimmer.destroyed = false;
        p1Swimmer.anims.play('swimming', true);

        // set up shark group
        this.sharkGroup = this.add.group({
            runChildUpdate: true
        });
        this.time.delayedCall(3000, () => {
            this.addSharks();
        });

        // set up whale group
        this.whaleGroup = this.add.group({
            runChildUpdate: true
        });
        this.time.delayedCall(10000, () => {
            this.addWhale();
        });

        // set up item group
        this.itemGroup = this.add.group({
            runChildUpdate: true
        });     
        this.time.delayedCall(200, () => {
            this.addItem();
        });

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
            fixedWidth: 0
        }
        this.timeDisplay = this.add.text(game.config.width/2, game.config.height/2 - 240, `Time: ${p1Time}s`, timeConfig).setOrigin(0, 0);
        
        // display score
        let scoreConfig = {
            fontFamily: 'Chuck',
            fontSize: '28px',
            color: '#black',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.scoreLeft = this.add.text(game.config.width/8, game.config.height/2 - 240, `Score: ${p1Score}`, scoreConfig).setOrigin(0, 0);
        
        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
    }

    // add sharks
    addSharks() {
        let movementSpeed = Phaser.Math.Between(0, 50);
        let sharks = new Sharks(this, this.sharkSpeed - movementSpeed);
        this.sharkGroup.add(sharks);
    }

    // add whales
    addWhale() {
        let whaleMoveSpeed = Phaser.Math.Between(0, 10);
        let whales = new Whale(this, this.whaleSpeed - whaleMoveSpeed);
        this.whaleGroup.add(whales);
    }

    // add items
    addItem() {
        let items = new Item(this, 250, 'items', 0);   
        this.itemGroup.add(items);
       }

    update(time, delta) {
        let deltaMultiplier = (delta/16);
        // this.seawave.tilePositionX += (waveSpeed) * deltaMultiplier;
        // this.seawave02.tilePositionX += (waveSpeed-3) * deltaMultiplier;
        this.seawave03.tilePositionX += (waveSpeed-2) * deltaMultiplier;
        // check if swimmer still alive
        if(!p1Swimmer.destroyed) {
            if(cursors.up.isDown) {
                p1Swimmer.body.velocity.y -= p1SwimmerVelocity;
            } else if(cursors.down.isDown) {
                p1Swimmer.body.velocity.y += p1SwimmerVelocity;
            }
            // check for collisions
            this.physics.world.collide(p1Swimmer, this.sharkGroup, this.p1SwimmerCollision, null, this);
            this.physics.world.collide(p1Swimmer, this.whaleGroup, this.p1SwimmerCollision, null, this);
            this.physics.world.collide(p1Swimmer, this.itemGroup, this.itemCollision, null, this);
        }
    }

    // add time
    timeIncrease() {
        p1Time += 1;
        this.timeDisplay.text = `Time: ${p1Time}s`;
        if(p1Time % 5 == 0) {
            // console.log(`level: ${p1Time}, speed: ${this.sharkSpeed}`);
            if(this.sharkSpeed >= this.sharkMaxSpeed) {
                this.sharkSpeed -= 50;
            }
        }
    }

    p1SwimmerCollision() {
        p1Swimmer.destroyed = true;     // turn off collision checking
        this.passTimer.destroy();       // shut down timer
        let p1Death = this.add.sprite(p1Swimmer.x, p1Swimmer.y, 'bloodExplode').setOrigin(0, 0);
        p1Death.anims.play('bloods');
        this.sound.play('death', { 
            volume: 1 
        });
        this.cameras.main.shake(250, 0.0075);
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

    // add points when player pick up the items
    itemCollision(p1Player, items) {
        // kill items
        items.destroy(true, true);
        p1Score += 1;
        // console.log(`socre: ${p1Score}`);
        this.scoreLeft.text = `Score: ${p1Score}`;
        this.sound.play('pickup', { 
            mute: false,
            volume: 0.1,
            rate: 2,
            loop: false 
        });
    }
}