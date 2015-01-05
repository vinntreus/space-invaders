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