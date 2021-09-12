var player, enemy, enemyGroup, enemies, ground, sword, beam, slash, pastPosition, health;
var cooldown, cooldown2, cooldown3, cooldownBar, cooldownBar2, cooldownBar3, cooldownBar4;
var healthBar, healthBar2, invincibility, dodge;
var ground_img, background_img, groundGroup, bottom, gameState;
var mana, mana2, manaBar, manaBar2, player2, healthBar3,healthBar4;
var other_cooldown, other_cooldown2, other_cooldown3, other_cooldownBar;
var other_cooldownBar2, other_cooldownBar3, other_cooldownBar4; 
var other_manaBar, other_manaBar2, other_pastPosition, other_dodge, other_invincibility;
var other_sword, other_beam, other_slash, health2;

function preload() {
  ground_img = loadImage("sprites/ground.png");
  background_img = loadImage("sprites/background.png");
  

}

function setup() {
  
  createCanvas(windowWidth,windowHeight);
  //gamestate = "charging";
  sword = createSprite(400, height/2 - 100, 50, 50);
  sword.lifetime = 1;
  beam = createSprite(400, height/2 - 100, 50, 50);
  beam.lifetime = 1;
  slash = createSprite(400, height/2 - 100, 50, 50);
  slash.lifetime = 1;
  
  
  other_sword = createSprite(400, height/2 - 100, 50, 50);
  other_sword.lifetime = 1;
  other_beam = createSprite(400, height/2 - 100, 50, 50);
  other_beam.lifetime = 1;
  other_slash = createSprite(400, height/2 - 100, 50, 50);
  other_slash.lifetime = 1;
  
  player = createSprite(width/5, height/2 - 100, 50, 50);
  player.shapeColor = rgb(0,0,150);
  player2 = createSprite(4*width/5, height/2 - 100, 50, 50);
  player2.shapeColor = rgb(150,0,150);
  
  bottom = createSprite(width/2,height*3/4,windowWidth,height/2);
  bottom.shapeColor = rgb(147,110,79);
  
  pastPosition = player.x - 1;
  other_pastPosition = player2.x + 1;

  health = 100;
  health2 = 100;
  invincibility = 0;
  other_invincibility = 0;
  dodge = 0;
  other_dodge = 0;
  groundGroup = createGroup();
  enemyGroup = createGroup();
  enemies = [];
  
  enemy = createSprite(1400, 550, 50, 50);
  enemy.shapeColor = rgb(150,150,150);
  enemy.lifetime = 1;
  
  healthBar = createSprite(width/4,50,500,20);
  healthBar.shapeColor = "red";
  healthBar2 = createSprite(width/4,50,500,20);
  healthBar2.shapeColor = "green";

  healthBar3 = createSprite(3*width/4,50,500,20);
  healthBar3.shapeColor = "red";
  healthBar4 = createSprite(3*width/4,50,500,20);
  healthBar4.shapeColor = "green";

  other_manaBar = createSprite(3*width/4 - 50,100,400,20);
  other_manaBar.shapeColor = "black";
  other_manaBar2 = createSprite(3*width/4 - 50,100,400,20);
  other_manaBar2.shapeColor = "blue";
  other_manaBar2.lifetime = 1;

  cooldown = 0;
  cooldown2 = 0;
  cooldownBar = createSprite(width/12,150,20,120);
  cooldownBar.shapeColor = "black";
  cooldown3 = 0;
  cooldownBar3 = createSprite(width/12 + 100,150,20,120)
  cooldownBar3.shapeColor = "black";


  other_cooldownBar = createSprite(11*width/12 - 100,150,20,120);
  other_cooldownBar.shapeColor = "black";
  other_cooldownBar3 = createSprite(11*width/12,150,20,120);
  other_cooldownBar3.shapeColor = "black";
  other_cooldown = 0;
  other_cooldown2 = 0;
  other_cooldown3 = 0;

  


  mana = 0;
  mana2 = 0;
  //console.log(mana2);
  manaBar = createSprite(width/4 + 50,100,400,20);
  manaBar.shapeColor = "black";
  manaBar2 = createSprite(width/4 + 50,100,400,20);
  manaBar2.shapeColor = "blue";
  manaBar2.lifetime = 1;

  
  for (var i = 0; i < windowWidth + 64; i+=128) {
    ground = createSprite(i,height*1/2,50,50);
    ground.addImage("ground",ground_img);
    groundGroup.add(ground);
  }
}

