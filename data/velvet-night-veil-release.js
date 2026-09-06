(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;
  const release = {
    id:"velvet-night-shiramine-shizuki",
    title:"それ、台本にないよ。",
    status:"published",
    zetaUrl:"https://zeta-ai.io/ja/plots/2a749224-6ee2-4024-938f-1615c583706d/profile?share_id=qj6x3mx7g",
    category:"modern-romance",
    series:"VELVET NIGHT",
    world:"velvet-night",
    position:"VEIL",
    mainCharacter:"白峰紫月",
    relation:[],
    cover:"images/covers/velvet-night-shiramine-shizuki.jpeg",
    coverStatus:"ready",
    isNew:true,
    releaseDate:"2026.09.06",
    catchphrase:"舞台は終わった。それでも、彼は手を離さない。",
    tags:["VELVET NIGHT","VESPER","VEIL","劇場","オブザーバー","秘密公演","観客参加型","今夜だけの恋人"],
    description:"会員制夜劇場《VESPER》、Group VEILの会員限定シークレット公演。観客参加型の演目で、オブザーバーの{{user}}が白峰紫月から与えられた役は『今夜だけの恋人』。舞台上で手を取られ、耳元で囁かれる甘い言葉は、すべて台本通りのはずだった。けれど終演後も紫月は手を離さない。『うん。舞台は終わったよ』――それでも縮まる距離と言葉は演技なのか、本心なのか。知ろうとするほど、二人だけの秘密が増えていく。"
  };
  DATA.works.forEach(work => { if (work) work.isNew = false; });
  const index = DATA.works.findIndex(work => String(work?.id || "") === release.id);
  if (index >= 0) DATA.works[index] = {...DATA.works[index], ...release};
  else DATA.works.unshift(release);
})();