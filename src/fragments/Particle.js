const vector = {
    _x: 0,
    _y: 0,

    // dummy constructor
    create: function (x, y) { var obj = Object.create(this); obj._y = y; obj._x = x; return obj; },

    // member functions
    getX: function () { return this._x },
    getY: function () { return this._y },
    setX: function (value) { this._x = value; },
    setY: function (value) { this._y = value; },
    getLength: function () { return Math.sqrt(this._x * this._x + this._y * this._y) },
    getAngle: function () { return Math.atan2(this._y, this._x) },
    setAngle: function (angle) { length = this.getLength(); this._y = Math.cos(angle) * length; this._x = Math.sin(angle) * length; },
    setLength: function (length) { angle = this.getAngle(); this._y = Math.cos(angle) * length; this._x = Math.sin(angle) * length; },
    add: function (v2) { vect = this.create(this._x + v2._x, this._y + v2._y); return vect; },
    subtract: function (v2) { vect = this.create(this._x - v2._x, this._y - v2._y); return vect; },
    multiply: function (value) { return vector.create(this._x * value, this._y * value) },
    divide: function (value) { return vector.create(this._x / value, this._y / value) },
    scale: function (value) { this._x = this._x * value; this._y = this._y * value; },
    addTo: function (v2) { this._x = this._x + v2._x; this._y = this._y + v2._y },
    subtractFrom: function (v2) { this._x = this._x - v2._x; this._y = this._y - v2._y }
},
particle = {
    velocity: null,
    position: null,
    opacity: null,
    
    create: function (x, y, speed, angle) {
        var obj = Object.create(this);
        obj.velocity = vector.create(0, 0);

        obj.velocity.setLength(speed);
        obj.velocity.setAngle(angle);
        obj.position = vector.create(x, y);
        
        obj.opacity = 100;
        return obj;
    },

    update: function () {
        this.opacity--;
        this.position.addTo(this.velocity);
    }
};

module.exports = particle;