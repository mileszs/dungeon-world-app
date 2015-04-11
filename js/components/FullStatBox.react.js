import React from 'react';
import _ from 'lodash';

let FullStatBox = React.createClass({
  render() {
    return (
      <div className='full-stat-box'>
        <div>{this.props.attr}</div>
        <div className="mod">{ this.props.mod }</div>
        <div className="stat">{ this.props.value }</div>
      </div>
    )
  },
});

export default FullStatBox
