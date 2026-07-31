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

  const regular = DATA.works.find(work => String(work?.title || "").trim() === "危険な常連客");
  if (regular) regular.category = underworldId;

  const actor = DATA.works.find(work => {
    const title = String(work?.title || "").trim();
    return title === "嫌われ俳優は、君の前でだけ演じない。" || title.startsWith("嫌われ俳優");
  });
  if (actor) {
    actor.status = "published";
    actor.isNew = true;
    actor.releaseDate = "2026.07.30";
  }
})();


(() => {
  "use strict";

  // Reveal static content first. Even if data loading fails, WORLD stays visible.
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));

  const gate = document.getElementById("gate");
  const site = document.getElementById("site");

  function enter() {
    gate?.classList.add("is-leaving");
    site?.classList.remove("is-hidden");
    try { sessionStorage.setItem("lunoEntered", "1"); } catch (_) {}
  }

  document.getElementById("enterBtn")?.addEventListener("click", enter);
  document.getElementById("skipBtn")?.addEventListener("click", enter);
  try {
    if (sessionStorage.getItem("lunoEntered") === "1") enter();
  } catch (_) {}

  const DATA =
    window.BUCANEVE_DATA ||
    window.LUNO_DATA ||
    window.SITE_DATA ||
    window.WORKS_DATA ||
    null;

  const archiveCount = document.getElementById("archiveCount");
  const workArea = document.getElementById("workArea");
  const filters = document.getElementById("filters");
  const newsList = document.getElementById("newsList");
  const dialog = document.getElementById("workDialog");
  const searchInput = document.getElementById("workSearch");
  const clearSearch = document.getElementById("clearSearch");
  const resultCount = document.getElementById("resultCount");

  // Navigation works independently of work data.
  const menu = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  let menuCloseTimer = null;

  function setMenu(open) {
    if (!nav || !menu) return;

    window.clearTimeout(menuCloseTimer);

    if (open) {
      nav.hidden = false;
      requestAnimationFrame(() => nav.classList.add("open"));
      document.body.classList.add("menu-open");
    } else {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuCloseTimer = window.setTimeout(() => {
        if (!nav.classList.contains("open")) nav.hidden = true;
      }, 360);
    }

    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  }

  if (nav && !nav.classList.contains("open")) {
    nav.hidden = true;
  }

  menu?.addEventListener("click", () => setMenu(!nav?.classList.contains("open")));
  nav?.addEventListener("click", event => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") setMenu(false);
  });

  const topBtn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    topBtn?.classList.toggle("show", window.scrollY > 700);
  });
  topBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  if (!DATA || !Array.isArray(DATA.works)) {
    if (archiveCount) archiveCount.textContent = "ARCHIVE";
    if (workArea) {
      workArea.innerHTML =
        '<div class="empty-state">作品データを読み込めませんでした。data.jsがindex.htmlと同じ場所にあるか確認してください。</div>';
    }
    if (resultCount) resultCount.textContent = "";
    if (newsList) {
      newsList.innerHTML =
        '<div class="news-item"><span>ARCHIVE</span><span class="news-label">NOTICE</span><span>WORLDページは表示されています。作品一覧のみデータ確認が必要です。</span></div>';
    }
    return;
  }

  const categories = Array.isArray(DATA.categories) ? DATA.categories : [];
  const seriesItems = Array.isArray(DATA.series) ? DATA.series : [];
  const CATS = Object.fromEntries(categories.map(c => [
    typeof c === "string" ? c : c.id,
    typeof c === "string" ? c : c.name
  ]));
  const SERIES = Object.fromEntries(seriesItems.map(s => [
    typeof s === "string" ? s : s.id,
    typeof s === "string" ? s : s.name
  ]));
  const STATUS = { published: "公開中", draft: "未公開" };
  let activeCategory = "all";

  const esc = value => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const cat = work => CATS[work.category] || work.category || "その他";
  const ser = work =>
    (work.series && SERIES[work.series]) ||
    (work.world && SERIES[work.world]) ||
    "";
  const searchable = work => [
    work.title, work.description, cat(work), ser(work), ...(work.tags || [])
  ].join(" ").toLowerCase();


  function revealWorkCards(scope = document) {
    const cards = [...scope.querySelectorAll(".work-card")];
    cards.forEach(card => card.classList.remove("is-card-visible"));

    cards.forEach((card, index) => {
      window.setTimeout(() => {
        card.classList.add("is-card-visible");
      }, Math.min(index * 45, 360));
    });
  }

  if (archiveCount) archiveCount.textContent = `${DATA.works.length} WORKS`;

  function renderFilters() {
    if (!filters) return;
    const items = [
      { id: "all", name: "すべて" },
      ...categories.map(c => typeof c === "string" ? { id: c, name: c } : c),
      { id: "draft", name: "未公開" }
    ];
    filters.innerHTML = items.map((item, index) =>
      `<button class="filter-btn ${index === 0 ? "active" : ""}" data-category="${esc(item.id)}">${esc(item.name)}</button>`
    ).join("");

    filters.addEventListener("click", event => {
      const button = event.target.closest(".filter-btn");
      if (!button) return;
      activeCategory = button.dataset.category;
      filters.querySelectorAll(".filter-btn").forEach(el => el.classList.remove("active"));
      button.classList.add("active");
      renderWorks();
    });
  }

  function filteredWorks() {
    const query = (searchInput?.value || "").trim().toLowerCase();
    return DATA.works.filter(work => {
      const categoryOK =
        activeCategory === "all" ||
        (activeCategory === "draft" ? work.status === "draft" : work.category === activeCategory);
      return categoryOK && (!query || searchable(work).includes(query));
    });
  }

  function cardHtml(work, index) {
    const status = work.status === "draft" ? "COMING SOON" : "NOW AVAILABLE";
    const description = String(work.description || "物語の扉を開いて、彼との時間を始めてください。");
    return `<article class="work-card ${work.status === "draft" ? "is-draft" : "is-published"} ${work.isNew ? "is-new" : ""}" data-id="${esc(work.id)}" tabindex="0" role="button" aria-label="${esc(work.title)}の詳細を見る">
      <div class="work-visual" style="--cover:url('${esc(work.cover || "")}')">
        <span class="work-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="work-status-ribbon">${status}</span>
        ${work.isNew ? '<span class="work-new-badge">NEW RELEASE</span>' : ""}
        <span class="work-cover-shine" aria-hidden="true"></span>
      </div>
      <div class="work-body">
        <div class="work-card-topline">
          <span class="work-category">${esc(ser(work) || cat(work))}</span>
          <span class="work-status-dot">${esc(STATUS[work.status] || work.status || "")}</span>
        </div>
        <h3>${esc(work.title)}</h3>
        <p class="work-card-description">${esc(description)}</p>
        <div class="work-meta">
          <span>${esc(cat(work))}</span>
          <span class="work-detail-link">VIEW STORY <i>↗</i></span>
        </div>
      </div>
    </article>`;
  }

  const SERIES_ORDER = [
    "EUPHORIA",
    "華龍会",
    "アストレイン王国",
    "カスティリオーネ／フェローネ",
    "カスティリオーネ",
    "フェローネ",
    "一ノ瀬 黎・朔"
  ];

  const SERIES_DESCRIPTIONS = {
    "EUPHORIA": "愛は、救済か依存か。",
    "華龍会": "龍華街を舞台に、掟と愛に守られた物語。",
    "アストレイン王国": "剣と誓いが結ぶ、王国ファンタジー作品群。",
    "カスティリオーネ／フェローネ": "忠誠と硝煙が交差する、同じ世界線のマフィア作品群。",
    "カスティリオーネ": "ナポリを舞台にした、忠誠と執着のマフィア作品群。",
    "フェローネ": "影に生きる者たちの、危険な愛を描く作品群。",
    "一ノ瀬 黎・朔": "昼と夜、異なる顔を持つ双子を巡る物語。"
  };

  const normalizeSeriesName = work => {
    const name = String(ser(work) || "").trim();
    if (!name) return "";
    if (name === "カスティリオーネ" || name === "フェローネ") {
      return "カスティリオーネ／フェローネ";
    }
    return name;
  };

  const workPriority = work => {
    if (work.isNew && work.status !== "draft") return 0;
    if (work.status !== "draft") return 1;
    return 2;
  };

  const sortWorksInsideGroup = list => [...list].sort((a, b) => {
    const priority = workPriority(a) - workPriority(b);
    if (priority) return priority;
    const aDate = String(a.releaseDate || "");
    const bDate = String(b.releaseDate || "");
    if (aDate !== bDate) return bDate.localeCompare(aDate, "ja");
    return String(a.title || "").localeCompare(String(b.title || ""), "ja");
  });

  function seriesSection(name, list, index) {
    const sorted = sortWorksInsideGroup(list);
    const publishedCount = sorted.filter(work => work.status !== "draft").length;
    const comingCount = sorted.length - publishedCount;
    const countText = comingCount
      ? `${publishedCount} RELEASED / ${comingCount} COMING SOON`
      : `${publishedCount} STORIES`;
    const description = SERIES_DESCRIPTIONS[name] || "同じ世界と関係性でつながる物語をまとめています。";

    return `<section class="works-series-block" style="--series-index:${index}">
      <header class="works-series-heading">
        <div class="series-heading-mark"><span>${String(index + 1).padStart(2, "0")}</span></div>
        <div class="series-heading-copy">
          <p>SERIES COLLECTION</p>
          <h2>${esc(name)}</h2>
          <span>${esc(description)}</span>
        </div>
        <small>${esc(countText)}</small>
      </header>
      <div class="work-grid gallery-grid">${sorted.map(cardHtml).join("")}</div>
    </section>`;
  }

  function renderWorks() {
    if (!workArea) return;
    const items = filteredWorks();
    if (resultCount) resultCount.textContent = `${items.length}作品`;

    if (!items.length) {
      workArea.innerHTML = '<div class="empty-state">該当する作品が見つかりませんでした。</div>';
      return;
    }

    const isBrowsingAll = activeCategory === "all" && !(searchInput?.value || "").trim();
    if (!isBrowsingAll) {
      workArea.innerHTML = `<div class="work-grid gallery-grid">${sortWorksInsideGroup(items).map(cardHtml).join("")}</div>`;
      revealWorkCards(workArea);
      return;
    }

    const groups = new Map();
    const standalone = [];

    items.forEach(work => {
      const seriesName = normalizeSeriesName(work);
      if (!seriesName) {
        standalone.push(work);
        return;
      }
      if (!groups.has(seriesName)) groups.set(seriesName, []);
      groups.get(seriesName).push(work);
    });

    const orderedSeries = [...groups.keys()].sort((a, b) => {
      const aIndex = SERIES_ORDER.indexOf(a);
      const bIndex = SERIES_ORDER.indexOf(b);
      if (aIndex !== -1 || bIndex !== -1) {
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      }
      return a.localeCompare(b, "ja");
    });

    const seriesIntro = orderedSeries.length ? `
      <div class="works-library-divider series-library-divider">
        <span>SERIES</span>
        <div><p>CONNECTED STORIES</p><h2>シリーズ作品</h2></div>
        <small>${orderedSeries.length} COLLECTIONS</small>
      </div>` : "";

    const standaloneHtml = standalone.length ? `
      <section class="works-series-block standalone-series-block">
        <div class="works-library-divider">
          <span>OTHER</span>
          <div><p>STANDALONE STORIES</p><h2>単独作品</h2></div>
          <small>${standalone.length} STORIES</small>
        </div>
        <p class="standalone-series-note">ひとつの物語だけで完結する、独立した作品を集めています。</p>
        <div class="work-grid gallery-grid">${sortWorksInsideGroup(standalone).map(cardHtml).join("")}</div>
      </section>` : "";

    workArea.innerHTML = [
      seriesIntro,
      ...orderedSeries.map((name, index) => seriesSection(name, groups.get(name), index)),
      standaloneHtml
    ].join("");
    revealWorkCards(workArea);
  }

  const initialSearch = new URLSearchParams(window.location.search).get("search");
  if (searchInput && initialSearch) {
    searchInput.value = initialSearch;
  }

  searchInput?.addEventListener("input", renderWorks);
  clearSearch?.addEventListener("click", () => {
    if (!searchInput) return;
    searchInput.value = "";
    searchInput.focus();
    renderWorks();
  });


  workArea?.addEventListener("toggle", event => {
    const group = event.target.closest?.("details.work-group");
    if (!group || !group.open) return;
    revealWorkCards(group);
  }, true);

  workArea?.addEventListener("click", event => {
    const card = event.target.closest(".work-card");
    if (!card) return;
    const work = DATA.works.find(item => String(item.id) === card.dataset.id);
    if (work) openWork(work);
  });

  workArea?.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".work-card");
    if (!card) return;
    event.preventDefault();
    const work = DATA.works.find(item => String(item.id) === card.dataset.id);
    if (work) openWork(work);
  });

  function openWork(work) {
    if (!dialog) return;

    const index = DATA.works.findIndex(item => String(item.id) === String(work.id));
    const seriesName = normalizeSeriesName(work) || ser(work);
    const statusText = work.status === "draft" ? "COMING SOON" : (work.isNew ? "NEW RELEASE" : "NOW AVAILABLE");
    const releaseDate = work.releaseDate || work.publishedAt || work.date || "";
    const character = work.mainCharacter || work.character || work.hero || "";
    const position = work.position && work.position !== "standalone" ? work.position : "";

    document.getElementById("dialogVisual")?.style.setProperty("--cover", `url('${work.cover || ""}')`);
    const mark = document.querySelector(".dialog-mark");
    if (mark) mark.textContent = statusText;

    const set = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value || "";
    };

    set("dialogNumber", String(index + 1).padStart(2, "0"));
    set("dialogCategory", [seriesName, cat(work)].filter(Boolean).join(" / "));
    set("dialogStatus", STATUS[work.status] || work.status || "");
    set("dialogTitle", work.title);
    set("dialogCatch", work.catchphrase || work.catch || work.tagline || seriesName || "月明かりの向こうで、物語が待っている。");
    set("dialogSummary", work.description || work.summary || work.introduction || "作品紹介は後から追加できます。");

    const info = [
      releaseDate ? ["RELEASE", releaseDate] : null,
      seriesName ? ["SERIES", seriesName] : null,
      character ? ["CHARACTER", character] : null,
      position ? ["TYPE", position] : null
    ].filter(Boolean);
    const infoBox = document.getElementById("dialogInfo");
    if (infoBox) {
      infoBox.innerHTML = info.map(([label, value]) =>
        `<div><span>${esc(label)}</span><b>${esc(value)}</b></div>`
      ).join("");
      infoBox.hidden = !info.length;
    }

    const tags = [...(work.tags || [])].filter(Boolean);
    if (seriesName && !tags.includes(seriesName)) tags.unshift(seriesName);
    if (cat(work) && !tags.includes(cat(work))) tags.push(cat(work));
    const keywordBox = document.getElementById("dialogKeywords");
    if (keywordBox) keywordBox.innerHTML = tags.map(tag => `<span class="keyword">${esc(tag)}</span>`).join("");
    const keywordSection = document.getElementById("dialogKeywordSection");
    if (keywordSection) keywordSection.hidden = !tags.length;

    const related = seriesName
      ? DATA.works.filter(item => String(item.id) !== String(work.id) && normalizeSeriesName(item) === seriesName)
      : [];
    const relatedBox = document.getElementById("dialogRelated");
    const relatedSection = document.getElementById("dialogRelatedSection");
    set("dialogRelatedCount", related.length ? `${related.length} STORIES` : "");
    if (relatedBox) {
      relatedBox.innerHTML = sortWorksInsideGroup(related).slice(0, 4).map(item => `
        <button class="related-story-card" type="button" data-related-id="${esc(item.id)}">
          <span class="related-story-cover" style="--cover:url('${esc(item.cover || "")}')"></span>
          <span class="related-story-copy">
            <small>${item.status === "draft" ? "COMING SOON" : "STORY"}</small>
            <b>${esc(item.title)}</b>
          </span>
          <i>↗</i>
        </button>`).join("");
    }
    if (relatedSection) relatedSection.hidden = !related.length;

    const actions = document.getElementById("dialogActions");
    if (actions) {
      const link = work.url || work.link || work.zetaUrl || work.zeta || "";
      actions.innerHTML = [
        link && work.status !== "draft" ? `<a class="button story-primary-action" href="${esc(link)}" target="_blank" rel="noopener">Zetaで読む <span>↗</span></a>` : "",
        '<button class="button story-secondary-action" type="button" id="dialogBack">作品一覧へ戻る</button>'
      ].join("");
    }
    document.getElementById("dialogBack")?.addEventListener("click", () => dialog.close());

    relatedBox?.querySelectorAll("[data-related-id]").forEach(button => {
      button.addEventListener("click", () => {
        const next = DATA.works.find(item => String(item.id) === button.dataset.relatedId);
        if (!next) return;
        openWork(next);
        document.querySelector(".story-dialog-body")?.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    dialog.showModal();
    requestAnimationFrame(() => dialog.classList.add("is-story-open"));
  }

  document.getElementById("closeDialog")?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("close", () => dialog.classList.remove("is-story-open"));
  dialog?.addEventListener("click", event => {
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom
    ) dialog.close();
  });

  if (newsList && !newsList.querySelector(".news-entry")) {
    newsList.innerHTML =
      `<div class="news-item"><span>ARCHIVE</span><span class="news-label">UPDATE</span><span>${DATA.works.length}作品のデータを公開しました。</span></div>`;
  }

  try {
    renderFilters();
    renderWorks();
  } catch (error) {
    console.error(error);
    if (workArea) {
      workArea.innerHTML =
        '<div class="empty-state">作品一覧の表示中にエラーが発生しました。WORLDページはそのまま閲覧できます。</div>';
    }
  }
})();


