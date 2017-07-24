/**
 * Created by ariel on 24/07/17.
 */

var game;
function init() {
    game = new Phaser.Game(480,320,Phaser.AUTO,null,{
        preload: preload,create: create, update:update
    });
}

function preload(){
    //set the fill area params.
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    game.stage.backgroundColor = "#eee";
}

function create() {}
function update() {}
