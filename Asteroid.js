//class for the random asteroid objects
/*

the random shape of the asteroids is determined by perlin noise in a circle
https://editor.p5js.org/gclebor-16/sketches/7x6Umt_Wy
*/
class Asteroid
{
  constructor(x,y,size,seed, dir)
  {
    this.x = x;
    this.y = y;
    this.size = size;
    this.seed = seed;
    this.points = [];
    this.detail = 30;
    this.dir = dir;
    this.speed = random(1,3);
    this.scale = 0.7;
    this.spin = 0;
    this.spinSpeed = random(0.001,0.01);
    noiseSeed(seed);
    
  }
  
  update()
  {
    //update speed postion and rotation
    this.spin+=this.spinSpeed;
    this.x+=cos(this.dir)*this.speed;
    this.y+=sin(this.dir)*this.speed;
    this.points = [];
    noiseSeed(this.seed);
    for (var i = 0; i < TWO_PI; i+= TWO_PI/this.detail)
    {
      var n = noise(100+cos(i)*this.scale,100+sin(i)*this.scale)
      this.points.push(createVector(this.x+(cos(i)*this.size*n),this.y+(sin(i)*this.size*n)))
    }
    
    this.points = rotateMatrix(this.points,this.x,this.y,this.spin);
  }
  
  draw()
  {
    push();
    fill(100)
    stroke(0)
    beginShape();
    for (var i = 0; i < this.points.length; i++)
    {
      vertex(this.points[i].x,this.points[i].y)
    }
    endShape(CLOSE);
    pop();
  }
  
  
}