/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Endless Runner
** Game Title: Sharkbu-Sharkbu
** Date: May 3, 2021
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
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Menu, Play, End ]
}

// define game
let game = new Phaser.Game(config);

// define golbal
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;
let waveSpeed = 4;
let cursors;
let p1Swimmer = null;
const p1SwimmerVelocity = 150;
// initialize score and high score
let gameTime = 0;
let p1HighScore = 0;
let newHighScore = false;