function player(world, keyDown){
  var width = 60,
      height = 10,
      style = 'black',
      surface = world.surface,
      x = world.width / 2 - width / 2,
      y = world.height - world.offsetY - height * 2,
      velocity = 2,
      bullets = [],
      shootThrottle = 0,
      alive = true;

  function draw(){
    surface.fillStyle = style;
    surface.fillRect(x, y, width, height);
    bullets.forEach(function(b){
      b.draw();
    });
  }

  function update(){
    if(shootThrottle > 0){ shootThrottle = shootThrottle - 1;}
    if(keyDown.LEFT && x > 0){
      x = x - velocity;
    }
    else if(keyDown.RIGHT && x < (world.width - width)){
      x = x + velocity;
    }
    else if(keyDown.SPACE && shootThrottle === 0){
      shoot();
      shootThrottle = 60;
    }

    bullets = bullets.filter(function(b){return b.isAlive();});
    bullets.forEach(function(b){
      b.update();
    });

  }

  function shoot(){
    var xPos = x + width / 2;
    var yPos = y - height;
    bullets.push(bullet(world, xPos, yPos));
  }

  return {
    draw : draw,
    update : update,
    isAlive : function(){ return alive; },
    getX : function(){ return x;},
    getY : function(){ return y;},
    getWidth : function(){return width;},
    getHeight : function(){return height;}
  };
}

function bullet(world, xPos, yPos){
  var width = 10,
      height = 20,
      style = 'black',
      surface = world.surface,
      x = xPos,
      y = yPos,
      velocity = 4,
      alive = true,
      self = {
        draw : draw,
        update : update,
        isAlive : function(){ return alive; },
        getX : function(){ return x;},
        getY : function(){ return y;},
        getWidth : function(){return width;},
        getHeight : function(){return height;}
      };

  function draw(){
    surface.fillStyle = style;
    surface.fillRect(x, y, width, height);
  }

  function update(){
    var coords = {x : x, y : y};
    if(world.isOutOfBounds(coords) || world.collided(self)){
      alive = false;
    }
    else{
      y = y - velocity;
    }
  }
  return self;
}