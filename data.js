
/*
  ============================================
  ここだけ編集すればサイトを更新できます
  ============================================
  作品追加:
  works の中の { ... } をコピーして内容を書き換える

  リンク変更:
  links の url を差し替える

  お知らせ追加:
  news の先頭に新しい項目を追加する
*/

const SITE_DATA = {
  categories: ["すべて", "幻想", "裏社会", "現代", "マルチ"],

  works: [
    {
      id: "yato",
      title: "蛇神様と、朝まで眠れない。",
      category: "幻想",
      label: "AYAKASHI / OBSESSION",
      symbol: "蛇",
      catchcopy: "神域の夜、逃がす気のない蛇神と二人きり。",
      summary: "禁足地の最奥に棲む蛇神・夜刀。警戒から始まる関係は、静かな興味、執着、そして逃げ場のない溺愛へ変わっていく。",
      keywords: ["蛇神", "禁足地", "独占欲", "二人きり"],
      status: "公開中",
      number: "WORLD 01",
      cover: "linear-gradient(145deg,#07191e,#1d5352 46%,#2f2446 78%,#090b18)",
      primaryUrl: "#",
      primaryLabel: "作品を読む"
    },
    {
      id: "genmei",
      title: "黒龍は龍妃を認めない",
      category: "幻想",
      label: "DRAGON / FANTASY",
      symbol: "龍",
      catchcopy: "認めぬと言った龍ほど、深く囲い込む。",
      summary: "黒曜龍宮《玄淵宮》の宮主・玄冥と、龍妃として迎えられたあなた。拒絶から始まる、千年を生きる黒龍の執着。",
      keywords: ["黒龍", "龍宮", "契約", "溺愛"],
      status: "公開中",
      number: "WORLD 02",
      cover: "linear-gradient(145deg,#11122d,#433f79 48%,#0b1525)",
      primaryUrl: "#",
      primaryLabel: "作品を読む"
    },
    {
      id: "karyukai",
      title: "華龍会のお姫様になりました。",
      category: "マルチ",
      label: "CHINESE MAFIA / ENSEMBLE",
      symbol: "華",
      catchcopy: "血より濃い忠誠に、逃げ道はない。",
      summary: "中華マフィア《華龍会》に引き取られたあなたと、彼女を守る男たちの物語。家族、忠誠、独占欲が交差する群像劇。",
      keywords: ["中華マフィア", "逆ハーレム", "忠誠", "群像劇"],
      status: "公開中",
      number: "WORLD 03",
      cover: "linear-gradient(145deg,#2b1028,#79445f 48%,#16253f)",
      primaryUrl: "#",
      primaryLabel: "作品を読む"
    },
    {
      id: "belmondo",
      title: "ボス、今夜は俺に従え。",
      category: "裏社会",
      label: "MAFIA / DOM-SUB",
      symbol: "B",
      catchcopy: "昼は忠実な右腕。夜だけ、命令する男。",
      summary: "ベルモンド・ファミリアのボスであるあなたと、唯一命令を下すことを許されたアンダーボス。支配と信頼を描く裏社会ロマンス。",
      keywords: ["マフィア", "Dom/Sub", "主従", "信頼"],
      status: "公開中",
      number: "WORLD 04",
      cover: "linear-gradient(145deg,#111a31,#34506b 52%,#8b765f)",
      primaryUrl: "#",
      primaryLabel: "作品を読む"
    },
    {
      id: "swim",
      title: "君と泳ぐには、夏が足りない。",
      category: "マルチ",
      label: "SCHOOL / SWIMMING",
      symbol: "夏",
      catchcopy: "水面の光より眩しい、四人とのひと夏。",
      summary: "汐凪市・蒼海学園水泳部。競泳に青春を懸ける四人とあなたが過ごす、眩しくて短い夏の物語。",
      keywords: ["青春", "水泳", "学園", "四人"],
      status: "準備中",
      number: "WORLD 05",
      cover: "linear-gradient(145deg,#0d1d37,#2b789a 55%,#d7ad72)",
      primaryUrl: "#",
      primaryLabel: "詳細を見る"
    },
    {
      id: "nagisa",
      title: "昼は完璧な同期。夜は、君だけが知る。",
      category: "現代",
      label: "OFFICE / SECRET",
      symbol: "凪",
      catchcopy: "会社では爽やか。秘密の夜だけ、悪い男。",
      summary: "大手広告代理店で働く浅霧凪沙。昼は有能で感じのいい同期、夜はあなただけが知る危うい男。",
      keywords: ["オフィス", "同期", "裏垢", "ギャップ"],
      status: "公開中",
      number: "STORY 06",
      cover: "linear-gradient(145deg,#24152c,#773847 56%,#8a725f)",
      primaryUrl: "#",
      primaryLabel: "作品を読む"
    }
  ],

  news: [
    { date: "2026.07.28", label: "SITE", title: "公式アーカイブ試作版を公開しました。" },
    { date: "2026.07.28", label: "NEW", title: "『蛇神様と、朝まで眠れない。』公開。" },
    { date: "2026.07.26", label: "NEW", title: "御堂玲司の物語を公開しました。" }
  ],

  links: [
    { name: "マシュマロ", icon: "✉", description: "匿名メッセージ・感想", url: "#" },
    { name: "X", icon: "𝕏", description: "新作・更新のお知らせ", url: "#" },
    { name: "TikTok", icon: "♪", description: "キャラクター紹介動画", url: "#" },
    { name: "zeta", icon: "Z", description: "公開中の作品を読む", url: "#" },
    { name: "Chacha", icon: "C", description: "別プラットフォーム", url: "#" },
    { name: "Gallery", icon: "◇", description: "イラスト・世界観資料", url: "#library" }
  ]
};
