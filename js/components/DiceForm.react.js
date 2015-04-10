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
    return (
      <div className="col-xs-4">
        <Panel header={title}>
          <div className="row">
            <div className="col-xs-4 col-xs-offset-2">
              <ButtonGroup vertical>
                <Button onClick={this.handleAction} ref="action" value="hackAndSlash">Hack and Slash</Button>
                <Button onClick={this.handleAction} ref="action" value="volley">Volley</Button>
                <Button onClick={this.handleAction} ref="action" value="spoutLore">Spout Lore</Button>
                <Button onClick={this.handleAction} ref="action" value="discernRealities">Discern Realities</Button>
                <Button onClick={this.handleAction} ref="action" value="defend">Defend</Button>
                <Button onClick={this.handleAction} ref="action" value="parley">Parley</Button>
              </ButtonGroup>
            </div>
            <div className="col-xs-4">
              <ButtonGroup vertical>
                <Button onClick={this.handleAction} ref="action" value="defyDanger">Defy Danger (DEX)</Button>
                <Button onClick={this.handleAction} ref="action" value="defyDanger">Defy Danger (STR)</Button>
                <Button onClick={this.handleAction} ref="action" value="defyDanger">Defy Danger (CON)</Button>
                <Button onClick={this.handleAction} ref="action" value="defyDanger">Defy Danger (INT)</Button>
                <Button onClick={this.handleAction} ref="action" value="defyDanger">Defy Danger (WIS)</Button>
                <Button onClick={this.handleAction} ref="action" value="defyDanger">Defy Danger (CHA)</Button>
              </ButtonGroup>
            </div>
          </div>
        </Panel>
      </div>
    );
  },
});

export default DiceForm
