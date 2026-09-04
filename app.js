/* DATA CORRECTIONS */
(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const underworld = Array.isArray(DATA.categories)
    ? DATA.categories.find(category =>
        typeof category === "string"
          ? category === "裏社会"
          : category?.name === "裏社会" || category?.id === "裏社会"
      )
    : null;
  const underworldId = typeof underworld === "string" ? underworld : underworld?.id || "裏社会";

  const regular = DATA.works.find(work => String(work?.id || "").trim() === "dangerous-regular");
  if (regular) regular.category = underworldId;

  const actor = DATA.works.find(work => {
    const title = String(work?.title || "").trim();
    return title === "嫌われ俳優は、君の前でだけ演じない。" || title.startsWith("嫌われ俳優");
  });
  if (actor) { actor.status = "published"; actor.isNew = false; actor.releaseDate = "2026.07.30"; }
  const summer = DATA.works.find(work => String(work?.id || "").trim() === "summer-not-enough");
  if (summer) { summer.status = "published"; summer.isNew = false; summer.releaseDate = "2026.08.03"; }
  const helloMyLover = DATA.works.find(work => String(work?.id || "").trim() === "hello-my-lover");
  if (helloMyLover) { helloMyLover.status = "published"; helloMyLover.isNew = false; helloMyLover.releaseDate = "2026.08.07"; }
  const sylvester = DATA.works.find(work => String(work?.id || "").trim() === "boss-obey-me");
  if (sylvester) { sylvester.status = "published"; sylvester.isNew = false; sylvester.releaseDate = "2026.08.08"; }
  const whiteSerpent = DATA.works.find(work => String(work?.id || "").trim() === "white-serpent-bed");
  if (whiteSerpent) { whiteSerpent.status = "published"; whiteSerpent.isNew = false; whiteSerpent.releaseDate = "2026.08.10"; }
  const samePodium = DATA.works.find(work => String(work?.id || "").trim() === "same-podium");
  if (samePodium) { samePodium.status = "published"; samePodium.isNew = false; samePodium.releaseDate = "2026.08.12"; }
  const whicheverTrust = DATA.works.find(work => String(work?.id || "").trim() === "whichever-you-trust-no-escape");
  if (whicheverTrust) { whicheverTrust.status = "published"; whicheverTrust.isNew = false; whicheverTrust.releaseDate = "2026.08.14"; whicheverTrust.zetaUrl = "https://zeta-ai.io/ja/plots/aa2ea9d5-7a30-4734-87f4-ccf9649fba89/profile?share_id=j3p2vnid"; }
  const touchEither = DATA.works.find(work => String(work?.id || "").trim() === "touch-either-cant-heal");
  if (touchEither) { touchEither.status = "published"; touchEither.isNew = false; touchEither.releaseDate = "2026.08.15"; touchEither.zetaUrl = "https://zeta-ai.io/ja/plots/4c730599-5be6-4877-b5d9-2038ac9677c2/profile?share_id=2kgvyheft"; }
  const allFour = DATA.works.find(work => String(work?.id || "").trim() === "all-four-know-your-identity");
  if (allFour) { allFour.status = "published"; allFour.isNew = true; allFour.releaseDate = "2026.08.16"; allFour.zetaUrl = "https://zeta-ai.io/ja/plots/e1eb84e8-14ef-40b7-b669-97c8263fcc2e/profile?share_id=ubbp0pnna"; }
  if (DATA.site && typeof DATA.site === "object") { DATA.site.publishedCount = 55; DATA.site.draftCount = 2; }
})();

