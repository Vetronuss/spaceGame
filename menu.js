
function drawMainMenu()
{
  push();
  imageMode(CENTER)
  image(img_window,width/2,height/2,400,500)
  if (collidePointRect(mouseX,mouseY,157,156,444-157,244-156))
  {
    tint(200,200,255)
    if (mouseIsPressed)
    {
      
      play = true;
    }
    
  }
  image(img_startBt,width/2,height/6*2,300,100)
  if (key == 'a')
  {
    key = NaN;
    console.log (mouseX,mouseY)
  }
  pop();
}












