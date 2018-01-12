const flumeView = require('flumeview-reduce')
const pull = require('pull-stream')
const get = require('lodash/get')
const mergeWith = require('lodash/mergeWith')

module.exports = {
  name: 'actualFriends',
  version: '1.0.0',
  manifest: {
    get: 'async',
    stream: 'source'
  },
  init: function (ssbServer, config) {
    console.log('*** loading actual-friends ***')

    const view = ssbServer._flumeUse('actualFriends', flumeView(
      1.3, // version
      reduceData,
      mapToData,
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

function reduceData (acc, newData) {
  // https://lodash.com/docs/4.17.4#mergeWith
  process.stdout.write('<3')
  return mergeWith(acc, newData, (accVal, newVal) => {
    if (typeof accVal === 'number') {
      return accVal + newVal
    }
  })
}

function mapToData (msg) {
  // TODO - handle private message
  // TODO - check mentions are valid user keys

  const { author, content } = msg.value
  var mentions = get(content, 'mentions', []) //map
  if (!Array.isArray(mentions)) {
    console.log('actualFriends - weird mentions:', mentions)
    // e.g { '0': { link: '@hxGxqPrplLjRG2vtjQL87abX4QKqeLgCwQpS730nNwE=.ed25519', name: 'paul' } }
    return {}
  }
  // catches old mentions types : 

  mentions = mentions
    .map(mention => typeof mention === 'object'
      ? mention.link
      : mention
    )
    .filter(Boolean)
    .reduce(
      (acc, user) => Object.assign(acc, { [user]: 1 }),
      {}
    )

  return {
    [author]: {
      mentions
    }
  }
}

function initialState () {
  return {}
}

