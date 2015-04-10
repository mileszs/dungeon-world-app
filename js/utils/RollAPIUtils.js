import _ from 'lodash';
import Roll from '../models/Roll';

let RollAPIUtils = {
  getAllRolls(callback) {
    let rolls = JSON.parse(localStorage.getItem('rolls'));
    if (_.isFunction(callback)) {
      callback({rolls: rolls});
    }
    return rolls || [];
  },

  getCharacterRolls(characterId, callback) {
    let rolls = JSON.parse(localStorage.getItem('rolls'));
    rolls = _.filter(rolls, function(roll) { 
      return roll.character.id === characterId;
    });
    if (_.isFunction(callback)) {
      callback({rolls: rolls});
    }
    return rolls || [];
  },

 create(character, action, callback) {
    var roll = new Roll(character, action);
    var rolls = this.getAllRolls();
    rolls.push(roll)
    if (_.isFunction(callback)) {
      callback({roll: roll});
    }
    localStorage.setItem('rolls', JSON.stringify(_.flatten(rolls)));
    return roll;
  }
};

export default RollAPIUtils;
