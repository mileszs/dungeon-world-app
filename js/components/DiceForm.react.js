import React from 'react';
import _ from 'lodash';
import {ButtonGroup, Button, Panel} from 'react-bootstrap'
import RollActions from '../actions/RollActions';

let DiceForm = React.createClass({
  handleAction(e) {
    e.preventDefault();
    let action = e.target.value;
    RollActions.create({action: action, character: this.props.currentCharacter});
  },

  render() {
    const title = <h3>Moves</h3>
    const disabled = !this.props.currentCharacter
    return (
      <div className="col-xs-4">
        <Panel header={title}>
          <div className="row">
            <div className="col-xs-4 col-xs-offset-2">
              <ButtonGroup vertical>
                <Button onClick={this.handleAction} ref="action" value="hackAndSlash" disabled={disabled}>Hack and Slash</Button>
                <Button onClick={this.handleAction} ref="action" value="volley" disabled={disabled}>Volley</Button>
                <Button onClick={this.handleAction} ref="action" value="spoutLore" disabled={disabled}>Spout Lore</Button>
                <Button onClick={this.handleAction} ref="action" value="discernRealities" disabled={disabled}>Discern Realities</Button>
                <Button onClick={this.handleAction} ref="action" value="defend" disabled={disabled}>Defend</Button>
                <Button onClick={this.handleAction} ref="action" value="parley" disabled={disabled}>Parley</Button>
              </ButtonGroup>
            </div>
            <div className="col-xs-4">
              <ButtonGroup vertical>
                <Button onClick={this.handleAction} ref="action" value="defyDanger" disabled={disabled}>Defy Danger (DEX)</Button>
                <Button onClick={this.handleAction} ref="action" value="defyDanger" disabled={disabled}>Defy Danger (STR)</Button>
                <Button onClick={this.handleAction} ref="action" value="defyDanger" disabled={disabled}>Defy Danger (CON)</Button>
                <Button onClick={this.handleAction} ref="action" value="defyDanger" disabled={disabled}>Defy Danger (INT)</Button>
                <Button onClick={this.handleAction} ref="action" value="defyDanger" disabled={disabled}>Defy Danger (WIS)</Button>
                <Button onClick={this.handleAction} ref="action" value="defyDanger" disabled={disabled}>Defy Danger (CHA)</Button>
              </ButtonGroup>
            </div>
          </div>
        </Panel>
      </div>
    );
  },
});

export default DiceForm
