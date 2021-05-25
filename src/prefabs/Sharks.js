/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Endless Runner
** Game Title: Sharkbu-Sharkbu
** Date: May 3, 2021
*/

class Sharks extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width + 32, Phaser.Math.Between(128/2, game.config.height - 128/2), 'sharks');
        scene.add.existing(this);           // add object to the existing scene
        scene.physics.add.existing(this);   // add to physics system
        this.setSize(128, 32);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.newSharks = true;
    }

    update() {
        // add new barrier when hits 1/4 game width
        if(this.newSharks && this.x < game.config.width/4) {
            this.newSharks = false;
            this.scene.addSharks(this.velocity);
        }
        
        // destroy shark if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}