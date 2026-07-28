
const gate = document.getElementById("gate");
const site = document.getElementById("site");
const enterBtn = document.getElementById("enterBtn");
const skipBtn = document.getElementById("skipBtn");
const workGrid = document.getElementById("workGrid");
const filters = document.getElementById("filters");
const newsList = document.getElementById("newsList");
const linkGrid = document.getElementById("linkGrid");
const dialog = document.getElementById("workDialog");

function enterSite(){
  gate.classList.add("is-leaving");
  site.classList.remove("is-hidden");
  sessionStorage.setItem("lunoEntered","1");
  setTimeout(()=>document.querySelector("#home").scrollIntoView(),250);
}
enterBtn.addEventListener("click",enterSite);
skipBtn.addEventListener("click",enterSite);
if(sessionStorage.getItem("lunoEntered")==="1"){ enterSite(); }

function renderFilters(){
  filters.innerHTML = SITE_DATA.categories.map((category,index)=>
    `<button class="filter-btn ${index===0?"active":""}" data-category="${category}" type="button">${category}</button>`
  ).join("");
  filters.addEventListener("click",e=>{
    const btn=e.target.closest(".filter-btn");
    if(!btn)return;
    document.querySelectorAll(".filter-btn").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    renderWorks(btn.dataset.category);
  });
}

function renderWorks(category="すべて"){
  const items = SITE_DATA.works.filter(work=>category==="すべて" || work.category===category);
  workGrid.innerHTML = items.map(work=>`
    <article class="work-card reveal" data-id="${work.id}">
      <div class="work-visual" style="--cover:${work.cover}">
        <span class="work-number">${work.number}</span>
        <div class="work-symbol">${work.symbol}</div>
      </div>
      <div class="work-body">
        <span class="work-category">${work.label}</span>
        <h3>${work.title}</h3>
        <p>${work.catchcopy}</p>
        <div class="work-meta"><span>${work.category}</span><span>${work.status}</span></div>
      </div>
    </article>
  `).join("");
  observeReveal();
}

function renderNews(){
  newsList.innerHTML=SITE_DATA.news.map(item=>`
    <div class="news-item">
      <span class="news-date">${item.date}</span>
      <span class="news-label">${item.label}</span>
      <span class="news-title">${item.title}</span>
    </div>
  `).join("");
}

function renderLinks(){
  linkGrid.innerHTML=SITE_DATA.links.map(link=>`
    <a class="link-card" href="${link.url}" ${link.url.startsWith("http")?'target="_blank" rel="noopener"':""}>
      <span>${link.icon}</span>
      <b>${link.name}</b>
      <small>${link.description}</small>
    </a>
  `).join("");
}

workGrid.addEventListener("click",e=>{
  const card=e.target.closest(".work-card");
  if(!card)return;
  openWork(SITE_DATA.works.find(work=>work.id===card.dataset.id));
});

function openWork(work){
  document.getElementById("dialogVisual").style.setProperty("--cover",work.cover);
  document.querySelector(".dialog-mark").textContent=work.symbol;
  document.getElementById("dialogCategory").textContent=work.label;
  document.getElementById("dialogTitle").textContent=work.title;
  document.getElementById("dialogCatch").textContent=work.catchcopy;
  document.getElementById("dialogSummary").textContent=work.summary;
  document.getElementById("dialogKeywords").innerHTML=work.keywords.map(x=>`<span class="keyword">${x}</span>`).join("");
  document.getElementById("dialogActions").innerHTML=`
    <a class="button primary" href="${work.primaryUrl}">${work.primaryLabel}</a>
    <a class="button ghost" href="#links" onclick="document.getElementById('workDialog').close()">関連リンク</a>
  `;
  dialog.showModal();
}
document.getElementById("closeDialog").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{
  const rect=dialog.getBoundingClientRect();
  if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.close();
});

const menuBtn=document.getElementById("menuBtn");
const nav=document.getElementById("nav");
menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
nav.addEventListener("click",()=>nav.classList.remove("open"));

function observeReveal(){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.08});
  document.querySelectorAll(".reveal:not(.is-visible)").forEach(el=>observer.observe(el));
}

renderFilters();
renderWorks();
renderNews();
renderLinks();
observeReveal();
