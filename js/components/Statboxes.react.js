import React from 'react';
import _ from 'lodash';
import StatActions from '../actions/StatActions';

let Statboxes = React.createClass({

  render() {
    var attrs = _.keys(this.props.stats);
    let children = _.map(attrs, (attr, i) => {
      return <StatBox attr={attr} num={this.props.stats[attr]} index={i} currentDragItem={this.props.currentDragItem} onDrop={this.props.onDrop} />
    })
    return (
      <div className='dnd-drop-targets'>{children}</div>
    )
  }
})

let StatBox = React.createClass({
  getInitialState() {
    return { hover: false }
  },

  render() {
    return (
      <div className={this.classes()} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onMouseUp={this.handleDrop}>
        <span>{this.props.attr}</span>
        <div className="selected-stat">{ this.selectedStat() }</div>
      </div>
    )
  },

  selectedStat() {
    if (this.props.num) {
      return <span>{this.props.num}</span>
    } else {
      return <span>{'\u0020'}</span>
    }
  },

  classes() {
    let classes = ['dnd-drop-target']
    if (this.active()) { classes.push('active') }
    if (this.state.hover) { classes.push('hover') }
    return classes.join(' ')
  },

  active() {
    let item = this.props.currentDragItem
    return !!item
  },

  handleMouseEnter() {
    this.setState({hover: true})
  },

  handleMouseLeave() {
    this.setState({hover: false})
  },

  handleDrop() {
    this.props.onDrop();
    StatActions.drop({ num: this.props.currentDragItem.num, attr: this.props.attr });
  }
});

export default Statboxes
