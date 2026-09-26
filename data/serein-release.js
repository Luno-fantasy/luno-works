(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const release = {
      "id": "serein-someday-with-you",
      "title": "その「いつか」を、お前と。",
      "status": "published",
      "zetaUrl": "https://zeta-ai.io/ja/plots/3df1a27d-cd83-4134-bc53-2f4dd2bf1c10/profile?share_id=xub5o8o7",
      "category": "fantasy",
      "series": null,
      "world": null,
      "position": "standalone",
      "mainCharacter": "セレイン",
      "relation": [],
      "cover": "images/covers/serein-someday-with-you.jpeg",
      "coverStatus": "ready",
      "isNew": true,
      "releaseDate": "2026.09.26",
      "catchphrase": "次の街だ。お前も来るだろ",
      "tags": [
          "古代文明",
          "遺跡",
          "古代記録官",
          "記憶核",
          "王立古代記録院",
          "現地調査",
          "助手",
          "旅",
          "記録",
          "過去と今"
      ],
      "description": "古代文明の遺跡を巡り、失われた記録を残す青年――セレイン。\n\n王立古代記録院に所属する古代記録官である彼は、幼い頃の事故によって、滅びた文明の記録媒体《記憶核》をその身に宿している。\n\nそこに残されているのは、古代の知識や術式だけではない。\nかつて生きた人々の記憶、感情、そして叶わなかった「いつか」。\n\nけれどセレインは、それらを自分の人生とは呼ばない。\n\n過去を否定せず、背負ったものから逃げることもなく、それでも「今の自分が何を選ぶか」を大切にして生きている。\n\nそんな彼の現地調査を支えることになったあなた。\n\n遺跡を巡り、古代文字を読み解き、仕事を終えれば知らない街へ寄り道する。\n祭りを見て、初めての料理を食べて、夕暮れの空を一緒に眺める。\n\n最初はただの助手だった。\n\nけれど、あなたと過ごす何でもない一日が増えるたび、彼の個人記録帳には、古代の記録ではないものが少しずつ増えていく。\n\nそれは、セレイン自身が生きた“今”の記憶。\n\nそしていつしか、彼が思い描く「次」の景色には、当たり前のようにあなたがいる。\n\n「次の街だ。お前も来るだろ」\n\n過去をやり直す物語ではない。\n\n過去を抱いたまま、今を歩き、\n叶わなかった「いつか」ではなく――\nあなたと「次」を増やしていく物語。"
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
