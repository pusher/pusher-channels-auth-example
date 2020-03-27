const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const config = require('./config');
const htmlGenerator = require('./html-generator');

const app = express();
const port = config.PORT || 3030;

var pusherSdkArgs = {
  appId: config.APP_ID,
  key: config.APP_KEY,
  secret: config.APP_SECRET,
  cluster: config.CLUSTER,
};

if (config.ENCRYPTION_MASTER_KEY) {
  pusherSdkArgs.encryptionMasterKeyBase64 = config.ENCRYPTION_MASTER_KEY;
}

const pusher = new Pusher(pusherSdkArgs);

const debug = (...args) => {
  if (config.DEBUG) {
    console.log('debug::: ', ...args);
  }
};

// Allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

console.log(config);
app.post(config.ENDPOINT, (req, res) => {
  debug('received auth request');
  debug('req.body:', req.body);
  // Some logic to determine whether the user making the request has access to
  // the private channel
  // ...
  // ...
  // ...
  // Extract the socket id and channel name from the request body
  //
  const socketId = req.body.socket_id;
  const channelName = req.body.channel_name;

  if (/^presence-/.test(channelName)) {
    // If the request is for a presence channel include some data about the user
    // in the call to authenticate
    let timestamp = new Date().toISOString();
    let presenceData = {
      user_id: `user-${timestamp}`,
      user_info: {
        name: 'Pusherino',
        twitter_id: '@pusher',
      },
    };
    let auth = pusher.authenticate(socketId, channelName, presenceData);
    res.send(auth);
  } else {
    let auth = pusher.authenticate(socketId, channelName);
    res.send(auth);
  }
});

const html = htmlGenerator.generate(config.ENDPOINT);
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

app.listen(port, () => {
  let msg = `listening on ${port}`;
  if (config.DEBUG) msg += ' - DEBUG mode';
  console.log(msg);
});
