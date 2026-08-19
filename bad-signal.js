(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  DATA.works.forEach(work => {
    if (work && typeof work === "object") work.isNew = false;
  });

  const id = "bad-signal";
  const existingIndex = DATA.works.findIndex(work => String(work?.id || "").trim() === id);
  const work = {
    id,
    title: "BAD SIGNAL",
    status: "published",
    zetaUrl: "https://zeta-ai.io/ja/plots/6496fae3-9145-45ce-bd26-cca1fbd59987/profile?share_id=57nxkwx68",
    category: "modern-romance",
    series: null,
    world: null,
    position: "MULTI STORY",
    mainCharacter: "久我レン／城戸臣／九重イツキ／天羽ゆら",
    relation: ["久我レン", "城戸臣", "九重イツキ", "天羽ゆら"],
    cover: "images/covers/bad-signal.jpeg",
    coverStatus: "ready",
    isNew: true,
    releaseDate: "2026.08.19",
    catchphrase: "異常値の原因は、アンタだった。",
    tags: ["音楽ユニット", "ストリート", "ライブ", "ECHO", "特殊能力", "マルチストーリー"],
    description: "夜の街を沸かせる4人組《BAD SIGNAL》。\n\n笑って煽るフロントマン・レン。\n無口に支えるダンサー・臣。\n本音を音へ隠すDJ・イツキ。\nゆるふわな姿から一変、ステージを支配するVJ・ゆら。\n\n彼らのライブでは、観客の感情《ECHO》がステージを増幅させる。\n\nでも――\nアンタが客席にいる時だけ、ECHO SYNC値が異常を示した。\n\n4人がアンタを見る理由は、まだ恋じゃない。\n\n最初はただ、\n“異常値の原因”だった。"
  };

  if (existingIndex >= 0) DATA.works.splice(existingIndex, 1, work);
  else DATA.works.unshift(work);

  if (DATA.site && typeof DATA.site === "object") {
    DATA.site.publishedCount = DATA.works.filter(item => item?.status !== "draft").length;
    DATA.site.draftCount = DATA.works.filter(item => item?.status === "draft").length;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const currentData = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || DATA;
    currentData.works?.forEach(item => {
      if (item?.id !== id) item.isNew = false;
    });
    if (currentData.site && typeof currentData.site === "object") {
      currentData.site.publishedCount = currentData.works.filter(item => item?.status !== "draft").length;
      currentData.site.draftCount = currentData.works.filter(item => item?.status === "draft").length;
    }

    document.querySelectorAll('.work-card[data-id="all-four-know-your-identity"] .work-new-badge').forEach(el => el.remove());
    document.querySelectorAll('.work-card[data-id="all-four-know-your-identity"]').forEach(el => el.classList.remove("is-new"));
  });
})();
