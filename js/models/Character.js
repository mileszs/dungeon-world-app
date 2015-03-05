function Character(name, attrs) {
  this.CHAR_ATTRS = ['str', 'con', 'dex', 'int', 'wis', 'cha'];
  this.id = this._generateId();
  this.name = name;
  this.mods = {};
  for (var i = 0; i < this.CHAR_ATTRS.length; i++) {
    this[this.CHAR_ATTRS[i]] = attrs[this.CHAR_ATTRS[i]];
  }
  this.calculateMods();
}

Character.prototype.calculateMods = function() {
  var attrs = this.CHAR_ATTRS;
  for (var i = 0; i < attrs.length; i++) {
    if (this.hasOwnProperty(attrs[i])) {
      if (this[attrs[i]] <= 3) {
        this.mods[attrs[i]] = '-3'
      } else if (this[attrs[i]] <= 5) {
        this.mods[attrs[i]] = '-2'
      } else if (this[attrs[i]] <= 8) {
        this.mods[attrs[i]] = '-1'
      } else if (this[attrs[i]] <= 12) {
        this.mods[attrs[i]] = '0'
      } else if (this[attrs[i]] <= 15) {
        this.mods[attrs[i]] = '1'
      } else if (this[attrs[i]] <= 17) {
        this.mods[attrs[i]] = '2'
      } else {
        this.mods[attrs[i]] = '3'
      }
    }
  }
}

Character.prototype._generateId = function() {
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
}

module.exports = Character;
