import React from 'react';
import _ from 'lodash';

import CharacterActions from '../actions/CharacterActions';
import CharacterList from './CharacterList.react';
import CharacterSheet from './CharacterSheet.react';

import CharacterStore from '../stores/CharacterStore';

function getDashboardState() {
  let {characters, current} = CharacterStore.getState()
  return {
    characters: characters,
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
          <CharacterSheet current={this.state.current} />
        </div>
      </div>
    )
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.params && nextProps.params.id && ( this.state.current && nextProps.params.id != this.state.current.id)) {
      CharacterActions.switchChar(nextProps.params.id)
    }
  },

  componentDidMount() {
    CharacterStore.listen(this._onChange);
  },

  componentWillUnmount() {
    CharacterStore.unlisten(this._onChange);
  },

  _onChange() {
    this.setState(getDashboardState());
  }
})

export default Dashboard
