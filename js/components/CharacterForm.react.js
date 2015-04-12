import React from 'react';
import _ from 'lodash';
import {Input} from 'react-bootstrap'
import CharacterActions from '../actions/CharacterActions';
import StatActions from '../actions/StatActions';
import Stats from './Stats.react';
import Statboxes from './Statboxes.react';
import StatStore from '../stores/StatStore';
import CharacterConstants from '../models/CharacterConstants'

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
    let subsequent = _.merge(initial, { currentDragItem: null, validationMessages: [] })
    return subsequent
  },

  render() {
    let validationMsgElements = _.map(this.state.validationMessages, function(msg) {
      return <li>{msg}</li>
    })
    return (
      <div id="character-form" className="col-xs-6 col-xs-offset-3">
        <h3>New Character</h3>
        <ul>{validationMsgElements}</ul>
        <form onSubmit={this.handleSubmit}>
          <Input type="text" ref="name" name="name" id="name" label="Name" />
          <Input type="select" ref="race" name="race" id="race" label="Race">
            {this.renderRaceOptions()}
          </Input>
          <Input type="select" ref="klass" name="klass" id="klass" label="Class">
            {this.renderClassOptions()}
          </Input>
          <Stats numbers={this.state.availableNumbers} onDragStart={this.handleDragStart} onDragStop={this.handleDragStop} />
          <Statboxes stats={this.state.stats} currentDragItem={this.state.currentDragItem} onDrop={this.handleDrop} />
          <div className='form-submit'>
            <input type='submit' name='submit' value='Save' className='btn btn-primary' />
            <input type='reset' name='reset' value='Reset' className='btn' onClick={this.handleReset} />
          </div>
        </form>
      </div>
    );
  },

  renderRaceOptions() {
    return CharacterConstants.RACES.map(function(race) {
      return <option key={race} value={race}>{race}</option>
    })
  },

  renderClassOptions() {
    return CharacterConstants.CLASSES.map(function(klass) {
      return <option key={klass} value={klass}>{klass}</option>
    })
  },

  handleSubmit(e) {
    e.preventDefault();
    var data = {};
    var msg = this.validCharacter();
    if (_.isEmpty(msg)) {
      _.each(this.refs, function(ref, name) {
        data[name] = ref.getValue().trim();
        ref.getInputDOMNode().value = '';
      });
      data = _.merge(data, this.state.stats)
      CharacterActions.create(data);
    }
  },

  handleReset(e) {
    StatActions.reset();
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
