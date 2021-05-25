/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Endless Runner
** Game Title: Sharkbu-Sharkbu
** Date: May 3, 2021
*/

class Item extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, texture, frame) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width + 32, Phaser.Math.Between(128/2, game.config.height - 128/2), texture, frame);
         scene.add.existing(this);          // add object to the existing scene
         scene.physics.add.existing(this);  // add to physics system
         this.setOffset(0, -8);
         this.setVelocityX(-velocity);
         this.setImmovable();
         this.newItem = true;  
    }     
    
    update() {
        if(this.newItem && this.x < game.config.width/2) {
            this.newItem = false;
            this.scene.addItem(this.velocity);
        }

        // destroy item if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
         }    
    }
}