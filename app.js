(() => {
  'use strict';
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = v => String(v ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');

  $$('.reveal').forEach(el => el.classList.add('is-visible'));
  document.body.classList.add('page-ready');
  $('#pageTransition')?.classList.remove('is-active');

  const gate = $('#gate'), site = $('#site');
  const enter = () => { gate?.classList.add('is-leaving'); site?.classList.remove('is-hidden'); try{sessionStorage.setItem('lunoEntered','1')}catch(_){} };
  $('#enterBtn')?.addEventListener('click', enter); $('#skipBtn')?.addEventListener('click', enter);
  try { if (sessionStorage.getItem('lunoEntered') === '1') enter(); } catch (_) {}

  const menu = $('#menuBtn'), nav = $('#nav');
  const setMenu = open => { if(!menu||!nav)return; nav.hidden=!open; nav.classList.toggle('open',open); menu.classList.toggle('is-open',open); menu.setAttribute('aria-expanded',String(open)); document.body.classList.toggle('menu-open',open); };
  if(nav) nav.hidden = true;
  menu?.addEventListener('click',()=>setMenu(!nav?.classList.contains('open')));
  nav?.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});

  const top = $('#backToTop');
  addEventListener('scroll',()=>top?.classList.toggle('show',scrollY>700));
  top?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

  if (!DATA || !Array.isArray(DATA.works)) return;
  const categories = Array.isArray(DATA.categories) ? DATA.categories : [];
  const seriesItems = Array.isArray(DATA.series) ? DATA.series : [];
  const CATS = Object.fromEntries(categories.map(c=>[typeof c==='string'?c:c.id,typeof c==='string'?c:c.name]));
  const SERIES = Object.fromEntries(seriesItems.map(s=>[typeof s==='string'?s:s.id,typeof s==='string'?s:s.name]));
  const cat = w => CATS[w.category] || w.category || 'その他';
  const ser = w => (w.series && SERIES[w.series]) || (w.world && SERIES[w.world]) || '';
  const normalizeSeries = w => { const n=String(ser(w)||'').trim(); return (n==='カスティリオーネ'||n==='フェローネ')?'カスティリオーネ／フェローネ':n; };
  const searchable = w => [w.title,w.description,cat(w),ser(w),...(w.tags||[])].join(' ').toLowerCase();
  const STATUS={published:'公開中',draft:'未公開'};

  const workArea=$('#workArea'), filters=$('#filters'), search=$('#workSearch'), clear=$('#clearSearch'), count=$('#resultCount');
  let active='all';

  const belongs=(w,id)=>{
    if(String(w.category||'')===id||String(w.series||'')===id||String(w.world||'')===id)return true;
    const group=seriesItems.find(s=>typeof s!=='string'&&String(s?.id||'')===id);
    return Array.isArray(group?.works)&&group.works.includes(String(w.id||''));
  };

  const sorted=list=>[...list].sort((a,b)=>{
    const pa=(a.isNew&&a.status!=='draft')?0:a.status!=='draft'?1:2;
    const pb=(b.isNew&&b.status!=='draft')?0:b.status!=='draft'?1:2;
    if(pa!==pb)return pa-pb;
    const ad=String(a.releaseDate||''), bd=String(b.releaseDate||'');
    return ad!==bd ? bd.localeCompare(ad,'ja') : String(a.title||'').localeCompare(String(b.title||''),'ja');
  });

  const card=(w,i)=>{
    const draft=w.status==='draft';
    const series=normalizeSeries(w);
    return `<article class="work-card ${draft?'is-draft':'is-published'} ${w.isNew?'is-new':''}" data-id="${esc(w.id)}" ${draft?'aria-disabled="true"':`tabindex="0" role="button" aria-label="${esc(w.title)}の詳細を見る"`}>
      <div class="work-visual" style="--cover:url('${esc(w.cover||'')}')"><span class="work-number">${String(i+1).padStart(2,'0')}</span><span class="work-status-ribbon">${draft?'UNRELEASED':'NOW AVAILABLE'}</span>${w.isNew&&!draft?'<span class="work-new-badge">NEW RELEASE</span>':''}</div>
      <div class="work-body"><div class="work-card-topline"><span class="work-category">${esc(series||cat(w))}</span><span class="work-status-dot">${esc(STATUS[w.status]||w.status||'')}</span></div><h3>${esc(w.title)}</h3><p class="work-card-description">${esc(draft?'作品情報は公開時に解禁されます。':w.description||'')}</p><div class="work-meta"><span>${esc(cat(w))}</span><span class="work-detail-link">${draft?'LOCKED':'VIEW STORY <i>↗</i>'}</span></div></div>
    </article>`;
  };

  const descriptions={
    'EUPHORIA':'愛は、救済か依存か。','VELVET NIGHT':'夜ごと幕を開ける、会員制夜劇場《VESPER》。','東方妖界':'妖と人が交わる、東方の幻想世界。','アストレイン王国':'剣と誓いが結ぶ、王国ファンタジー作品群。','華龍会':'龍華街を舞台に、掟と愛に守られた物語。'
  };
  const order=['EUPHORIA','VELVET NIGHT','東方妖界','華龍会','アストレイン王国','カスティリオーネ／フェローネ','一ノ瀬 黎・朔'];
  const seriesSection=(name,list,i)=>{
    const s=sorted(list), pub=s.filter(w=>w.status!=='draft').length, coming=s.length-pub;
    const dedicated=String(name).toUpperCase()==='EUPHORIA'?'euphoria.html':String(name).toUpperCase()==='VELVET NIGHT'?'velvet-night.html':name==='東方妖界'?'touhouyoukai.html':'';
    return `<section class="works-series-block"><header class="works-series-heading" ${dedicated?'data-series-page="true"':''}><div class="series-heading-mark"><span>${String(i+1).padStart(2,'0')}</span></div><div class="series-heading-copy"><p>SERIES COLLECTION</p><h2>${dedicated?`<a href="${dedicated}">${esc(name)}</a>`:esc(name)}</h2><span>${esc(descriptions[name]||'同じ世界と関係性でつながる物語をまとめています。')}</span></div><small>${coming?`${pub} RELEASED / ${coming} COMING SOON`:`${pub} STORIES`}</small></header><div class="work-grid gallery-grid">${s.map(card).join('')}</div></section>`;
  };

  const filtered=()=>{const q=(search?.value||'').trim().toLowerCase();return DATA.works.filter(w=>{const ok=active==='all'||(active==='draft'?w.status==='draft':belongs(w,active));return ok&&(!q||searchable(w).includes(q));});};

  function renderWorks(){ if(!workArea)return; const items=filtered(); if(count)count.textContent=`${items.length}作品`; if(!items.length){workArea.innerHTML='<div class="empty-state">該当する作品が見つかりませんでした。</div>';return;}
    const browsingAll=active==='all'&&!(search?.value||'').trim();
    if(!browsingAll){workArea.innerHTML=`<div class="work-grid gallery-grid">${sorted(items).map(card).join('')}</div>`;return;}
    const groups=new Map(), standalone=[];
    items.forEach(w=>{const n=normalizeSeries(w); if(!n)standalone.push(w); else {if(!groups.has(n))groups.set(n,[]);groups.get(n).push(w);}});
    const names=[...groups.keys()].sort((a,b)=>{const ai=order.indexOf(a),bi=order.indexOf(b);if(ai!==-1||bi!==-1){if(ai===-1)return 1;if(bi===-1)return -1;return ai-bi;}return a.localeCompare(b,'ja');});
    const seriesIntro=names.length?`<div class="works-library-divider series-library-divider"><span>SERIES</span><div><p>CONNECTED STORIES</p><h2>シリーズ作品</h2></div><small>${names.length} COLLECTIONS</small></div>`:'';
    const standaloneHtml=standalone.length?`<section class="works-series-block standalone-series-block"><div class="works-library-divider"><span>OTHER</span><div><p>STANDALONE STORIES</p><h2>単独作品</h2></div><small>${standalone.length} STORIES</small></div><p class="standalone-series-note">ひとつの物語だけで完結する、独立した作品を集めています。</p><div class="work-grid gallery-grid">${sorted(standalone).map(card).join('')}</div></section>`:'';
    workArea.innerHTML=[seriesIntro,...names.map((n,i)=>seriesSection(n,groups.get(n),i)),standaloneHtml].join('');
  }

  function renderFilters(){if(!filters)return;const items=[{id:'all',name:'すべて'},...categories.map(c=>typeof c==='string'?{id:c,name:c}:c),{id:'draft',name:'未公開'}];filters.innerHTML=items.map((x,i)=>`<button class="filter-btn ${i===0?'active':''}" data-category="${esc(x.id)}">${esc(x.name)}</button>`).join('');filters.addEventListener('click',e=>{const b=e.target.closest('.filter-btn');if(!b)return;active=b.dataset.category;$$('#filters .filter-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderWorks();});}

  const initial=new URLSearchParams(location.search).get('search'); if(search&&initial)search.value=initial;
  search?.addEventListener('input',renderWorks); clear?.addEventListener('click',()=>{if(search){search.value='';renderWorks();}});
  renderFilters(); renderWorks();

  const dialog=$('#workDialog');
  function openWork(w){if(!dialog||!w||w.status==='draft')return; const set=(id,v)=>{const el=$('#'+id);if(el)el.textContent=v||''}; const series=normalizeSeries(w); $('#dialogVisual')?.style.setProperty('--cover',`url('${w.cover||''}')`); set('dialogNumber','01');set('dialogCategory',series||cat(w));set('dialogStatus',w.isNew?'NEW RELEASE':'NOW AVAILABLE');set('dialogTitle',w.title);set('dialogCatch',w.catchphrase||'');set('dialogSummary',w.description||'');const kw=$('#dialogKeywords');if(kw)kw.innerHTML=(w.tags||[]).map(t=>`<span class="keyword">${esc(t)}</span>`).join('');const actions=$('#dialogActions');const link=w.url||w.link||w.zetaUrl||w.zeta||w.chachaUrl||'';if(actions)actions.innerHTML=link?`<a class="button story-primary-action" href="${esc(link)}">READ STORY <span>→</span></a>`:'';dialog.showModal();}
  workArea?.addEventListener('click',e=>{const c=e.target.closest('.work-card');if(!c)return;openWork(DATA.works.find(w=>String(w.id)===c.dataset.id));});
  $('#closeDialog')?.addEventListener('click',()=>dialog?.close());
})();
