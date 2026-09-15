# Tinder Clone (React Native / Expo)

スワイプ→マッチング→チャットまで動くMVP。今はバックエンドなし、ローカルのモックデータ+ダミーの自動返信で動作確認できる状態。

## セットアップ

```bash
# 1. 依存パッケージをインストール
npm install

# 2. 開発サーバーを起動
npx expo start
```

起動後、表示されたQRコードをスマホの「Expo Go」アプリで読み込むと実機で動作確認できる。
(Expo Goは App Store / Google Play で無料インストール可能)

## 現在できること(MVP)

- プロフィールをスワイプ(右: いいね / 左: スキップ)
- 50%の確率でマッチ成立(デモ用のランダム判定)
- マッチした相手一覧を表示
- チャット画面でメッセージ送信(1秒後にダミー返信)

## ディレクトリ構成

```
tinder-clone/
├── App.js                  # ナビゲーション設定のエントリーポイント
├── src/
│   ├── screens/
│   │   ├── SwipeScreen.js    # メインのスワイプ画面
│   │   ├── MatchesScreen.js  # マッチ一覧
│   │   ├── ChatScreen.js     # チャット
│   │   └── ProfileScreen.js  # 自分のプロフィール
│   ├── components/
│   │   └── ProfileCard.js    # スワイプ可能なカード(Animated + PanResponder)
│   ├── context/
│   │   └── AppContext.js     # マッチ・メッセージの状態管理
│   └── data/
│       └── mockProfiles.js   # ダミーのプロフィールデータ
```

## 本番化に向けたロードマップ

### 1. バックエンド接続
- Spring Boot(or Node.js)でAPIを構築
- `mockProfiles.js` を `fetch('/api/profiles')` に置き換え
- スワイプ結果(いいね/スキップ)をDBに保存 → 相手も自分を「いいね」してたら本当のマッチ判定

### 2. 認証
- メール/電話番号 or SNSログイン
- JWTでAPIアクセスを保護

### 3. 画像アップロード
- 端末のカメラロールから選択(`expo-image-picker`)
- AWS S3にアップロードしてURLをDBに保存

### 4. リアルタイムチャット
- 現在はダミー返信 → WebSocket(Spring BootならSTOMP over WebSocket)に置き換え

### 5. 位置情報ベースのマッチング
- `expo-location` で現在地取得
- 近い順にプロフィールを取得するAPIをバックエンドで実装

### 6. 収益化
- RevenueCatを導入してApp内課金(いいね無制限、ブースト機能など)

### 7. App Store公開準備
- Apple Developer Program登録($99/年)
- 通報機能・年齢確認・プライバシーポリシーの整備(審査で必須)
- `eas build` でビルドして申請(`npm install -g eas-cli`)

## 補足

- アイコンは `@expo/vector-icons` (Ionicons) を使用
- 画像は現状 `picsum.photos` のダミー画像
- スワイプの当たり判定は `SWIPE_THRESHOLD`(`ProfileCard.js`)で調整可能
