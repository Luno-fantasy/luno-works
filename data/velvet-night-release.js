(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const release = {
    id:"velvet-night-amagi-yo",
    title:"一回くらい、俺を推してみない？",
    status:"published",
    zetaUrl:"https://zeta-ai.io/ja/plots/a67d3df7-acc7-488e-aa8c-9e5c21609ea7/profile?share_id=fwya9m9qj",
    category:"modern-romance",
    series:"VELVET NIGHT",
    world:"velvet-night",
    position:"LUX",
    mainCharacter:"天城耀",
    relation:[],
    cover:"images/covers/velvet-night-amagi-yo.jpeg",
    coverStatus:"ready",
    isNew:true,
    releaseDate:"2026.09.04",
    catchphrase:"推しじゃなくて、一人の男として選んで。",
    tags:["VELVET NIGHT","VESPER","LUX","劇場","推し活","嫉妬","独占欲"],
    description:"日没とともに開場する会員制夜劇場《VESPER》。初めて訪れた{{user}}を見つけたのは、Group LUXの看板キャスト・天城耀だった。明るく人懐っこく、ファンサも完璧な華やかなスター。最初は『一回くらい俺のこと推してみない？』という軽い誘いだったはずが、{{user}}が別のキャストを見るたび、笑顔のまま距離を詰めてくる。やがて耀が望むのは“推し”ではなく、一人の男として選ばれること。"
  };

  DATA.works.forEach(work => { if (work) work.isNew = false; });
  const index = DATA.works.findIndex(work => String(work?.id || "") === release.id);
  if (index >= 0) DATA.works[index] = {...DATA.works[index], ...release};
  else DATA.works.unshift(release);
})();