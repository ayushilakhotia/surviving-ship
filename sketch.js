var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg, gameoverImg;
var water, ship, helicopter, bomb, gameOver;
var helicopterGroup, bombGroup;
var score = 0;
var shark , sharkimg;



function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadAnimation("ship.png","ship2.png","ship2.png","ship.png","ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
// sharkimg = loadImage("shark.png")
  gameoverImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //creating water ground
  water = createSprite(width/2,height-200)
  water.addImage(waterbg);  
  water.scale = 2;
  water.velocityX = -4;
  
  
  //creating ship
  ship = createSprite(Math.round(random(100,140)),height-260);
  ship.addAnimation("moving", shipimg);  
  ship.scale = 0.5;

  //creating helicopter group
  helicopterGroup = new Group();

  //creating bomb group
  bombGroup = new Group();
  
    gameOver = createSprite(width/2,height/2)
    gameOver.addImage(gameoverImg);
    gameOver.scale = 0.5;
  //ship.debug = "true";

  
}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(23);
  text("SURVIVAL TIME: "+ score, 800,30);
  text("use arrow keys to move ship",100,20)
 
    
  //gameState play
  if(gameState === PLAY){
    gameOver.visible = false;
    //increase score
    score = score + Math.round(getFrameRate()/60);

     //for infinite background
 if(water.position.x < 700){
  water.position.x = 900;
  }
   // movement of ship 
   if(keyDown("LEFT_ARROW")){
    ship.x = ship.x -20;
  }
  if(keyDown("RIGHT_ARROW")){
   ship.x = ship.x + 20;
 }
    
    //Call user defined function
    spawnHelicopter();
    spawnBomb();
   
    
    if(bombGroup.isTouching(ship)){
        gameState = END;
    }
    
  }
  
  //gameState end
  else if(gameState === END){
  //water velocity becomes zero
  water.velocityX = 0;
  ship.visible = false;
  gameOver.visible = true;

   //destroy Helicopter group
   helicopterGroup.destroyEach(); 

   //destroy bomb group
   bombGroup.destroyEach();
    
  
    
  } 

  drawSprites();
  if(mousePressedOver(gameOver)){
    restart();
  }
}


function spawnHelicopter(){
  if(frameCount%300 === 0){
    helicopter = createSprite(width,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    
    helicopter.scale = 0.5;
    helicopter.lifetime = 600;
    
    helicopterGroup.add(helicopter);
  }
}

function spawnBomb(){
 // create bombs at random position
 //use Math.random
 if(frameCount%   80 === 0){
  bomb = createSprite(Math.round(random(100,width-100)),100,200,50);
 bomb.addImage(bombimg);
  bomb.setVelocity(0,5);
  bomb.scale= 0.2;
  
  //helicopter.scale = 0.5;
 //bomb.lifetime = 600;
  
  bombGroup.add(bomb);
}

}

function restart(){
  gameState = PLAY;
  score = 0;
  ship.visible = true;
  water.velocityX= -4;
}




