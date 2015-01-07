var Bullet = Entity.extend({
  width : 10,
  height : 20,
  velocity : 4,
  type : 'Bullet',
  update : function update(){
    if(this.world.isOutOfBounds(this) || this.world.collided(this)){
      this.kill();
    }
    else{
      this.y -= this.velocity;
    }
  }
});