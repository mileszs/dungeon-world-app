import alt from '../alt'

class StatActions {
  drop(data) {
    this.dispatch({
      attr: data.attr,
      num: data.num
    })
  }

  reset() {
    this.dispatch()
  }
}

export default alt.createActions(StatActions)
