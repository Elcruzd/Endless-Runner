/* 
** Name: Zhendong Jiang
** Porject: Endless Runner
** Date: April 22, 2021
*/

// Rocket (player) prefab
class Sharks extends Phaser.GameObjects.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.moveSpeed = 2;         // pixels per frame
        this.tint = Math.random();
        this.newSharks = true;

        //this.sfxRocket = scene.sound.add('sfx_rocket');     // add rocket sfx
    }

    update() {
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}