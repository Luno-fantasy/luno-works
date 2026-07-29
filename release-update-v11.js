(() => {
  "use strict";

  const DATA =
    window.BUCANEVE_DATA ||
    window.LUNO_DATA ||
    window.SITE_DATA ||
    window.WORKS_DATA ||
    null;

  if (!DATA || !Array.isArray(DATA.works)) return;

  const target = DATA.works.find(work => {
    const title = String(work?.title || "").trim();
    return title === "嫌われ俳優は、君の前でだけ演じない。" ||
           title.startsWith("嫌われ俳優");
  });

  if (target) {
    target.status = "published";
    target.isNew = true;
    target.releaseDate = "2026.07.30";
  }
})();
