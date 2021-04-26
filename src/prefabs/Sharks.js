/* 
** Name: Zhendong Jiang
** Porject: Endless Runner
** Date: April 22, 2021
*/

// Rocket (player) prefab
class Sharks extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super(scene, scene.scale.width + 32, Phaser.Math.Between(scene.scale.height / 2, scene.scale.height - 32 * 2 + 5));

        // add object to the existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        //this.moveSpeed = 2;         // pixels per frame
        this.tint = Math.random() * 0xFFFFFF;
        this.newSharks = true;
    }

    update() {
        if(this.newSharks && this.x < borderX) {
            this.newSharks = false;
            this.scene.addSharks(this.velocity);
        }
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}