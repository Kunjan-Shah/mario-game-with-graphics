let gamebox = document.getElementById('gamebox');
let context = gamebox.getContext('2d');
let level = 1;
document.getElementById('level').innerHTML = "Level: " + level;
const mario = new Image(50, 50);
mario.src = 'mario-static.jpg';
const turtle = new Image(50, 50);
turtle.src = 'turtle.png';
const princess = new Image(50, 50);
princess.src = 'princess.png';

let enemy1 = {
    color: 'red',
    x: 200,
    y: 0,
    h: 50,
    w: 50,
    vx: 0,
    vy: 1,
    speed: 1
};

let enemy2 = {
    color: 'red',
    x: 400,
    y: 0,
    h: 50,
    w: 50,
    vx: 0,
    vy: 2,
    speed: 2
};

let player = {
    color: 'blue',
    step: 5,
    x: 0,
    y: 175,
    h: 50,
    w: 50,
    vx: 1,
    vy: 0
};

let goal = {
    color: 'green',
    x: 750,
    y: 175,
    h: 50,
    w: 50,
    vx: 0,
    vy: 0,
    speed: 0
}


function drawBox(box, image) {
    if(image == "mario") {
        context.drawImage(mario, box.x, box.y, 50, 50);
    }
    else if(image == "turtle") {
        context.drawImage(turtle, box.x, box.y, 50, 50);
    }
    else if(image == "princess") {
        context.drawImage(princess, box.x, box.y, 50, 50);
    }
}

function updateGameState() {
    enemy1.y += enemy1.vy;
    if(enemy1.y + enemy1.h > gamebox.height) {
        enemy1.vy = -enemy1.vy;
    } else if(enemy1.y < 0) {
        enemy1.vy = -enemy1.vy;
    }

    enemy2.y += enemy2.vy;
    if(enemy2.y + enemy2.h > gamebox.height) {
        enemy2.vy = -enemy2.vy;
    } else if(enemy2.y < 0) {
        enemy2.vy = -enemy2.vy;
    }

    goal.y += goal.vy;
    detectFinish();

    detectCollision();
}

function detectFinish() {
    if(player.x > 700 && player.y+50 > goal.y && player.y < goal.y+50) {
        alert("AWESOME! YOU HAVE COMPLETED THE LEVEL");
        // increase the level
        level += 1;
        document.getElementById('level').innerHTML = "Level: " + level;
        // increase the speed of the enemy
        enemy1.speed += 0.5;
        enemy2.speed += 0.5;
        // increase the step pf mario
        if(level > 3) {
            player.step += 0.5;
            goal.speed += 0.1;    
        }
        else {
            player.step += 1;
        }
        // reset the game
        resetGame();
    }
}

function resetGame() {
    // reset enemy
    enemy1.x = 200;
    enemy1.y = 0;
    enemy1.vx = 0;
    enemy1.vy = enemy1.speed;

    enemy2.x = 400;
    enemy2.y = 0;
    enemy2.vx = 0;
    enemy2.vy = enemy2.speed;

    // reset player
    player.x = 0;
    player.y = 175;
    player.vx = 1;
    player.vy = 0;

    // reset goal
    goal.vy = goal.speed;
    goal.y = 175;
}

function detectCollision() {
    // if((player.x > 150 && player.x <= 250 && enemy1.y > 125 && enemy1.y <= 225) || (player.x > 350 && player.x <= 450 && enemy2.y > 125 && enemy2.y <= 225)) {
    if((player.x > 150 && player.x <= 250 && enemy1.y+50 > player.y && enemy1.y <= player.y+50) || (player.x > 350 && player.x <= 450 && enemy2.y+50 > player.y && enemy2.y <= player.y+50) || (goal.y > gamebox.height)) {
        // collision occurs
        alert("GAME OVER");
        // change level to 1
        level = 1;
        document.getElementById('level').innerHTML = "Level: " + level;
        enemy1.speed = 1;
        enemy2.speed = 2;
        goal.speed = 0;
        resetGame();
    }
}

document.onkeydown = moveMario;

function moveMario(key) {
    // pressed right arrow key
    if(key.keyCode == '39') {
        player.x += player.step;
        if(player.x > gamebox.width-50) {
            player.x = gamebox.width-50;
        }
        // detect collision
        detectCollision();
        // check if level completed
        detectFinish();
    }
    // pressed left arrow key
    else if(key.keyCode == '37') {
        player.x -= player.step;
        if(player.x < 0) {
            player.x = 0;
        }
        // detect collision
        detectCollision();
    }
    // pressed up arrow key
    else if(key.keyCode == '38') {
        player.y -= player.step;
        if(player.y < 0) {
            player.y = 0;
        }
        // detect collision
        detectCollision();
        // check if level completed
        detectFinish();
    }
    // pressed down arrow key
    else if(key.keyCode == '40') {
        player.y += player.step;
        if(player.y > gamebox.height-50) {
            player.y = gamebox.height-50;
        }
        // detect collision
        detectCollision();
        // check if level completed
        detectFinish();
    }
}

function updateGame() {
    // update game state
    updateGameState();
    // clear the canvas
    context.clearRect(0, 0, gamebox.width, gamebox.height);
    // draw the player
    drawBox(player, "mario");
    // draw the enemy1
    drawBox(enemy1, "turtle");
    // draw the enemy2
    drawBox(enemy2, "turtle");
    //draw the goal
    drawBox(goal, "princess");

    window.requestAnimationFrame(updateGame);
}

updateGame();