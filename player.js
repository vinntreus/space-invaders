var Player = Entity.extend({
  _construct : function(options){
    this._super(Player, arguments);

    this.keyDown = options.keyDown;

    this.x = this.world.width / 2 - this.width / 2;
    this.y = this.world.height - this.world.offsetY - this.height * 2;
  },
  width : 60,
  height : 10,
  velocity : 2,
  shootThrottle : 0,
  type : 'Player',
  kill : function kill(){
    this.world.kill(this);
  },
  update : function update(){
    if(this.world.collided(this)){
      this.kill();
    }
    if(this.shootThrottle > 0){ this.shootThrottle = this.shootThrottle - 1;}
    if(this.keyDown.LEFT && this.x > 0){
      this.x -= this.velocity;
    }
    else if(this.keyDown.RIGHT && this.x < (this.world.width - this.width)){
      this.x += this.velocity;
    }
    else if(this.keyDown.SPACE && this.shootThrottle === 0){
      this.shoot();
      this.shootThrottle = 30;
    }
  },
  shoot : function shoot(){
    var xPos = this.x + this.width / 2;
    var yPos = this.y - this.height;
    this.world.addEntity(Bullet.create({ x : xPos, y : yPos, world : this.world}));
  }
});