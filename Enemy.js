//colors

var hpColor;

class Enemy
{
  constructor(x,y,dir,speed)
  {
    this.difficulty = 1
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.speed = speed * this.difficulty;
    this.turnSpeed = 0.01 * this.difficulty
    this.xVel = 0;
    this.yVel = 0
    this.type = "Bullet"
    this.health = 100 * this.difficulty;
    this.maxHealth = this.health * this.difficulty;
    this.dead = false;
    this.size = 60 * this.difficulty;
    this.color = lerpColor(hpColors[0],hpColors[1],this.health/this.maxHealth);
  }
  
  hurt(value)
  {
    this.health-=value;
    if (this.health<=0)
    {
      this.dead = true;
    }
    this.color = lerpColor(hpColors[0],hpColors[1],this.health/this.maxHealth)
  }
  
  update()
  {
    if (true)
    {
      this.xVel += cos(this.dir)/10
      this.yVel += sin(this.dir)/10
      
      this.xVel = constrain(this.xVel, -2,2)
      this.yVel = constrain(this.yVel, -2,2)
      
    }
    
    //movement
    var angle = atan2(player.y + player.size/2 - this.y, player.x +player.size/2 - this.x)
    
    for (var p = 0; p < 50;p++){
    if (this.dir < angle)
    {
      this.dir+=this.turnSpeed;
    }else if (this.dir > angle)
    {
      this.dir -= this.turnSpeed;
    }
    }
    
    //deceleration
    if (this.xVel > 0)
    {
      this.xVel-=0.01;
    }else
    {
      this.xVel+=0.01;
    }
    
    if (this.yVel > 0)
    {
      this.yVel-=0.01
    }else
    {
      this.yVel+=0.01
    }
    
    //update pos;
    this.x+=this.xVel;
    this.y+=this.yVel
  }
  draw(debug)
  {
    rotate_and_draw_image(img_enemy,this.x-this.size/2,this.y-this.size/2,this.size,this.size,degrees(this.dir)+90)
    
    if (this.health < this.maxHealth)
    hpBar(this.x,this.y-this.size/2,500/10,100/10,this.health/this.maxHealth)
    
    
    if (this.dead)
    {
      return;
    }
    
    
    
    
    if (!debug)
    {
      return;
    } 
    stroke('red')
    circle(this.x,this.y,this.size)
    
    line(this.x,this.y,this.x+cos(this.dir)*100,this.y+sin(this.dir)*100)
  }
}


function hpBar(x,y,wi,he,hp)
{
  x -=wi/2;
  hp = constrain(hp,0,1)
  push();
  noStroke()
  fill(100);
  rect(x,y,wi,he)
  var w = map(hp,0,1,0,wi-(wi/80)*2)
  fill(50)
  rect(x+wi/80,y+he/10,wi-(wi/80)*2,he-he/10*2)
  fill(lerpColor(hpColors[0],hpColors[1],hp))
  rect(x+wi/80,y+he/10,w,he-he/10*2)
  pop();
}