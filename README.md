
# tipsbot

> A Slack bot that gives you daily tips

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![Travis](https://img.shields.io/travis/simon-johansson/tipsbot.svg)](https://travis-ci.org/simon-johansson/tipsbot)

[![dependencies](https://img.shields.io/david/simon-johansson/tipsbot.svg)](https://david-dm.org/simon-johansson/tipsbot)
[![devDependencies](https://img.shields.io/david/dev/simon-johansson/tipsbot.svg)](https://david-dm.org/simon-johansson/tipsbot#info=devDependencies)

Tipsbot comes preconfigured with tips from [Pragmatic Programmer](http://www.amazon.com/The-Pragmatic-Programmer-Journeyman-Master/dp/020161622X) (great book, you should read it!) but allows you to supply your own tips if you so wish.

## Installation
```bash
$ npm install -g tipsbot
```

## Running Tipsbot
To run the Tipsbot you must have an [API token](#getting-the-api-token-for-your-slack-channel) to authenticate the bot on your slack channel. Once you get it you just have to run:

```bash
BOT_API_KEY=somesecretkey tipsbot
```

## Configuration
The Tipsbot is configurable through environment variables. There are several variable available:

| Environment variable | Description |
|----------------------|-------------|
| `BOT_API_KEY`        | (required) The API token needed by the bot to connect to your Slack organization |
| `BOT_FILE_PATH`      | (optional) Variable that allows you to use a different tips dataset, defaults to tips from the Pragmatic Programmer |
| `BOT_NAME`           | (optional) The name of your bot, defaults to 'Tipsbot' |
| `BOT_CHANNEL`        | (optional) The Slack-channel Tipsbot will post to, defaults to 'general' |
| `BOT_START_INDEX`    | (optional) The index for the first tips from the dataset, defaults to `0` |
| `BOT_SCHEDULE`       | (optional) Cron string that specifies when to post tips, defaults to `0 9 * * 1,2,3,4,5` which is 09:00 on mon-fri |


## Launching the bot from source
If you downloaded the source code of the bot you can run it using NPM with:

```bash
$ npm start
```

Don't forget to set your `BOT_API_KEY` environment variable before doing so. Alternatively you can also create a file called `token.js` in the root folder and put your token there (you can use the `token.js.sample` file as a reference).

## Format of JSON dataset
If you supply your own JSON file with tips then make sure if follows this structure:
```
[
    {
        heading: '<STRING>',
        details: '<STRING>'
    },
    ...
]
```


## Deploy
Uses semantic-release to help with the versioning and deployment to npm. To deploy new versions to npm, to the following:
```bash
$ git add <FILES TO STAGE>
$ npm run commit #will run tests locally, if they pass semantic-release will start interactive commit process
$ git push #will run tests tests on Travis-CI, if they pass semantic-release will deploy a new version to npm
```

## Shout out
A lot about Tipsbot have been stolen shamelessly from [Luciano Mamminos](https://github.com/lmammino) awesome [NorrisBot](https://scotch.io/tutorials/building-a-slack-bot-with-node-js-and-chuck-norris-super-powers)

## License
Licensed under [MIT License](LICENSE). © Simon Johansson.
