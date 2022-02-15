class Power
{
  constructor(x,y,type)
  {
    this.x = x;
    this.y = y;
    this.type = type;
    this.grabDist = 50
  }
  
  update()
  {
    return (distance(player.x+player.size/2,player.y+player.size/2,this.x,this.y) < this.grabDist);
  }
  
  draw()
  {
    push();
    if (this.type == "shotgun")
    {
      fill('purple')
      strokeWeight(1)
      stroke(0)
      circle(this.x,this.y,10)
    }else if (this.type == "flame")
    {
      fill('red')
      strokeWeight(1)
      stroke(0)
      circle(this.x,this.y,10)
    }
    pop();
    
    circle(this.x,this.y,this.grabDist)
  }
}