function draw() {
  background(background_img);
  player.velocityY = player.velocityY + 0.4;
  player2.velocityY = player2.velocityY + 0.4;
  player.collide(groundGroup);
  player2.collide(groundGroup);
  if(health > 0 && health2 > 0) {
    Player1();
    Player2();
  } else if (keyDown("space")) {
    player.destroy();
    player2.destroy();
    setup();
  }
  

  if (player2.isTouching(sword) && other_invincibility < 0 && other_dodge < 35) {
    pain2();
  }
  if (player2.isTouching(beam) && other_invincibility < 0 && other_dodge < 35) {
    pain2();
  }
  if (player2.isTouching(slash) && other_invincibility < 0 && other_dodge < 35) {
    pain2();
  }

  
  
  
  
  if (player.isTouching(other_sword) && invincibility < 0 && dodge < 35) {
    pain();
  }
  if (player.isTouching(other_beam) && invincibility < 0 && dodge < 35) {
    pain();
  }
  if (player.isTouching(other_slash) && invincibility < 0 && dodge < 35) {
    pain();
  }
  
  drawSprites();

  textSize(30);

  fill('blue');
  stroke('blue');
  //text("3",23)
  if(mana < 200/3) {
    text("0",width/4 + 275,110)
  } else if (mana < 400/3) {
    text("1",width/4 + 275,110)
  } else if (mana < 200) {
    text("2",width/4 + 275,110)
  } else if (mana === 200) {
    text("3",width/4 + 275,110)
  }
  
  if(mana2 < 200/3) {
    text("0",3*width/4 - 275,110)
  } else if (mana2 < 400/3) {
    text("1",3*width/4 - 275,110)
  } else if (mana2 < 200) {
    text("2",3*width/4 - 275,110)
  } else if (mana2 === 200) {
    text("3",3*width/4 - 275,110)
  }
  if(health <= 0) {
    textSize(30);
    fill('white');
    stroke('black');
    text("Player 2 Wins",width/2- 100,3*height/4)
    text("Space to restart",width/2- 100,3*height/4 + 100)
  }

  if(health2 <= 0) {
    textSize(30);
    fill('white');
  stroke('black');
    text("Player 1 Wins",width/2 - 100,3*height/4);
    text("Space to restart",width/2- 100,3*height/4 + 100);
  }
}



function attack() {

  if (keyDown("w")) {
    sword = createSprite(player.x,player.y - 50,10,50)
  } else  if(keyDown("s") && ground.y - player.y > 41){
    sword = createSprite(player.x,player.y + 50,10,50)
  } else  if(player.x - pastPosition < 0){
    sword = createSprite(player.x - 50,player.y,50,10)
  } else  if(player.x - pastPosition > 0){
    sword = createSprite(player.x + 50,player.y,50,10)
  }
  sword.shapeColor = "white";
  sword.lifetime = 2;
}

function swordBeam() {
  if (player.x - pastPosition < 0) {
    beam = createSprite(player.x-25,player.y,10,50)
  beam.velocityX = -20;
  } else {
    beam = createSprite(player.x+25,player.y,10,50)
    beam.velocityX = 20;
  }
  mana = mana - 200/3;
  manaBar2.destroy();
  if (mana > 0) {
    manaBar2 = createSprite(width/4 + 250 - mana,100,(2)*mana, 20);
    manaBar2.shapeColor = "blue";
  }
  beam.shapeColor = "white";
  beam.lifetime = 30;
}

