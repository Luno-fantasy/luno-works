(() => {
  "use strict";

  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  const workArea = document.getElementById("workArea");
  const platformFilters = document.getElementById("platformFilters");
  const resultCount = document.getElementById("resultCount");

  if (!DATA || !Array.isArray(DATA.works) || !workArea || !platformFilters) return;

  const chachaMigrations = {
    "strangers-at-work-lovers-at-home": "https://chacha-ai.io/ja/characters/c0e436db-45e8-41ec-84cf-fc9efe191173",
    "crow-marriage": "https://chacha-ai.io/ja/characters/06d9edef-f612-4c6a-a0b0-0c99ff5c968e"
  };

  Object.entries(chachaMigrations).forEach(([id, chachaUrl]) => {
    const work = DATA.works.find(item => String(item?.id || "").trim() === id);
    if (work) work.chachaUrl = chachaUrl;
  });

  const chachaOnlyByTitle = {
    "深淵に沈む星灯": "https://chacha-ai.io/ja/characters/48bbdd10-2001-4733-a9b0-f96232664695"
  };

  Object.entries(chachaOnlyByTitle).forEach(([title, chachaUrl]) => {
    const work = DATA.works.find(item => String(item?.title || "").trim() === title);
    if (!work) return;
    work.zetaUrl = chachaUrl;
    work.chachaUrl = null;
    work.url = null;
    work.link = null;
    work.zeta = null;
  });

  let activePlatform = "all";
  let syncFrame = 0;

  const platformsForWork = work => {
    const urls = [work?.url, work?.link, work?.zetaUrl, work?.zeta, work?.chachaUrl]
      .filter(Boolean)
      .map(value => String(value));

    let hasZeta = urls.some(url => url.includes("zeta-ai.io"));
    const hasChacha = urls.some(url => url.includes("chacha-ai.io"));

    if (!hasZeta && work?.chachaUrl && !work?.zetaUrl && !work?.zeta && !work?.url && !work?.link) {
      hasZeta = true;
    }

    if (hasZeta && hasChacha) return ["zeta", "chacha"];
    if (hasChacha) return ["chacha"];
    if (hasZeta) return ["zeta"];

    return ["zeta"];
  };

  const workById = id => DATA.works.find(work => String(work?.id || "") === String(id || ""));

  const addPlatformBadges = card => {
    const work = workById(card.dataset.id);
    if (!work) return [];

    const platforms = platformsForWork(work);
    card.dataset.platforms = platforms.join(" ");

    const body = card.querySelector(".work-body");
    const title = body?.querySelector("h3");
    if (!body || !title) return platforms;

    let box = body.querySelector(".work-platform-badges");
    if (!box) {
      box = document.createElement("div");
      box.className = "work-platform-badges";
      body.insertBefore(box, title);
    }

    const signature = platforms.join("|");
    if (box.dataset.signature !== signature) {
      box.dataset.signature = signature;
      box.innerHTML = platforms.map(platform =>
        `<span class="work-platform-chip is-${platform}">${platform === "zeta" ? "ZETA" : "CHACHA"}</span>`
      ).join("");
    }

    return platforms;
  };

  const syncSections = visibleCount => {
    const sections = [...workArea.querySelectorAll("section.works-series-block")];
    sections.forEach(section => {
      const hasVisibleCard = [...section.querySelectorAll(".work-card")]
        .some(card => card.style.display !== "none");
      section.style.display = hasVisibleCard ? "" : "none";
    });

    const seriesDivider = workArea.querySelector(":scope > .series-library-divider");
    if (seriesDivider) {
      const hasVisibleSeries = sections
        .filter(section => !section.classList.contains("standalone-series-block"))
        .some(section => section.style.display !== "none");
      seriesDivider.style.display = hasVisibleSeries ? "" : "none";
    }

    let empty = workArea.querySelector(":scope > .platform-empty-state");
    if (!empty) {
      empty = document.createElement("div");
      empty.className = "empty-state platform-empty-state";
      empty.textContent = "このプラットフォームで読める作品は、現在の絞り込み条件では見つかりませんでした。";
      workArea.appendChild(empty);
    }
    empty.hidden = visibleCount !== 0;
  };

  const updatePlatformCounts = counts => {
    platformFilters.querySelectorAll("[data-platform]").forEach(button => {
      const platform = String(button.dataset.platform || "all");
      const label = platform === "all" ? "ALL" : platform.toUpperCase();
      button.textContent = `${label} · ${counts[platform] ?? 0}`;
      button.setAttribute("aria-label", `${label} ${counts[platform] ?? 0}作品`);
    });
  };

  const sync = () => {
    const cards = [...workArea.querySelectorAll(".work-card")];
    const counts = { all: cards.length, zeta: 0, chacha: 0 };
    let visibleCount = 0;

    cards.forEach(card => {
      const platforms = addPlatformBadges(card);
      if (platforms.includes("zeta")) counts.zeta += 1;
      if (platforms.includes("chacha")) counts.chacha += 1;

      const matches = activePlatform === "all" || platforms.includes(activePlatform);
      card.style.display = matches ? "" : "none";
      if (matches) visibleCount += 1;
    });

    updatePlatformCounts(counts);
    syncSections(visibleCount);
    if (resultCount) resultCount.textContent = `${visibleCount}作品`;
  };

  const scheduleSync = () => {
    window.cancelAnimationFrame(syncFrame);
    syncFrame = window.requestAnimationFrame(sync);
  };

  platformFilters.addEventListener("click", event => {
    const button = event.target.closest("[data-platform]");
    if (!button) return;

    activePlatform = String(button.dataset.platform || "all");
    platformFilters.querySelectorAll("[data-platform]").forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    scheduleSync();
  });

  document.getElementById("filters")?.addEventListener("click", scheduleSync);
  document.getElementById("workSearch")?.addEventListener("input", scheduleSync);
  document.getElementById("clearSearch")?.addEventListener("click", scheduleSync);

  const observer = new MutationObserver(scheduleSync);
  observer.observe(workArea, { childList: true, subtree: true });

  scheduleSync();
})();
