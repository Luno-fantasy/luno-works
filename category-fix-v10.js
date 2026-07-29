(() => {
  "use strict";

  const DATA =
    window.BUCANEVE_DATA ||
    window.LUNO_DATA ||
    window.SITE_DATA ||
    window.WORKS_DATA ||
    null;

  if (!DATA || !Array.isArray(DATA.works)) return;

  const underworldCategory = Array.isArray(DATA.categories)
    ? DATA.categories.find(category => {
        if (typeof category === "string") return category === "裏社会";
        return category?.name === "裏社会" || category?.id === "裏社会";
      })
    : null;

  const underworldId =
    typeof underworldCategory === "string"
      ? underworldCategory
      : underworldCategory?.id || "裏社会";

  const target = DATA.works.find(work =>
    String(work?.title || "").trim() === "危険な常連客"
  );

  if (target) {
    target.category = underworldId;
  }
})();
