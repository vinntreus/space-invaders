(function game(window) {
  var canvas = document.getElementById('world'),
      playBtn = document.getElementById('play'),
      restartBtn = document.getElementById('restart'),
      level = levelOne,
      nextState = startGame,
      world = null;
      rAFId = null;

  function gameloop(){
    rAFId = window.requestAnimationFrame(gameloop);
    update();
    render();
  }

  function update(){
    if(world.playerIsDead()){
      alert('Game over!');
      gameover();
    }
    else if(world.allMonstersAreDead()){
      advanceLevel();
    }
    else{
      world.update();
    }
  }

  function render(){
    world.render();
  }

  function createWorld(){
    world = World.create(canvas);
    world.renderEmpty();
  }

  function startGame(){
    restartBtn.style.display = 'inline';
    restartBtn.innerText = 'Restart';
    playBtn.innerText = 'Pause';
    nextState = stopGame;
    createWorld();

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

  function gameover(){
    stopGame();
    initGame({level : levelOne});
  }

  function initGame(options){
    nextState = startGame;
    level = options.level;
    restartBtn.style.display = 'none';
    playBtn.innerText = 'Play';
  }

  function advanceLevel(){
    if(level.next){
      stopGame();
      initGame({level : level.next});
    }
    else{
      alert('Congratulations you have finished the game!');
      gameover();
    }
  }

  playBtn.addEventListener('click', function(e){
    nextState();
  });

  restartBtn.addEventListener('click', function(e){
    stopGame();
    startGame();
  });

  createWorld();
  initGame({level : levelOne});

}(window));