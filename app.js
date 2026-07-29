const DATA = window.BUCANEVE_DATA;

const gate = document.getElementById("gate");
const site = document.getElementById("site");
const enterBtn = document.getElementById("enterBtn");
const skipBtn = document.getElementById("skipBtn");
const workGrid = document.getElementById("workGrid");
const filters = document.getElementById("filters");
const newsList = document.getElementById("newsList");
const linkGrid = document.getElementById("linkGrid");
const dialog = document.getElementById("workDialog");

const CATEGORY_LABELS = Object.fromEntries(
  (DATA.categories || []).map(category => [category.id, category.name])
);

const STATUS_LABELS = {
  published: "公開中",
  draft: "未公開"
};

const SERIES_LABELS = Object.fromEntries(
  (DATA.series || []).map(series => [series.id, series.name])
);

function enterSite() {
  if (!gate || !site) return;
  gate.classList.add("is-leaving");
  site.classList.remove("is-hidden");
  sessionStorage.setItem("lunoEntered", "1");

  setTimeout(() => {
    document.querySelector("#home")?.scrollIntoView();
  }, 250);
}

enterBtn?.addEventListener("click", enterSite);
skipBtn?.addEventListener("click", enterSite);

if (sessionStorage.getItem("lunoEntered") === "1") {
  enterSite();
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getCategoryLabel(work) {
  return CATEGORY_LABELS[work.category] || work.category || "その他";
}

function getStatusLabel(work) {
  return STATUS_LABELS[work.status] || work.status || "";
}

function getSeriesLabel(work) {
  if (work.series && SERIES_LABELS[work.series]) {
    return SERIES_LABELS[work.series];
  }
  if (work.world && SERIES_LABELS[work.world]) {
    return SERIES_LABELS[work.world];
  }
  return "";
}

function getWorkTags(work) {
  const tags = [...(work.tags || [])];
  const series = getSeriesLabel(work);

  if (series && !tags.includes(series)) {
    tags.unshift(series);
  }

  return tags;
}

function renderFilters() {
  if (!filters) return;

  const categories = [
    { id: "all", name: "すべて" },
    ...(DATA.categories || []),
    { id: "draft", name: "未公開" }
  ];

  filters.innerHTML = categories.map((category, index) => `
    <button
      class="filter-btn ${index === 0 ? "active" : ""}"
      data-category="${escapeHtml(category.id)}"
      type="button"
    >
      ${escapeHtml(category.name)}
    </button>
  `).join("");

  filters.addEventListener("click", event => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;

    document.querySelectorAll(".filter-btn").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    renderWorks(button.dataset.category);
  });
}

function renderWorks(category = "all") {
  if (!workGrid) return;

  const items = (DATA.works || []).filter(work => {
    if (category === "all") return true;
    if (category === "draft") return work.status === "draft";
    return work.category === category;
  });

  workGrid.innerHTML = items.map((work, index) => {
    const categoryLabel = getCategoryLabel(work);
    const statusLabel = getStatusLabel(work);
    const seriesLabel = getSeriesLabel(work);
    const cover = work.cover || "";
    const number = String(index + 1).padStart(2, "0");

    return `
      <article class="work-card reveal" data-id="${escapeHtml(work.id)}">
        <div
          class="work-visual ${cover ? "" : "no-cover"}"
          ${cover ? `style="--cover: url('${escapeHtml(cover)}')"` : ""}
        >
          <span class="work-number">${number}</span>
          ${work.status === "draft" ? '<span class="work-draft-badge">COMING SOON</span>' : ""}
        </div>

        <div class="work-body">
          <span class="work-category">${escapeHtml(seriesLabel || categoryLabel)}</span>
          <h3>${escapeHtml(work.title)}</h3>
          ${work.description ? `<p>${escapeHtml(work.description)}</p>` : ""}
          <div class="work-meta">
            <span>${escapeHtml(categoryLabel)}</span>
            <span>${escapeHtml(statusLabel)}</span>
          </div>
        </div>
      </article>
    `;
  }).join("");

  observeReveal();
}

function renderNews() {
  if (!newsList) return;

  const news = DATA.news || [];

  if (news.length === 0) {
    newsList.innerHTML = `
      <div class="news-item">
        <span class="news-label">ARCHIVE</span>
        <span class="news-title">作品データを更新しました。</span>
      </div>
    `;
    return;
  }

  newsList.innerHTML = news.map(item => `
    <div class="news-item">
      <span class="news-date">${escapeHtml(item.date || "")}</span>
      <span class="news-label">${escapeHtml(item.label || "")}</span>
      <span class="news-title">${escapeHtml(item.title || "")}</span>
    </div>
  `).join("");
}

function renderLinks() {
  if (!linkGrid) return;

  const links = DATA.links || [];

  if (links.length === 0) {
    linkGrid.innerHTML = "";
    return;
  }

  linkGrid.innerHTML = links.map(link => `
    <a
      class="link-card"
      href="${escapeHtml(link.url || "#")}"
      ${(link.url || "").startsWith("http") ? 'target="_blank" rel="noopener"' : ""}
    >
      <span>${escapeHtml(link.icon || "↗")}</span>
      <b>${escapeHtml(link.name || "")}</b>
      <small>${escapeHtml(link.description || "")}</small>
    </a>
  `).join("");
}

workGrid?.addEventListener("click", event => {
  const card = event.target.closest(".work-card");
  if (!card) return;

  const work = (DATA.works || []).find(item => item.id === card.dataset.id);
  if (work) openWork(work);
});

function setText(id, value = "") {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function openWork(work) {
  if (!dialog) return;

  const dialogVisual = document.getElementById("dialogVisual");
  if (dialogVisual) {
    if (work.cover) {
      dialogVisual.style.setProperty("--cover", `url('${work.cover}')`);
      dialogVisual.classList.remove("no-cover");
    } else {
      dialogVisual.style.removeProperty("--cover");
      dialogVisual.classList.add("no-cover");
    }
  }

  const mark = document.querySelector(".dialog-mark");
  if (mark) {
    mark.textContent = work.status === "draft" ? "COMING SOON" : getSeriesLabel(work);
  }

  setText("dialogCategory", getCategoryLabel(work));
  setText("dialogTitle", work.title);
  setText("dialogCatch", getSeriesLabel(work) || getStatusLabel(work));
  setText("dialogSummary", work.description || "作品紹介は後から追加できます。");

  const keywordBox = document.getElementById("dialogKeywords");
  if (keywordBox) {
    const tags = getWorkTags(work);
    keywordBox.innerHTML = tags.map(tag => `
      <span class="keyword">${escapeHtml(tag)}</span>
    `).join("");
  }

  const actionBox = document.getElementById("dialogActions");
  if (actionBox) {
    actionBox.innerHTML = `
      <a class="button ghost" href="#works" onclick="document.getElementById('workDialog').close()">
        作品一覧へ戻る
      </a>
    `;
  }

  dialog.showModal();
}

document.getElementById("closeDialog")?.addEventListener("click", () => {
  dialog?.close();
});

dialog?.addEventListener("click", event => {
  const rect = dialog.getBoundingClientRect();

  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  ) {
    dialog.close();
  }
});

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn?.addEventListener("click", () => {
  nav?.classList.toggle("open");
});

nav?.addEventListener("click", () => {
  nav.classList.remove("open");
});

function observeReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal:not(.is-visible)").forEach(element => {
    observer.observe(element);
  });
}

renderFilters();
renderWorks();
renderNews();
renderLinks();
observeReveal();
