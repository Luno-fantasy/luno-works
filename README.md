# LUNO WORKS

LUNO WORKS の公開サイト用リポジトリです。

## 現在の主な構成

- `index.html`：HOME
- `world.html`：WORLD一覧
- `works.html`：WORKS一覧
- `news.html`：NEWS
- `profile.html`：PROFILE
- `euphoria.html`：EUPHORIA専用ページ
- `touhouyoukai.html`：東方妖界専用ページ
- `data.js`：作品・シリーズ・公開状態・リンク・紹介文などの主要データ
- `app.js`：表示、検索、モーダル、並び順、各種UI処理
- `style.css`：サイト全体のデザイン
- `images/covers/`：作品カバー
- `images/worlds/`：WORLD用画像

## 新作追加・公開時の更新方針

基本の更新元は `data.js` です。

新作を追加する場合は、作品データとして主に以下を確認します。

- `id`
- `title`
- `status`
- `zetaUrl` / 必要な公開先URL
- `category`
- `series`
- `world`
- `position`
- `mainCharacter`
- `relation`
- `cover`
- `coverStatus`
- `isNew`
- `releaseDate`
- `catchphrase`
- `tags`
- `description`

シリーズ作品の場合は `series` 内の作品ID一覧にも追加します。

## 更新時に一緒に確認する場所

`data.js` だけで自動反映される箇所が多い一方、WORLDページなどには固定テキストもあります。
新作公開時は次も確認します。

1. `data.js` の作品情報
2. シリーズ登録
3. NEW表示と公開日
4. 外部リンク
5. カバー画像
6. `world.html` の固定表示や世界情報
7. シリーズ専用ページの固定表示
8. NEWSに掲載する更新情報
9. `app.js` に一時的な補正が残っていないか

## 管理方針

作品データの修正は、可能な限り `app.js` の後付け補正ではなく `data.js` の元データへ反映します。
表示件数など、データから算出できるものは固定値を増やさず自動取得する方針です。

## 公開

GitHub Pages の `main` / `/root` を公開元として使用します。
ChatGPTのGitHub接続から直接更新する場合、従来のZIP展開・再アップロードは不要です。
