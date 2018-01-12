const flumeView = require('flumeview-reduce')
const pull = require('pull-stream')

module.exports = {
  name: 'counter',
  version: '1.0.0',
  manifest: {
    get: 'async',
    stream: 'source'
  },
  init: function (ssbServer, config) {
    console.log('*** loading actual-friends ***')

    const view = ssbServer._flumeUse('counter', flumeView(
      1.0, // version
      (acc, msg) => { //reduce
        return {
          total: acc.total + 1
        }
      },
      (msg) => msg,  //map
      null, //codec
      initialState()
    ))
    console.log('init FlumeView', view)

    return {
      get: view.get,
      stream: view.stream
    }
  }
}

function initialState () {
  return {
    total: 0
  }
}


