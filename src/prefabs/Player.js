/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Endless Runner
** Game Title: Sharkbu-Sharkbu
** Date: May 3, 2021
*/

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // // call Phaser Physics Sprite constructor
        // super(scene, game.config.width + 32, Phaser.Math.Between(128/2, game.config.height - 128/2), 'whales');
        // scene.add.existing(this);           // add object to the existing scene
        // scene.physics.add.existing(this);   // add to physics system
        // this.setSize(128, 64);
        // this.setOffset(32, -8);
        // this.setVelocityX(velocity);
        // this.setImmovable();
        // this.newWhale = true;
    }

    update() {
        // if(this.newWhale && this.x < game.config.width/8) {
        //     this.newWhale = false;
        //     this.scene.addWhale(this.velocity);
        // }

        // // destroy whale if it reaches the left edge of the screen
        // if(this.x < -this.width) {
        //     this.destroy();
        // }
    }
}