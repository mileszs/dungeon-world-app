import React from 'react';
import _ from 'lodash';
import CharacterStore from '../stores/CharacterStore';
import RollStore from '../stores/RollStore';
import CharacterActions from '../actions/CharacterActions';
import RollActions from '../actions/RollActions';

function getDiceBoxState() {
  var current = CharacterStore.current();
  var rolls = RollStore.getAll();
  return {
    current: current,
    rolls: rolls
  };
}

let DiceBox = React.createClass({
  getInitialState() {
    return getDiceBoxState();
  },

  componentDidMount() {
    RollStore.addChangeListener(this._onChange);
    CharacterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    RollStore.removeChangeListener(this._onChange);
    CharacterStore.removeChangeListener(this._onChange);
  },


  render() {
    if (this.state.current === undefined) {
      return null;
    } else {
      return (
        <div id="rolls">
          <h2>Action History</h2>
          <RollHistory rolls={this.state.rolls} />
          <DiceForm currentCharacter={this.state.current}/>
        </div>
      );
    }
  },

  _onChange() {
    this.setState(getDiceBoxState());
  }
});

let RollHistory = React.createClass({
  render() {
    var rollNodes = this.props.rolls.map(function (roll, index) {
      return (
        <RollItem key={`roll${index}`} action={roll.action}>{roll.result}</RollItem>
      );
    });
    return (
      <table className="roll-history">
        {rollNodes}
      </table>
    );
  }
});

let DiceForm = React.createClass({
  handleAction(e) {
    e.preventDefault();
    var action = e.target.value;
    RollActions.create({action: action, character: this.props.currentCharacter});
  },

  render() {
    return (
      <div className="dice-form">
        <button onClick={this.handleAction} ref="action" value="defyDanger">Defy Danger</button>
        <button onClick={this.handleAction} ref="action" value="hackAndSlash">Hack and Slash</button>
        <button onClick={this.handleAction} ref="action" value="volley">Volley</button>
        <button onClick={this.handleAction} ref="action" value="spoutLore">Spout Lore</button>
        <button onClick={this.handleAction} ref="action" value="discernRealities">Discern Realities</button>
        <button onClick={this.handleAction} ref="action" value="defend">Defend</button>
        <button onClick={this.handleAction} ref="action" value="parley">Parley</button>
      </div>
    );
  },
});

let RollItem = React.createClass({
  render() {
    var rollNums = this.props.children.split(':');
    return (
      <tr>
        <td>{this.titleize(this.props.action)}</td>
        <td>{rollNums[0].trim()}</td>
        <td>&#61; {rollNums[1].trim()}</td>
      </tr>
    );
  },

  titleize(str) {
    var result = str.replace( /([A-Z])/g, " $1" );
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
});

export default DiceBox;
