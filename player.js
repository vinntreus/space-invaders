var Player = Entity.extend({
  _construct : function(options){
    this.world = options.world;
    this.keyDown = options.keyDown;
    this.surface = this.world.surface;
    this.x = this.world.width / 2 - this.width / 2;
    this.y = this.world.height - this.world.offsetY - this.height * 2;
  },
  width : 60,
  height : 10,
  velocity : 2,
  bullets : [],
  shootThrottle : 0,
  update : function update(){
    if(this.shootThrottle > 0){ this.shootThrottle = this.shootThrottle - 1;}
    if(this.keyDown.LEFT && this.x > 0){
      this.x -= this.velocity;
    }
    else if(this.keyDown.RIGHT && this.x < (this.world.width - this.width)){
      this.x += this.velocity;
    }
    else if(this.keyDown.SPACE && this.shootThrottle === 0){
      this.shoot();
      this.shootThrottle = 60;
    }

    this.bullets = this.bullets.filter(function(b){return b.alive;});
    this.bullets.forEach(function(b){
      b.update();
    });
  },
  draw : function draw(){
    this._super(Player, 'draw');
    this.bullets.forEach(function(b){
      b.draw();
    });
  },
  shoot : function shoot(){
    var xPos = this.x + this.width / 2;
    var yPos = this.y - this.height;
    this.bullets.push(Bullet.create({world : this.world, x : xPos, y : yPos}));
  }
});

var Bullet = Entity.extend({
  _construct : function(options){
    this.world = options.world;
    this.surface = this.world.surface;
    this.x = options.x;
    this.y = options.y;
  },
  width : 10,
  height : 20,
  velocity : 4,
  update : function update(){
    var self = this;
    if(this.world.isOutOfBounds(self) || this.world.collided(self)){
      this.alive = false;
    }
    else{
      this.y -= this.velocity;
    }
  }
});