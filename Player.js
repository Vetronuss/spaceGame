/*

bounds points

*/
var bounds = [-84.5,
-36.5,
-89.5,
-70.5,
-88.5,
-107.5,
-81.5,
-139.5,
-107.5,
-139.5,
-127.5,
-107.5,
-136.5,
-65.5,
-126.5,
-7.5,
-104.5,
30.5,
-80.5,
52.5,
-68.5,
67.5,
-90.5,
119.5,
-97.5,
151.5,
-66.5,
161.5,
-34.5,
154.5,
48.5,
154.5,
69.5,
160.5,
104.5,
151.5,
77.5,
75.5,
83.5,
54.5,
133.5,
-8.5,
140.5,
-78.5,
119.5,
-142.5,
81.5,
-140.5,
85.5,
-118.5,
86.5,
-55.5,
75.5,
-53.5,
51.5,
-47.5,
39.5,
-84.5,
30.5,
-104.5,
15.5,
-129.5,
-0.5,
-164.5,
-38.5,
-85.5,
-50.5,
-48.5];

//DO NOT CHANGE, these are flags for accessing, not writing
var autoShoot = false;
var playerSpeed = 6;
//global for key down
var down = false;

class Player
{
  constructor(x,y)
  {
    this.x = x;
    this.y = y;
    this.xVel = 0;
    this.yVel = 0;
    this.dir = radians(90);
    this.shape = [];
    this.size = 100;
    this.turnSpeed = 0.07;
    this.stopRadius = this.size/2
    this.shootDelay = 300;
    this.shootCount = 0;
    this.boost = false;
    this.power = null
    this.lives = 5;
    this.protect = 30;
    this.protectT = 0
    for (var i = 0; i < bounds.length;i+=2)
    {
      this.shape.push(createVector(this.x+map(bounds[i],0,600,0,this.size),this.y+map(bounds[i+1],0,600,0,this.size)))
    }
    playerInit = true;
  }
  
  shoot()
  {
    //console.log("shoot")
    this.shootDelay = 300;
    if (this.power == null){
    shots.push(new Projectile(this.x+this.size/2,this.y+this.size/2,this.dir,10,"basic"));
    }else if (this.power.type == "shotgun")
    {
      shots.push(new Projectile(this.x+this.size/2,this.y+this.size/2,this.dir,10,"basic"));
      shots.push(new Projectile(this.x+this.size/2,this.y+this.size/2,this.dir+radians(10),10,"basic"));
      shots.push(new Projectile(this.x+this.size/2,this.y+this.size/2,this.dir-radians(10),10,"basic"));
    }else if (this.power.type == "flame")
    {
      this.shootDelay = 100;
      shots.push(new Projectile(this.x+this.size/2,this.y+this.size/2,this.dir,10,"flame"))
    }
  }
  
  
  update()
  {
    //shooting
    if (keyIsDown(32) && down == false)
    {
      this.shootCount = millis();
      this.shoot();
      //console.log(this.power)
      
      if (autoShoot){}
      else if (this.power == null){
        
        down = true;
      
      }else if (this.power.type != "flame")
      {
        //console.log(this.power.type)
        down = true;
      }
    }
    if (!keyIsDown(32) && millis()-this.shootCount > this.shootDelay)
    {
      down = false;
    }
    
    
    //movement
    if (keyIsDown(65))
    {
      this.dir-=this.turnSpeed;  
      
    }else if (keyIsDown(68))
    {
      this.dir+=this.turnSpeed;  
    }
    
    if (keyIsDown(87))
    {
      this.xVel += cos(this.dir)/playerSpeed
      this.yVel += sin(this.dir)/playerSpeed
      this.boost = true;
    }else
    {
      this.boost = false;
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
    //vars for easy tweaking
    var t = this.x+this.size/2;
    var r = this.y+this.size/2
    
    //stop for border
    if (t-this.stopRadius < 0)
    {
      this.xVel = constrain(this.xVel, 0, 100);
    }
    if (t+this.stopRadius > width)
    {
      this.xVel = constrain(this.xVel, -100, 0);
    }
    
    if (r+this.stopRadius > height)
    {
      this.yVel = constrain(this.yVel,-100,0);
    }
    if (r-this.stopRadius < 0)
    {
      this.yVel = constrain(this.yVel,0,100);
    }
    
    //update position
    this.x+=this.xVel;
    this.y+=this.yVel
    
    //update hitbox
    this.shape = [];
    for (var i = 0; i < bounds.length;i+=2)
    {
      this.shape.push(createVector(this.x+this.size/2+map(bounds[i],0,600,0,this.size),this.y+this.size/2+map(bounds[i+1],0,600,0,this.size)))
    }
  
    this.shape = rotateMatrix(this.shape,this.x+this.size/2,this.y+this.size/2,this.dir+radians(90))
  }
  
  
  //draws to screen
  draw(debug)
  {
    
    if (this)
    rotate_and_draw_image(img_ship,this.x,this.y,this.size,this.size,degrees(this.dir)+90)
    
    
    //flame
    if (this.boost)
    {
      rotate_and_draw_image(img_flame[round(millis()/100)%2],(this.x-this.size/2)-cos(this.dir)*this.size/2.5,(this.y-this.size/2)-sin(this.dir)*this.size/2.5,this.size*2,this.size*2,degrees(this.dir)+90)
      
    }
    
    
    
    if (!debug)
    {
      return;
    }
    line(this.x+this.size/2,this.y+this.size/2,this.x+this.size/2+cos(this.dir)*100,this.y+this.size/2+sin(this.dir)*100)
    stroke(255)
    noFill();
    beginShape();
    for (var i = 0; i < this.shape.length; i++)
    {
      vertex(this.shape[i].x,this.shape[i].y)
    }
    endShape();
    
    
    circle(this.x+this.size/2,this.y+this.size/2,this.stopRadius)
    
    
  }
  
}


function rotate_and_draw_image(img,img_x, img_y, img_width, img_height, img_angle){
  imageMode(CENTER);
  translate(img_x+img_width/2, img_y+img_width/2);
  rotate(PI/180*img_angle);
  image(img, 0, 0, img_width, img_height);
  rotate(-PI / 180 * img_angle);
  translate(-(img_x+img_width/2), -(img_y+img_width/2));
  imageMode(CORNER);
}

//used to calculate new hitboxes from an array of vectors
function rotateMatrix(verts,cx,cy,ang)
{
  var newVerts = []
  for (var i = 0; i < verts.length; i++)
  {
    var angle = atan2(verts[i].y-cy,verts[i].x-cx)
    angle+=ang;
    var d = distance(verts[i].x,verts[i].y,cx,cy)
    newVerts.push(createVector(cx+cos(angle)*d,cy+sin(angle)*d));
  }
  
  return newVerts;
  
}

function distance(x1,y1,x2,y2)
{
  var distance = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
  return distance;
}

