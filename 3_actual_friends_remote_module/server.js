const Server = require('scuttlebot')
const fs = require('fs')
const Path = require('path')

const config = require('./config')
console.log('config:', config)

console.log('*** installing ssb-server plugins ***')
Server
  .use(require('scuttlebot/plugins/master'))
  .use(require('ssb-server-actual-friends'))

console.log('*** starting ssb-server ***')
const server = Server(config)

console.log('*** updating manifest ***')
// this is required for ssb-client to consume
// it's a list of methods that can be called remotely, without this code we won't be able to call our new plugin
const manifest = server.getManifest()
fs.writeFileSync(Path.join(config.path, 'manifest.json'), JSON.stringify(manifest))
