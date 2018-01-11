const Server = require('scuttlebot')

// const Config = require('ssb-config/inject')
const Config = require('ssb-config')
const ssbKeys = require('ssb-keys')
const Path = require('path')

const appName = 'ssb'
const opts = null // can set things in here
// const config = Config(appName, opts)
// const config = Config()
const config = Config
config.keys = ssbKeys.loadOrCreateSync(Path.join(config.path, 'secret'))


console.log('*** installing ssb-server plugins ***')
Server
  .use(require('scuttlebot/plugins/master'))
  .use(require('scuttlebot/plugins/local'))
  .use(require('scuttlebot/plugins/gossip'))
  .use(require('scuttlebot/plugins/replicate'))
  .use(require('scuttlebot/plugins/invite'))
  .use(require('scuttlebot/plugins/logging'))
  .use(require('./ssb-server-actual-friends'))
  // .use(require('ssb-friends'))
  // .use(require('ssb-blobs'))
  // .use(require('ssb-backlinks'))
  // .use(require('ssb-private'))
  // .use(require('ssb-query'))
  // .use(require('ssb-about'))
  // .use(require('ssb-fulltext'))
  // .use(require('ssb-ebt'))
  // .use(require('ssb-ws'))
  // .use(require('ssb-chess-db'));


console.log('*** starting ssb-server ***')
const server = Server(config)

