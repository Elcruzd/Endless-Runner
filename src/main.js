/* 
** Name: Zhendong Jiang
** Porject: Endless Runner
** Date: April 22, 2021
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
    scene: [ Load, Menu, Play ]
}

// define game
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;

// reserve keyboard bindings
let keyRIGHT, keyUP, keyDOWN;

// initialize high score
let p1HighScore = 0;

let p1Swimmer = null;
let p1SwimmerVelocity = 150;