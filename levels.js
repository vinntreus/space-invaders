function levelOne(world){
    world.addEntity(Player.create({keyDown : keyDown, world : world}));
    addMonsters({world : world, count : 24});
}
levelOne.next = levelTwo;

function levelTwo(world){
  world.addEntity(Player.create({keyDown : keyDown, world : world}));
  addMonsters({world : world, count : 16, velocity : 3});
}

function addMonsters(options){
  var count = options.count,
    world = options.world,
    velocity = options.velocity,
    x = 10,
    y = 10,
    width = 20,
    height = 20,
    offsetX = 20,
    offsetY = 20;

  for(var i = 0; i < count; i++){
    world.addEntity(Monster.create({ x : x, y : y, world : world, velocity : velocity }));

    x = x + width + offsetX;
    if(x > world.width / 2){
      y = y + height + offsetY;
      x = 10;
    }
  }
}