const Client = require('ssb-client')
const config = require('./config')

Client(config.keys, config, (err, ssbServer) => {
  // ssbServer (also commonly called sbot)
  // a remote connection to our server
  if (err) throw err

  // console.log('methods', ssbServer)
  ssbServer.whoami((err, id) => console.log('whoami', id))

  ssbServer.publish({ type: 'test', text: 'beep-boop'}, console.log)
  // console.log(ssbServer.actualFriends)
 
  ssbServer.counter.get(console.log)
})

