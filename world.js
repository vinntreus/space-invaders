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
    this.bullets = [];
    this.queue = {}; // to avoid duplicate work, make queue as dict. Order does not matter now.
  },
  width : 640,
  height : 280,
  offsetY : 10,
  offsetX : 10,
  leftEdge : 10,
  rightEdge : 630,
  addEntity : function addEntity(entity){
    if(entity.is('Monster')){
      this.monsters.push(entity);
    }
    else if(entity.is('Player')){
      this.players.push(entity);
    }
    else if(entity.is('Bullet')){
      this.bullets.push(entity);
    }
  },
  tellMonstersTo : function tellMonstersTo(fn){
    var self = this;
    this.queue.tellMonstersTo = function(){
      self.monsters.forEach(fn);
    };
  },
  allMonstersAreDead : function allMonstersAreDead(){
    return this.monsters.length === 0;
  },
  playerIsDead : function playerIsDead(){
    return this.players.length === 0;
  },
  kill : function kill(entity){
    var index = this.players.indexOf(entity);
    if (index > -1) {
        this.players.splice(index, 1);
    }
    else if( (index = this.bullets.indexOf(entity)) > -1){
      this.bullets.splice(index, 1);
    }
  },
  isOutOfBounds : function isOutOfBounds(coord){
    return coord.x <= 0 || coord.y <= 0 || coord.x >= this.width || coord.y >= this.height;
  },
  collided : function collided(entity){
    for(var i = 0, length = this.monsters.length; i < length; i++){
      if(this.isCollision(entity, this.monsters[i])){
        this.monsters[i].kill();
        this.monsters.splice(i, 1);
        return true;
      }
    }
    return false;
  },
  isCollision : function isCollision(e1, e2){
    if(e1.x >= e2.x && e1.x <= e2.x + e2.width &&
       e1.y >= e2.y && e1.y <= e2.y + e2.height){
      return true;
    }
    return false;
  },
  update : function update(){
    this.monsters.forEach(function(e){ e.update(); });
    this.players.forEach(function(e){ e.update(); }); 
    this.bullets.forEach(function(e){ e.update(); });
    this.popQueue();
  },
  render : function render(){
    this.monsters.forEach(function(e){ e.draw(); });
    this.players.forEach(function(e){ e.draw(); });
    this.bullets.forEach(function(e){ e.draw(); });
  },
  renderEmpty : function renderEmpty(){
    this.surface.clearRect(0, 0, this.width, this.height);
  },
  popQueue : function popQueue(){
    var queued = 0;
    for(var key in this.queue){
      this.queue[key]();
      queued++;
    }
    if(queued){
      this.queue = {};
    }
  }
});