
# LUNO WORKS｜ビジュアルノベル公式サイト試作版

## ファイル構成

- `index.html`：サイト本体。基本的に触らなくてOK
- `style.css`：デザイン
- `app.js`：表示やアニメーション
- `data.js`：作品・リンク・お知らせの内容

## 普段の更新

基本的に **data.jsだけ編集** します。

### 作品を追加する

`works: [` の中にある作品ブロックを丸ごとコピーし、以下を書き換えます。

- `id`
- `title`
- `category`
- `label`
- `symbol`
- `catchcopy`
- `summary`
- `keywords`
- `status`
- `number`
- `cover`
- `primaryUrl`

### マシュマロやSNSのリンク

`links:` の中にある `url: "#"` を実際のURLへ変更します。

### お知らせ

`news:` の一番上に新しい行を追加します。

## GitHub Pagesで公開

1. ZIPを展開
2. GitHubのリポジトリへ4ファイルをアップロード
3. Settings → Pages
4. Branchを `main`、フォルダを `/root` に設定
5. Save

## 画像を使う場合

今は画像なしでも成立するよう、作品カードをグラデーションで作っています。
将来は `cover` を画像URLへ対応させることもできます。