function swordSlash() {
  if (player.x - pastPosition < 0) {
    player.x = player.x - 250;
    slash = createSprite(player.x+125,player.y,200,10);
  
  } else {
    player.x = player.x + 250
    slash = createSprite(player.x-125, player.y,200,10);
  }
  mana = mana - 400/3;
  manaBar2.destroy();
  if (mana > 0) {
    manaBar2 = createSprite(width/4 + 250 - mana,100,(2)*mana, 20);
    manaBar2.shapeColor = "blue";
  }
  slash.shapeColor = "white";
  slash.lifetime = 2;
}




function Player1() {
  
  if (keyDown("s") && ground.y - player.y <= 41) {
    if (keyDown("w")) {

    } else if (keyDown("a")) {

    } else if (keyDown("d")) {
      
    } else if (keyDown("r")) {
      
    } else if (keyDown("t")) {
      
    } else if (keyDown("y")) {
      
    } else if (mana > 200) {
      mana = 200;
    } else if (mana != 200) {
      //energy.destroy();
      mana = mana + 2;
      manaBar2.destroy();
      manaBar2 = createSprite(width/4 + 250 - mana,100,(2)*mana, 20);
      manaBar2.shapeColor = "blue";
      
      } 
    
  }
  if (keyDown("e") && dodge === 0 && invincibility === -1) {
    dodge = 45;
  }

  if (dodge >= 35) {
    player.shapeColor = rgb(0,20,250,0.5);
    dodge = dodge - 1;
  } else if (dodge != 0) {
    if (invincibility === -1) {
      player.shapeColor = rgb(0,20,150);
    }
    
    dodge = dodge - 1;
  }

  if(invincibility >= 0) {
    player.shapeColor = rgb(0,20,150, 0.25);
    if(invincibility === 0) {
      player.shapeColor = rgb(0,20,150);
    }
    invincibility = invincibility - 1;
  }

  if(cooldown > 0){
   /* cooldownBar2 = createSprite(100,160-4*cooldown,20,8*cooldown);
    cooldownBar2.shapeColor = "red";*/
    cooldown = cooldown - 1;
  }
  if(cooldown2 > 0){
    cooldownBar2 = createSprite(width/12,210-2*cooldown2,20,4*cooldown2);
    
    cooldownBar2.lifetime = 1;
    cooldown2 = cooldown2 - 1;
  }
  if(cooldown3 > 0){
    cooldownBar4 = createSprite(width/12 + 100,210-cooldown3,20,2*cooldown3);
    cooldownBar4.lifetime = 1;
    cooldown3 = cooldown3 - 1;
  }
  if (ground.y - player.y <= 41 && player.velocityX != 0) {
    player.velocityX = 0;
  }
  if(ground.y - player.y <= 41 && keyWentDown("w")) {
    player.velocityY = -10;
    if (keyDown("shift") && keyDown("a")){
      player.velocityX = -10;
   } else if (keyDown("a")) {
     player.velocityX = -5;
   } else if (keyDown("shift") && keyDown("d")) {
    player.velocityX = 10;
   } else if(keyDown("d")) {
    player.velocityX = 5;
   }
   if (keyDown("a") && keyDown("d")) {
    player.velocityX = 0;
   }
  }
  if(keyDown("a") && ground.y - player.y <= 41) {
    pastPosition = player.x;
    if (keyDown("shift")) {
      player.x = player.x - 10;
    } else {
      player.x = player.x - 5;
    }
    
  }
  if(keyDown("d") && ground.y - player.y <= 41) {
    pastPosition = player.x;
    if (keyDown("shift")) {
      player.x = player.x + 10;
    } else {
      player.x = player.x + 5;
    }
  }
  if (keyWentDown("r") && cooldown === 0 && cooldown2 < 25 && cooldown3 < 55 && dodge <= 40) {
    attack();
    cooldown = 6;
  }
  if (keyWentDown("t") && cooldown2 === 0 && cooldown < 3 && cooldown3 < 55 && mana >= 200/3 && dodge <= 40) {
    swordBeam();
    cooldown2 = 30;
  }
  if (keyWentDown("y") && cooldown3 === 0 && cooldown <3 && cooldown2 < 25 && mana >= 400/3 && dodge <= 40) {
    swordSlash();
    cooldown3 = 60;
  }
}









