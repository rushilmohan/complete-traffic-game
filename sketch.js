//creating variables which are used in the game
var gameState = 1;
var bg,bgImage;
var canvas;
var car,carImage;
var sign1,sign1img;
var sign2,sign2img;
var sign3,sign3img;
var sign4,sign4img;
var sign5,sign5img;
var sign,signimg;
var score;
var edges;
var speed;
var money = 10000;
var constant = 20;
var texts;
var obstacle,obstacleimg;
//loading the images which I required in the game
function preload(){
  bgImage = loadImage("road.png");
  carImage = loadImage("car.png")
  sign1img = loadImage("schoolAhead.png");
  sign2img = loadImage("goSlow.png");
  sign3img = loadImage("minSpeed.png");
  sign4img = loadImage("maxLimit.png");
  sign5img = loadImage("noMotorVehicles.jpg");
  signimg = loadImage("SIGN.png");
  textsimg = loadImage("Untitled.png");
  obstacleimg = loadImage("obstacle.png");
}

//this is where I set up my canvas 
//also I displayed the car and background here
function setup(){
  canvas = createCanvas(800,580)
  bg = createSprite(400,200,600,400);
  bg.addImage(bgImage);
  bg.scale = 1.4;
  bg.velocityY = 10;
  car = createSprite(390,600,50,50);
  car.addImage(carImage);
  car.scale = 0.15;

  sign = createSprite(400,300,50,50);
  sign.addImage(signimg);
  sign.scale = 0.45;
    
}

function draw(){
  //I chose the background colour here
  background(0);

  //created edges so that the car does not go out of the frame
  edges = createEdgeSprites();

  //feeded input into the speed variable so that players can see the speed
  speed = Math.round(car.velocityY * -7);
  speed = speed + 1

  //If players press this key they can maintain a constant speed
  if(keyDown("m")){
    speed = 30;
    car.velocityY = 0
  }


  //started the game here
  //Made the first page which will be displayed when someone opens the game
  if(gameState === 1){
    textSize(25);
    stroke("black")
    strokeWeight(4)
    textFont("Comic Sans MS");
    fill("white");
    text("Hello, Welcome to Traffic Sign Game",180,200);
    text("Here you will learn some of the rules of driving",140,300);
    text("Press A to continue",290,400)
    car.visible = false;
    bg.visible = false;
    sign.visible = false;
   
  }

  //changed the page
  if(keyDown("a")&& gameState === 1){
     gameState = 2;
  }

  //displayed the changed page
  if(gameState === 2){
    textSize(25);
    stroke("black")
    strokeWeight(4)
    textFont("Comic Sans MS");
    fill("white");
    text("Rules of the game are as follows :",60,60);
    text(" > Initially you will be given with Rs.10,000",80,140);
    text(" > Rs.2000 will be deducted if traffic signs are not followed",80,200);
    text(" > Rs.2000 will be credited if traffic signs are followed",80,260);
    text(" > Do not press unncessary keys during the game",80,320);
    text(" > Press space or m to maintain a constant speed",80,380)
    push();
    textSize(20);
    text(" > Press up arrow and move forward and down arrow to move backward",80,440)
    text(" > You can quit the game whenever you want by pressing the e key",80,500)
    pop();
    text("Press S to continue",300,560);
    car.visible = false;
    bg.visible = false;
    sign.visible = false;
 
  }

  //changed the page
  if(keyDown("S")&& gameState === 2){
    gameState = 3
  }

  //Displayed the instructions of the game
  if(gameState === 3){
    textSize(25);
    stroke("black")
    strokeWeight(4)
    textFont("Comic Sans MS");
    fill("white");
    text("Please read the following as you will be using these in the game",30,60);
    push();
    textSize(21);
    text("Once you have read all the instructions press on D to start the game",50,540)
    pop();
    car.visible = false;
    bg.visible = false;
    sign.visible = true;
  
  }

  //changed the page
  if(keyDown("d") && gameState === 3){
    gameState = 4
  }

  //this is where player actually starts the game
  if(gameState === 4){
    sign.visible = false;
    car.visible = true;
    bg.visible = true;
    
    //scroll to the keyword to sey what this function does
  schoolAhead();

  }

  //made it so that people can exit the game
  if(keyDown("e")){
    gameState = "exit";
  }
  
  //finishing the game
  if(gameState === "exit"){
    textFont("comic sans ms");
    textSize(25);
    fill("white");
    text("Thanks for viewing my game",250,250);
    text("Comment and like the project in community if you like it",75,320);
    text("You can reload if you want to play again",180,390);
    car.visible = false;
    bg.visible = false;
    sign1.visible = false;
    sign2.visible = false;
    sign3.visible = false;
    sign4.visible = false;
    obstacle.visible = false;
  }

  if(gameState === 5){
    goSlow();
  }

  if(gameState === 6){
    minSpeed();
    
  }

  if(gameState === 7){
    maxSpeed();
  }
  
  if(gameState === 8){
   noMotorVehicles();
  }
      
  //controlling the car
    if(keyDown("UP_ARROW")){
      car.velocityY = -8;
    }

    if(keyDown("DOWN_ARROW")){
      car.velocityY = 4;
    }

    if(keyDown("RIGHT_ARROW")){
      car.x = car.x + 10
    }

    if(keyDown("LEFT_ARROW")){
      car.x = car.x - 10
    }
    
    //adding friction 
      car.velocityY = car.velocityY + 0.1;

      if(keyDown("space")){
         car.velocityY = 0;
         speed = 20
       }

  car.collide(edges);
  
  //making the game an infinity game
  if(bg.y > 400){
      bg.y = 210
  }
  
  //displaying all the characters of the game
  drawSprites();
 
  //displaying the speed
  if( speed < 40){
  textFont("Comic Sans MS");
  textSize(15)
  fill(0,255,0);
  text("Speed : " + speed + " KMPH",20,20)
  }else if( speed > 40){
    textFont("Comic Sans MS");
    textSize(15)
    fill(255,0,0);
    text("Speed : " + speed + " KMPH",20,20)
  }else {
    speed = 0;
  }
 
  //displaying the funds present with the player
  textFont("Comic Sans MS");
  textSize(15);
  fill(0,255,0)
  text("Balance amount : Rs." + money,600,20)
}

