function monster(world, posX, posY){
  var width = 20,
      height = 20,
      style = 'black',
      x = posX,
      y = posY,
      rowPosition = posY,
      velocity = 1,
      direction = right,
      previousDirection = null,
      surface = world.surface,
      rightEdge = world.width - world.offsetX,
      leftEdge = world.offsetX,
      alive = true;

  function update(){
    direction();
  }

  function left(){
    if(isAtLeftEdge()){
      changeRowForAllMonsters();
    }
    else{
      x = x - velocity;
    }
  }

  function isAtLeftEdge(){
    return x <= leftEdge;
  }

  function right(){
    if(isAtRightEdge()){
      changeRowForAllMonsters();
    }
    else{
      x = x + velocity;
    }
  }

  function isAtRightEdge(){
    return x+width >= rightEdge;
  }

  function down(){
    y = y + velocity;
    if(y >= rowPosition){
      direction = previousDirection === left ? right : left;
    }
  }

  function changeRowForAllMonsters(){
    world.entities.forEach(function (e){
      if(e.changeRow && e.direction !== down){
        e.changeRow();
      }
    });
  }

  function changeRow(){
    rowPosition = y + world.offsetY + height;
    previousDirection = direction;
    direction = down;
  }

  function draw(){
    surface.fillStyle = style;
    surface.fillRect(x, y, width, height);
  }

  return {
    draw : draw,
    update : update,
    changeRow : changeRow,
    kill : function(){ alive = false; },
    isAlive : function(){ return alive; },
    getX : function(){ return x;},
    getY : function(){ return y;},
    getWidth : function(){return width;},
    getHeight : function(){return height;}
  };
}