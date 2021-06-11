# deathNote
## バージョン
.Node@12.2.0<br />
.Nuxt@2.15.4<br />
.Express@4.17.1<br />
.SQLite@3.28.0

## フロントエンド側サーバー起動方法
frontendディレクトリで「yarn dev」を叩く

## バックエンド側サーバー起動方法
backendディレクトリで「npm start」を叩く

そうすると、以下のURLでアクセス可能
↓
http://localhost:3000/openDeathNote

## 作成にあたってやったことやポイント
・SCSS使用<br />
・フロント側ではmiddlewareで特定のページ以外は毎回ログインチェックを実施。<br />
・フロントでAPIを叩いた後にバックでリクエストが来た時、DBのデータを取得する際にSequelizeを使用してCRUDを行う。<br />
・名前を書かれた人が表示される一覧のページにて、削除の処理を実施していないのは、「デスノートに名前を書かれた人は死ぬ」というルールがあるため、そのルールに沿って実装はしていない。代わりにアカウントの編集画面で会員登録の削除処理を実装。<br />
・ログインはexpress-sessionで実装。

## 現在生じているエラー・課題
・入力のところで値を入力しているのに、validatorが作動してしまう。<br/>
・今回はNuxtとExpressで開発を行う場合の練習で、流れや仕組みを知るというのが目的でフロント面は作り込んでいないので、フロント周りのデザインを作り込みたい。その際にはVuetifyなどのフレームワークを使用したい。<br/>
・テストコードが入っていないのでキャッチアップした後に導入予定。<br/>
・Dockerで動くようにdocker-compose.ymlとDockerfileでコンテナにまとめて動くようにしたい。
