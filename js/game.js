
var game = new Phaser.Game(480, 320, Phaser.AUTO, null, 
    {preload: preload, create: create, update: update/*,render: render*/});

var ball;
var paddle;
var cursors;
var brickInfo;
var scoreText;
var score;
var gameOver = false;
var gameOverText = "";
var textStyle = { font: '18px Arial', fill: '#0095DD' };
var lives;
var animation;

function loadImges() {
    game.load.image('ball', 'imgs/ball.png');
    game.load.image('paddle', 'imgs/paddle.png');
    game.load.image('brick', 'imgs/brick.png');
    game.load.spritesheet('ball','imgs/wobble.png',20,20);
}

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#eee';
    lives = 3;
    loadImges();
}

function endGameRoles() {
    //set end game
    game.physics.arcade.checkCollision.down = false;
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(gameOverFun,this);
}

function initBricks() {
    brickInfo = {
        width: 50,
        height: 20,
        count: {
            row: 7,
            col: 3
        },
        offset: {
            top: 50,
            left: 60
        },
        padding: 10
    };
    bricks = game.add.group();
    for(var c=0;c<brickInfo.count.col;++c){
        for(var r = 0;r<brickInfo.count.row;++r){
            var brickX = (r*(brickInfo.width+brickInfo.padding))+brickInfo.offset.left;
            var brickY = (c*(brickInfo.height+brickInfo.padding))+brickInfo.offset.top;
            newBrick = game.add.sprite(brickX,brickY,'brick');
            game.physics.enable(newBrick, Phaser.Physics.ARCADE);
            newBrick.body.immovable = true;
            newBrick.anchor.set(0.5);
            bricks.add(newBrick);
        }
    }
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    cursors = game.input.keyboard.createCursorKeys();
    //set start location and img.
    ball = game.add.sprite(game.world.width*0.5, game.world.height-25, 'ball');
    paddle = game.add.sprite(game.world.width*0.5,game.world.height-5,
                                'paddle');

    ball.animations.add('wobble', [0,1,0,2,0,1,0,2,0], 24);

    //set on the buttom middle;
    ball.anchor.set(0.5);
    paddle.anchor.set(0.5);
    //  Enable Arcade Physics for the ball
    game.physics.enable([paddle, ball],Phaser.Physics.ARCADE);

    paddle.body.immovable = true;

    //set gravity for x and y
    ball.body.velocity.set(150,-150);
    //make the ball bounce-able
    ball.body.collideWorldBounds = true;
    //1 is 100% energy
    ball.body.bounce.setTo(1,1);

    initBricks();
    endGameRoles.call(this);

    scoreText = game.add.text(5,5,'Points: 0', {
        font: '18px Ariel',fill: 'black'
    });
    liveLostText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'Life lost, click to continue', textStyle);
    liveLostText.anchor.set(0.5);
    liveLostText.visible = false;

    gameOverText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'Game Over', textStyle);
    gameOverText.anchor.set(0.5);
    gameOverText.visible = false;
    score = 0;
    livesText = game.add.text(game.world.width-5,5, "lives: 3",{
        font: '18px Ariel',fill: 'black'});
    livesText.anchor.set(1,0);
}

function gameOverFun() {
    if(!gameOver) {
        lives -= 1;
    }
    livesText.setText("lives: " + lives);
    if(lives <= 0 || gameOver) {
        game.paused = true;
        gameOverText.visible = true;
    }else{
        liveLostText.visible = true;
        ball.reset(game.world.width*0.5,game.world.height-25);
        paddle.reset(game.world.width*0.5, game.world.height-5);
        game.input.onDown.addOnce(function(){
            liveLostText.visible = false;
            ball.body.velocity.set(150, -150);
        }, this);
    }
}

function ballHitBrick(ball, brick) {
    ball.animations.play('wobble');
    brick.kill();
    score += 10;
    scoreText.setText("Points: " + score);

    var countAlive = 0;
    if(bricks.children.filter(function (brick) {
            return brick.alive;
        }).length == 0){
        gameOver = true;
        gameOverFun();
    }
}

function ballHitPaddle(ball, paddle) {
    ball.animations.play('wobble');
}

function update() {
    //Enable physics between the paddle and the ball
    game.physics.arcade.collide(paddle, ball,ballHitPaddle);
    game.physics.arcade.collide(ball, bricks,ballHitBrick);
    paddleControl();
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

// function render() {
//     if(debug==1) {
//         game.debug.spriteInfo(ball, 32, 32);
//         paddleControl();
//     }
// }
