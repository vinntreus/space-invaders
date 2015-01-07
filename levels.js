function levelOne(world){
    world.addEntity(Player.create({keyDown : keyDown, world : world}));

    function addMonsters(){
      var x = 10,
        y = 10,
        width = 20,
        height = 20,
        offsetX = 20,
        offsetY = 20;

      for(var i = 0; i < 24; i++){
        world.addEntity(Monster.create({ x : x, y : y, world : world }));

        x = x + width + offsetX;
        if(x > world.width / 2){
          y = y + height + offsetY;
          x = 10;
        }
      }
    }

    addMonsters();
    
}