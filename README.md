# Pusher Channels Example Auth Server

This project aims to demonstrate how to implement a
[Pusher](https://pusher.com) authorization endpoint using the
[pusher-http-node](https://github.com/pusher/pusher-http-node) library. There's
no concept of users - a valid token is provided to every request - so this
shouldn't be used in production.

## Some Assembly Required
**BEFORE you run this project** you'll need an `appId`, `appKey`, `appSecret`
and `cluster` for Pusher. You can get these from the keys tab of your [pusher
dashboard](https://dashboard.pusher.com)

## Deploy to Heroku

You'll need to insert your `appId`, `appKey`, `appSecret` and `cluster` when
deploying your app.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/pusher/pusher-channels-auth-example)

## Run It Locally

Make a copy of the `.env.example` file.

```
cp .env.example .env
```

Add your `appId`, `appKey`, `appSecret` and `cluster` to the newly created
`.env` file.

When you have a `.env` file containing a valid `APP_ID` `APP_KEY`, `APP_SECRET`
and `CLUSTER` you're ready to run.

```
yarn
yarn start
```

That's it. You can test everything works by sending a `POST` request to
`http://localhost:3030/pusher/auth`

```
curl -X POST http://localhost:3030/pusher/auth \
  -H "Content-Type: application/json" \
  -d '{"socket_id": "100.100", "channel_name": "private-document"}'
```
