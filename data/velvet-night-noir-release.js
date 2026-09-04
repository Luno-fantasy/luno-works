(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;
  const release = {
    id:"velvet-night-mikado-reiji",
    title:"愛してる、は役の台詞。",
    status:"published",
    zetaUrl:"https://zeta-ai.io/ja/plots/e2f71f39-d840-4349-a16f-6b51fe44734d/profile?share_id=1vw5uvxw",
    category:"modern-romance",
    series:"VELVET NIGHT",
    world:"velvet-night",
    position:"NOIR",
    mainCharacter:"御門怜士",
    relation:[],
    cover:"images/covers/velvet-night-group-noir.jpeg",
    coverStatus:"ready",
    isNew:true,
    releaseDate:"2026.09.04",
    catchphrase:"役ではなく、ただの俺を選んでほしい。",
    tags:["VELVET NIGHT","VESPER","NOIR","劇場","俳優","オブザーバー"],
    description:"会員制夜劇場《VESPER》、Group NOIRの看板俳優・御門怜士。舞台では愛も絶望も狂気さえ完璧に演じる一方、役ではない自分の感情を言葉にすることだけは苦手。特別審査客《オブザーバー》として芝居を見続ける{{user}}に、やがて“役”でも“NOIRの看板”でもない、ただの御門怜士を選んでほしいと願い始める。"
  };
  DATA.works.forEach(work => { if (work) work.isNew = false; });
  const index = DATA.works.findIndex(work => String(work?.id || "") === release.id);
  if (index >= 0) DATA.works[index] = {...DATA.works[index], ...release};
  else DATA.works.unshift(release);
})();