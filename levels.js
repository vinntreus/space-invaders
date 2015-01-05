function levelOne(world){
    world.entities = [player(world, keyDown)];
    world.entities.push(monster(world, 10, 10));
}