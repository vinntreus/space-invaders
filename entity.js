var BaseObject = {
    create: function create() {
       var instance = Object.create(this);
       instance._construct.apply(instance, arguments);
       return instance;
    },
 
    extend: function extend(properties, propertyDescriptors) {
        propertyDescriptors = propertyDescriptors || {};
 
        if(properties){
            var simpleProperties = Object.getOwnPropertyNames(properties);
            for (var i = 0, len = simpleProperties.length; i < len; i += 1) {
                var propertyName = simpleProperties[i];
                if(propertyDescriptors.hasOwnProperty(propertyName)) {
                    continue;
                }
 
                propertyDescriptors[propertyName] =
                    Object.getOwnPropertyDescriptor(properties, propertyName);
            }
        }
 
        return Object.create(this, propertyDescriptors);
    },
 
    _construct: function _construct() {},
 
    _super: function _super(definedOn, methodName, args) {
        if (typeof methodName !== "string") {
            args = methodName;
            methodName = "_construct";
        }
 
        return Object.getPrototypeOf(definedOn)[methodName].apply(this, args);
    }
};

var Entity = BaseObject.extend({
  _construct : function(options){
    this.x = options.x;
    this.y = options.y;
    this.world = options.world;
    this.prevX = this.x;
    this.prevY = this.y;
    this.id = options.id;
  },
  type : 'Entity',
  style : 'black',
  x : 0,
  y : 0,
  width : 0,
  height : 0,
  storeX : function storeX(){
    this.prevX = this.x;
  },
  storeY : function storeY(){
    this.prevY = this.y;
  },
  draw : function draw(){
    this.clear();
    this.world.surface.fillStyle = this.style;
    this.world.surface.fillRect(this.x, this.y, this.width, this.height);
    this.storeX();
    this.storeY();
  },
  kill : function kill(){ 
    this.clear();
    this.world.kill(this);
  },
  clear : function clear(){
    this.world.surface.clearRect(this.prevX, this.prevY, this.width, this.height);
  },
  update : function update(){},
  is : function is(type){
    return this.type === type;
  },
  log : function(s){
    console.log(s);
  }
});