function Player2() {
  
  if (keyDown(DOWN_ARROW) && ground.y - player2.y <= 41) {
    if (keyDown(UP_ARROW)) {

    } else if (keyDown(LEFT_ARROW)) {

    } else if (keyDown(RIGHT_ARROW)) {
      
    } else if (keyDown("j")) {
      
    } else if (keyDown("k")) {
      
    } else if (keyDown("l")) {
      
    } else if (mana2 > 200) {
      mana2 = 200;
    } else if (mana2 != 200) {
      //energy.destroy();
      mana2 = mana2 + 2;
      other_manaBar2.destroy();
      other_manaBar2 = createSprite(3*width/4 - 250 + mana2,100,(2)*mana2, 20);
      other_manaBar2.shapeColor = "blue";
      //console.log(mana2);
      } 
    
  }
  if (keyDown("p") && other_dodge === 0 && other_invincibility === -1) {
    other_dodge = 45;
  }

  if (other_dodge >= 35) {
    player2.shapeColor = rgb(250,0,250,0.5);
    other_dodge = other_dodge - 1;
  } else if (other_dodge != 0) {
    if (other_invincibility === -1) {
      player2.shapeColor = rgb(150,0,150);
    }
    
    other_dodge = other_dodge - 1;
  }

  if(other_invincibility >= 0) {
    player2.shapeColor = rgb(150,0,150, 0.25);
    if(other_invincibility === 0) {
      player2.shapeColor = rgb(150,0,150);
    }
    other_invincibility = other_invincibility - 1;
  }

  if(other_cooldown > 0){
   /* cooldownBar2 = createSprite(100,160-4*cooldown,20,8*cooldown);
    cooldownBar2.shapeColor = "red";*/
    other_cooldown = other_cooldown - 1;
  }
  if(other_cooldown2 > 0){
    other_cooldownBar2 = createSprite(11*width/12 - 100,210-2*other_cooldown2,20,4*other_cooldown2);
    
    other_cooldownBar2.lifetime = 1;
    other_cooldown2 = other_cooldown2 - 1;
  }
  if(other_cooldown3 > 0){
    other_cooldownBar4 = createSprite(11*width/12,210-other_cooldown3,20,2*other_cooldown3);
    other_cooldownBar4.lifetime = 1;
    other_cooldown3 = other_cooldown3 - 1;
  }
  if (ground.y - player2.y <= 41 && player2.velocityX != 0) {
    player2.velocityX = 0;
  }
  if(ground.y - player2.y <= 41 && keyWentDown(UP_ARROW)) {
    player2.velocityY = -10;
    if (keyDown("n") && keyDown(LEFT_ARROW)){
      player2.velocityX = -10;
   } else if (keyDown(LEFT_ARROW)) {
     player2.velocityX = -5;
   } else if (keyDown("n") && keyDown(RIGHT_ARROW)) {
    player2.velocityX = 10;
   } else if(keyDown(RIGHT_ARROW)) {
    player2.velocityX = 5;
   }
   if (keyDown(LEFT_ARROW) && keyDown(RIGHT_ARROW)) {
    player2.velocityX = 0;
   }
  }
  if(keyDown(LEFT_ARROW) && ground.y - player2.y <= 41) {
    other_pastPosition = player2.x;
    if (keyDown("n")) {
      player2.x = player2.x - 10;
    } else {
      player2.x = player2.x - 5;
    }
    
  }
  if(keyDown(RIGHT_ARROW) && ground.y - player2.y <= 41) {
    other_pastPosition = player2.x;
    if (keyDown("n")) {
      player2.x = player2.x + 10;
    } else {
      player2.x = player2.x + 5;
    }
  }
  if (keyWentDown("j") && other_cooldown === 0 && other_cooldown2 < 25 && other_cooldown3 < 55 && other_dodge <= 40) {
    attack2();
    other_cooldown = 6;
  }
  if (keyWentDown("k") && other_cooldown2 === 0 && other_cooldown < 3 && other_cooldown3 < 55 && mana2 >= 200/3 && other_dodge <= 40) {
    swordBeam2();
    other_cooldown2 = 30;
  }
  if (keyWentDown("l") && other_cooldown3 === 0 && other_cooldown <3 && other_cooldown2 < 25 && mana2 >= 400/3 && other_dodge <= 40) {
    swordSlash2();
    other_cooldown3 = 60;
  }
}



