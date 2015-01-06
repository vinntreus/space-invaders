(function game(window) {
  var canvas = document.getElementById('world'),
      playBtn = document.getElementById('play'),
      restartBtn = document.getElementById('restart'),
      surface = canvas.getContext('2d'),
      world = {
        width : 640,
        height : 480,
        offsetY : 10,
        offsetX : 10,
        surface : surface,
        entities : []
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