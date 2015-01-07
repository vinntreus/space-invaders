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
  alive : true,
  style : 'black',
  x : 0,
  y : 0,
  width : 0,
  height : 0,
  draw : function draw(){
    this.surface.fillStyle = this.style;
    this.surface.fillRect(this.x, this.y, this.width, this.height);
  },
  update : function draw(){}
});