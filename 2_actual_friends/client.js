const Client = require('ssb-client')
const config = require('./config')

const map = require('lodash/map')

Client(config.keys, config, (err, ssbServer) => {
  // ssbServer (also commonly called sbot)
  // a remote connection to our server
  if (err) throw err

  // console.log('methods', ssbServer)
  console.log('actualFriends methods:', ssbServer.actualFriends)

  ssbServer.whoami((err, data) => { 
    if (err) throw err
    const myId = data.id
    const dominicId = '@EMovhfIrFk4NihAKnRNhrfRaqIhBv1Wj8pTxJNgvCCY=.ed25519'

    ssbServer.actualFriends.get((err, view) => {
      if (err) throw err

      // console.log(JSON.stringify(view[id.id], null, 2))

      // actualFriends(view, myId)
      checkFriendShip(view, myId, dominicId)

      ssbServer.close()
    })
  })
})

function actualFriends (view, id) {
  var idData = view[id]
  var orderedData = map(idData.mentions, (value, key) => {
      return { key , value }
    })
    .sort((a,b) => b.value < a.value ? -1 : 1)

  write(orderedData)
}

function checkFriendShip (view, id1, id2) {
  console.log(`${id1} mentions ${id2} ${view[id1].mentions[id2]} times`)
  console.log(`${id2} mentions ${id1} ${view[id2].mentions[id1]} times`)
}

function write(object) {
  process.stdout.write(JSON.stringify(object, null, 2))
}

