import React from 'react';
import _ from 'lodash';
import {Panel} from 'react-bootstrap'

let RollHistory = React.createClass({
  render() {
    const rollNodes = this.props.rolls.map(function (roll, index) {
      return (
        <RollItem key={`roll${index}`} action={roll.action}>{roll.result}</RollItem>
      );
    });
    const title = <h3>Roll History</h3>
    return (
      <div className="col-xs-4">
        <Panel header={title}>
          <table className="table roll-history">
            <tbody>
              {rollNodes.reverse()}
            </tbody>
          </table>
        </Panel>
      </div>
    );
  }
});

let RollItem = React.createClass({
  render() {
    var rollNums = this.props.children.split(':');
    return (
      <tr>
        <td>{this.titleize(this.props.action)}</td>
        <td>{rollNums[1].trim()}</td>
        <td>&#61; {rollNums[2].trim()}</td>
      </tr>
    );
  },

  titleize(str) {
    var result = str.replace( /([A-Z])/g, " $1" );
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
});

export default RollHistory
