import React from 'react';
import {Panel} from 'react-bootstrap'

let CurrentCharacterDetails = React.createClass({
  render() {
    if (this.props.current === undefined || this.props.current === null) {
      return null;
    } else {
      const title = <h3>Character Sheet</h3>
      return (
        <div id="current" className='col-xs-4'>
          <Panel header={title}>
            <h4>Name: {this.props.current.name}</h4>
            <ul>
              <li><strong>STR</strong>: {this.props.current.str}</li>
              <li><strong>DEX</strong>: {this.props.current.dex}</li>
              <li><strong>CON</strong>: {this.props.current.con}</li>
              <li><strong>CHA</strong>: {this.props.current.cha}</li>
              <li><strong>INT</strong>: {this.props.current.int}</li>
              <li><strong>WIS</strong>: {this.props.current.wis}</li>
            </ul>
          </Panel>
        </div>
      );
    }
  },
});

export default CurrentCharacterDetails;