/* =========================================================
   PAGE TRANSITION V7
   ========================================================= */
(() => {
  const overlay = document.getElementById("pageTransition");

  const showPage = () => {
    requestAnimationFrame(() => {
      document.body.classList.add("page-ready");
      overlay?.classList.remove("is-active");
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showPage, { once: true });
  } else {
    showPage();
  }

  window.addEventListener("pageshow", () => {
    document.body.classList.add("page-ready");
    overlay?.classList.remove("is-active");
  });

  document.addEventListener("click", event => {
    const link = event.target.closest("a");
    if (!link || !overlay) return;

    const href = link.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      link.target === "_blank" ||
      link.hasAttribute("download") ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    const destination = new URL(link.href, window.location.href);

    if (destination.origin !== window.location.origin) return;

    event.preventDefault();

    document.body.classList.remove("page-ready");
    overlay.classList.add("is-active");

    window.setTimeout(() => {
      window.location.href = destination.href;
    }, 280);
  });
})();


/* =========================================================
   HOME SCROLL REVEAL V9
   ========================================================= */
(() => {
  const targets = document.querySelectorAll(".home-scroll-reveal");
  if (!targets.length) return;

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold:0.16,
    rootMargin:"0px 0px -5% 0px"
  });

  targets.forEach(el => observer.observe(el));
})();


