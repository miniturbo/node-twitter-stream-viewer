# Twitter Stream Viewer

  Twitter Streaming APIをnode.jsで使用したサンプルです
  OAuthによって認可されたユーザのtimelineをブラウザ上にリアルタイムで表示していきます
  [express](https://github.com/visionmedia/express), [node-twitter](https://github.com/jdub/node-twitter), [socket.io](http://socket.io/)を使用しています

## Usage

    $ cd node-twitter-stream-view

  CONSUMER_KEY, CONSUMER_SECRETを編集します

    $ vi ./lib/twitter.js

  sessionのsecretの値を編集します

    $ vi ./app.js

    $ node app.js
