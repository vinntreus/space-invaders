(function game(window) {
  var canvas = document.getElementById('world'),
      surface = canvas.getContext('2d'),
      world = {
        width : 480,
        height : 320,
        offsetY : 10,
        surface : surface,
        entities : []
      };

  function gameloop(){
    window.requestAnimationFrame(gameloop);
    update();
    render();
  }

  function update(){
    world.entities.forEach(function(o){ o.update(); });
  }

  function render(){
    world.surface.clearRect(0, 0, world.width, world.height);
    world.entities.forEach(function(o){ o.draw(); });
  }

  levelOne(world);
  gameloop();

}(window));