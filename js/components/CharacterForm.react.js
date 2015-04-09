import React from 'react';
import _ from 'lodash';
import CharacterActions from '../actions/CharacterActions';
import StatActions from '../actions/StatActions';
import Stats from './Stats.react';
import Statboxes from './Statboxes.react';
import StatStore from '../stores/StatStore';

function getCharacterFormState() {
  let stats = StatStore.getAll();
  return {
    stats: stats.stats,
    availableNumbers: stats.availableNumbers
  }
}
// TODO: need to make validation messages use local state or a store or something.
let CharacterForm = React.createClass({
  getInitialState() {
    let initial = getCharacterFormState()
    console.log(initial)
    let subsequent = _.merge(initial, { currentDragItem: null, validationMessages: [] })
    console.log(subsequent)
    return subsequent
  },

  render() {
    let validationMsgElements = _.map(this.state.validationMessages, function(msg) {
      return <li>{msg}</li>
    })
    return (
      <div id="character-form">
        <h3>New Character</h3>
        <ul>{validationMsgElements}</ul>
        <form onSubmit={this.handleSubmit}>
          <div className="form-textfield">
            <label htmlFor="name">Name</label>
            <input type="text" ref="name" name="name" id="name" size="20" />
          </div>
          <div className="form-textfield">
            <label htmlFor="race">Race</label>
            <input type="text" ref="race" name="race" id="race" size="20" />
          </div>
          <div className="form-textfield">
            <label htmlFor="klass">Class</label>
            <input type="text" ref="klass" name="klass" id="klass" size="20" />
          </div>
          <Stats numbers={this.state.availableNumbers} onDragStart={this.handleDragStart} onDragStop={this.handleDragStop} />
          <Statboxes stats={this.state.stats} currentDragItem={this.state.currentDragItem} onDrop={this.handleDrop} />
          <div className="form-submit">
            <input type="submit" name="submit" value="Save" />
          </div>
        </form>
      </div>
    );
  },

  handleSubmit(e) {
    e.preventDefault();
    var data = {};
    var msg = this.validCharacter();
    if (_.isEmpty(msg)) {
      _.each($('#character-form form input, #character-form form select'), function(el) {
        data[$(el).prop('name')] = $(el).val().trim();
        $(el).val('');
      });
      data = _.merge(data, this.state.stats)
      CharacterActions.create(data);
    }
  },

  validCharacter() {
    var name = $('#name').val();
    var values = _.values(this.state.stats);
    var msgs = [];
    if (_.isEmpty(name)) {
      msgs.push('You must provide a name for your character.')
    }
    if (_.compact(values).length < 6) {
      msgs.push('You must pick a value for each attribute.')
    }
    if (values.length > _.uniq(values).length) {
      msgs.push('Each stat number must be used only once.')
    }
    this.setState({validationMessages: msgs})
    return msgs;
  },

  handleDragStart(details) {
    this.setState({ currentDragItem: details });
  },

  handleDragStop() {
    this.setState({ currentDragItem: null });
  },

  handleDrop(target) {
    let nums = this.state.numbers
    this.setState({
      lastDrop: {
        source: this.state.currentDragItem,
        target: target
      },
      numbers: _.without(nums, this.state.currentDragItem.num)
    });
  },

  componentDidMount() {
    StatStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    StatStore.addChangeListener(this._onChange)
  },

  _onChange() {
    this.setState(getCharacterFormState());
  }
});

export default CharacterForm
