var trex, trex_running, edges;
var groundImage;
var nuvemMg;
var score1=0;
var cacto,cacto1, cacto2,cacto3,cacto4,cacto5,cacto6;
var cactos;
var nuvens;
var END=0
var PLAY=2
var estadodojogo=PLAY;
var morte, vivo, pulando;
var gameover,gameover1;
var restart, restart1;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
nuvemMg = loadImage("nuvem.png");
cacto1= loadImage ("obstacle1.png");
cacto2= loadImage ("obstacle2.png");
cacto3= loadImage ("obstacle3.png");
cacto4= loadImage ("obstacle4.png");
cacto5= loadImage ("obstacle5.png");
cacto6= loadImage ("obstacle6.png");
morte= loadSound("die.mp3");
pulando= loadSound ("jump.mp3");
vivo = loadSound("vivo1.mp3");
gameover= loadImage("gameOver.png");
restart= loadImage("restart.png");
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  //createCanvas(600,200);

  //criando o trex
  trex = createSprite(50,height-40,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50

trex.setCollider("circle",0,0,50);
trex.debug=false;

 ground=createSprite(width/2,height-20,width,20);

ground.addImage(groundImage);
ground.velocityX=-6-score1/100;
ground.scale = 1.5;
invisibleGround=createSprite(width/2,height-10,width,10);
invisibleGround.visible=false;
cactos = new Group();
nuvens = new Group();

gameover1= createSprite(width/2,height/2+10);
gameover1.addImage(gameover);
gameover1.scale=0.3;

restart1= createSprite (width/2,height/2-10);
restart1.addImage(restart);
restart1.scale=0.4;
}

function draw(){
  //definir a cor do plano de fundo 
  background("white");
  textSize(20);
  text("score"+score1,width-150,50);

  if(estadodojogo===PLAY){
    score1=score1+ Math.round(getFrameRate()/60);
    ground.velocityX=-6-score1/100;
    console.log(getFrameRate());
    gameover1.visible=false
    restart1.visible=false
  //registrando a posição y do trex
  console.log("PLAY");
if(score1%100===0&&score1>0){
  vivo.play();
}

  //pular quando tecla de espaço for pressionada
  if((touches.length>0 || keyDown("space")) && trex.y>=height-40){
    trex.velocityY = -10;
    pulando.play();
    touches = [];
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  if (ground.x<0){
    ground.x = ground.width/2;
  }
 //impedir que o trex caia

  nuvem();
  Pao();
  if(cactos.isTouching(trex)){
    estadodojogo=END;
  morte.play();
  }
  }
  else if(estadodojogo===END){
    ground.velocityX=0
    trex.velocityY=0
    cactos.setVelocityXEach(0)
    nuvens.setVelocityXEach(0)
  cactos.setLifetimeEach(-1);
  nuvens.setLifetimeEach(-1);
gameover1.visible=true;
restart1.visible=true; 
if(touches.length>0 || mousePressedOver(restart1)){
reset();
touches = [];
}
}
  trex.collide(invisibleGround);
  drawSprites();
}

function nuvem (){
if(frameCount%60==0){
    var nuvem = createSprite (width-150,height/2,50,50);
  nuvem.addImage(nuvemMg);
  nuvem.y = Math.round(random(height/2-40,height/2));
  trex.depth=nuvem.depth+1
nuvem.velocityX= -3;
nuvem.lifetime=1000;
nuvens.add(nuvem);
}
}
function Pao(){
  if(frameCount%60==0){
    var cacto = createSprite(width,height-25,50,50);
  cacto.velocityX= -6-score1/100;
  cacto.lifetime=1000;
  cacto.scale=0.6;
  cactos.add(cacto);
var numero= Math.round(random(1,6));
switch(numero){
  case 1:cacto.addImage(cacto1);
  break;
  case 2:cacto.addImage(cacto2);
  break;
  case 3:cacto.addImage(cacto3);
  break;
  case 4:cacto.addImage(cacto4);
  break;
  case 5:cacto.addImage(cacto5);
  break;
  case 6:cacto.addImage(cacto6);
  break;
  default: break;
}
}
}
function reset(){
  estadodojogo=PLAY
  gameover1.visible=false
  restart1.visible=false
cactos.destroyEach();
nuvens.destroyEach();
score1=0;
}