
var game = new Phaser.Game(480, 320, Phaser.AUTO, null, 
    {preload: preload, create: create, update: update,render: render});

var ball;
var paddle;
var cursors;

function loadImges() {
    game.load.image('ball', 'imgs/ball.png');
    game.load.image('paddle', 'imgs/paddle.png');
}
function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#eee';
    loadImges();
}

function endGameRoles() {
    //set end game
    game.physics.arcade.checkCollision.down = false;
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(function () {
        alert('Game Over');
        location.reload();
    }, this);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    cursors = game.input.keyboard.createCursorKeys();
    //set start location and img.
    ball = game.add.sprite(game.world.width*0.5, game.world.height-25, 'ball');
    paddle = game.add.sprite(game.world.width*0.5,game.world.height-5,
                                'paddle');
    //set on the buttom middle;
    ball.anchor.set(0.5);
    paddle.anchor.set(0.5,1);
    //  Enable Arcade Physics for the ball
    game.physics.enable([paddle, ball],Phaser.Physics.ARCADE);

    paddle.body.immovable = true;

    //set gravity for x and y
    ball.body.velocity.set(150,-150);
    //make the ball bounce-able
    ball.body.collideWorldBounds = true;
    //1 is 100% energy
    ball.body.bounce.setTo(1,1);
    endGameRoles.call(this);
}

function update() {
    //Enable physics between the paddle and the ball
    game.physics.arcade.collide(paddle,ball);


}

function paddleControl() {

    if (cursors.left.isDown) {
        paddle.body.velocity.x = -300;
    }
    else if (cursors.right.isDown) {
        paddle.body.velocity.x = 300;
    }
    /*else if(game.input.x){
        paddle.x = game.input.x;
    }*/
    else {
        paddle.body.velocity.setTo(0, 0);
    }
}

function render() {
    game.debug.spriteInfo(ball,32,32);
    paddleControl();

}
