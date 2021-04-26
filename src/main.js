/* 
** Name: Zhendong Jiang
** Porject: Endless Runner
** Date: April 22, 2021
** 
** Hours to complete the project: 10 hours
**
** Track a high score that persists across scenes and display it in the UI (5)
** Implement the 'FIRE' UI text from the original game (5)
** Add your own (copyright-free) background music to the Play scene (5) (using Bfxr to customize)
** Allow the player to control the Rocket after it's fired (5)
** Display the time remaining (in seconds) on the screen (10)
** Create a new animated sprite for the Spaceship enemies (10) (using Piskel to customize)
** Create a new title screen (e.g., new artwork, typography, layout) (10) (using Procreate to customize)
** Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
** Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) (using Piskel to customize)
** Implement mouse control for player movement and mouse click to fire (20)
*/

// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Play ]
}

// define game
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;
let starSpeed = 4;

// reserve keyboard bindings
let keyUP, keyDOWN;

// initialize high score
let p1HighScore = 0;