(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  if (Array.isArray(DATA.categories) && !DATA.categories.some(category => String(typeof category === "string" ? category : category?.id) === "historical-romance")) {
    DATA.categories.push({id:"historical-romance", name:"大正浪漫"});
  }

  const release = {
    id:"taisho-seiichiro",
    title:"十年越しに、君を迎えに来た。",
    status:"published",
    zetaUrl:"https://zeta-ai.io/ja/plots/05bac4e8-4296-4b6c-9a69-0396b8b47926/profile?share_id=ke6yp7lk",
    category:"historical-romance",
    series:null,
    world:null,
    position:"standalone",
    mainCharacter:"鳳征一郎",
    relation:[],
    cover:"images/covers/taisho-seiichiro.jpg",
    coverStatus:"ready",
    isNew:true,
    releaseDate:"2026.09.10",
    catchphrase:"十年前、何も持たずにこの屋敷を去った男が――今度は、私を娶るために帰ってきた。",
    tags:["大正浪漫","書生","実業家","華族","没落華族","十年越し","再会","婚姻","一途","執着"],
    description:"十年前、何も持たずにこの屋敷を去った男が――\n今度は、私を娶るために帰ってきた。\n\n十年前\n\n誰からも軽んじられていた書生・鳳征一郎を、\n{{user}}だけは一人の人間として扱った。\n\n{{user}}にとっては、忘れてしまうほど些細なこと。\n征一郎にとっては、十年経っても忘れられない記憶だった。\n\nそして、現在。\n\n没落寸前となった{{user}}の家。\n借財も、失われかけた屋敷も、\n今の征一郎ならすべて救うことができる。\n\n彼が提示した条件は、ただ一つ。\n\n「{{user}}との婚姻を、認めていただきたい」\n\n十年待った男は、もう手放すつもりがない。"
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
