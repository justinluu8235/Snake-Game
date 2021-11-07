//Set up canvas for rendering
let gameCanvas = document.querySelector('#game');
let canvasHeight = getComputedStyle(gameCanvas)['height'];
let canvasWidth = getComputedStyle(gameCanvas)['width'];
let intHeight = parseInt(canvasHeight);
let intWidth = parseInt(canvasWidth);

//set up initial fields
let snakeLength = 6;
let applesEaten;
let direction = 'R';
let running = false;
let unitSize = 20;
let snakeX = [0, 0, 0, 0, 0, 0, 0];
let snakeY = [0, 0, 0, 0, 0, 0, 0];
console.log(snakeX);

//Set up game context
let ctx = game.getContext('2d');
ctx.fillStyle = "white";
ctx.strokeStyle = "red";
ctx.lineWidth = 5;





gameCanvas.setAttribute('height', canvasHeight);
gameCanvas.setAttribute('width', canvasWidth);

window.addEventListener("DOMContentLoaded", (e) => {
    apple = new Apple(unitSize, unitSize, "blue");
    snake = new Snake(snakeX, snakeY, "green");
    running = true;

    const runGame = setInterval(gameLoop, 120);

})

document.addEventListener('keydown', keyAdapter);

class Apple {
    constructor(width, height, color) {
        this.appleX = Math.round(Math.random() * (parseInt(canvasWidth) / unitSize - 1)) * unitSize;
        this.appleY = Math.round(Math.random() * (parseInt(canvasHeight) / unitSize - 1)) * unitSize;
        this.width = width;
        this.height = height;
        this.isAlive = true;
        this.color = color;

        this.render = function () {
            ctx.fillStyle = color; //Change the color of the context (ctx)
            ctx.fillRect(this.appleX, this.appleY, this.width, this.height);

        }
    }
}

class Snake {
    constructor( snakeX, snakeY, color) {
   
        this.snakeX = snakeX;
        this.snakeY = snakeY;
        this.color = color;
        this.isAlive = true;

        this.render = function () {

            for (let i = 0; i < snakeLength; i++) {
                if (i === 0) {
                    ctx.fillstyle = color;
                    ctx.fillRect(snakeX[i], snakeY[i], unitSize, unitSize);
                }
                else {
                    ctx.fillstyle = color;
                    ctx.fillRect(snakeX[i], snakeY[i], unitSize, unitSize);
                }

            }
        }

    }
}


function gameLoop() {
    if (running) {
        movementHandler();
        console.log(snakeX, snakeY);
        ctx.clearRect(0, 0, game.width, game.height);
        snake.render();
        apple.render();
        drawGrid();
        checkApple();
        checkCollisions();
    }



}




function movementHandler(e) {
    for (let i = snakeLength; i > 0; i--) {
        snakeX[i] = snakeX[i - 1];
        snakeY[i] = snakeY[i - 1];
    }


    switch (direction) {
        case 'U':
            //move snake up

            //snakeHeadY -= unitSize;
            //snakeY.unshift(snakeHeadY);
            snakeY[0] -= unitSize;
            break;
        case 'L':
            //move the snake left

            snakeX[0] -= unitSize;
            break;
        case 'R':
            //move snake right
            snakeX[0] += unitSize;

            break;
        case 'D':
            //move snake down
            snakeY[0] += unitSize;
            break;


    }
}

function keyAdapter(e) {
    console.log('movement', e.key);
    switch (e.key) {
        case 'w':
            //move donkey up
            direction != 'D' ? direction = 'U' : direction = 'D'
            break;
        case 'a':
            //move the donkey left
            direction != 'R' ? direction = 'L' : direction = 'R'
          
            break;
        case 'd':
            //move donkey right
            direction != 'L' ? direction = 'R' : direction = 'L'
            break;
        case 's':
            //move donkey down
            direction != 'U' ? direction = 'D' : direction = 'U'
       
            break;
    }

}


function checkApple() {
    console.log(snakeX[0], snakeY[0]);
    console.log(apple.appleX, apple.appleY);
    if (snakeX[0] === apple.appleX && snakeY[0] === apple.appleY) {
        snakeLength++;
        snakeX.push(0);
        snakeY.push(0);
        applesEaten++;
        apple = new Apple(unitSize, unitSize, "blue");
    }
}
function checkCollisions() {
    //checks if head collides with body
    for (let i = snakeLength; i > 0; i--) {
        if (snakeX[0] === snakeX[i] && snakeY[0] === snakeY[i]) {
            running = false;
        }

        //check if the head touches borders
        if (snakeX[0] < 0 || snakeX[0] > intWidth) {
            running = false;
        }

        if (snakeY[0] < 0 || snakeY[0] > intHeight) {
            running = false;
        }

        if(!running){
            clearInterval();
        }

    }




}
function drawGrid() {
    for (let i = 0; i < intWidth / unitSize; i++) {

        ctx.beginPath();
        ctx.moveTo(i * unitSize, 0);
        ctx.lineTo(i * unitSize, intHeight);
        ctx.stroke();
    }
    for (let i = 0; i < intHeight / unitSize; i++) {

        ctx.beginPath();
        ctx.moveTo(0, i * unitSize);
        ctx.lineTo(intWidth, i * unitSize);
        ctx.stroke();
    }
}
