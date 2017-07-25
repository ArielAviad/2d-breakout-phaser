
var game = new Phaser.Game(480, 320, Phaser.AUTO, null, 
    {preload: preload, create: create, update: update,render: render});

var ball;

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#eee';
    game.load.image('ball','imgs/ball.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //set start location and img.
    ball = game.add.sprite(100, 100, 'ball');
    //  Enable Arcade Physics for the ball
    game.physics.enable(ball,Phaser.Physics.ARCADE);
    //set gravity for x and y
    ball.body.velocity.set(100,100);
    //make the ball bounce-able
    ball.body.collideWorldBounds = true;
    //1 is 100% energy
    ball.body.bounce.setTo(1,1);
}

function update() {
}

function render() {
    game.debug.spriteInfo(ball,32,32);
}
