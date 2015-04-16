// import AppDispatcher from '../dispatcher/AppDispatcher';
// import _ from 'lodash';
// import Events from 'events';
// import assign from 'object-assign';

import _ from 'lodash';
import alt from '../alt'
import CharacterActions from '../actions/CharacterActions.js';
import Character from '../models/Character.js';

class CharacterStore {
  constructor() {
    this.bindActions({
      onSwitchChar: CharacterActions.switchChar,
      onNewChar: CharacterActions.create,
      onLoadedAllChars: CharacterActions.receiveAll
    })

    this.characters = {};
    this.current = this.getCurrent();
  }

  getCurrent() {
    if (_.isEmpty(this.current)) {
      let characterAry = [];
      for (var key in this.characters) {
        characterAry.push(this.characters[key]);
      }
      this.current = characterAry[characterAry.length-1]
    }
    return this.current
  }

  onSwitchChar({characterId}) {
    this.current = this.characters[characterId]
  }

  onNewChar({character}) {
    this.characters[character.id] = character
    this.current = character
  }

  onLoadedAllChars(characters) {
    console.log('onLoadedAllChar', characters)
    this.characters = characters
    this.current = this.getCurrent()
  }
}

export default alt.createStore(CharacterStore, 'CharacterStore')
