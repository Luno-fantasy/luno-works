(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeURL = value => {try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:null}catch{return null}};
  const store = (key,value) => {try{sessionStorage.setItem(key,value)}catch{}};
  const read = key => {try{return sessionStorage.getItem(key)}catch{return null}};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(document.body.dataset.page === 'enter') {
    if(location.hash === '#home') { location.replace('home.html'); return; }
    if(read('eternoaEntered') && !new URLSearchParams(location.search).has('enter')) { location.replace('home.html'); return; }
    $('#enterMaison')?.addEventListener('click',e=>{store('eternoaEntered','1');if(!reduced){e.preventDefault();$('.entrance').classList.add('leaving');setTimeout(()=>location.assign('home.html'),450)}});
    $('#skipMaison')?.addEventListener('click',()=>store('eternoaEntered','1'));
    return;
  }
  store('eternoaEntered','1');
  const menu=$('.maison-menu'), nav=$('.maison-nav');
  const setMenu = open => {nav?.classList.toggle('open',open);menu?.setAttribute('aria-expanded',String(open));menu?.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');document.body.classList.toggle('nav-open',open)};
  menu?.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
  nav?.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
  document.addEventListener('click',e=>{if(menu?.getAttribute('aria-expanded')==='true'&&!e.target.closest('.maison-header'))setMenu(false)});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){setMenu(false);menu.focus()}
    if(e.key==='Tab'&&menu?.getAttribute('aria-expanded')==='true'){
      const nodes=[menu,...nav.querySelectorAll('a')],first=nodes[0],last=nodes.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }
  });
  matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches)setMenu(false)});
  $$('.world-toggle').forEach(button=>button.addEventListener('click',()=>{
    const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));
    document.getElementById(button.getAttribute('aria-controls')).hidden=!open;
    button.querySelector('.world-plus').textContent=open?'−':'＋';
  }));
  const DATA=window.ETERNOA_DATA;
  if(!DATA)return;
  const series=DATA.series||[],cats=DATA.categories||[];
  const nameFor=(items,id)=>items.find(x=>(x.id||x)===id)?.name||id||'';
  const seriesFor=w=>series.filter(s=>s.id===w.series||s.id===w.world||s.works?.includes(w.id));
  const seriesLabel=w=>seriesFor(w).map(s=>s.name).join(' / ');
  const category=w=>nameFor(cats,w.category);
  const dateISO=v=>/^\d{4}[.-]\d{2}[.-]\d{2}$/.test(v||'')?v.replaceAll('.','-'):'';
  const dateLabel=v=>dateISO(v)?.replaceAll('-','.')||v||'未登録';
  const published=w=>w.status==='published'&&w.publicationStatus!=='private';
  const archived=w=>Boolean(w.archiveOnly||w.archiveStatus==='archived');
  const classificationsFor=w=>Array.isArray(w.platformClassifications)?w.platformClassifications:[];
  const belongsToPlatform=(w,platform)=>classificationsFor(w).some(c=>c.platform===platform);
  const classificationHTML=(w,links)=>classificationsFor(w).length?`<section class="story-platforms"><p class="eyebrow">PLATFORMS</p><ul>${classificationsFor(w).map(c=>`<li><b>${esc(c.platform.toUpperCase())}</b><span>${c.source==='legacy-zeta-classification'?'旧サイトの分類を継承。':''}${links.some(l=>l.platform===c.platform)?'公開先URL登録あり。':'公開先URL未登録。'}現在の公開状況は未確認です。</span></li>`).join('')}</ul></section>`:'';
  const linksFor=w=>{
    const urls=[w.url,w.link,w.zetaUrl,w.zeta,w.chachaUrl,w.talelynxUrl,...(Array.isArray(w.platformLinks)?w.platformLinks.map(x=>x.url):[])].filter(Boolean);
    return [...new Set(urls)].map(raw=>{
      const url=safeURL(raw);if(!url)return null;
      const host=new URL(url).hostname;
      const platform=host==='zeta-ai.io'||host.endsWith('.zeta-ai.io')?'zeta':host==='chacha-ai.io'||host.endsWith('.chacha-ai.io')?'chacha':/^(www\.)?talelynx\./.test(host)?'talelynx':'external';
      const explicit=w.linkAvailability?.[platform];
      return {url,platform,availability:explicit||(archived(w)?'unknown':'listed')};
    }).filter(Boolean);
  };
  const firstDate=w=>dateISO(w.firstPublishedAt||w.releaseDate);
  const lastActivity=w=>[w.firstPublishedAt,w.releaseDate,w.updatedAt,w.updateDate,w.transferredAt,w.transferDate].map(dateISO).sort().at(-1)||'';
  const byDate=(getDate,ascending=false)=>(a,b)=>{
    const ad=getDate(a),bd=getDate(b);
    // Undated works remain at the end in either direction; dates are never inferred.
    if(!ad||!bd)return Number(!ad)-Number(!bd)||String(a.title).localeCompare(b.title,'ja');
    return (ascending?ad.localeCompare(bd):bd.localeCompare(ad))||String(a.title).localeCompare(b.title,'ja');
  };
  const newest=byDate(firstDate);
  const works=DATA.works.filter(published);
  const sorted=[...works].sort(newest);
  const card=w=>`<article class="work-item"><button class="cover-button" data-work="${esc(w.id)}" aria-label="${esc(w.title)}の詳細"><img src="${esc(w.cover)}" alt="${esc(w.title)}" loading="lazy"><span class="cover-label">${archived(w)?'ARCHIVE':'VIEW STORY'}</span></button><p class="meta">${esc(seriesLabel(w)||category(w))}</p><h3><button data-work="${esc(w.id)}">${esc(w.title)}</button></h3>${firstDate(w)?`<time datetime="${esc(firstDate(w))}">${esc(dateLabel(firstDate(w)))}</time>`:'<span class="undated">公開日未登録</span>'}</article>`;
  const latest=sorted.find(w=>!archived(w)&&linksFor(w).some(l=>l.availability!=='unavailable'));
  if($('#latestRelease')&&latest){$('#latestRelease').innerHTML=`<article class="release-feature"><button class="cover-button" data-work="${esc(latest.id)}" aria-label="${esc(latest.title)}の詳細"><img src="${esc(latest.cover)}" alt="${esc(latest.title)}" loading="lazy"></button><div class="release-copy"><p class="eyebrow">${esc(category(latest))} / ${esc(dateLabel(latest.firstPublishedAt||latest.releaseDate))}</p><h3>${esc(latest.title)}</h3><p class="release-catch">${esc(latest.catchphrase||'')}</p><p class="summary">${esc(latest.description)}</p><button class="button" data-work="${esc(latest.id)}">VIEW STORY <span>→</span></button></div></article>`}
  if($('#recentWorks'))$('#recentWorks').innerHTML=sorted.filter(w=>w.id!==latest?.id).slice(0,3).map(card).join('');
  const news=(window.ETERNOA_NEWS||[]).filter(n=>n.status==='published'&&n.publishedAt<=new Date().toLocaleDateString('sv-SE',{timeZone:'Asia/Tokyo'})).sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt));
  const newsHTML=n=>`<details name="maison-news" class="letter" id="${esc(n.id)}"><summary><time datetime="${esc(n.publishedAt)}">${esc(dateLabel(n.publishedAt))}</time><span class="news-type">${esc(n.category)}</span><h3>${esc(n.title)}</h3><span aria-hidden="true">＋</span></summary><div class="letter-body"><p>${esc(n.body)}</p>${(n.relatedWorkIds||[]).map(id=>works.find(w=>w.id===id)).filter(Boolean).map(w=>`<button class="text-link" data-work="${esc(w.id)}">${esc(w.title)} →</button>`).join('')}${safeURL(n.externalUrl)?`<a class="text-link" href="${esc(safeURL(n.externalUrl))}" target="_blank" rel="noopener noreferrer">関連リンク ↗</a>`:''}</div></details>`;
  if($('#homeNews'))$('#homeNews').innerHTML=news.slice(0,2).map(newsHTML).join('');
  if($('#allNews'))$('#allNews').innerHTML=news.map(newsHTML).join('');
  $$('.letters').forEach(list=>list.addEventListener('toggle',e=>{if(e.target.open)list.querySelectorAll('.letter[open]').forEach(el=>{if(el!==e.target)el.open=false})},true));
  // A single native dialog supplies focus containment and Escape across every gallery.
  const dialog=$('#storyDialog');let opener=null,scrollPosition=0;
  function openStory(id){
    const w=works.find(w=>w.id===id);if(!w||!dialog)return;
    if(!dialog.open){opener=document.activeElement;scrollPosition=scrollY;document.body.classList.add('dialog-open')}
    const same=seriesFor(w).map(s=>s.id),relatedIds=new Set([...(w.relatedWorks||w.relatedWorkIds||[]),...works.filter(other=>other.id!==w.id&&seriesFor(other).some(s=>same.includes(s.id))).map(other=>other.id)]);
    const related=works.filter(x=>x.id!==w.id&&relatedIds.has(x.id));
    const links=linksFor(w);
    $('#storyContent').innerHTML=`<div class="story-layout"><div class="story-cover"><img src="${esc(w.cover)}" alt="${esc(w.title)}"></div><div class="story-info"><p class="eyebrow">${archived(w)?'ARCHIVE / ':''}${esc(seriesLabel(w)||category(w))}</p><h2 id="storyTitle">${esc(w.title)}</h2>${w.catchphrase?`<p class="catch">${esc(w.catchphrase)}</p>`:''}<p class="description">${esc(w.description||'')}</p><div class="story-dates"><p>初公開：${esc(dateLabel(w.firstPublishedAt||w.releaseDate))}</p>${w.updatedAt||w.updateDate?`<p>更新：${esc(dateLabel(w.updatedAt||w.updateDate))}</p>`:''}${w.transferredAt||w.transferDate?`<p>移植：${esc(dateLabel(w.transferredAt||w.transferDate))}</p>`:''}<p>収蔵状態：${archived(w)?'アーカイブ':'通常収録'}</p></div>${classificationHTML(w,links)}<div class="story-links">${links.length?links.map(l=>l.availability==='unavailable'?`<p class="muted">${esc(l.platform.toUpperCase())} — リンク利用不可</p>`:`<a class="button" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${l.availability==='unknown'?'保存リンク / ': 'READ ON '}${esc(l.platform==='external'?'EXTERNAL SITE':l.platform.toUpperCase())} ↗</a>`).join(''):'<p class="muted">公開先リンクは登録されていません。</p>'}${links.some(l=>l.availability==='unknown')?'<p class="muted">保存リンクの現在の利用状況は未確認です。</p>':''}</div>${related.length?`<section class="story-related"><p class="eyebrow">RELATED STORIES</p>${related.map(x=>`<button data-work="${esc(x.id)}">${esc(x.title)} →</button>`).join('')}</section>`:''}</div></div>`;
    if(!dialog.open)dialog.showModal();
    dialog.scrollTop=0;$('.story-close')?.focus();
  }
  document.addEventListener('click',e=>{const button=e.target.closest('[data-work],[data-open-work]');if(button){e.preventDefault();openStory(button.dataset.work||button.dataset.openWork)}});
  $('.story-close')?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
  dialog?.addEventListener('close',()=>{document.body.classList.remove('dialog-open');scrollTo({top:scrollPosition,behavior:'instant'});if(opener?.isConnected)opener.focus({preventScroll:true})});
  // URL-backed filters survive both collapsed controls and back/forward navigation.
  if($('#worksGallery')){
    const search=$('#workSearch'),genre=$('#genreFilter'),sf=$('#seriesFilter'),sort=$('#sortFilter'),status=$('#statusFilter');
    cats.forEach(c=>genre.add(new Option(c.name,c.id)));
    series.forEach(s=>sf.add(new Option(s.name,s.id)));
    let platform='all';
    const applyURL=()=>{const p=new URLSearchParams(location.search);search.value=p.get('search')||'';genre.value=p.get('genre')||'all';if(!genre.value)genre.value='all';sf.value=p.get('series')||'all';if(!sf.value)sf.value='all';sort.value=p.get('sort')||'newest';if(!sort.value)sort.value='newest';status.value=p.get('status')||'all';if(!status.value)status.value='all';platform=['all','talelynx','chacha','zeta'].includes(p.get('platform'))?p.get('platform'):'all'};
    const saveURL=()=>{const p=new URLSearchParams();for(const [k,v]of [['search',search.value],['genre',genre.value],['series',sf.value],['sort',sort.value],['status',status.value],['platform',platform]])if(v&&v!=='all'&&v!=='newest')p.set(k,v);try{history.replaceState(null,'',location.pathname+(p.size?'?'+p.toString():''))}catch{/* Local file viewers may disallow history updates; filters still work. */}};
    const render=()=>{
      const q=search.value.trim().toLocaleLowerCase('ja');
      let list=works.filter(w=>(!q||[w.title,w.description,w.mainCharacter,seriesLabel(w),category(w),...(w.tags||[])].join(' ').toLocaleLowerCase('ja').includes(q))&&(genre.value==='all'||w.category===genre.value||w.world===genre.value||w.series===genre.value)&&(sf.value==='all'||seriesFor(w).some(s=>s.id===sf.value))&&(platform==='all'||belongsToPlatform(w,platform))&&(status.value==='all'||(status.value==='archive'?archived(w):!archived(w))));
      list.sort(sort.value==='oldest'?byDate(firstDate,true):sort.value==='title'?(a,b)=>a.title.localeCompare(b.title,'ja'):sort.value==='updated'?byDate(lastActivity):newest);
      $('#worksGallery').innerHTML=list.length?list.map(card).join(''):'<p class="empty-state">この条件に一致する作品はありません。<br>検索語や絞り込み条件を変更してください。</p>';
      $('#resultsCount').textContent=`${list.length}作品 / ${[genre.value!=='all'?genre.selectedOptions[0].text:'',sf.value!=='all'?sf.selectedOptions[0].text:'',platform!=='all'?platform.toUpperCase():''].filter(Boolean).join(' · ')||'すべてのコレクション'}`;
      $$('[data-platform]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.platform===platform)));
    };
    const changed=()=>{saveURL();render()};
    [genre,sf,sort,status].forEach(s=>s.addEventListener('change',changed));search.addEventListener('input',changed);
    $('#clearSearch').addEventListener('click',()=>{search.value='';changed();search.focus()});
    $$('[data-platform]').forEach(b=>b.addEventListener('click',()=>{platform=b.dataset.platform;changed()}));
    $('#resetFilters').addEventListener('click',()=>{search.value='';genre.value=sf.value=status.value='all';sort.value='newest';platform='all';changed()});
    addEventListener('popstate',()=>{applyURL();render()});applyURL();render();
  }
  // Existing series prose and artwork are retained, but use the same catalogue and details.
  for(const [id,seriesId,countId]of [['euphoriaWorks','euphoria','euphoriaCount'],['touhouWorksGrid','touhouyoukai','touhouCount']]){
    const target=document.getElementById(id);if(!target)continue;
    const list=sorted.filter(w=>seriesFor(w).some(s=>s.id===seriesId));
    target.className='gallery';target.innerHTML=list.map(card).join('');
    const count=document.getElementById(countId);if(count)count.textContent=`${list.length} STORIES`;
  }
  $$('.velvet-card').forEach(a=>{const cover=a.querySelector('img')?.getAttribute('src');const w=works.find(w=>w.cover?.split('?')[0]===cover);if(w){a.dataset.work=w.id;a.href='works.html?search='+encodeURIComponent(w.title);a.removeAttribute('target');a.setAttribute('aria-label',w.title+'の詳細')}});
})();
