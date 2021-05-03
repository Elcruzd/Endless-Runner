/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Endless Runner
** Game Title: Sharkbu-Sharkbu
** Date: May 3, 2021
*/

class Whale extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super(scene, game.config.width + 64, Phaser.Math.Between(128, game.config.height - 128), 'whales');

        // add object to the existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setSize(150, 100);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.newSharks = true;
    }

    update() {
        if(this.newSharks && this.x < game.config.width/2) {
            this.newSharks = false;
            this.scene.addSharks(this.velocity);
        }
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}