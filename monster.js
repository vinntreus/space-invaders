function monster(world, posX, posY){
  var width = 20,
      height = 20,
      style = 'black',
      x = posX,
      y = posY,
      rowPosition = posY,
      velocity = 0.8,
      direction = right,
      previousDirection = null,
      surface = world.surface;

  function update(){
    direction();
  }

  function left(){
    x = x - velocity;
    if(x < world.offsetX){
      changeRow();
      direction = down;
      previousDirection = left;
    }
  }

  function right(){
    x = x + velocity;
    if(x+width > world.width-world.offsetX){
      changeRow();
      direction = down;
      previousDirection = right;
    }
  }

  function down(){
    y = y + velocity;
    if(y >= rowPosition){
      direction = previousDirection === left ? right : left;
    }
  }

  function changeRow(){
    rowPosition = y + world.offsetY + height;
  }

  function draw(){
    surface.fillStyle = style;
    surface.fillRect(x, y, width, height);
  }

  return {
    draw : draw,
    update : update
  };
}