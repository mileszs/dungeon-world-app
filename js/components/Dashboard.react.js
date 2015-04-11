import React from 'react';
import _ from 'lodash';

import CharacterActions from '../actions/CharacterActions';
import CharacterList from './CharacterList.react';
import CurrentCharacterDetails from './CurrentCharacterDetails.react';

import CharacterStore from '../stores/CharacterStore';

function getDashboardState() {
  let current = CharacterStore.current()
  return {
    characters: CharacterStore.getAll(),
    current: current,
  };
}

let Dashboard = React.createClass({
  getInitialState() {
    CharacterActions.load()
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
        </div>
      </div>
    )
  },

  componentDidMount() {
    CharacterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    CharacterStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(getDashboardState());
  }
})

export default Dashboard
