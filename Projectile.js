//class for the projectiles shot from a player
class Projectile
{
  constructor(x,y,dir,speed, type)
  {
    this.type = type;
    this.x = x;
    this.y = y;
    this.color = null
    
    if (this.type == "flame")
    {
      this.dir = dir+=random(radians(-10),radians(10));
      this.color = lerpColor(color('red'),color('orange'),random(0,1))
    }else
    {
      this.dir = dir;
    }
    
    this.speed = speed;
    this.size = 30;
    //type defines how the projectile will act
    
    this.damage;
    if (this.type == "basic")
    {
      this.damage = 30;
    }else if (this.type == "charge")
    {
      this.damage = 100;
    }else if (this.type == "flame")
    {
      this.damage = 10
    }
    this.x2;
    this.y2;
  }
  
  draw()
  {
    if (this.type == "basic"){
    push();
    strokeCap(SQUARE)
    strokeWeight(10)
    stroke(10,100,10,255/2)
    line(this.x,this.y,this.x+cos(this.dir)*this.size, this.y+sin(this.dir)*this.size)
    pop();
    }else if (this.type == "flame")
    {
      //console.log("flame," + this.x, this.y)
      push();
      stroke(this.color)
      fill('orange')
      circle(this.x,this.y,10)
      pop();
    }
  }
  
  update()
  {
    this.x+=cos(this.dir)*this.speed
    this.y+=sin(this.dir)*this.speed
    
    this.x2 = this.x+cos(this.dir)*this.size;
    this.y2 = this.y+sin(this.dir)*this.size;
    
    if (this.type == "flame"){
      this.speed*=0.95
      if (this.speed < 0.01)
      {
        return false;
      }else
      {
        return true;
      }
    }else
    {
      return true;
    }
  }
  
}