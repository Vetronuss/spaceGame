//size in pixels of border size (1 will be 1 pixel inward on all sides)
let borderSize = 20;
var playerInit = false
//draw borders, background
function drawLevel(poly)
{
  imageMode(CENTER);
  image(randBg,width/2,height/2,1920*0.75,1080*0.75);
  
  noStroke();
  fill(10,150)
  
  
  
  rect(0,0,width,borderSize)
  rect(0,0,borderSize,height)
  rect(0,height-borderSize,width,borderSize)
  rect(width-borderSize,0,borderSize,height)
  push()
  noFill();
  stroke(0)
  rect(borderSize,borderSize,width-borderSize*2,height-borderSize*2)
  //score
  textSize(37)
  fill(200)
  stroke(0)
  strokeWeight(3)
  textFont('Chakra Petch')
  
  if (collideRectPoly(width/2-450,height-20-40,450*2,40,player.shape)){
  
    tint(255,map(distance(player.x,player.y,player.x,height),0,200,20,255))
  }
  image(img_stats,width/2,height-20,450,40)
  textAlign(CENTER, BOTTOM)
  text(currentRound,width/2,height+3)
  
  pop();
  
  push();
    fill('crimson')
  textFont('Chakra Petch')
    stroke(0)
  strokeWeight(3)
    textSize(37)
  textAlign(CENTER, BOTTOM)
    text(player.lives,width/4,height+3)
  
    pop();
  //if player collides with border
  
  if (collideRectPoly(0,0,width,borderSize, poly) || collideRectPoly(0,0,borderSize,height, poly) || collideRectPoly(0,height-borderSize,width,borderSize, poly) || collideRectPoly(width-borderSize,0,borderSize,height, poly))
  {
    return true;    
  }else
  {
    return false
  }
     
       
     
}









