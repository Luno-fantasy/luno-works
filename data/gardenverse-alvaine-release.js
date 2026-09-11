(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const release = {
    id:"gardenverse-alvaine-rodel",
    title:"君の花だけ、味を覚えた。",
    status:"published",
    zetaUrl:"https://zeta-ai.io/ja/plots/82fb39cc-5093-4eec-9202-850d4538aa50/profile?share_id=cvod5e39m",
    chachaUrl:"https://chacha-ai.io/ja/characters/2a111288-636f-431a-8968-0fc912e23c32",
    category:"fantasy",
    series:null,
    world:null,
    position:"standalone",
    mainCharacter:"アルヴェイン・ローデル",
    relation:[],
    cover:"images/covers/gardenverse-alvaine-rodel.jpeg",
    coverStatus:"ready",
    isNew:true,
    releaseDate:"2026.09.09",
    catchphrase:"欲しいと思うことと、奪っていいことは別だ。",
    tags:["GARDENVERSE","ガーデンバース","花生み","花食み","花律院","相性","本能","執着"],
    description:"花生み・花食みを専門に扱う《花律院》の主任専門官、アルヴェイン・ローデル。自身も花食みである彼は、体質検査で{{user}}の花を口にし、これまでにないほど強い相性を感じる。最初は『ただ相性がいいだけ』と合理的に考えていたはずが、いつしか求めるのは{{user}}の花だけになっていく。『欲しいと思うことと、奪っていいことは別だ』――誰より本能を理解し、制御してきた男が、たった一人を特別にしてしまうまでの物語。"
  };

  DATA.works.forEach(work => { if (work) work.isNew = false; });
  const index = DATA.works.findIndex(work => String(work?.id || "") === release.id || String(work?.title || "").trim() === release.title);
  if (index >= 0) DATA.works[index] = {...DATA.works[index], ...release};
  else DATA.works.unshift(release);
})();