
//images
var img_bg, img_ship, img_flame;
var randBg;
var img_fire = []
var img_window;
var img_startBt
var img_lose;
var img_stats
var img_replay
var img_enemy
//constants
var windowSize;
var AsteroidSpawnRate = 200;
var globalDebug = false
//objects
var player
var asteroids = [];
var shots = []
var enemys = [];
//misc
var lose = false;
var currentRound = 0;
var power = null;
var hitAngle
var powers = ["flame","shotgun"]
var cheatBox
var cheatBtn
var cheat
//fonts
var fnt

//load all images used
function preload()
{
  
  img_bg = [loadImage('Space_Background1.png'),loadImage('Space_Background2.png'),loadImage('Space_Background3.png'),loadImage('Space_Background4.png')]
  img_ship = loadImage('Spaceship_03_NAVY BLUE.png')
  img_fire = [loadImage('Flame_01.png'),loadImage('Flame_02.png')]
  
  //pick random bg
  randBg = random(img_bg);
  
  img_flame = [loadImage('Flame_01.png'),loadImage('Flame_02.png')]
  
  img_window = loadImage('moreUi/Window.png')
  img_startBt = loadImage('MainMenu/Start_BTN.png')
  img_lose = loadImage('Header.png')
  img_stats = loadImage('moreUi/Stats_Bar.png')
  img_replay = loadImage('moreUi/Replay_BTN.png');
  img_enemy = loadImage('image.png')
  //fnt = loadFont('moreUi/ChakraPetch-Regular.ttf')
}






function setup() {
  windowSize = windowWidth;
  if (windowHeight < windowWidth)
  {
    windowSize = windowHeight;
  }
  windowSize = 600
  createCanvas(windowSize, windowSize);
  
  //create player object
  player = new Player(width/2,height/2)
  //test = new Asteroid(width/2,height/2,100,100)
  hpColors = [color('red'),color('lime')];
  frameRate(60);
  cheatBox = createInput('');
  cheatBtn = createButton("Submit")
  cheatBtn.mousePressed(cheatCodes);
  
}
var start = false;

