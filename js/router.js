// router.js
// The trick is to assign module.exports before any require()s

import React from 'react'
import Router from 'react-router'

let router

export default {
  makePath(to, params, query) {
    return router.makePath(to, params, query);
  },

  makeHref(to, params, query) {
    return router.makeHref(to, params, query);
  },

  transitionTo(to, params, query) {
    router.transitionTo(to, params, query);
  },

  replaceWith(to, params, query) {
    router.replaceWith(to, params, query);
  },

  goBack() {
    router.goBack();
  },

  run(render) {
    router.run(render);
  }
}

// By the time route config is require()-d,
// require('./router') already returns a valid object
import routes from './routes'

router = Router.create({ routes })

router.run(function(Handler, state) {
  let params = state.params
  React.render(<Handler params={params} />, document.getElementById('react'))
})