function attack2() {

  if (keyDown(UP_ARROW)) {
    other_sword = createSprite(player2.x,player2.y - 50,10,50)
  } else  if(keyDown(DOWN_ARROW) && ground.y - player2.y > 41){
    other_sword = createSprite(player2.x,player2.y + 50,10,50)
  } else  if(player2.x - other_pastPosition < 0){
    other_sword = createSprite(player2.x - 50,player2.y,50,10)
  } else  if(player2.x - other_pastPosition > 0){
    other_sword = createSprite(player2.x + 50,player2.y,50,10)
  }
  other_sword.shapeColor = "white";
  other_sword.lifetime = 2;
}
//3*width/4 - 50
function swordBeam2() {
  if (player2.x - other_pastPosition < 0) {
    other_beam = createSprite(player2.x-25,player2.y,10,50)
    other_beam.velocityX = -20;
  } else {
    other_beam = createSprite(player2.x+25,player2.y,10,50)
    other_beam.velocityX = 20;
  }
  mana2 = mana2 - 200/3;
  other_manaBar2.destroy();
  if (mana2 > 0) {
    other_manaBar2 = createSprite(3*width/4 - 250 + mana2,100,(2)*mana2, 20);
    other_manaBar2.shapeColor = "blue";
  }
  other_beam.shapeColor = "white";
  other_beam.lifetime = 30;
}

function swordSlash2() {
  if (player2.x - other_pastPosition < 0) {
    player2.x = player2.x - 250;
    other_slash = createSprite(player2.x+125,player2.y,200,10);
  
  } else {
    player2.x = player2.x + 250
    other_slash = createSprite(player2.x-125, player2.y,200,10);
  }
  mana2 = mana2 - 400/3;
  other_manaBar2.destroy();
  if (mana2 > 0) {
    other_manaBar2 = createSprite(3*width/4 - 250 + mana2,100,(2)*mana2, 20);
    other_manaBar2.shapeColor = "blue";
  }
  other_slash.shapeColor = "white";
  other_slash.lifetime = 2;
}
function pain() {
  if (player.isTouching(other_beam)) {
    health = health - 5;
    other_beam.destroy();
  }
  if (player.isTouching(other_slash)) {
    health = health - 10;
  }
  if (player2.x > player.x) {
    player.x = player.x - 50;
  } else {
    player.x = player.x + 50;
  }
  health = health - 5;
  healthBar2.destroy();
  if (health > 0) {
    healthBar2 = createSprite(width/4 + 250 - 2.5*health,50,(5)*health, 20);
    //healthBar2 = createSprite(100,225-(3/4)*health,20,(3/2)*health);
    healthBar2.shapeColor = "green";
  }

  invincibility = 5;
  player.shapeColor = rgb(0,20,150,0.25);
}

function pain2() {
  if (player2.isTouching(beam)) {
    health2 = health2 - 5;
    beam.destroy();
  }
  if (player2.isTouching(slash)) {
    health2 = health2 - 10;
  }
  if (player2.x > player.x) {
    player2.x = player2.x + 50;
  } else {
    player2.x = player2.x - 50;
  }
  health2 = health2 - 5;
  healthBar4.destroy();
  if (health2 > 0) {
    healthBar4 = createSprite(3*width/4 - 250 + 2.5*health2,50,(5)*health2, 20);
    //healthBar2 = createSprite(100,225-(3/4)*health,20,(3/2)*health);
    healthBar4.shapeColor = "green";
  }

  other_invincibility = 5;
  player2.shapeColor = rgb(150,0,150,0.25);
}
