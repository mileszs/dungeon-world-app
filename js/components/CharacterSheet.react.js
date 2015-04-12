import React from 'react';
import _ from 'lodash'
import {Panel} from 'react-bootstrap'
import {Link} from 'react-router'
import FullStatBox from './FullStatBox.react'

let CurrentCharacterDetails = React.createClass({
  render() {
    if (this.props.current === undefined || this.props.current === null) {
      const title = <h3>Character Sheet</h3>
      return (
        <div id="current" className='col-xs-6 col-xs-offset-3'>
          <Panel header={title}>
            <p>No Characters Available. Go <Link to="newCharacter">Create one now!</Link></p>
          </Panel>
        </div>
      )
    } else {
      const title = <h3>{this.props.current.name}, {this.props.current.race} {this.props.current.klass}</h3>
      return (
        <div id="current" className='col-xs-6 col-xs-offset-3'>
          <Panel header={title}>
            <div className="statboxes clearfix">
              {this.renderStats()}
            </div>
            <div className="row">
              <div className="col-xs-4 text-center">
                <p><span className="char-label">Level:</span> 1</p>
              </div>
              <div className="col-xs-4 text-center">
                <p><span className="char-label">Current XP:</span> 0</p>
              </div>
              <div className="col-xs-4 text-center">
                <p><span className="char-label">XP for Level 2:</span> 8</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4 text-center">
                <p><span className="char-label">HP:</span> {this.props.current.hp}</p>
              </div>
              <div className="col-xs-4 text-center">
                <p><span className="char-label">Dmg:</span> {this.props.current.dmg}</p>
              </div>
            </div>
          </Panel>
        </div>
      );
    }
  },

  renderStats() {
    return _(['cha', 'con', 'dex', 'int', 'str', 'wis'])
      .map((stat) => { return { name: stat, number: this.props.current[stat], mod: this.props.current.mods[stat]} })
      .sortBy((obj) => { return parseInt(obj.number) })
      .reverse()
      .map((stat) => { return <FullStatBox key={stat.name} attr={stat.name} value={stat.number} mod={this.modWithSign(stat.mod)} /> })
      .value()
  },

  modWithSign(mod) {
    if (parseInt(mod) >= 0) {
      return '+' + mod
    } else {
      return mod
    }
  }
});

export default CurrentCharacterDetails;
