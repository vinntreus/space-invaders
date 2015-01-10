var keyCodes = {
  LEFT : 37,
  RIGHT : 39,
  SPACE : 32,
  P : 80,
  R : 82
};
var keyDown = {
  LEFT : false,
  RIGHT : false,
  SPACE : false
};
var keyboard = (function(){
  var listeners = [];
  
  document.addEventListener('keydown', function(e){
    listeners.forEach(function(listener){
      if(e.which === listener.keycode){
        listener.fn();
      }
    });
  });

  return {
    on : function(keycode, fn){
      listeners.push({keycode : keycode, fn : fn});
    }
  };
}());
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