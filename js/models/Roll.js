class Roll {
  constructor(character, action) {
    this.character = character;
    this.action = action;
    this.result = '';
    return this[action]();
  }

  rollD6() {
    return Math.floor(Math.random()*(7-1)+1);
  }

  basicMove(mod) {
    let roll1 = this.rollD6();
    let roll2 = this.rollD6();
    let total = roll1 + roll2 + parseInt(mod);
    this.result = this.character.name + ': 2d6+' + mod + ' (' + roll1 + ',' + roll2 + ') :' + total;
    return this
  }

  hackAndSlash() {
    return this.basicMove(this.character.mods.str);
  }

  volley() {
    return this.basicMove(this.character.mods.dex);
  }

  defend() {
    return this.basicMove(this.character.mods.con);
  }

  spoutLore() {
    return this.basicMove(this.character.mods.int);
  }

  discernRealities() {
    return this.basicMove(this.character.mods.wis);
  }

  parley() {
    return this.basicMove(this.character.mods.cha);
  }

  defyDanger() {
    // TODO: different mod for different ways of defying danger
    return this.basicMove(this.character.mods.dex);
  }
}
export default Roll;
