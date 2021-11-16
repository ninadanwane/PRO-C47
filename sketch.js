var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score=0;

localStorage["HighestScore"] = 0;

var h1Img, h2Img, h3Img, h4Img, h5Img, h6Img;
var player, car1, car2, car3, car4, track, tree, healthBar;
var playerImg, c1Img, c2Img, c3Img, c4Img, trackImg, treeImg;
var obstaclesGroup;

function preload(){

  playerImg = loadImage("playerCar.png");
  c1Img = loadImage("car1.png");
  c2Img = loadImage("car2.png");
  c3Img = loadImage("car3.png");
  c4Img = loadImage("car4.png");
  trackImg = loadImage("track.png");
  h1Img = loadImage("fullHealth.png");
  h2Img = loadImage("80Health.png");
  h3Img = loadImage("60Health.png");
  h4Img = loadImage("40Health.png");
  h5Img = loadImage("20Health.png");
  h6Img = loadImage("5Health.png");
  treeImg = loadImage("tree.png");
   
}

function setup() {
  createCanvas(1365, 625);
  
  player = createSprite(50, 225);
  player.addImage(playerImg);
  player.scale = 0.8;

  healthBar = createSprite(682.5, 10, 10, 40);
  healthBar.addImage(h1Img);
  healthBar.scale = 0.1;
  healthBar.visible = false;

  
  obstaclesGroup = new Group();
  score = 0;
}

function draw() {
  background(trackImg);
  stroke("silver");
  strokeWeight(2);
  fill("white");
  textFont("AR DESTINE");
  textSize(15); 
  text("Score: "+ score, 630, 25);
  

  if (gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("UP") ) {
      player.velocityX = 0;
      player.velocityY = -7;
    }
    if (keyDown("DOWN")) {
      player.velocityX = 0;
      player.velocityY = 7;
    }
    if (keyDown("LEFT")) {
      player.velocityX = -7;
      player.velocityY = 0;
    }
    if (keyDown("RIGHT")) {
      player.velocityX = 7;
      player.velocityY = 0;
    }
    if(keyWentUp("UP") ) {
      player.velocityX = 0;
      player.velocityY = 0;
    }
    if(keyWentUp("DOWN") ) {
      player.velocityX = 0;
      player.velocityY = 0;
    }
    if(keyWentUp("LEFT") ) {
      player.velocityX = 0;
      player.velocityY = 0;
    }
    if(keyWentUp("RIGHT") ) {
      player.velocityX = 0;
      player.velocityY = 0;
    }

    spawnObstacles();
  
    if(obstaclesGroup.isTouching(player)){
      gameState = END;
    }

  }
  else if (gameState === END) {

    stroke("gold");
    strokeWeight(7);
    textFont("AR DESTINE")
    textSize(20);
    fill("black");
    text("Press R to restart", 70, 30);

    //set velcity of each game object to 0
    player.velocityY = 0;
    player.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
        
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    if(keyDown("r")){
      reset();
    }

  }
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(1370, Math.round(random(30,600)), 10, 40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(c1Img);
              break;
      case 2: obstacle.addImage(c2Img);
              break;
      case 3: obstacle.addImage(c3Img);
              break;
      case 4: obstacle.addImage(c4Img);
              break;
      default: break;
    }

    obstacle.velocityX = -7;
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnTree() {
  if(frameCount % 5 === 0) {
      var tree = createSprite(800,325,20,20);
      tree.velocityX = -7;
      tree.scale = 20;
  }
}

function reset(){
  gameState = PLAY;
  obstaclesGroup.destroyEach();

  player.destroy();
  
  player = createSprite(50, 225);
  player.addImage(playerImg);
  player.scale = 0.8;

  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }

  console.log(localStorage["HighestScore"]);
  score = 0;
}