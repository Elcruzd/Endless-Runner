/* 
** Name: Zhendong Jiang
** Porject: Endless Runner
** Date: April 22, 2021
*/

class Sharks extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super(scene, game.config.width + 32, Phaser.Math.Between(128/2, game.config.height - 128/2), 'sharks');

        // add object to the existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.tint = Math.random() * 0xFFFFFF;
        this.newSharks = true;
        // this.anims.play('sharks');
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