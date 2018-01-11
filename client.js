const Client = require('ssb-client')

Client((err, ssbServer) => {
  // ssbServer (also commonly called sbot)
  // a remote connection to our server

  if (err) throw err

  // console.log('methods', ssbServer)
  ssbServer.whoami(console.log)
  console.log('actualFriends methods', ssbServer.actualFriends)

  // ssbServer.publish({ type: 'test', text: 'beep-boop'}, console.log)
  // console.log(ssbServer.actualFriends)
  // ssbServer.actualFriends.get(console.log)
 

})

