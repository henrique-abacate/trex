var trex, trex_running, edges;
var groundImage;
var nuvemMg;
var text1=0;
var cacto,cacto1, cacto2,cacto3,cacto4,cacto5,cacto6;
var cactos;
var nuvens;

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
}

function setup(){
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50

 ground=createSprite(300,180,600,20);

ground.addImage(groundImage);
ground.velocityX=-6;
invisibleGround=createSprite(300,190,600,10);
invisibleGround.visible=false;
cactos = new Group();
nuvens = new Group();
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  textSize(20);
  text("score"+text1,450,50);

  
  //registrando a posição y do trex
  console.log(trex.y)
  
  //pular quando tecla de espaço for pressionada
  if(keyDown("space")&& trex.y>=161.5){
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  if (ground.x<0){
    ground.x = ground.width /2;
  }
 //impedir que o trex caia
  trex.collide(invisibleGround);
  nuvem();
  Pao();
  drawSprites();
}

function nuvem (){
if(frameCount%60==0){
  var nuvem = createSprite (450,100,50,50);
  nuvem.addImage(nuvemMg);
  nuvem.y = Math.round(random(60,100))
  trex.depth=nuvem.depth+1
nuvem.velocityX= -3;
nuvem.lifetime=150
nuvens.add(nuvem);
}
}
function Pao(){
  if(frameCount%60==0){
    var cacto = createSprite (450,175,50,50);
  cacto.velocityX= -3;
  cacto.lifetime=150
  cactos.add(cacto);
var numero= Math.round(random (1,6));
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