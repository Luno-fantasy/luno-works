
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

  function setMenu(open) {
    nav?.classList.toggle("open", open);
    menu?.classList.toggle("is-open", open);
    menu?.setAttribute("aria-expanded", String(open));
    menu?.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    document.body.classList.toggle("menu-open", open);
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
    return `<article class="work-card" data-id="${esc(work.id)}">
      <div class="work-visual" style="--cover:url('${esc(work.cover || "")}')">
        <span class="work-number">${String(index + 1).padStart(2, "0")}</span>
        ${work.status === "draft" ? '<span class="work-draft-badge">COMING SOON</span>' : ""}
        ${work.isNew ? '<span class="work-new-badge">NEW RELEASE</span>' : ""}
      </div>
      <div class="work-body">
        <span class="work-category">${esc(ser(work) || cat(work))}</span>
        <h3>${esc(work.title)}</h3>
        <div class="work-meta">
          <span>${esc(cat(work))}</span>
          <span>${esc(STATUS[work.status] || work.status || "")}</span>
        </div>
      </div>
    </article>`;
  }

  function renderWorks() {
    if (!workArea) return;
    const items = filteredWorks();
    if (resultCount) resultCount.textContent = `${items.length}作品`;

    if (!items.length) {
      workArea.innerHTML = '<div class="empty-state">該当する作品が見つかりませんでした。</div>';
      return;
    }

    if (activeCategory !== "all" || (searchInput?.value || "").trim()) {
      workArea.innerHTML = `<div class="work-grid">${items.map(cardHtml).join("")}</div>`;
      return;
    }

    const order = categories.map(c => typeof c === "string" ? c : c.id);
    const grouped = {};
    items.forEach(work => (grouped[work.category] ??= []).push(work));

    const known = order.filter(id => grouped[id]?.length);
    const unknown = Object.keys(grouped).filter(id => !order.includes(id));
    const allGroups = [...known, ...unknown];

    workArea.innerHTML = allGroups.map((id, index) => {
      const list = grouped[id];
      return `<details class="work-group" ${index === 0 ? "open" : ""}>
        <summary>
          <span class="group-title">${esc(CATS[id] || id)}</span>
          <span class="group-count">${list.length}作品</span>
        </summary>
        <div class="work-grid">${list.map(cardHtml).join("")}</div>
      </details>`;
    }).join("");
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

  workArea?.addEventListener("click", event => {
    const card = event.target.closest(".work-card");
    if (!card) return;
    const work = DATA.works.find(item => String(item.id) === card.dataset.id);
    if (work) openWork(work);
  });

  function openWork(work) {
    if (!dialog) return;
    document.getElementById("dialogVisual")?.style.setProperty("--cover", `url('${work.cover || ""}')`);
    const mark = document.querySelector(".dialog-mark");
    if (mark) mark.textContent = work.status === "draft" ? "COMING SOON" : ser(work);
    const set = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value || "";
    };
    set("dialogCategory", cat(work));
    set("dialogTitle", work.title);
    set("dialogCatch", ser(work) || STATUS[work.status] || "");
    set("dialogSummary", work.description || "作品紹介は後から追加できます。");

    const tags = [...(work.tags || [])];
    const series = ser(work);
    if (series && !tags.includes(series)) tags.unshift(series);
    const keywordBox = document.getElementById("dialogKeywords");
    if (keywordBox) keywordBox.innerHTML =
      tags.map(tag => `<span class="keyword">${esc(tag)}</span>`).join("");

    const actions = document.getElementById("dialogActions");
    if (actions) actions.innerHTML =
      '<button class="button" type="button" id="dialogBack">作品一覧へ戻る</button>';
    document.getElementById("dialogBack")?.addEventListener("click", () => dialog.close());
    dialog.showModal();
  }

  document.getElementById("closeDialog")?.addEventListener("click", () => dialog?.close());
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
