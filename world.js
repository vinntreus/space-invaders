var PLAYING = 0;
var PLAYER_WON = 1;
var GAME_OVER = 2;
var World = BaseObject.extend({
  _construct : function(surface){
    this.surface = surface;
    this.entities = [];
    this.state = PLAYING;
  },
  width : 640,
  height : 280,
  offsetY : 10,
  offsetX : 10,
  leftEdge : 10,
  rightEdge : 630,
  addEntity : function(entity){
    this.entities.push(entity);
  },
  tellMonstersTo : function(fn){
    this.monsters().forEach(fn);
  },
  monsters : function(){
    return this.entities.filter(function(e){ 
      return e.is('Monster');
    });
  },
  players : function(){
    return this.entities.filter(function(e){ 
      return e.is('Player');
    });
  },
  allMonstersAreDead : function(){
    return this.monsters().length === 0;
  },
  playerIsDead : function(){
    return this.players().length === 0;
  },
  kill : function(entity){
    var index = this.entities.indexOf(entity);
    if (index > -1) {
        this.entities.splice(index, 1);
    }
  },
  isOutOfBounds : function(coord){
    return coord.x <= 0 || coord.y <= 0 || coord.x >= this.width || coord.y >= this.height;
  },
  collided : function(entity){
    var self = this;
    var x = entity.x;
    var y = entity.y;
    var collisions = this.monsters().filter(function(e){
      var x2 = e.x;
      var y2 = e.y;
      var width = e.width;
      var height = e.height;

      if(x >= x2 && x <= x2 + width &&
         y >= y2 && y <= y2 + height){
        e.kill();
        return true;
      }
      return false;
    });

    return collisions.length > 0;
  },
  update : function(){
    if(this.playerIsDead()){
      console.log("player is dead");
      this.state = GAME_OVER;
    }
    else if(this.allMonstersAreDead()){
      console.log("monsters are dead");
      this.state = PLAYER_WON;
    }
    else{
      this.entities.forEach(function(e){
        e.update();
      });
    }
  },
  render : function(){
    this.entities.forEach(function(e){
      e.draw();
    });
  },
  renderEmpty : function(){
    this.surface.clearRect(0, 0, this.width, this.height);
  }
});