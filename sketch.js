
var PLAY=1;
var END=0;
var gameState=1;

var fruit, fruitGroup, fruit1, fruit2, fruit3, fruit4;
var monster, monsterImage;
var sword, swordImage;

var gameOver, gameOverImg;

var score;

var knifeSwooshSound;

function preload(){
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");

  gameOverImg = loadImage("gameover.png")
   
  monsterImage = loadImage("alien1.png")
  swordImage = loadImage("sword.png")
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
}

function setup(){
  
  fruitGroup=new Group();
  enemyGroup=new Group();

sword=createSprite(40,200,20,20);
sword.addImage(swordImage);
sword.scale=0.7

score = 0;

gameOver = createSprite(200,175);
gameOver.addImage(gameOverImg);

}

function draw(){
  background(180);

text("Score: "+ score, 350, 20);
sword.y=World.mouseY;
sword.x=World.mouseX;

fruits();
Enemy();

gameOver.visible = false;

if(fruitGroup.isTouching(sword)){
  fruitGroup.destroyEach();

  knifeSwooshSound.play();
  score=score +2;
}

if(sword.isTouching(enemyGroup)){
  gameState = END}

else if (gameState === END) {
  fruitGroup.setVelocityXEach(0);
  enemyGroup.setVelocityXEach(0);
  fruitGroup.destroyEach();
  enemyGroup.destroyEach();
  gameOver.visible = true;
  sword.visible = false;

  }
  drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);

    if(position==1)
    {
    fruit.x=400;
    fruit.velocityX=-(7+(score/4));
    }
    else 
    {
      if(position==2){
      fruit.x=0;

      fruit.velocityX= (7+(score/4));
    }
}
    fruit.scale=0.2;
     r=Math.round(random(1,4));
    if (r == 1) { 
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4); 
    } 
    
    fruit.y=Math.round(random(50,340)); 

    fruit.setLifetime=100;

    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;

    enemyGroup.add(monster);
  }
}