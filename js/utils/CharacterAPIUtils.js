import _ from 'lodash';
import Character from '../models/character';

let CharacterAPIUtils = {
  getAll(callback) {
    let characters = JSON.parse(localStorage.getItem('characters'));
    if (_.isFunction(callback)) {
      callback({characters: characters});
    }
    return characters;
  },

  getCurrentChar(callback) {
    let current = JSON.parse(localStorage.getItem('currentCharacter'));
    if (_.isEmpty(current)) {
      let chars = this.getAll();
      let characterAry = [];
      for (var key in chars) {
        characterAry.push(chars[key]);
      }
      current = characterAry[characterAry.length-1];
    }
    if (_.isFunction(callback)) {
      callback({character: current});
    }
    return current;
  },

 create(character, action, callback) {
    var character = new Character(character, action);
    var characters = this.getAll();
    characters.push(character)
    localStorage.setItem('characters', JSON.stringify(_.flatten(characters)));
    if (_.isFunction(callback)) {
      callback({character: character});
    }
    return character;
  },

  setCurrent(id, callback) {
    var characters = this.getAll();
    var current = characters[id]
    localStorage.setItem('currentCharacter', JSON.stringify(current));
    if (_.isFunction(callback)) {
      callback({character: current});
    }
    return current;
  }
};

export default CharacterAPIUtils;
