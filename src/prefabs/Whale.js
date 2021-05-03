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
        super(scene, game.config.width + 32, Phaser.Math.Between(128/2, game.config.height - 128/2), 'whales');

        // add object to the existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setSize(50, 50);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.newWhale = true;
    }

    update() {
        if(this.newWhale && this.x < game.config.width/2) {
            this.newWhale = false;
            this.scene.addWhale(this.velocity);
        }
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}