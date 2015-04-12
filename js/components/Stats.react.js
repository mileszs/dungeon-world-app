import React from 'react';
import _ from 'lodash';
import Draggable from './Draggable.react';


let Stats = React.createClass({
  render() {
    let children = _.map(this.props.numbers, (num, i) => {
      return <Stat key={num} num={num} index={i+1} onDragStart={this.props.onDragStart} onDragStop={this.props.onDragStop} />
    })
    return (
      <div className='dnd-source-objects'>{children}</div>
    )
  }
})

let Stat = React.createClass({
  render() {
    return (
      <Draggable className='dnd-source-object' onDragStart={this.props.onDragStart} onDragStop={this.props.onDragStop} dragData={this.dragData}>
        <h2>{this.props.num}</h2>
      </Draggable>
    );
  },

  dragData() {
    return {
      num: this.props.num,
      index: this.props.index
    }
  }
});

export default Stats
