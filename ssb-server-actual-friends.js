const flumeView = require('flumeview-reduce')
const pull = require('pull-stream')

module.exports = {
  name: 'actualFriends',
  version: '1.0.0',
  manifest: {
    get: 'async',
    stream: 'source'
  },
  init: function (ssbServer, config) {
    console.log('*** loading actual-friends ***')

    // return {
    //   get: (cb) => cb('dogs!'),
    //   stream: pull.values([1,2,3,4,5])
    // }

    const view = ssbServer._flumeUse('actualFriends', flumeView(
      1.0, // version
      (acc, msg) => { //reduce
        console.log('/')
        return {
          total: acc.total + 1
        }
      },
      (msg) => { //map
        return msg
      },
      null, //codec
      initialState()
    ))
    console.log('init FlumeView', view)

    return view
  }
}

function initialState () {
  return {
    total: 0
  }
}


