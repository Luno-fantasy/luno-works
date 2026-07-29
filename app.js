const DATA=window.BUCANEVE_DATA;
const gate=document.getElementById("gate"),site=document.getElementById("site"),workArea=document.getElementById("workArea"),filters=document.getElementById("filters"),newsList=document.getElementById("newsList"),dialog=document.getElementById("workDialog"),searchInput=document.getElementById("workSearch"),clearSearch=document.getElementById("clearSearch"),resultCount=document.getElementById("resultCount");
const CATS=Object.fromEntries((DATA.categories||[]).map(c=>[c.id,c.name]));
const SERIES=Object.fromEntries((DATA.series||[]).map(s=>[s.id,s.name]));
const STATUS={published:"公開中",draft:"未公開"};
let activeCategory="all";

const esc=v=>String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
const cat=w=>CATS[w.category]||w.category||"その他";
const ser=w=>(w.series&&SERIES[w.series])||(w.world&&SERIES[w.world])||"";
const searchable=w=>[w.title,w.description,cat(w),ser(w),...(w.tags||[])].join(" ").toLowerCase();

function enter(){gate?.classList.add("is-leaving");site?.classList.remove("is-hidden");sessionStorage.setItem("lunoEntered","1")}
document.getElementById("enterBtn")?.addEventListener("click",enter);
document.getElementById("skipBtn")?.addEventListener("click",enter);
if(sessionStorage.getItem("lunoEntered")==="1")enter();
document.getElementById("archiveCount").textContent=`${DATA.works.length} WORKS`;

function renderFilters(){
  const items=[{id:"all",name:"すべて"},...(DATA.categories||[]),{id:"draft",name:"未公開"}];
  filters.innerHTML=items.map((x,i)=>`<button class="filter-btn ${i===0?"active":""}" data-category="${x.id}">${x.name}</button>`).join("");
  filters.addEventListener("click",e=>{
    const b=e.target.closest(".filter-btn");if(!b)return;
    activeCategory=b.dataset.category;
    document.querySelectorAll(".filter-btn").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    renderWorks();
  });
}

function filteredWorks(){
  const q=searchInput.value.trim().toLowerCase();
  return (DATA.works||[]).filter(w=>{
    const categoryOK=activeCategory==="all"||(activeCategory==="draft"?w.status==="draft":w.category===activeCategory);
    const queryOK=!q||searchable(w).includes(q);
    return categoryOK&&queryOK;
  });
}

function cardHtml(w,i){
  return `<article class="work-card" data-id="${esc(w.id)}">
    <div class="work-visual" style="--cover:url('${esc(w.cover||"")}')">
      <span class="work-number">${String(i+1).padStart(2,"0")}</span>
      ${w.status==="draft"?'<span class="work-draft-badge">COMING SOON</span>':""}
    </div>
    <div class="work-body">
      <span class="work-category">${esc(ser(w)||cat(w))}</span>
      <h3>${esc(w.title)}</h3>
      <div class="work-meta"><span>${esc(cat(w))}</span><span>${esc(STATUS[w.status]||w.status)}</span></div>
    </div>
  </article>`;
}

function renderWorks(){
  const items=filteredWorks();
  resultCount.textContent=`${items.length}作品`;
  if(!items.length){
    workArea.innerHTML='<div class="empty-state">該当する作品が見つかりませんでした。</div>';
    return;
  }

  if(activeCategory!=="all"||searchInput.value.trim()){
    workArea.innerHTML=`<div class="work-grid">${items.map(cardHtml).join("")}</div>`;
    return;
  }

  const order=(DATA.categories||[]).map(c=>c.id);
  const grouped={};
  items.forEach(w=>{(grouped[w.category]??=[]).push(w)});
  workArea.innerHTML=order.filter(id=>grouped[id]?.length).map((id,index)=>{
    const list=grouped[id];
    return `<details class="work-group" ${index===0?"open":""}>
      <summary><span class="group-title">${esc(CATS[id]||id)}</span><span class="group-count">${list.length}作品</span></summary>
      <div class="work-grid">${list.map(cardHtml).join("")}</div>
    </details>`;
  }).join("");
}

searchInput.addEventListener("input",renderWorks);
clearSearch.addEventListener("click",()=>{searchInput.value="";searchInput.focus();renderWorks()});

workArea.addEventListener("click",e=>{
  const c=e.target.closest(".work-card");if(!c)return;
  const w=DATA.works.find(x=>x.id===c.dataset.id);if(w)openWork(w);
});

function openWork(w){
  document.getElementById("dialogVisual").style.setProperty("--cover",`url('${w.cover||""}')`);
  document.querySelector(".dialog-mark").textContent=w.status==="draft"?"COMING SOON":ser(w);
  document.getElementById("dialogCategory").textContent=cat(w);
  document.getElementById("dialogTitle").textContent=w.title;
  document.getElementById("dialogCatch").textContent=ser(w)||(STATUS[w.status]||"");
  document.getElementById("dialogSummary").textContent=w.description||"作品紹介は後から追加できます。";
  const tags=[...(w.tags||[])],s=ser(w);if(s&&!tags.includes(s))tags.unshift(s);
  document.getElementById("dialogKeywords").innerHTML=tags.map(x=>`<span class="keyword">${esc(x)}</span>`).join("");
  document.getElementById("dialogActions").innerHTML='<a class="button" href="#works" onclick="document.getElementById(\'workDialog\').close()">作品一覧へ戻る</a>';
  dialog.showModal();
}
document.getElementById("closeDialog").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});

const menu=document.getElementById("menuBtn"),nav=document.getElementById("nav");
menu.addEventListener("click",()=>nav.classList.toggle("open"));nav.addEventListener("click",()=>nav.classList.remove("open"));

const topBtn=document.getElementById("backToTop");
window.addEventListener("scroll",()=>topBtn.classList.toggle("show",window.scrollY>700));
topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

function observe(){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");o.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll(".reveal:not(.is-visible)").forEach(x=>o.observe(x))}
newsList.innerHTML=`<div class="news-item"><span>ARCHIVE</span><span class="news-label">UPDATE</span><span>${DATA.works.length}作品のデータを公開しました。</span></div>`;

renderFilters();renderWorks();observe();