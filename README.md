# deathNote
## フロントエンド側サーバー起動方法
frontendディレクトリで「yarn dev」を叩く

## バックエンド側サーバー起動方法
backendディレクトリで「npm start」を叩く

そうすると、以下のURLでアクセス可能
↓
http://localhost:3000/openDeathNote

## 作成にあたってやったことなど
・SCSS使用<br />
・フロント側ではmiddlewareで特定のページ以外は毎回ログインチェックを実施<br />
・フロントでAPIを叩いた後にバックでリクエストが来た時、DBのデータを取得する際にSequelizeを使用してCRUDを行う
