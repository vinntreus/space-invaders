function player(world, keyDown){
  var width = 60,
      height = 10,
      style = 'black',
      surface = world.surface,
      x = world.width / 2 - width / 2,
      y = world.height - world.offsetY - height * 2,
      velocity = 2;

  function draw(){
    surface.fillStyle = style;
    surface.fillRect(x, y, width, height);
  }

  function update(){
    if(keyDown.LEFT && x > 0){
      x = x - velocity;
    }
    else if(keyDown.RIGHT && x < (world.width - width)){
      x = x + velocity;
    }
  }

  return {
    draw : draw,
    update : update
  };
}