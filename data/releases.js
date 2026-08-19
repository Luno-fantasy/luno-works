(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

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
    }
  ];

  const patches = {
    "summer-not-enough": {
      description: "海沿いの町・汐凪市。\n\nかつて同じジュニアスイミングクラブで泳いでいた澪央、陽向、凌雅、{{user}}は、三年前に{{user}}が何も告げず水泳を辞め、町を去ったことで離れ離れになった。\n\n三年後、{{user}}は汐凪市へ戻り、蒼海大学へ進学。止まっていた四人の時間が再び動き始める。\n\n澪央は過去を取り戻したい。\n陽向はもう失いたくない。\n凌雅は勝つことで今の自分を見てほしい。\n千景は過去ではなく、これからの隣を望んでいる。\n\n競技へ戻るのか。誰の隣を泳ぐのか。\n四人との再会をきっかけに、置き去りにした夏が再び動き始める。"
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

  if (DATA.site && typeof DATA.site === "object") {
    DATA.site.publishedCount = DATA.works.filter(item => item?.status !== "draft").length;
    DATA.site.draftCount = DATA.works.filter(item => item?.status === "draft").length;
  }
})();
