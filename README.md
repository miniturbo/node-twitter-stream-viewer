# Twitter Stream Viewer

  Twitter Streaming APIをnode.jsで使用したサンプルです  
  OAuthによって認可されたユーザのtimelineをブラウザ上にリアルタイムで表示していきます  
  [express](https://github.com/visionmedia/express), [node-twitter](https://github.com/jdub/node-twitter), [socket.io](http://socket.io/)を使用しています  

## Usage

  ディレクトリへ移動する

    $ cd node-twitter-stream-view

  CONSUMER_KEY, CONSUMER_SECRETを編集する

    $ vi ./lib/twitter.js

  sessionのsecretの値を編集する

    $ vi ./app.js

  node（もしくは、[node-dev](https://github.com/fgnass/node-dev), [spark](https://github.com/alexkwolfe/spark)）で起動する

    $ node app.js

## TODO

 * 画面をもうちょいリッチにする
 * REST APIを使用できるようにする
 * 定期的に発生する（と思われる）Twitter Streaming APIのdisconnectへの対処
