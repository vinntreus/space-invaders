(function game(window) {
  var canvas = document.getElementById('world'),
      playBtn = document.getElementById('play'),
      restartBtn = document.getElementById('restart'),
      surface = canvas.getContext('2d'),
      world = {
        width : 640,
        height : 280,
        offsetY : 10,
        offsetX : 10,
        surface : surface,
        entities : [],
        isOutOfBounds : function(coord){
          if(coord.x <= 0 || coord.y <= 0 || coord.x >= this.width || coord.y >= this.height){
            return true;
          }
          return false;
        },
        collided : function(entity){
          var x = entity.getX();
          var y = entity.getY();
          var collisions = this.entities.filter(function(e){
            var x2 = e.getX();
            var y2 = e.getY();
            var width = e.getWidth();
            var height = e.getHeight();

            if(x >= x2 && x <= x2 + width &&
               y >= y2 && y <= y2 + height){
              e.kill();
              return true;
            }
            return false;
          });

          return collisions.length > 0;
        }
      },
      level = levelOne,
      nextState = startGame,
      rAFId = null;

  function gameloop(){
    rAFId = window.requestAnimationFrame(gameloop);
    update();
    render();
  }

  function update(){
    world.entities = world.entities.filter(function(e){ return e.isAlive(); });
    world.entities.forEach(function(o){ o.update(); });
  }

  function render(){
    world.surface.clearRect(0, 0, world.width, world.height);
    world.entities.forEach(function(o){ o.draw(); });
  }

  function startGame(){
    restartBtn.style.display = 'inline';
    playBtn.innerText = 'Pause';
    nextState = stopGame;

    level(world);
    gameloop();
  }

  function stopGame(){
    playBtn.innerText = 'Continue';
    nextState = continueGame;

    cancelAnimationFrame(rAFId);
  }

  function continueGame(){
    playBtn.innerText = 'Pause';
    nextState = stopGame;

    gameloop();
  }

  playBtn.addEventListener('click', function(){
    nextState();
  });
  restartBtn.addEventListener('click', function(){
    stopGame();
    startGame();
  });

}(window));