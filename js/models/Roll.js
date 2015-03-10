function Roll(character, action) {
  this.character = character;
  this.action = action;
  this.result = '';
  return this[action]();
}

Roll.prototype.rollD6 = function() {
  return Math.floor(Math.random()*(7-1)+1);
};

Roll.prototype.basicMove = function(mod) {
  roll1 = this.rollD6();
  roll2 = this.rollD6();
  total = roll1 + roll2 + parseInt(mod);
  this.result = this.character.name + ': 2d6+' + mod + ' (' + roll1 + ',' + roll2 + ') :' + total;
  return this
}

Roll.prototype.hackAndSlash = function() {
  return this.basicMove(this.character.mods.str);
};

Roll.prototype.volley = function() {
  return this.basicMove(this.character.mods.dex);
};

Roll.prototype.defend = function() {
  return this.basicMove(this.character.mods.con);
};

Roll.prototype.spoutLore = function() {
  return this.basicMove(this.character.mods.int);
};

Roll.prototype.discernRealities = function() {
  return this.basicMove(this.character.mods.wis);
};

Roll.prototype.parley = function() {
  return this.basicMove(this.character.mods.cha);
};

Roll.prototype.defyDanger = function() {
  // TODO: different mod for different ways of defying danger
  return this.basicMove(this.character.mods.dex);
};

module.exports = Roll;
