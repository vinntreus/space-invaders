(function game(window) {
  var canvas = document.getElementById('world'),
      playBtn = document.getElementById('play'),
      restartBtn = document.getElementById('restart'),
      surface = canvas.getContext('2d'),
      level = levelOne,
      nextState = startGame,
      world = null;
      rAFId = null;

  function gameloop(){
    rAFId = window.requestAnimationFrame(gameloop);
    world.update();
    world.render();
  }

  function startGame(){
    restartBtn.style.display = 'inline';
    playBtn.innerText = 'Pause';
    nextState = stopGame;
    world = World.create(surface);
    world.renderEmpty();

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