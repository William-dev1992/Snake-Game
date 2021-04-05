window.onload = function() {
  canvs = document.querySelector('.board');
  ctx = canvs.getContext('2d');
  document.addEventListener("keydown", keyPush);
  setInterval(game, 1000/15);
}

trail= []
tail = 5

playerPosX=playerPosY=15;
gridSize=tileCount=25;
appleX=appleY=10;

xVel=yVel=0;

function game() {
  playerPosX += xVel;
  playerPosY += yVel;
  if(playerPosX < 0){
    playerPosX = tileCount-1;
  }
  if(playerPosX > tileCount-1){
    playerPosX = 0;
  }
  if(playerPosY < 0){
    playerPosY = tileCount-1;
  }
  if(playerPosY > tileCount - 1){
    playerPosY = 0;
  }

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvs.width, canvs.height);

  ctx.fillStyle = 'red';
  ctx.fillRect(appleX*gridSize, appleY*gridSize, gridSize-2, gridSize-2);

  ctx.fillStyle = 'green';
  for(var i=0; i<trail.length; i++){
    ctx.fillRect(trail[i].x*gridSize, trail[i].y*gridSize, gridSize-2, gridSize-2);

    if(trail[i].x == playerPosX && trail[i].y == playerPosY){
      tail = 5;
    }
  }

  trail.push({x:playerPosX, y:playerPosY});
  while(trail.length > tail){
    trail.shift()
  }

  if(appleX == playerPosX && appleY == playerPosY){
    tail++;
    appleX = Math.floor(Math.random()*tileCount);
    appleY = Math.floor(Math.random()*tileCount);
  }
}

function keyPush(event) {
  switch(event.keyCode){
    case 37: 
      xVel=-1;
      yVel=0;
      break;

    case 38: 
      xVel=0;
      yVel=-1;
      break;

    case 39: 
      xVel=1;
      yVel=0;
      break;

    case 40: 
      xVel=0;
      yVel=1;
      break;
  }
}