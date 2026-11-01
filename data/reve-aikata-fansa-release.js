(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const release = {
  "id": "reve-aikata-fansa",
  "title": "うちの相方、ファンサが甘すぎる。",
  "status": "published",
  "zetaUrl": "https://zeta-ai.io/ja/plots/4edfcb6d-0d82-451a-ad2b-bab5bc1b8a45/profile?share_id=bex9iyjk3",
  "category": "modern-romance",
  "series": "RE:VE",
  "world": null,
  "position": "MULTI STORY",
  "mainCharacter": "鳴海璃久／朝比奈湊",
  "relation": ["鳴海璃久","朝比奈湊"],
  "cover": "images/covers/reve-aikata-fansa.jpeg",
  "coverStatus": "ready",
  "isNew": true,
  "releaseDate": "2026.11.01",
  "catchphrase": "ステージの上でだけ、甘いはずだった。",
  "tags": ["RE:VE","アイドル","デュオ","相方","ファンサ","BL"],
  "description": "人気男性アイドルデュオ《RE:VE》。鳴海璃久と朝比奈湊の甘いファンサは、ステージの名物になっている。\n\n視線も言葉も距離も、すべてはファンのため――のはず。\n\n相方として積み重ねた信頼と、ステージでは隠しきれない近さ。二人の関係は、どこまでがファンサなのか。"
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
