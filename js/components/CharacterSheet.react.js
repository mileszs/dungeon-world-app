import React from 'react';
import _ from 'lodash'
import {Panel, Modal, ModalTrigger, Button} from 'react-bootstrap'
import {Link} from 'react-router'
import FullStatBox from './FullStatBox.react'
import escape from 'escape-html'

const CurrentCharacterDetails = React.createClass({
  render() {
    if (this.props.current === undefined || this.props.current === null) {
      const title = <h3>Character Sheet</h3>
      return (
        <div id="current" className='col-xs-6 col-xs-offset-3'>
          <Panel header={title}>
            <p>No Characters Available. Go <Link to="new">Create one now!</Link></p>
          </Panel>
        </div>
      )
    } else {
      const title = (
        <div>
          <h3 className='pull-left'>{this.props.current.name}, {this.props.current.race} {this.props.current.klass}</h3>
          <ExportButton current={this.props.current} />
          <div className='clearfix' />
        </div>
      )
      return (
        <div className='row'>
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
  },

  handleExport(e) {

  }

});

const RPOLExport = React.createClass({
  render() {
    let style = {
      width: '100%',
    }
    return (
      <Modal {...this.props} bsStyle='primary' title='RPOL Export' animation={false}>
        <div className='modal-body'>
          <p>Copy the following content, and paste it in <a href="http://rpol.net">RPOL.net</a>'s character sheet text box.</p>
          <div>
            <textarea style={style} rows='21'>{this.rpolCharacterSheet()}</textarea>
          </div>
        </div>
        <div className='modal-footer'>
          <Button onClick={this.props.onRequestHide}>Close</Button>
        </div>
      </Modal>
    )
  },

  rpolCharacterSheet() {
    let stats = ['cha', 'con', 'dex', 'int', 'str', 'wis']
    return `
<b>${this.props.current.name}, ${this.props.current.race} ${this.props.current.klass}</b>

<table>
  <tr>
    ${stats.map((stat) => { return `<td>${stat}</td>` }).join("\n")}
  </tr>
  <tr>
    ${stats.map((stat) => { return `<td>${this.props.current.mods[stat]}</td>` }).join("\n")}
  </tr>
  <tr>
    ${stats.map((stat) => { return `<td>${this.props.current[stat]}</td>` }).join("\n")}
  </tr>
</table>

<table>
  <tr>
    <td></td>
    <td>Current</td>
    <td>Max</td>
  </tr>
  <tr>
    <td>HP</td>
    <td>${this.props.hp}</td>
    <td>${this.props.hp}</td>
  </tr>
</table>


<b>Debilities</b>:
  <b>Damage</b>: ${this.props.current.dmg}
<b>Armor</b>: 1

<table>
  <tr>
    <td>Current Level</td>
    <td>XP</td>
    <td>Next Level</td>
  </tr>
  <tr>
    <td>1</td>
    <td>[][][][][][][][]</td>
  </tr>
</table>
`
  }
})

const ExportButton = React.createClass({
  render() {
    return (
      <ModalTrigger modal={<RPOLExport current={this.props.current} />}>
        <Button bsStyle='default' bsSize='small' className='pull-right'><span className='glyphicon glyphicon-export' /> Export</Button>
      </ModalTrigger>
    );
  }
})
export default CurrentCharacterDetails;
