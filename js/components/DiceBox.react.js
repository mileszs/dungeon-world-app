var React = require('react');
var CharacterStore = require('../stores/CharacterStore');
var RollStore = require('../stores/RollStore');
var CharacterActions = require('../actions/CharacterActions');
var RollActions = require('../actions/RollActions');

function getDiceBoxState() {
  var current = CharacterStore.current();
  var rolls = RollStore.getAll();
  return {
    current: current,
    rolls: rolls
  };
}

var DiceBox = React.createClass({
  getInitialState: function() {
    return getDiceBoxState();
  },

  componentDidMount: function() {
    RollStore.addChangeListener(this._onChange);
    CharacterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    RollStore.removeChangeListener(this._onChange);
    CharacterStore.removeChangeListener(this._onChange);
  },


  render: function() {
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

  _onChange: function() {
    this.setState(getDiceBoxState());
  }
});

var RollHistory = React.createClass({
  render: function() {
    var rollNodes = this.props.rolls.map(function (roll) {
      return (
        <RollItem action={roll.action}>{roll.result}</RollItem>
      );
    });
    return (
      <table className="roll-history">
        {rollNodes}
      </table>
    );
  }
});

var DiceForm = React.createClass({
  handleAction: function(e) {
    e.preventDefault();
    var action = e.target.value;
    RollActions.create({action: action, character: this.props.currentCharacter});
  },

  render: function() {
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

var RollItem = React.createClass({
  render: function() {
    var rollNums = this.props.children.split(':');
    return (
      <tr>
        <td>{this.titleize(this.props.action)}</td>
        <td>{rollNums[0].trim()}</td>
        <td>&#61; {rollNums[1].trim()}</td>
      </tr>
    );
  },

  titleize: function(str) {
    var result = str.replace( /([A-Z])/g, " $1" );
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
});

module.exports = DiceBox;
