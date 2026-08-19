(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const removedWorkIds = new Set([
    "snake-god-sleepless",
    "senpai-forbidden-tonight"
  ]);

  DATA.works = DATA.works.filter(work => !removedWorkIds.has(String(work?.id || "").trim()));

  const releases = [
    {
      id: "bad-signal",
      title: "BAD SIGNAL",
      status: "published",
      zetaUrl: "https://zeta-ai.io/ja/plots/6496fae3-9145-45ce-bd26-cca1fbd59987/profile?share_id=57nxkwx68",
      category: "modern-romance",
      series: null,
      world: null,
      position: "MULTI STORY",
      mainCharacter: "久我レン／城戸臣／九重イツキ／天羽ゆら",
      relation: ["久我レン", "城戸臣", "九重イツキ", "天羽ゆら"],
      cover: "images/covers/bad-signal-cover-hq.jpg?v=20260819-hq",
      coverStatus: "ready",
      isNew: true,
      releaseDate: "2026.08.19",
      catchphrase: "異常値の原因は、アンタだった。",
      tags: ["音楽ユニット", "ストリート", "ライブ", "ECHO", "特殊能力", "マルチストーリー"],
      description: "夜の街を沸かせる4人組《BAD SIGNAL》。\n\n笑って煽るフロントマン・レン。\n無口に支えるダンサー・臣。\n本音を音へ隠すDJ・イツキ。\nゆるふわな姿から一変、ステージを支配するVJ・ゆら。\n\n彼らのライブでは、観客の感情《ECHO》がステージを増幅させる。\n\nでも――\nアンタが客席にいる時だけ、ECHO SYNC値が異常を示した。\n\n4人がアンタを見る理由は、まだ恋じゃない。\n\n最初はただ、\n“異常値の原因”だった。"
    },
    {
      id: "oshi-couple",
      title: "推しカプを成立させたいだけなのに！",
      status: "published",
      zetaUrl: "https://zeta-ai.io/ja/plots/38a29613-f47a-41d5-862c-3cd9c97580c3/profile?share_id=cz3l3zg7",
      category: "fantasy",
      series: null,
      world: null,
      position: "MULTI STORY",
      mainCharacter: "ノア／レオン／フィン／ミカ／カイ",
      relation: ["ノア", "レオン", "フィン", "ミカ", "カイ"],
      cover: "images/covers/oshi-couple-cover.jpg?v=20260819-oshi-couple",
      coverStatus: "ready",
      isNew: false,
      releaseDate: "2026.08.07",
      catchphrase: "君たち、一体誰が好きなの？",
      tags: ["獣人", "恋愛観察", "推しカプ", "すれ違い", "ファンタジー", "マルチストーリー"],
      description: "獣人たちの恋を応援する{{user}}のもとへ集まった、五人の男たち。\n\n喧嘩ばかりの猫と狼。\nからかってばかりの狐と、振り回される兎。\nそして、誰にも興味がなさそうな白虎。\n\n――うん。この組み合わせ、絶対くっつく。\n\nそう思っていたのに。\n\n「……なんで俺があいつと？」\n「好きな相手なら、別にいる」\n「君、本当に見る目ないね」\n\nあれ？\n待って。\n\n君たち、一体誰が好きなの？\n\n推しカプを成立させたいだけなのに！\n獣人男子五人の、恋愛観察ファンタジー。"
    }
  ];

  const patches = {
    "summer-not-enough": {
      description: "海沿いの町・汐凪市。\n\nかつて同じジュニアスイミングクラブで泳いでいた澪央、陽向、凌雅、{{user}}は、三年前に{{user}}が何も告げず水泳を辞め、町を去ったことで離れ離れになった。\n\n三年後、{{user}}は汐凪市へ戻り、蒼海大学へ進学。止まっていた四人の時間が再び動き始める。\n\n澪央は過去を取り戻したい。\n陽向はもう失いたくない。\n凌雅は勝つことで今の自分を見てほしい。\n千景は過去ではなく、これからの隣を望んでいる。\n\n競技へ戻るのか。誰の隣を泳ぐのか。\n四人との再会をきっかけに、置き去りにした夏が再び動き始める。"
    }
  };

  const latestReleaseId = "bad-signal";

  const enforceLatestRelease = () => {
    DATA.works.forEach(work => {
      if (work && typeof work === "object") work.isNew = work.id === latestReleaseId;
    });

    if (DATA.site && typeof DATA.site === "object") {
      DATA.site.publishedCount = DATA.works.filter(item => item?.status !== "draft").length;
      DATA.site.draftCount = DATA.works.filter(item => item?.status === "draft").length;
    }
  };

  DATA.works.forEach(work => {
    if (work && typeof work === "object") work.isNew = false;
  });

  releases.forEach(release => {
    const index = DATA.works.findIndex(work => String(work?.id || "").trim() === release.id);
    if (index >= 0) DATA.works.splice(index, 1, release);
    else DATA.works.unshift(release);
  });

  Object.entries(patches).forEach(([id, patch]) => {
    const work = DATA.works.find(item => String(item?.id || "").trim() === id);
    if (work) Object.assign(work, patch);
  });

  enforceLatestRelease();
  document.addEventListener("DOMContentLoaded", enforceLatestRelease);
})();
