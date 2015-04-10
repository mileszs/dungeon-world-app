import React from 'react';
import _ from 'lodash';

const LEFT_BUTTON = 0
const DRAG_THRESHOLD = 3 // pixels

let Draggable = React.createClass({
  getInitialState() {
    return { mouseDown: false, dragging: false }
  },

  render() {
    return <div {...this.props} style={this.style()} className={this.className()} onMouseDown={this.handleMouseDown}>{this.props.children}</div>
  },

  style() {
    if (this.state.dragging) {
      return { position: 'absolute', left: this.state.left, top: this.state.top};
    } else {
      return {};
    }
  },

  className() {
    let className = this.props.className + ' dnd-draggable ';
    if (this.state.dragging) {
      className = className + 'dragging'
    }
    return className;
  },

  handleMouseDown(e) {
    if (e.button === LEFT_BUTTON) {
      e.stopPropagation();
      this.addEvents();
      let pageOffset = this.getDOMNode().getBoundingClientRect();
      let elementOffsetX = e.target.offsetParent.offsetLeft;
      this.setState({
        mouseDown: true,
        originX: e.pageX,
        originY: e.pageY,
        elementX: pageOffset.left - elementOffsetX,
        elementY: pageOffset.top
      });
    }
  },

  handleMouseMove(e) {
    let deltaX = e.pageX - this.state.originX;
    let deltaY = e.pageY - this.state.originY;
    let distance = Math.abs(deltaX) + Math.abs(deltaY);

    if (!this.state.dragging && distance > DRAG_THRESHOLD) {
      this.setState({dragging: true});
      this.props.onDragStart(this.props.dragData());
    }

    if (this.state.dragging) {
      this.setState({
        left: this.state.elementX + deltaX + document.body.scrollLeft,
        top: this.state.elementY + deltaY + document.body.scrollTop
      });
    }
  },

  handleMouseUp() {
    this.removeEvents();
    if (this.state.dragging) {
      this.props.onDragStop();
      this.setState({
        dragging: false
      });
    }
  },

  addEvents() {
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  },

  removeEvents() {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }
})

export default Draggable
