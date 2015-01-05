var canvas = document.getElementById('world');
var surface = canvas.getContext('2d');

var world = {
  width : 480,
  height : 320,
  offsetY : 10,
  surface : surface
};
var keyCodes = {
  LEFT : 37,
  RIGHT : 39,
  SPACE : 32
};
var keyDown = {
  LEFT : false,
  RIGHT : false,
  SPACE : false
};

var player = (function(world, keyDown){
  var width = 60,
      height = 10,
      style = 'black',
      surface = world.surface,
      velocity = 2;

  return {
    width : width,
    height : height,
    style : style,
    x : world.width / 2 - width / 2,
    y : world.height - world.offsetY - height * 2,
    draw : function(){
      surface.fillStyle = player.style;
      surface.fillRect(player.x, player.y, player.width, player.height);
    },
    update : function(){
      if(keyDown.LEFT && this.x > 0){
        this.x = this.x - velocity;
      }
      else if(keyDown.RIGHT && this.x < (world.width - this.width)){
        this.x = this.x + velocity;
      }
    }
  };
}(world, keyDown));

var game = (function game (world, window) {
  var gameObjects = [player];

  (function gameloop(){
    window.requestAnimationFrame(gameloop);
    update();
    render();
  }());

  function update(){
    gameObjects.forEach(function(o){
      o.update();
    });
  }

  function render(){
    world.surface.clearRect(0, 0, world.width, world.height);
    gameObjects.forEach(function(o){
      o.draw();
    });
  }

  window.onkeydown = function(e){
    if(e.keyCode === keyCodes.LEFT) { keyDown.LEFT = true; }
    if(e.keyCode === keyCodes.RIGHT){ keyDown.RIGHT = true; }
    if(e.keyCode === keyCodes.SPACE){ keyDown.SPACE = true; }
  };

  window.onkeyup = function(e){
    if(e.keyCode === keyCodes.LEFT) { keyDown.LEFT = false; }
    if(e.keyCode === keyCodes.RIGHT){ keyDown.RIGHT = false; }
    if(e.keyCode === keyCodes.SPACE){ keyDown.SPACE = false; }
  };

}(world, window));