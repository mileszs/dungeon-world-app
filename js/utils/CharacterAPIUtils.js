import _ from 'lodash';
import Character from '../models/character';

let CharacterAPIUtils = {
  getAll(callback) {
    let characters = JSON.parse(localStorage.getItem('characters'));
    if (_.isEmpty(characters)) { characters = {} }
    if (_.isFunction(callback)) {
      callback({characters: characters});
    }
    return characters;
  },

 create(character, callback) {
    var character = new Character(character);
    var characters = this.getAll();
    characters[character.id] = character
    localStorage.setItem('characters', JSON.stringify(characters));
    if (_.isFunction(callback)) {
      callback({character: character});
    }
    return character;
  },
};

export default CharacterAPIUtils;
