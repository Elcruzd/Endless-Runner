/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: 
** Date: 
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
            // debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Menu, Credits, Play, End ]
}
// localStorage.clear();

// define game
let game = new Phaser.Game(config);

// define golbal
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;
let waveSpeed = 4;
let cursors;
let p1Swimmer = null;
const p1SwimmerVelocity = 200;

// initialize score and high score
let p1Time;
let p1Score;
let p1HighScore = 0;
let newHighScore = false;