# Scuttlebot plugins intro

repo ([ssb](%f2PZYbacgJpNq4buNCVsjG6j55K8olw80QxPjF2Teqs=.sha256) | [github](https://www.github.com/:mixmix/ssb-server-plugin-intro))

Check out a wide range of scuttlebutt learning resources here : **scuttlebutt-guide** ([ssb](%rRmgg8grYJ/upfXKxFNG62Y49CmkEShk70HoFLIEyDY=.sha256) | [github](https://github.com/ssbc/scuttlebutt-guide))

In these 3 folders, I walk through a progression of making a simple plugin, through to making a plugins which creates and accesses `flumeview`

## Project 1 : Simple Demo

I've put the code into folders because in this project, you need to run a couple of different files seperately

e.g.
```
▾ 1_simple_demo/
    client.js              // start this second
    config.js               
    server.js              // start this first
    ssb-server-counter.js  // our plugin
```

For each project you need to start a scuttlebutt-server (scuttlebot/ sbot), which loads in your plugin, and then run you can run the client code that connects to this, and executes commands. e.g.

```bash
node 1_simple_demo/server.js

// open another terminal in this repo
node 1_simple_demo/client.js
```

### `config.js`

This first project has a config which starts the server with a **test identity** (`ssb_demo`). This means the database will start our empty (creates it at `~/.ssb_demo`) and won't have any of your Patchwork data

### `manifest.json`

This was a major gotcha for me. Basically `ssb-client` needs a list of methods which it is allowed to call remotely (on the server).
This is provided by it consuming a `manifest.json`.
You _can_ pass this in as one of the options when you instantiate your client i.e. `Client(keys, { manifest: ... }, fn)`.
But it's easier to let `ssb-client` go and get it from the default location `~/.ssb/manifest.json` (or more generally `~/.<appName>/manifest.json`


That's why there's this line in the **server** file:
```js
console.log('*** updating manifest ***')
// this is required for ssb-client to consume
// it's a list of methods that can be called remotely, without this code we won't be able to call our new plugin
const manifest = server.getManifest()
fs.writeFileSync(Path.join(config.path, 'manifest.json'), JSON.stringify(manifest))
```

Once the server has loaded all it's plugins, get it to generate that manifest.
Then save that manifest in the place `ssb-client` will go looking for it.

## Project 2

### `config.js`

This project sets the your identity (in `config.js`) to `ssb`. This is the default identity, so if you've been running Patchwork/ Patchbay etc, this is connecting to your **real identity**.
Appending messages will publish them to your friends!
Views are not published so messing around with those is chill.


## Project 3

A trivial increment - I published the module as a plugin, and am requiring it in instead of using the local one.