/* FORCE CLOSED WORK GROUPS V12 */
(() => {
  const closeGroups = () => {
    document.querySelectorAll("details.work-group").forEach(group => {
      group.open = false;
      group.removeAttribute("open");
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(closeGroups, 0);
    setTimeout(closeGroups, 120);
  });

  window.addEventListener("pageshow", () => {
    setTimeout(closeGroups, 0);
  });
})();


/* =========================================================
   BUTTON GLOW TAP V15
   ========================================================= */
(() => {
  const selector = [
    ".title-button",
    ".enter-btn",
    ".filter-btn",
    ".home-new-release",
    ".page-back-link",
    ".dialog-actions a",
    ".dialog-actions button"
  ].join(",");

  document.addEventListener("pointerdown", event => {
    const target = event.target.closest(selector);
    if (!target) return;

    target.classList.remove("is-light-sweeping");
    void target.offsetWidth;
    target.classList.add("is-light-sweeping");

    window.setTimeout(() => {
      target.classList.remove("is-light-sweeping");
    }, 620);
  });
})();


/* =========================================================
   PROFILE PLACEHOLDER LINKS V16
   ========================================================= */
document.addEventListener("click", event => {
  const link = event.target.closest("[data-link-placeholder]");
  if (!link) return;
  event.preventDefault();
});

/* HOME FIXED SCREEN CONTROL */
(() => {
  if (!document.body.classList.contains('home-fixed-page')) return;

  const lockScroll = event => {
    const allowInNav = event.target && event.target.closest && event.target.closest('#nav');
    if (!allowInNav) event.preventDefault();
  };

  const lockKeys = event => {
    const blocked = ['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '];
    if (blocked.includes(event.key)) event.preventDefault();
  };

  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  window.scrollTo(0, 0);

  window.addEventListener('wheel', lockScroll, { passive: false });
  window.addEventListener('touchmove', lockScroll, { passive: false });
  window.addEventListener('keydown', lockKeys, { passive: false });
  window.addEventListener('resize', () => window.scrollTo(0, 0));
})();

/* WORLD PORTAL ACCORDION */
(() => {
  const cards = [...document.querySelectorAll('[data-world-card]')];
  if (!cards.length) return;
  cards.forEach(card => {
    const button = card.querySelector('.world-portal-visual');
    button?.addEventListener('click', () => {
      const willOpen = !card.classList.contains('is-open');
      cards.forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.world-portal-visual')?.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        card.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
