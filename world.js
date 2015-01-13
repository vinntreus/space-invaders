var PLAYING = 0;
var PLAYER_WON = 1;
var GAME_OVER = 2;
var World = BaseObject.extend({
  _construct : function(canvas){
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.borderWidth = "1px";
    this.surface = canvas.getContext('2d');
    this.monsters = [];
    this.players = [];
  },
  width : 640,
  height : 280,
  offsetY : 10,
  offsetX : 10,
  leftEdge : 10,
  rightEdge : 630,
  addEntity : function(entity){
    if(entity.is('Monster')){
      this.monsters.push(entity);
    }
    else if(entity.is('Player')){
      this.players.push(entity);
    }
  },
  tellMonstersTo : function(fn){
    this.monsters.forEach(fn);
  },
  allMonstersAreDead : function(){
    return this.monsters.length === 0;
  },
  playerIsDead : function(){
    return this.players.length === 0;
  },
  kill : function(entity){
    var index = this.players.indexOf(entity);
    if (index > -1) {
        this.players.splice(index, 1);
    }
  },
  isOutOfBounds : function(coord){
    return coord.x <= 0 || coord.y <= 0 || coord.x >= this.width || coord.y >= this.height;
  },
  collided : function(entity){
    for(var i = 0, length = this.monsters.length; i < length; i++){
      if(this.isCollision(entity, this.monsters[i])){
        this.monsters.splice(i, 1); //kill monster
        return true;
      }
    }
    return false;
  },
  isCollision : function(e1, e2){
    if(e1.x >= e2.x && e1.x <= e2.x + e2.width &&
       e1.y >= e2.y && e1.y <= e2.y + e2.height){
      return true;
    }
    return false;
  },
  update : function(){
    this.monsters.forEach(function(e){ e.update(); });
    this.players.forEach(function(e){ e.update(); }); 
  },
  render : function(){
    this.monsters.forEach(function(e){ e.draw(); });
    this.players.forEach(function(e){ e.draw(); });
  },
  renderEmpty : function(){
    this.surface.clearRect(0, 0, this.width, this.height);
  }
});