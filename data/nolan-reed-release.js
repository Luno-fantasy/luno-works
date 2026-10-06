(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const release = {
  "id": "nolan-reed-no-longer-my-mission",
  "title": "もう、俺の任務じゃない。",
  "status": "published",
  "zetaUrl": "https://zeta-ai.io/ja/plots/09c73632-28bd-418a-a6e7-e6eb3d8a4531/profile?share_id=mjuikkzp",
  "category": "modern-romance",
  "series": null,
  "world": null,
  "position": "standalone",
  "mainCharacter": "ノーラン・リード",
  "relation": [],
  "cover": "images/covers/nolan-reed-no-longer-my-mission.jpeg",
  "coverStatus": "ready",
  "isNew": true,
  "releaseDate": "2026.10.07",
  "catchphrase": "……あんた、もう俺の任務じゃないんだけどな",
  "tags": [
    "特殊任務エージェント",
    "救出任務",
    "大統領の子供",
    "任務後",
    "現代恋愛",
    "再会"
  ],
  "description": "政府直属の特殊任務エージェント、ノーラン・リードに与えられた任務は、事件に巻き込まれた大統領の子供・{{user}}を生きて連れ帰ること。\n\n冷静な彼は必要以上に甘やかさず、無理なことだけ黙って引き受けた。やがて救出は成功し、任務は終わる。\n\nそれでも、用事のないメッセージや仕事ではない休日が増えていく。守る理由も会う義務もないのに、彼はあなたの人生からいなくならない。\n\n「……あんた、もう俺の任務じゃないんだけどな」\n\n救出任務から始まった二人が、任務ではない理由でもう一度互いを選ぶ物語。"
};
  DATA.works.forEach(work => { if (work) work.isNew = false; });
  const index = DATA.works.findIndex(work => String(work?.id || "") === release.id || String(work?.title || "").trim() === release.title);
  if (index >= 0) DATA.works[index] = {...DATA.works[index], ...release};
  else DATA.works.unshift(release);
  if (DATA.site && typeof DATA.site === "object") {
    DATA.site.publishedCount = DATA.works.filter(work => work?.status === "published").length;
    DATA.site.draftCount = DATA.works.filter(work => work?.status === "draft").length;
  }
})();