async function goSlow(){
  if(frameCount%400 === 0){
    function sleep(ms) { 
      return new Promise(resolve => setTimeout(resolve, ms))
    } 

 async function delayedGreeting() {
  sign2 = createSprite(60,0,50,50);
  sign2.addImage(sign2img);
  sign2.scale = 0.1
  sign2.velocityY = 2

  await sleep(10000);

  if(sign2.visible = true && speed <= 20){
    money = money + 2000;
    gameState = 6
  } 

 if(sign2.visible = true && speed > 20){
  money = money - 2000;
  texts = createSprite(400,50,50,50);
    texts.scale = 0.5
    texts.addImage(textsimg);
    texts.lifetime = 60;
    gameState = 5;
    
  }
}
   delayedGreeting();
  }
}

async function minSpeed(){
  if(frameCount%400 === 0){
    function sleep(ms) { 
      return new Promise(resolve => setTimeout(resolve, ms))
    } 

 async function delayedGreeting() {
  sign3 = createSprite(740,0,50,50);
  sign3.addImage(sign3img);
  sign3.scale = 0.03;
  sign3.velocityY = 2

  await sleep(10000);

  if(sign3.visible = true && speed >= 30){
    money = money + 2000;
    gameState = 7
  } 
 
 if(sign3.visible = true && speed < 30){
    money = money - 2000;
    texts = createSprite(400,50,50,50);
    texts.scale = 0.5
    texts.addImage(textsimg);
    texts.lifetime = 60;
    gameState = 6;
  }
}
   delayedGreeting();
  }
}

async function maxSpeed(){
  if(frameCount%400 === 0){
    function sleep(ms) { 
      return new Promise(resolve => setTimeout(resolve, ms))
    } 

 async function delayedGreeting() {
  sign4 = createSprite(60,0,50,50);
  sign4.addImage(sign4img);
  sign4.scale = 0.1
  sign4.velocityY = 2

  await sleep(10000);

  if(sign4.visible = true && speed <= 50){
    money = money + 2000;
    gameState = 8
  } 

 if(sign4.visible = true && speed > 50){
    money = money - 2000;
    texts = createSprite(400,50,50,50);
    texts.scale = 0.5
    texts.addImage(textsimg);
    texts.lifetime = 60;
    gameState = 7;
   }
}
   delayedGreeting();
  }
}

async function noMotorVehicles(){
  if(frameCount%400 === 0){
    function sleep(ms) { 
      return new Promise(resolve => setTimeout(resolve, ms))
    } 

 async function delayedGreeting() {
  obstacle = createSprite(200,0,50,50);
  obstacle.addImage(obstacleimg);
  obstacle.velocityY = 2;
  obstacle.scale = 0.7

 
  await sleep(15000);
 
 if(car.isTouching(obstacle)){
  money = money - 2000;
  texts = createSprite(400,50,50,50);
  texts.scale = 0.5
  texts.addImage(textsimg);
  texts.lifetime = 60;
  gameState = 8
   }else{
     money = money + 2000;
     gameState = "exit"
   }
}
   delayedGreeting();
  }
}

async function schoolAhead(){
if(frameCount%400 === 0){
  function sleep(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms))
  } 
  
  async function delayedGreeting() {
    var sign1 = createSprite(740,0,50,50);
    sign1.addImage(sign1img);
    sign1.scale = 0.3;
    sign1.velocityY = 2; 
    
    await sleep(10000);
    
    if(sign1.visible = true && speed <= 20 && speed > 0){
    money = money + 2000;
    gameState = 5
  } 

 if(sign1.visible = true && speed > 20 || speed === 0){
    money = money - 2000;
    texts = createSprite(400,50,50,50);
    texts.scale = 0.5
    texts.addImage(textsimg);
    texts.lifetime = 60;
    gameState = 4;
  }
}
   delayedGreeting();
}
}