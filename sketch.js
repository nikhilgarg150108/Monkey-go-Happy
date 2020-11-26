var monkey, monkey_running, banana, bananaImage, bananaGroup, rock, rockImage, rockGroup;
var jungle, jungleImage, ground;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("stone.png");
  jungleImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(600, 300);

  jungle = createSprite(300, 50, 600, 300);
  jungle.scale = 1.25;
  jungle.addImage(jungleImage);
  jungle.x = jungle.width / 2;
  jungle.velocityX = -4;

  monkey = createSprite(75, 225, 20, 20);
  monkey.scale = 0.15;
  monkey.addAnimation("running", monkey_running);

  ground = createSprite(300, 275, 600, 5);
  ground.visible = false;

  bananaGroup = new Group();
  rockGroup = new Group();

  score = 0;
}

function draw() 
{
  background(180);

  if (gameState === PLAY) 
  {
    if (keyDown("space")) 
    {
      monkey.velocityY = -10;
    }

    monkey.velocityY = monkey.velocityY + 0.8

    if (jungle.x < 0) {
      jungle.x = jungle.width / 2;
    }

    food();
    obstacles();
    
    if (monkey.isTouching(bananaGroup))
    {
      banana.destroy();
      score=score+2;
    }
    
    if (score%10===0)
    { 
      switch (score)
      {
        case 10:monkey.scale=0.16;
          break;
        case 20: monkey.scale=0.17;
          break;
        case 30: monkey.scale=0.18;
          break;
        case 40: monkey.scale=0.2;
          break;
      }
    }   

    if (rockGroup.isTouching(monkey) && monkey.scale>0.15) 
    {
      rock.destroy();
      monkey.scale=0.15;
    }
    if (rockGroup.isTouching(monkey) && monkey.scale===0.15) 
    {
      gameState=END;
    }
    
  } else if (gameState === END) 
  {
    //set velcity of each game object to 0
    jungle.velocityX = 0;
    monkey.velocityY = 0;
    rockGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

    //set lifetime of the game objects so that they are never destroyed
    rockGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }

  monkey.collide(ground);

  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 450, 50);
}

function food() {
  if (frameCount % 80 === 0) 
  {
    banana = createSprite(600, random(50, 150));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -6;
    banana.lifetime = 120;
    bananaGroup.add(banana);
  }  
}

function obstacles() {
  if (frameCount % 200 === 0) {
    rock = createSprite(600, 225);
    rock.addImage(rockImage);
    rock.setCollider("circle", 0, 0, 200);
    rock.scale = 0.25;
    rock.velocityX = -6;
    rock.lifetime = 120;
    rockGroup.add(rock);
  }
}