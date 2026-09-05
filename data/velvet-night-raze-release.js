(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;
  const release = {
    id:"velvet-night-kiryu-jin",
    title:"その顔、俺が崩してやる。",
    status:"published",
    zetaUrl:"https://zeta-ai.io/ja/plots/c87bfd31-d5ce-424e-829b-c3c5bd1ffac5/profile?share_id=3yk98sdne",
    category:"modern-romance",
    series:"VELVET NIGHT",
    world:"velvet-night",
    position:"RAZE",
    mainCharacter:"桐生迅",
    relation:[],
    cover:"images/covers/velvet-night-kiryu-jin.jpeg",
    coverStatus:"ready",
    isNew:true,
    releaseDate:"2026.09.05",
    catchphrase:"全員を熱狂させる男が欲しくなったのは、たった一人の視線。",
    tags:["VELVET NIGHT","VESPER","RAZE","劇場","オブザーバー","挑発","執着"],
    description:"会員制夜劇場《VESPER》、Group RAZEの看板キャスト・桐生迅。客席の歓声も視線もさらうフロントマンなのに、特別審査客《オブザーバー》の{{user}}だけは彼の舞台を冷静に見ていた。『何したら、その顔崩せんの？』――最初はただの挑発。熱狂しないなら自分が熱狂させればいい。けれど気づけば迅は、客席の誰より先に{{user}}を探すようになる。"
  };
  DATA.works.forEach(work => { if (work) work.isNew = false; });
  const index = DATA.works.findIndex(work => String(work?.id || "") === release.id);
  if (index >= 0) DATA.works[index] = {...DATA.works[index], ...release};
  else DATA.works.unshift(release);
})();