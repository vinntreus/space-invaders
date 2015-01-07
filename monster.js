var Monster = Entity.extend({
  _construct : function(options){
    this._super(Monster, arguments);

    this.direction = this.right;
    this.previousDirection = null;
  },
  width : 20,
  height : 20,
  velocity : 1,
  type : 'Monster',
  update : function(){ 
    this.direction(); 
  },
  right : function(){
    if(this.x+this.width >= this.world.rightEdge){
      this.changeRowForAllMonsters();
    }
    else{
      this.x += this.velocity;
    }
  },
  left : function(){
    if(this.x <= this.world.leftEdge){
      this.changeRowForAllMonsters();
    }
    else{
      this.x -= this.velocity;
    }
  },
  down : function (){
    this.y = this.y + this.velocity;
    if(this.y >= this.rowPosition){
      this.direction = this.previousDirection === this.left ? this.right : this.left;
    }
  },
  changeRowForAllMonsters : function(){
    this.world.tellMonstersTo(function(m){
        m.changeRow();
    });
  },
  changeRow: function (){
    if(this.direction === this.down){ return; }
    this.rowPosition = this.y + this.world.offsetY + this.height;
    this.previousDirection = this.direction;
    this.direction = this.down;
  }
});