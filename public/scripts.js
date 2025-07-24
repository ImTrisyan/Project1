function setup () {
createCanvas(windowWidth, windowHeight);
makeBounce();
blockYPos = windowHeight-300;
blockHeight = windowHeight * 0.05;
blockWidth = windowWidth * 0.1;

}

var bounceList = []
var yFactor = 0.2;
var blockYPos;
var blockWidth;
var blockHeight;
var gamepoints = 0;
var Lives = 5;
var gameTimeout;

function makeBounce() {
    bounceObj =  new bounce();
    bounceList.push(bounceObj);
    console.log(bounceList);
    gameTimeout = setTimeout(makeBounce, 1000);
}

class bounce {
  constructor(name, year) {
    this.x = 10;
    this.y = random(10,100);
    this.height = 40;
    this.width = 40;
    this.xSpeed = random(3,10);
    this.ySpeed = random(-3,-10);
  }

    move() {
    this.x += this.xSpeed;
    this.ySpeed += yFactor;

    if (this.y + this.height > blockYPos && this.x + this.width > mouseX && this.x < mouseX + blockWidth && this.y < blockYPos + blockHeight) {
    this.ySpeed = -1 * this.ySpeed;

    }


    this.y += this.ySpeed;
    image(bounceImage,this.x,this.y, this.width, this.height);
}


}

function preload () {
    backgrdImage = loadImage("BackgroundUniverse.jpg");
    bounceImage = loadImage("rainbow.png");
}


function draw() {

    background("black");
    image(backgrdImage,0,0,windowWidth,windowHeight);
    makeBlocks();
    fill("yellow");
    textSize(50);
    text('points :' + gamepoints, 50, 50);
    text('Lives; ' + Lives, 50, 150);
    bounceList.forEach(processBounceList);
    
}

function processBounceList(item, index) {
    item.move();
    if (item.x > windowWidth) {
        bounceList.splice(index,1);
        gamepoints += 1;
    }

if (item.y > windowHeight) {
        bounceList.splice(index,1);
        Lives -= 1;
        if (Lives ==0)
        {
            endgame();
            
        }
    }

}

function makeBlocks() {
    fill("purple");
    ellipse(mouseX, blockYPos, blockWidth, blockHeight);
}

function endgame()
    {
        noLoop();
        background("grey");
        text('GAME OVER', 200, 200);
        text('points :' + gamepoints, 200, 250);
        clearTimeout(gameTimeout);
        
    }