//if play is false then the game will be paused and the main menu will be shown
var play = false;
function draw() {

  player.protectT++;
  //console.log(player.protectT)
  if (lose && player.protectT > player.protect)
  {
    
    player.lives--;
    if (player.lives <= 0)
    {
      
      loseScreen();
      return;
    }else
    {
      player.xVel = cos(hitAngle)*3
      player.yVel = sin(hitAngle)*3
      player.protectT = 0;
      lose = false;
      
    }
  }else
  {
    lose = false;
  }
  
  
  if (!start)
  {
    start = true;
  }else{
    if (!play)
    {
      drawMainMenu(globalDebug);
      return
    }
    
  }
    
  if (enemys.length <= 0)
  {
    nextRound();
  }
  
    //asteroid spawn
  if (frameCount % AsteroidSpawnRate == 0)
  {
    let a = random(0,TWO_PI)
    let l = atan2(random(100,height-100)-sin(a)*1000,random(100,width-100)-cos(a)*1000)
    
    asteroids.push(new Asteroid(width/2+cos(a)*500,height/2+sin(a)*500,random(50,100),random(0,1000),l))
    
  }
  
  background(100);
    
  //returns true if player collides with border, useless if players movement is blocked anyway
  if (drawLevel(player.shape))
  {
    //console.log("HIT")
  }
  player.draw(globalDebug);
  player.update();
    
  //go through bullets shot
  for (var i = 0; i < shots.length; i++)
  {
    if (!shots[i].update())
    {
      shots.splice(i,1);
      i--;
      continue;
    }
    shots[i].draw();
    
    //if shot out of bounds
    if (shots[i].x < 0 || shots[i].x > width || shots[i].y < 0 || shots[i].y > height)
    {
      //delete shot
      shots.splice(i,1);
      i--;
      continue;
    }
    
    let brk = false;
    //asteroid collision
    for (var j = 0; j < asteroids.length; j++)
    {
      if (collideLinePoly(shots[i].x,shots[i].y,shots[i].x2,shots[i].y2,asteroids[j].points,true))
      {
        //delete shot
        shots.splice(i,1);
        i--;
        brk = true;
        break;
      }
    }
    if (brk)
      continue;
    //enemy bullet collision
    for (var j = 0; j < enemys.length;j++)
    {
      if (collideLineCircle(shots[i].x,shots[i].y,shots[i].x2,shots[i].y2,enemys[j].x,enemys[j].y,enemys[j].size,true))
      {
        enemys[j].hurt(shots[i].damage)
        shots.splice(i,1);
        i--;
        break;
      }
    }
  
    
  }
  
    //player collision with asteroid
  for (var i = 0; i < asteroids.length; i++)
  {
    asteroids[i].update();
    asteroids[i].draw(globalDebug);
    
    if (distance(asteroids[i].x,asteroids[i].y,width/2,height/2) > 1000)
    {
      asteroids.splice(i,1)
      i--
      continue;
    }
    
    if (collidePolyPoly(player.shape,asteroids[i].points,true))
    {
        lose = true;
      hitAngle = atan2(player.y-asteroids[i].y,player.x-asteroids[i].x);
    }
  }
    
    for (var i = 0; i < enemys.length; i++)
    {
      enemys[i].update()
      enemys[i].draw(globalDebug);
      if (enemys[i].dead)
      {
        //delete enemy
        enemys.splice(i,1);
        i--;
        continue;
      }
      
      if (collideCirclePoly(enemys[i].x,enemys[i].y,enemys[i].size,player.shape))
      {
        lose = true;
        hitAngle = atan2(player.y-enemys[i].y,player.x-enemys[i].x);
        
      }
      
      for (var o = 0; o < enemys.length; o++)
    {
      if (enemys[i] != enemys[o])
      {
        if (collideCircleCircle(enemys[i].x,enemys[i].y,enemys[i].size,enemys[o].x,enemys[o].y,enemys[o].size))
        {
          
          let angle = atan2(enemys[i].y - enemys[o].y, enemys[i].x - enemys[o].x) + radians(180)
          let d = distance(enemys[o].x,enemys[o].y,enemys[i].x,enemys[i].y)
          enemys[i].x -= cos(angle) * (d/100)
          enemys[i].xVel -= cos(angle)/5
          enemys[i].y -= sin(angle) * (d/100)
          enemys[i].yVel -= cos(angle)/5
          
        }
      }
    }
    }
  
  
  if (power != null)
  {
    power.draw();
    if (power.update())
    {
      player.power = power;
      power = null;
    }
  }
}

  function nextRound()
  {
    currentRound++;;
    player.power = null;
    if (currentRound > 2)
    {
      if (random() > 0.5)
      {
        power = new Power(random(40,width-40),random(40,height-40),random(powers));
      }
    }
    enemys.splice(0,1231231)
    for (var i = 0; i < currentRound; i++)
    {
      
      let a = random(0,TWO_PI)
    let l = atan2(random(100,height-100)-sin(a)*1000,random(100,width-100)-cos(a)*1000)
    
    enemys.push(new Enemy(width/2+cos(a)*500,height/2+sin(a)*500,0,0))
    }
  }

  
  function restartGame()
  {
    lose = false;
    currentRound = 0;
    enemys.splice(0,1231231)
    shots.splice(0,12312);
    asteroids.splice(0,12313)
    player.lives = 3;
    player.power = null;
    
    power = null;
    nextRound();
  }

  
  function loseScreen()
{
  
  push();
  imageMode(CENTER)
  image(img_window,width/2,height/2,400,500)
  image(img_lose,width/2,height/7,300,50)
  if (collidePointRect(mouseX,mouseY,162,430,256-162,520-430))
  {
    
    tint(200,200,255)
    if (mouseIsPressed)
    {
      console.log("Restart")
      restartGame();
    }
    
  }
  image(img_replay,width/20*7,height/10*8,100,100)
  if (key == 'a')
  {
    key = NaN;
    console.log (mouseX,mouseY)
  }
  pop();
}
  
function cheatCodes()
  {
    if (cheatBox.value() == "god")
    {
      player.lives = 9999
    }
    
    if (cheatBox.value() == "bullet go brrr" || cheatBox.value() == "brrr" || cheatBox.value() == "rapid" )
    {
      autoShoot = true;
      player.shootDelay = 0;
    }
    
    if (cheatBox.value() == "zoom")
    {
      playerSpeed = 1
    }
    
    if (cheatBox.value() == "spin")
    {
      player.turnSpeed = 0.5
    }
    
    
    cheatBox.value("");
  }
