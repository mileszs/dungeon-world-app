import _ from 'lodash'
import CharacterConstants from './CharacterConstants'

class Character {
  constructor(obj) {
    this.CHAR_ATTRS = ['str', 'con', 'dex', 'int', 'wis', 'cha'];
    this.id = this._generateId();
    this.name = obj.name;
    this.race = obj.race;
    this.klass = obj.klass;
    this.mods = {};
    this.setAttrs(obj);
    this.hp = this.calculateHP();
    this.dmg = CharacterConstants[this.klass].DMG;
    this.calculateMods();
  }

  setAttrs(obj) {
    _.map(this.CHAR_ATTRS, (attr) => {
      this[attr] = obj[attr];
    })
  }

  calculateMods() {
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

  calculateHP() {
    return parseInt(this.con) + parseInt(CharacterConstants[this.klass].HP_MOD)
  }

  _generateId() {
    return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  }
}

export default Character;
