import _ from 'lodash';
import Character from '../models/character';

let CharacterAPIUtils = {
  getAll() {
    let characters
    return new Promise(function (resolve, reject) {
      characters = JSON.parse(localStorage.getItem('characters'))
      if (_.isEmpty(characters)) { characters = {} }
      resolve(characters)
    })
  },

  getAllSync() {
    let characters = JSON.parse(localStorage.getItem('characters'))
    if (_.isEmpty(characters)) { characters = {} }
    return characters
  },

  create(data) {
    return new Promise((resolve, reject) => {
      // This is bad. Not how it would work if this were using a  anyway. Still might need to rethink this.
      let chars = this.getAllSync()
      let character = new Character(data);
      chars[character.id] = character
      localStorage.setItem('characters', JSON.stringify(chars));
      resolve(character)
    })
  },

  remove(id) {
    let characters = this.getAllSync()
    delete characters[id]
    localStorage.setItem('characters', JSON.stringify(characters))
    return id
  }
};

export default CharacterAPIUtils;