(() => {
  "use strict";
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
  const gate=document.getElementById("gate"),site=document.getElementById("site");
  function enter(){gate?.classList.add("is-leaving");site?.classList.remove("is-hidden");try{sessionStorage.setItem("lunoEntered","1")}catch(_){}}
  document.getElementById("enterBtn")?.addEventListener("click",enter);document.getElementById("skipBtn")?.addEventListener("click",enter);try{if(sessionStorage.getItem("lunoEntered")==="1")enter()}catch(_){}
  const DATA=window.BUCANEVE_DATA||window.LUNO_DATA||window.SITE_DATA||window.WORKS_DATA||null;
  const archiveCount=document.getElementById("archiveCount"),workArea=document.getElementById("workArea"),filters=document.getElementById("filters"),newsList=document.getElementById("newsList"),dialog=document.getElementById("workDialog"),searchInput=document.getElementById("workSearch"),clearSearch=document.getElementById("clearSearch"),resultCount=document.getElementById("resultCount");
  const menu=document.getElementById("menuBtn"),nav=document.getElementById("nav");let menuCloseTimer=null;
  function setMenu(open){if(!nav||!menu)return;window.clearTimeout(menuCloseTimer);if(open){nav.hidden=false;requestAnimationFrame(()=>nav.classList.add("open"));document.body.classList.add("menu-open")}else{nav.classList.remove("open");document.body.classList.remove("menu-open");menuCloseTimer=window.setTimeout(()=>{if(!nav.classList.contains("open"))nav.hidden=true},360)}menu.classList.toggle("is-open",open);menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"メニューを閉じる":"メニューを開く")}
  if(nav&&!nav.classList.contains("open"))nav.hidden=true;menu?.addEventListener("click",()=>setMenu(!nav?.classList.contains("open")));nav?.addEventListener("click",e=>{if(e.target.closest("a"))setMenu(false)});document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false)});
  const topBtn=document.getElementById("backToTop");window.addEventListener("scroll",()=>topBtn?.classList.toggle("show",window.scrollY>700));topBtn?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
  if(!DATA||!Array.isArray(DATA.works)){if(archiveCount)archiveCount.textContent="ARCHIVE";if(workArea)workArea.innerHTML='<div class="empty-state">作品データを読み込めませんでした。data.jsがindex.htmlと同じ場所にあるか確認してください。</div>';if(resultCount)resultCount.textContent="";if(newsList)newsList.innerHTML='<div class="news-item"><span>ARCHIVE</span><span class="news-label">NOTICE</span><span>WORLDページは表示されています。作品一覧のみデータ確認が必要です。</span></div>';return}
  const categories=Array.isArray(DATA.categories)?DATA.categories:[],seriesItems=Array.isArray(DATA.series)?DATA.series:[];
  const CATS=Object.fromEntries(categories.map(c=>[typeof c==="string"?c:c.id,typeof c==="string"?c:c.name]));
  const SERIES=Object.fromEntries(seriesItems.map(s=>[typeof s==="string"?s:s.id,typeof s==="string"?s:s.name]));
  const STATUS={published:"公開中",draft:"未公開"};let activeCategory="all";
  const esc=value=>String(value??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const cat=work=>CATS[work.category]||work.category||"その他";const ser=work=>(work.series&&SERIES[work.series])||(work.world&&SERIES[work.world])||"";
  const searchable=work=>[work.title,work.description,cat(work),ser(work),...(work.tags||[])].join(" ").toLowerCase();
  function revealWorkCards(scope=document){const cards=[...scope.querySelectorAll(".work-card")];cards.forEach(c=>c.classList.remove("is-card-visible"));cards.forEach((c,i)=>window.setTimeout(()=>c.classList.add("is-card-visible"),Math.min(i*45,360)))}
  if(archiveCount)archiveCount.textContent=`${DATA.works.length} WORKS`;
  function renderFilters(){if(!filters)return;const items=[{id:"all",name:"すべて"},...categories.map(c=>typeof c==="string"?{id:c,name:c}:c),{id:"draft",name:"未公開"}];filters.innerHTML=items.map((item,index)=>`<button class="filter-btn ${index===0?"active":""}" data-category="${esc(item.id)}">${esc(item.name)}</button>`).join("");filters.addEventListener("click",event=>{const button=event.target.closest(".filter-btn");if(!button)return;activeCategory=button.dataset.category;filters.querySelectorAll(".filter-btn").forEach(el=>el.classList.remove("active"));button.classList.add("active");renderWorks()})}
  function belongsToCollection(work,id){
    if(String(work.category||"")===id||String(work.series||"")===id||String(work.world||"")===id)return true;
    const collection=seriesItems.find(s=>typeof s!=="string"&&String(s?.id||"")===id);
    return Array.isArray(collection?.works)&&collection.works.includes(String(work.id||""));
  }
  function filteredWorks(){const query=(searchInput?.value||"").trim().toLowerCase();return DATA.works.filter(work=>{const categoryOK=activeCategory==="all"||(activeCategory==="draft"?work.status==="draft":belongsToCollection(work,activeCategory));return categoryOK&&(!query||searchable(work).includes(query))})}
  function cardHtml(work,index){const isDraft=work.status==="draft",isEuphoria=String(normalizeSeriesName(work)||ser(work)||"").toUpperCase()==="EUPHORIA",isClassified=isDraft&&!isEuphoria,status=isDraft?(isEuphoria?"CASE FILE : LOCKED":"UNRELEASED"):"NOW AVAILABLE",description=isDraft?(isEuphoria?"この事件資料は現在封鎖されています。":"作品情報は公開時に解禁されます。"):String(work.description||"物語の扉を開いて、彼との時間を始めてください。"),title=isClassified?"TITLE CLASSIFIED":work.title,category=isClassified?"CLASSIFIED PROJECT":(ser(work)||cat(work)),meta=isClassified?"DETAILS SEALED":cat(work);return `<article class="work-card ${isDraft?"is-draft":"is-published"} ${isClassified?"is-classified-draft":""} ${isEuphoria&&isDraft?"is-euphoria-draft":""} ${work.isNew?"is-new":""}" data-id="${esc(work.id)}" ${isDraft?'aria-disabled="true"':`tabindex="0" role="button" aria-label="${esc(work.title)}の詳細を見る"`}><div class="work-visual" style="--cover:url('${esc(work.cover||"")}')"><span class="work-number">${String(index+1).padStart(2,"0")}</span><span class="work-status-ribbon">${status}</span>${work.isNew&&!isDraft?'<span class="work-new-badge">NEW RELEASE</span>':""}${isClassified?'<span class="draft-lock-stamp classified-lock-stamp" aria-hidden="true"><small>UNRELEASED PROJECT</small><b>ACCESS DENIED</b><em>ALL DETAILS CLASSIFIED</em></span>':""}${isEuphoria&&isDraft?'<span class="draft-lock-stamp euphoria-lock-stamp" aria-hidden="true"><small>CASE FILE</small><b>LOCKED</b></span>':""}<span class="work-cover-shine" aria-hidden="true"></span></div><div class="work-body"><div class="work-card-topline"><span class="work-category">${esc(category)}</span><span class="work-status-dot">${isClassified?"非公開":esc(STATUS[work.status]||work.status||"")}</span></div><h3>${esc(title)}</h3><p class="work-card-description">${esc(description)}</p><div class="work-meta"><span>${esc(meta)}</span><span class="work-detail-link">${isDraft?"LOCKED":"VIEW STORY <i>↗</i>"}</span></div></div></article>`}
  const SERIES_ORDER=["EUPHORIA","VELVET NIGHT","東方妖界","華龍会","アストレイン王国","カスティリオーネ／フェローネ","カスティリオーネ","フェローネ","一ノ瀬 黎・朔"];
  const SERIES_DESCRIPTIONS={"EUPHORIA":"愛は、救済か依存か。","VELVET NIGHT":"夜ごと幕を開ける、会員制夜劇場《VESPER》。","東方妖界":"妖と人が交わる、東方の幻想世界。","華龍会":"龍華街を舞台に、掟と愛に守られた物語。","アストレイン王国":"剣と誓いが結ぶ、王国ファンタジー作品群。","カスティリオーネ／フェローネ":"忠誠と硝煙が交差する、同じ世界線のマフィア作品群。","カスティリオーネ":"ナポリを舞台にした、忠誠と執着のマフィア作品群。","フェローネ":"影に生きる者たちの、危険な愛を描く作品群。","一ノ瀬 黎・朔":"昼と夜、異なる顔を持つ双子を巡る物語。"};
  const normalizeSeriesName=work=>{const name=String(ser(work)||"").trim();if(!name)return"";if(name==="カスティリオーネ"||name==="フェローネ")return"カスティリオーネ／フェローネ";return name};
  const workPriority=work=>work.isNew&&work.status!=="draft"?0:work.status!=="draft"?1:2;const sortWorksInsideGroup=list=>[...list].sort((a,b)=>{const p=workPriority(a)-workPriority(b);if(p)return p;const ad=String(a.releaseDate||""),bd=String(b.releaseDate||"");if(ad!==bd)return bd.localeCompare(ad,"ja");return String(a.title||"").localeCompare(String(b.title||""),"ja")});
  function seriesSection(name,list,index){const sorted=sortWorksInsideGroup(list),publishedCount=sorted.filter(w=>w.status!=="draft").length,comingCount=sorted.length-publishedCount,countText=comingCount?`${publishedCount} RELEASED / ${comingCount} COMING SOON`:`${publishedCount} STORIES`,description=SERIES_DESCRIPTIONS[name]||SERIES_DESCRIPTIONS[String(name||"").toUpperCase()]||"同じ世界と関係性でつながる物語をまとめています。",upper=String(name||"").toUpperCase(),dedicatedUrl=upper==="EUPHORIA"?"euphoria.html":upper==="VELVET NIGHT"?"velvet-night.html":name==="東方妖界"?"touhouyoukai.html":"";return `<section class="works-series-block" style="--series-index:${index}"><header class="works-series-heading" ${dedicatedUrl?'data-series-page="true"':''}><div class="series-heading-mark"><span>${String(index+1).padStart(2,"0")}</span></div><div class="series-heading-copy"><p>SERIES COLLECTION</p><h2>${dedicatedUrl?`<a href="${dedicatedUrl}">${esc(name)}</a>`:esc(name)}</h2><span>${esc(description)}</span></div><small>${esc(countText)}</small></header><div class="work-grid gallery-grid">${sorted.map(cardHtml).join("")}</div></section>`}
  function renderWorks(){if(!workArea)return;const items=filteredWorks();if(resultCount)resultCount.textContent=`${items.length}作品`;if(!items.length){workArea.innerHTML='<div class="empty-state">該当する作品が見つかりませんでした。</div>';return}const isBrowsingAll=activeCategory==="all"&&!(searchInput?.value||"").trim();if(!isBrowsingAll){workArea.innerHTML=`<div class="work-grid gallery-grid">${sortWorksInsideGroup(items).map(cardHtml).join("")}</div>`;revealWorkCards(workArea);return}const groups=new Map(),standalone=[];items.forEach(work=>{const seriesName=normalizeSeriesName(work);if(!seriesName){standalone.push(work);return}if(!groups.has(seriesName))groups.set(seriesName,[]);groups.get(seriesName).push(work)});const orderedSeries=[...groups.keys()].sort((a,b)=>{const ai=SERIES_ORDER.indexOf(a),bi=SERIES_ORDER.indexOf(b);if(ai!==-1||bi!==-1){if(ai===-1)return 1;if(bi===-1)return-1;return ai-bi}return a.localeCompare(b,"ja")});const seriesIntro=orderedSeries.length?`<div class="works-library-divider series-library-divider"><span>SERIES</span><div><p>CONNECTED STORIES</p><h2>シリーズ作品</h2></div><small>${orderedSeries.length} COLLECTIONS</small></div>`:"",standaloneHtml=standalone.length?`<section class="works-series-block standalone-series-block"><div class="works-library-divider"><span>OTHER</span><div><p>STANDALONE STORIES</p><h2>単独作品</h2></div><small>${standalone.length} STORIES</small></div><p class="standalone-series-note">ひとつの物語だけで完結する、独立した作品を集めています。</p><div class="work-grid gallery-grid">${sortWorksInsideGroup(standalone).map(cardHtml).join("")}</div></section>`:"";workArea.innerHTML=[seriesIntro,...orderedSeries.map((name,index)=>seriesSection(name,groups.get(name),index)),standaloneHtml].join("");revealWorkCards(workArea)}
  const initialSearch=new URLSearchParams(window.location.search).get("search");if(searchInput&&initialSearch)searchInput.value=initialSearch;searchInput?.addEventListener("input",renderWorks);clearSearch?.addEventListener("click",()=>{if(searchInput){searchInput.value="";searchInput.focus()}renderWorks()});
  renderFilters();renderWorks();

  // Dialog behavior retained for rendered work cards.
  const byId=id=>DATA.works.find(w=>String(w.id)===String(id));
  function openDialog(work){if(!dialog||!work||work.status==="draft")return;const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value??""};set("dialogNumber",String(DATA.works.indexOf(work)+1).padStart(2,"0"));set("dialogCategory",ser(work)||cat(work));set("dialogStatus",STATUS[work.status]||work.status);set("dialogTitle",work.title);set("dialogCatch",work.catchphrase);set("dialogSummary",work.description);const visual=document.getElementById("dialogVisual");if(visual)visual.style.setProperty("--dialog-cover",`url('${work.cover||""}')`);const info=document.getElementById("dialogInfo");if(info)info.innerHTML=[work.mainCharacter&&`<span>CAST <b>${esc(work.mainCharacter)}</b></span>`,work.position&&`<span>POSITION <b>${esc(work.position)}</b></span>`,work.releaseDate&&`<span>RELEASE <b>${esc(work.releaseDate)}</b></span>`].filter(Boolean).join("");const keywords=document.getElementById("dialogKeywords");if(keywords)keywords.innerHTML=(work.tags||[]).map(t=>`<span>${esc(t)}</span>`).join("");const actions=document.getElementById("dialogActions");if(actions){const urls=[];if(work.zetaUrl)urls.push(`<a class="button" href="${esc(work.zetaUrl)}" target="_blank" rel="noopener">READ STORY ↗</a>`);if(work.chachaUrl)urls.push(`<a class="button button-ghost" href="${esc(work.chachaUrl)}" target="_blank" rel="noopener">READ ON CHACHA ↗</a>`);actions.innerHTML=urls.join("")}try{dialog.showModal()}catch(_){dialog.setAttribute("open","")}document.body.classList.add("dialog-open")}
  workArea?.addEventListener("click",e=>{const card=e.target.closest(".work-card");if(card&&!card.classList.contains("is-draft"))openDialog(byId(card.dataset.id))});workArea?.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.closest(".work-card")){e.preventDefault();const card=e.target.closest(".work-card");if(!card.classList.contains("is-draft"))openDialog(byId(card.dataset.id))}});function closeDialog(){try{dialog?.close()}catch(_){dialog?.removeAttribute("open")}document.body.classList.remove("dialog-open")}document.getElementById("closeDialog")?.addEventListener("click",closeDialog);dialog?.addEventListener("click",e=>{if(e.target===dialog)closeDialog()});
})();