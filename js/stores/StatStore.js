import _ from 'lodash';
import alt from '../alt'
import StatActions from '../actions/StatActions.js';

class StatStore {
  constructor() {
    this.bindActions({
      drop: StatActions.drop,
      reset: StatActions.reset
    })

    this.statNumbers = ['16', '15', '13', '12', '9', '8']
    this.stats = {
      str: null,
      dex: null,
      con: null,
      cha: null,
      int: null,
      wis: null
    }
    this.availableNumbers = this.statNumbers
  }

  reset() {
    _.forEach(this.stats, (val, key) => {
      this.stats[key] = null
    })
    this.availableNumbers = this.statNumbers
  }

  drop({ attr, num }) {
    this.stats[attr] = num
    this.availableNumbers = _.difference(this.statNumbers, _.values(this.stats))
  }
}

export default alt.createStore(StatStore, 'StatStore')
