import React from 'react';
import _ from 'lodash';

import CharacterActions from '../actions/CharacterActions';
import RollActions from '../actions/RollActions';
import CharacterList from './CharacterList.react';
import RollHistory from './RollHistory.react';
import DiceForm from './DiceForm.react';
import CurrentCharacterDetails from './CurrentCharacterDetails.react';

import CharacterStore from '../stores/CharacterStore';
import RollStore from '../stores/RollStore';

function getDashboardState() {
  let current = CharacterStore.current()
  let rolls = []
  if (current) {
    rolls = RollStore.getCharacterRolls(current.id);
  }
  return {
    characters: CharacterStore.getAll(),
    current: current,
    rolls: rolls,
  };
}

let Dashboard = React.createClass({
  getInitialState() {
    CharacterActions.load()
    RollActions.load()
    return getDashboardState()
  },

  render() {
    let clearStyle = {
      clear: 'both'
    }
    return (
      <div>
        <div className="row">
          <CharacterList characters={this.state.characters} currentChar={this.state.current} />
        </div>
        <div className="row">
          <CurrentCharacterDetails current={this.state.current} />
          <RollHistory rolls={this.state.rolls} />
          <DiceForm currentCharacter={this.state.current}/>
        </div>
      </div>
    )
  },

  componentDidMount() {
    RollStore.addChangeListener(this._onChange);
    CharacterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    RollStore.removeChangeListener(this._onChange);
    CharacterStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(getDashboardState());
  }
})

export default Dashboard
