(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  if (Array.isArray(DATA.categories) && !DATA.categories.some(category => String(typeof category === "string" ? category : category?.id) === "secret-menu")) {
    DATA.categories.push({id:"secret-menu", name:"SECRET MENU"});
  }

  if (Array.isArray(DATA.series)) {
    const series = DATA.series.find(item => String(typeof item === "string" ? item : item?.id) === "secret-menu");
    if (series && typeof series === "object") {
      series.name = "SECRET MENU";
      series.type = "series";
      if (!Array.isArray(series.works)) series.works = [];
      if (!series.works.includes("secret-menu-mido-kei")) series.works.unshift("secret-menu-mido-kei");
    } else {
      DATA.series.push({id:"secret-menu", name:"SECRET MENU", type:"series", works:["secret-menu-mido-kei"]});
    }
  }

  const release = {
    id:"secret-menu-mido-kei",
    title:"そこ動くな。迎えに行く。",
    status:"published",
    zetaUrl:"https://zeta-ai.io/ja/plots/b95cbf42-a0f3-434c-b8b7-f1f0d75f164b/profile?share_id=3pqq2pamo",
    category:"modern-romance",
    series:"secret-menu",
    world:"secret-menu",
    position:"SECRET MENU #02",
    mainCharacter:"御堂慧",
    relation:[],
    cover:"images/covers/secret-menu-mido-kei.jpeg",
    coverStatus:"ready",
    isNew:true,
    releaseDate:"2026.09.11",
    catchphrase:"怖いなら、俺を呼べ。帰るまで、俺がいる。",
    tags:["SECRET MENU","MELLOW","夜カフェ","迎え","同行","帰宅","安全第一","無口","仕事から始まる恋"],
    description:"夜カフェ《MELLOW》には、\n普通のメニューには載っていない《SECRET MENU》がある。\n\n今夜、{{user}}の相談を引き受けたのは、\n無口で愛想のない男――御堂慧。\n\n甘い言葉も、気の利いた慰めも得意じゃない。\nそれでも、呼べば迎えに来る。\n怖い夜には隣を歩き、帰るまで黙ってそばにいる。\n\n最初は、それだけの“仕事”だった。\n\n頼る夜が増えるたび、\nその気遣いが{{user}}だけに向けられたものへ変わっていくまでは。"
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
