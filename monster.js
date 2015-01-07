var Monster = Entity.extend({
  _construct : function(options){
    this.direction = this.right;
    this.previousDirection = null;
    this.x = options.x;
    this.y = options.y;
    this.world = options.world;
    this.surface = this.world.surface;
    this.rightEdge = this.world.width - this.world.offsetX;
    this.leftEdge = this.world.offsetX;
  },

  width : 20,
  height : 20,
  velocity : 1,

  update : function(){ this.direction(); },

  kill : function(){ this.alive = false; },

  right : function(){
    if(this.isAtRightEdge()){
      this.changeRowForAllMonsters();
    }
    else{
      this.x = this.x + this.velocity;
    }
  },

  isAtRightEdge : function(){
    return this.x+this.width >= this.rightEdge;
  },

  left : function(){
    if(this.isAtLeftEdge()){
      this.changeRowForAllMonsters();
    }
    else{
      this.x = this.x - this.velocity;
    }
  },

  isAtLeftEdge : function(){
    return this.x <= this.leftEdge;
  },

  down : function (){
    this.y = this.y + this.velocity;
    if(this.y >= this.rowPosition){
      this.direction = this.previousDirection === this.left ? this.right : this.left;
    }
  },

  changeRowForAllMonsters : function(){
    var self = this;
    this.world.entities.forEach(function (e){
      if(e.changeRow && e.direction !== self.down){
        e.changeRow();
      }
    });
  },

  changeRow: function (){
    this.rowPosition = this.y + this.world.offsetY + this.height;
    this.previousDirection = this.direction;
    this.direction = this.down;
  }
});